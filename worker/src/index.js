export default {
  async fetch(request, env) {
    const allowedOrigins = [
      "https://landings.bakersfieldhomesolutions.com",
      "http://landings.bakersfieldhomesolutions.com",
      "http://localhost:5173",
      "http://localhost:3000"
    ];

    const origin = request.headers.get("Origin") || "";
    const isAllowedOrigin = allowedOrigins.includes(origin) || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:");

    const corsHeaders = {
      "Access-Control-Allow-Origin": isAllowedOrigin ? origin : "https://landings.bakersfieldhomesolutions.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    if (!isAllowedOrigin) {
      return jsonResponse(
        {
          success: false,
          error: "Origin not allowed"
        },
        403,
        corsHeaders
      );
    }

    if (request.method !== "POST") {
      return jsonResponse(
        {
          success: false,
          error: "Method not allowed"
        },
        405,
        corsHeaders
      );
    }

    try {
      if (!env.FUB_API_KEY) {
        return jsonResponse(
          {
            success: false,
            error: "Server configuration error"
          },
          500,
          corsHeaders
        );
      }

      const body = await request.json();
      console.log("\n=== INCOMING FORM DATA ===");
      console.log(JSON.stringify(body, null, 2));
      console.log("==========================\n");

      // Verify Cloudflare Turnstile token
      const turnstileResponse = body['cf-turnstile-response'];
      if (!turnstileResponse) {
        return jsonResponse(
          { success: false, error: "Please complete the anti-spam check." },
          400, corsHeaders
        );
      }

      if (!env.TURNSTILE_SECRET_KEY) {
        return jsonResponse(
          { success: false, error: "Server configuration error (Turnstile)" },
          500, corsHeaders
        );
      }

      const turnstileVerify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET_KEY,
          response: turnstileResponse,
          remoteip: request.headers.get("CF-Connecting-IP") || ""
        })
      });

      const turnstileOutcome = await turnstileVerify.json();
      if (!turnstileOutcome.success) {
        console.error("Turnstile verification failed:", turnstileOutcome);
        return jsonResponse(
          { success: false, error: "Anti-spam check failed. Please refresh and try again." },
          400, corsHeaders
        );
      }

      const fullName = clean(body.full_name);
      const email = clean(body.email);
      const phone = clean(body.phone);
      const timeline = clean(body.timeline);
      const sellingSituation = clean(body.selling_situation);
      const address = clean(body.address);

      if (!email && !phone) {
        return jsonResponse(
          {
            success: false,
            error: "Email or phone is required"
          },
          400,
          corsHeaders
        );
      }

      const nameParts = fullName.split(" ").filter(Boolean);
      const firstName = nameParts.shift() || "";
      const lastName = nameParts.join(" ") || "";

      const description = `
New seller lead from Bakersfield Home Solutions landing page.

Property Address: ${address || "Not provided"}

Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Timeline: ${timeline}
Selling Situation: ${sellingSituation}

Form Name: ${clean(body.form_name)}
Page URL: ${clean(body.page_url)}
Page Title: ${clean(body.page_title)}
Referrer: ${clean(body.page_referrer)}

Google Ads / Tracking:
UTM Source: ${clean(body.utm_source)}
UTM Medium: ${clean(body.utm_medium)}
UTM Campaign: ${clean(body.utm_campaign)}
UTM Term: ${clean(body.utm_term)}
UTM Content: ${clean(body.utm_content)}
GCLID: ${clean(body.gclid)}
GBRAID: ${clean(body.gbraid)}
WBRAID: ${clean(body.wbraid)}
FBCLID: ${clean(body.fbclid)}
      `.trim();

      const payload = {
        source: env.FUB_SOURCE || "landings.bakersfieldhomesolutions.com",
        system: env.FUB_SYSTEM || "Bakersfield Landing Page",
        type: "Seller Inquiry",
        message: `New seller lead. Timeline: ${timeline || "Not provided"}. Situation: ${sellingSituation || "Not provided"}.`,
        description,

        person: {
          firstName,
          lastName,
          emails: email ? [{ value: email }] : [],
          phones: phone ? [{ value: phone }] : [],
          tags: [
            "Website Lead",
            "Google Ads Lead",
            "Seller Lead",
            "Bakersfield Landing Page",
            timeline ? `Timeline: ${timeline}` : "",
            sellingSituation ? `Situation: ${sellingSituation}` : ""
          ].filter(Boolean)
        },

        ...(address && {
          property: {
            address: address
          }
        }),

        campaign: {
          source: clean(body.utm_source) || "google",
          medium: clean(body.utm_medium) || "cpc",
          campaign: clean(body.utm_campaign),
          term: clean(body.utm_term),
          content: clean(body.utm_content)
        },

        pageUrl: clean(body.page_url),
        pageTitle: clean(body.page_title),
        pageReferrer: clean(body.page_referrer)
      };

      const authString = btoa(`${env.FUB_API_KEY}:`);

      const fubResponse = await fetch("https://api.followupboss.com/v1/events", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${authString}`,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const responseText = await fubResponse.text();

      if (!fubResponse.ok) {
        console.error("Follow Up Boss rejected the request", {
          status: fubResponse.status,
          response: responseText
        });

        return jsonResponse(
          {
            success: false,
            error: "Follow Up Boss rejected the lead",
            status: fubResponse.status
          },
          502,
          corsHeaders
        );
      }
      
      console.log("\n=== FUB SUCCESS RESPONSE ===");
      console.log("Status:", fubResponse.status);
      console.log("Response:", responseText);
      console.log("============================\n");

      return jsonResponse(
        {
          success: true,
          status: fubResponse.status
        },
        200,
        corsHeaders
      );

    } catch (error) {
      console.error("Worker error", error);

      return jsonResponse(
        {
          success: false,
          error: "Server error"
        },
        500,
        corsHeaders
      );
    }
  }
};

function clean(value) {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      ...headers,
      "Content-Type": "application/json"
    }
  });
}
