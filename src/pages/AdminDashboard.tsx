import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingCart, DollarSign, Settings, Edit2 } from 'lucide-react';
import { supabase, supabaseAdmin } from '../lib/supabaseClient';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [userCount, setUserCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [stripeKeys, setStripeKeys] = useState({ publishable: '', secret: '' });
  const [loading, setLoading] = useState(true);
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({ name: '', price: '', description: '', billing_period: 'monthly', currency: 'USD' });
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  // Check if user is admin
  useEffect(() => {
    const email = localStorage.getItem('adminEmail');
    const token = localStorage.getItem('adminToken');
    if (email && token) {
      setAdminEmail(email);
      setIsAdmin(true);
    } else {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load users from profiles table instead of auth.users
      // This is more secure and doesn't require service role on client
      try {
        console.log('Attempting to load user profiles...');
        
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        console.log('Profiles load result:', { count: profiles?.length, error });
        
        if (error) {
          console.error('Error loading profiles:', error);
          // Don't alert, just log - profiles table might not exist yet
        } else if (profiles) {
          console.log('Successfully loaded profiles:', profiles.length);
          setAllUsers(profiles);
          setUserCount(profiles.length);
        } else {
          console.warn('No profiles returned');
          setAllUsers([]);
          setUserCount(0);
        }
      } catch (err) {
        console.error('Exception while listing profiles:', err);
        setAllUsers([]);
        setUserCount(0);
      }

      // Load revenue
      const { data: orders } = await supabaseAdmin.from('orders').select('amount');
      const revenue = orders?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;
      setTotalRevenue(revenue);

      // Load products - show all for admin
      const { data: productsData, error: productsError } = await supabaseAdmin
        .from('subscription_products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (productsError) {
        console.error('Products error:', productsError);
      }
      setProducts(productsData || []);

      // Load stripe settings
      try {
        const { data: stripeData } = await supabaseAdmin.from('stripe_settings').select('*').single();
        if (stripeData) {
          setStripeKeys({ publishable: stripeData.publishable_key || '', secret: stripeData.secret_key || '' });
        }
      } catch (err) {
        console.warn('Stripe settings not found');
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminEmail');
    navigate('/admin/login');
  };

  const handleDeleteUser = async (userId: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      // Call edge function to delete user (requires service role on server)
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-delete-user`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );
      
      const result = await response.json();
      if (result.error) {
        throw new Error(result.error);
      }
      
      alert('User deleted successfully');
      await loadData();
    } catch (error) {
      alert('Error deleting user: ' + (error as any)?.message);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      description: product.description || '',
      billing_period: product.billing_period,
      currency: 'USD',
    });
    setShowProductForm(true);
  };

  const handleAddProduct = async () => {
    if (!productForm.name || !productForm.price) {
      alert('Please fill in name and price');
      return;
    }
    
    try {
      if (editingProduct) {
        // Update existing product
        const { error } = await supabaseAdmin
          .from('subscription_products')
          .update({
            name: productForm.name,
            price: parseFloat(productForm.price),
            description: productForm.description,
            billing_period: productForm.billing_period,
          })
          .eq('id', editingProduct.id);
        
        if (error) {
          console.error('Update error:', error);
          alert('Error: ' + error.message);
          return;
        }
        
        alert('Product updated successfully!');
      } else {
        // Create new product in Stripe via edge function
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-stripe-product`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            },
            body: JSON.stringify({
              action: 'create',
              name: productForm.name,
              description: productForm.description,
              price: parseFloat(productForm.price),
              billing_period: productForm.billing_period,
            }),
          }
        );

        const stripeResult = await response.json();
        if (stripeResult.error) {
          throw new Error(stripeResult.error);
        }

        // Then save to database with Stripe IDs
        const { data, error } = await supabaseAdmin.from('subscription_products').insert({
          name: productForm.name,
          price: parseFloat(productForm.price),
          description: productForm.description,
          billing_period: productForm.billing_period,
          stripe_product_id: stripeResult.stripeProductId,
          stripe_price_id: stripeResult.stripePriceId,
          active: true,
        }).select();
        
        if (error) {
          console.error('Insert error:', error);
          alert('Error: ' + error.message);
          return;
        }
        
        alert('Product created successfully in both Stripe and database!');
      }
      
      setProductForm({ name: '', price: '', description: '', billing_period: 'monthly', currency: 'USD' });
      setShowProductForm(false);
      setEditingProduct(null);
      await loadData();
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + (error as any)?.message);
    }
  };

  const handleDeleteProduct = async (id: string, stripeProductId?: string) => {
    if (!window.confirm('Delete this product from both Stripe and database?')) return;
    try {
      // Delete from Stripe first if we have a stripe_product_id
      if (stripeProductId) {
        const response = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-stripe-product`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            },
            body: JSON.stringify({
              action: 'delete',
              stripeProductId: stripeProductId,
            }),
          }
        );

        const result = await response.json();
        if (result.error) {
          console.warn('Stripe deletion warning:', result.error);
        }
      }

      // Then delete from database
      await supabaseAdmin.from('subscription_products').delete().eq('id', id);
      alert('Product deleted successfully');
      loadData();
    } catch (error) {
      alert('Error: ' + (error as any)?.message);
    }
  };

  const handleSaveStripeKeys = async () => {
    if (!stripeKeys.publishable || !stripeKeys.secret) {
      alert('Please fill in both keys');
      return;
    }
    try {
      // Check if settings already exist
      const { data: existing, error: selectError } = await supabaseAdmin
        .from('stripe_settings')
        .select('*')
        .single();
      
      if (existing && !selectError) {
        // Update existing record
        await supabaseAdmin.from('stripe_settings').update({
          publishable_key: stripeKeys.publishable,
          secret_key: stripeKeys.secret,
        }).eq('id', existing.id);
      } else {
        // Insert new record
        await supabaseAdmin.from('stripe_settings').insert({
          publishable_key: stripeKeys.publishable,
          secret_key: stripeKeys.secret,
        });
      }
      alert('Stripe keys saved');
    } catch (error) {
      alert('Error: ' + (error as any)?.message);
    }
  };

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-slate-900/50 border-b border-violet-500/20 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Logged in as: {adminEmail}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Navigation */}
      <div className="bg-slate-900/30 border-b border-violet-500/20 px-6 py-3 flex gap-4">
        {['overview', 'users', 'products', 'stripe'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              tab === t
                ? 'bg-violet-600 text-white'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {tab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-violet-500/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-white mt-2">{userCount}</p>
                </div>
                <Users className="w-8 h-8 text-violet-400" />
              </div>
            </div>
            <div className="bg-slate-900/50 border border-violet-500/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-white mt-2">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-400" />
              </div>
            </div>
            <div className="bg-slate-900/50 border border-violet-500/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Products</p>
                  <p className="text-3xl font-bold text-white mt-2">{products.length}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-blue-400" />
              </div>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div className="bg-slate-900/50 border border-violet-500/20 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-violet-500/20">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Created</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allUsers.length > 0 ? (
                    allUsers.map((user: any) => (
                      <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                        <td className="px-6 py-4 text-slate-300">{user.email || 'No email'}</td>
                        <td className="px-6 py-4 text-slate-300">
                          {user.full_name || user.display_name || user.email?.split('@')[0] || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-sm">
                          {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="border-b border-slate-800">
                      <td colSpan={4} className="px-6 py-4 text-slate-400 text-center">
                        No users found. Users will appear here after they sign up.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            {!showProductForm ? (
              <button
                onClick={() => setShowProductForm(true)}
                className="mb-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
              >
                + Add Product
              </button>
            ) : (
              <div className="mb-6 bg-slate-900/50 border border-violet-500/20 rounded-lg p-6 max-w-md">
                <h3 className="text-white font-semibold mb-4">
                  {editingProduct ? 'Edit Product' : 'Create New Product'}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Product Name</label>
                    <input
                      type="text"
                      value={productForm.name}
                      onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white focus:outline-none focus:border-violet-500"
                      placeholder="e.g., Pro Plan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Price (USD)</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white focus:outline-none focus:border-violet-500"
                      placeholder="9.99"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea
                      value={productForm.description}
                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white focus:outline-none focus:border-violet-500"
                      placeholder="Product description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Billing Period</label>
                    <select
                      value={productForm.billing_period}
                      onChange={(e) => setProductForm({ ...productForm, billing_period: e.target.value })}
                      className="w-full px-4 py-2 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white focus:outline-none focus:border-violet-500"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddProduct}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                    <button
                      onClick={() => {
                        setShowProductForm(false);
                        setEditingProduct(null);
                        setProductForm({ name: '', price: '', description: '', billing_period: 'monthly', currency: 'USD' });
                      }}
                      className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="grid gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-slate-900/50 border border-violet-500/20 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-semibold">{product.name}</h3>
                    <p className="text-slate-400 text-sm">USD ${product.price}/{product.billing_period}</p>
                    {product.description && <p className="text-slate-500 text-xs mt-1">{product.description}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id, product.stripe_product_id)}
                      className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'stripe' && (
          <div className="bg-slate-900/50 border border-violet-500/20 rounded-lg p-6 max-w-md">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Publishable Key</label>
                <input
                  type="password"
                  value={stripeKeys.publishable}
                  onChange={(e) => setStripeKeys({ ...stripeKeys, publishable: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  placeholder="pk_live_..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Secret Key</label>
                <input
                  type="password"
                  value={stripeKeys.secret}
                  onChange={(e) => setStripeKeys({ ...stripeKeys, secret: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-800/50 border border-violet-500/20 rounded-lg text-white focus:outline-none focus:border-violet-500"
                  placeholder="sk_live_..."
                />
              </div>
              <button
                onClick={handleSaveStripeKeys}
                className="w-full px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
              >
                Save Stripe Keys
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
