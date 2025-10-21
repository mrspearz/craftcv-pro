import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.0.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const body = await req.text();

  try {
    const event = JSON.parse(body);

    console.log("Webhook event:", event.type);

    // Handle subscription created/updated
    if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
      const subscription = event.data.object as any;
      const userId = subscription.metadata?.user_id;

      if (userId) {
        // Get product/price info
        const lineItems = subscription.items.data[0];
        const priceId = lineItems.price.id;
        
        // Find product_id from our database using price_id
        const { data: product } = await supabase
          .from("subscription_products")
          .select("id")
          .eq("stripe_price_id", priceId)
          .single();

        if (product) {
          // Upsert subscription record
          await supabase.from("user_subscriptions").upsert({
            user_id: userId,
            product_id: product.id,
            stripe_subscription_id: subscription.id,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000),
            current_period_end: new Date(subscription.current_period_end * 1000),
          });

          console.log("Subscription updated for user:", userId);
        }
      }
    }

    // Handle subscription deleted
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as any;
      
      await supabase
        .from("user_subscriptions")
        .update({ status: "cancelled" })
        .eq("stripe_subscription_id", subscription.id);

      console.log("Subscription cancelled:", subscription.id);
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Webhook error" }),
      { status: 400 }
    );
  }
});
