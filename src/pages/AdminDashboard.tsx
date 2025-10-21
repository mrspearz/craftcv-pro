import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, ShoppingCart, DollarSign, Settings } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');
  const [userCount, setUserCount] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [stripeKeys, setStripeKeys] = useState({ publishable: '', secret: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load users count
      const { data: authData, count } = await supabase.auth.admin.listUsers();
      setUserCount(count || 0);

      // Load revenue
      const { data: orders } = await supabase.from('orders').select('amount');
      const revenue = orders?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;
      setTotalRevenue(revenue);

      // Load products
      const { data: productsData } = await supabase.from('subscription_products').select('*');
      setProducts(productsData || []);

      // Load stripe settings
      const { data: stripeData } = await supabase.from('stripe_settings').select('*').single();
      if (stripeData) {
        setStripeKeys({ publishable: stripeData.publishable_key || '', secret: stripeData.secret_key || '' });
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
      await supabase.auth.admin.deleteUser(userId);
      alert('User deleted successfully');
      loadData();
    } catch (error) {
      alert('Error deleting user: ' + (error as any)?.message);
    }
  };

  const handleAddProduct = async () => {
    const name = prompt('Product name:');
    if (!name) return;
    const price = prompt('Price:');
    if (!price) return;
    
    try {
      await supabase.from('subscription_products').insert({
        name,
        price: parseFloat(price),
        description: 'Premium subscription',
        billing_period: 'monthly',
      });
      alert('Product created');
      loadData();
    } catch (error) {
      alert('Error: ' + (error as any)?.message);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await supabase.from('subscription_products').delete().eq('id', id);
      alert('Product deleted');
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
      const { data: existing } = await supabase.from('stripe_settings').select('*').single().catch(() => ({ data: null }));
      
      if (existing) {
        await supabase.from('stripe_settings').update({
          publishable_key: stripeKeys.publishable,
          secret_key: stripeKeys.secret,
        }).eq('id', existing.id);
      } else {
        await supabase.from('stripe_settings').insert({
          publishable_key: stripeKeys.publishable,
          secret_key: stripeKeys.secret,
        });
      }
      alert('Stripe keys saved');
    } catch (error) {
      alert('Error: ' + (error as any)?.message);
    }
  };

  if (loading) {
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
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
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
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Created</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Note: Displaying users would require admin API */}
                  <tr className="border-b border-slate-800">
                    <td colSpan={3} className="px-6 py-4 text-slate-400 text-center">
                      User list requires Supabase Admin API
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'products' && (
          <div>
            <button
              onClick={handleAddProduct}
              className="mb-4 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
            >
              + Add Product
            </button>
            <div className="grid gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-slate-900/50 border border-violet-500/20 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-semibold">{product.name}</h3>
                    <p className="text-slate-400 text-sm">${product.price}/{product.billing_period}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm font-medium transition-colors"
                  >
                    Delete
                  </button>
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
