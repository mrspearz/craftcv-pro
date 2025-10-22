import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, Loader } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '../providers/AuthProvider';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  billing_period: string;
  features: any[];
  active: boolean;
}

export function Pricing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState<string | null>(null);
  const [stripePublishableKey, setStripePublishableKey] = useState<string>('');

  useEffect(() => {
    loadProducts();
    loadStripeSettings();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('subscription_products')
        .select('*')
        .eq('active', true)
        .order('price', { ascending: true });

      if (error) {
        console.error('Error loading products:', error);
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadStripeSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('stripe_settings')
        .select('publishable_key')
        .single();

      if (error) {
        console.error('Error loading Stripe settings:', error);
      } else if (data?.publishable_key) {
        setStripePublishableKey(data.publishable_key);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const handleSubscribe = async (product: Product) => {
    if (!user) {
      alert('Please log in to subscribe');
      navigate('/login');
      return;
    }

    if (!stripePublishableKey) {
      alert('Stripe is not configured. Please contact support.');
      return;
    }

    setSubscribing(product.id);
    try {
      // Call edge function to create checkout session
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
          body: JSON.stringify({
            productId: product.id,
            priceId: product.stripe_price_id,
            userId: user.id,
            customerEmail: user.email,
            frontendUrl: window.location.origin,
          }),
        }
      );

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      // Redirect to Stripe checkout using session URL
      if (data.sessionUrl) {
        window.location.href = data.sessionUrl;
      } else {
        throw new Error('No checkout URL received from server');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start checkout: ' + (error as any).message);
    } finally {
      setSubscribing(null);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950">
      {/* Header */}
      <div className="border-b border-violet-500/20 px-6 py-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Upgrade Your Plan
          </h1>
          <p className="text-slate-400 text-lg">
            Choose the perfect plan to unlock more features
          </p>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative bg-slate-900/50 border border-violet-500/20 rounded-xl p-8 hover:border-violet-500/50 transition-all hover:shadow-lg hover:shadow-violet-500/10"
              >
                {/* Product Header */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-slate-400 text-sm">
                      {product.description}
                    </p>
                  )}
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      ${product.price}
                    </span>
                    <span className="text-slate-400">
                      /{product.billing_period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3">
                  {product.features && Array.isArray(product.features) ? (
                    product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300">
                          {typeof feature === 'string' ? feature : feature.name}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300">Premium Features</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleSubscribe(product)}
                  disabled={subscribing === product.id}
                  className="w-full py-3 px-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  {subscribing === product.id ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Subscribe Now'
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg">
              No plans available at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
