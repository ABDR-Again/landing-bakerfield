# Bakersfield Follow Up Boss Cloudflare Worker

This Worker receives landing page form submissions and sends them to Follow Up Boss.

## Local setup

Install dependencies:

npm install

Run locally:

npm run dev

## Required secret

Never commit the Follow Up Boss API key.

Add the secret to Cloudflare:

npx wrangler secret put FUB_API_KEY

Paste the regenerated Follow Up Boss API key when prompted.

## Deploy

npm run deploy

## API endpoint

POST / 

or the deployed Cloudflare Worker URL.

Example frontend endpoint:

https://bakersfield-followupboss-worker.YOUR_SUBDOMAIN.workers.dev

## Expected form payload

{
  "full_name": "Test Lead",
  "phone": "1234567890",
  "email": "test@example.com",
  "timeline": "ASAP",
  "selling_situation": "Inherited property",
  "form_name": "Bakersfield Seller Landing Page Form",
  "page_url": "https://landings.bakersfieldhomesolutions.com/",
  "page_title": "Bakersfield Home Solutions",
  "page_referrer": "",
  "utm_source": "google",
  "utm_medium": "cpc",
  "utm_campaign": "test_campaign",
  "utm_term": "sell my house bakersfield",
  "utm_content": "test_ad",
  "gclid": "test-gclid",
  "gbraid": "",
  "wbraid": "",
  "fbclid": ""
}
