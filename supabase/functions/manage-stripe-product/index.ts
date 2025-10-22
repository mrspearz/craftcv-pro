import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@13.0.0?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    // Fetch Stripe secret key from database
    const { data: stripeSettings, error: settingsError } = await supabase
      .from("stripe_settings")
      .select("secret_key")
      .single();

    if (settingsError || !stripeSettings?.secret_key) {
      return new Response(
        JSON.stringify({ error: "Stripe is not configured" }),
        { 
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Initialize Stripe with the fetched secret key
    const stripe = new Stripe(stripeSettings.secret_key, {
      apiVersion: "2023-10-16",
    });

    const { action, name, description, price, billing_period, stripeProductId } = await req.json();

    if (action === "create") {
      // Create product in Stripe
      const product = await stripe.products.create({
        name: name,
        description: description || "",
      });

      // Create price in Stripe
      const stripePrice = await stripe.prices.create({
        product: product.id,
        unit_amount: Math.round(price * 100), // Convert to cents
        currency: "usd",
        recurring: {
          interval: billing_period === "yearly" ? "year" : "month",
        },
      });

      return new Response(
        JSON.stringify({
          stripeProductId: product.id,
          stripePriceId: stripePrice.id,
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } else if (action === "delete") {
      // Archive/deactivate product in Stripe (can't delete, only archive)
      if (stripeProductId) {
        await stripe.products.update(stripeProductId, {
          active: false,
        });
      }

      return new Response(
        JSON.stringify({ success: true }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ error: "Invalid action" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});
