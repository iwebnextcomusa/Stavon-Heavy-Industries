# Hostinger Deployment & Handoff Guide — Stravon Heavy Industries

This document outlines the deployment instructions and technical handoffs for publishing the Stravon Heavy Industries enterprise website on Hostinger.

---

## 1. Environment & API Integrations

The Stravon website supports fully integrated contact and submission pipelines using **Formspree** and environment-driven variables. 

### A. Formspree Endpoint IDs
Two forms are configured in the codebase:
1. **RFQ (Request for Quote)**: Transmits direct procurement inquiries.
2. **Asset Portfolio Submission**: Allows clients to submit detailed fleets, mining machinery, or cargo rigs.

Both forms securely route submissions to **`assetdesk@stravonheavyindustries.com`**.

To customize the Formspree form endpoints for production, simply create two forms on Formspree pointing to your target email and define the environment variables inside your `.env` file or hosting control panel:

```env
VITE_FORMSPREE_RFQ_ID=your_rfq_form_id
VITE_FORMSPREE_PORTFOLIO_ID=your_portfolio_form_id
```

*If no environment variables are defined, the system gracefully runs in demo transmission mode with fallback notifications.*

---

## 2. Hostinger Hosting Configurations

### A. Build the React SPA
To compile the static production bundle:
1. Run `npm run build` in your local console.
2. This creates a fully minified, optimized, and self-contained static `dist/` directory at the root of the project.

### B. Upload via Hostinger File Manager
1. Log into your **Hostinger hPanel**.
2. Go to **Files** > **File Manager** and enter the `public_html` folder for `stravonheavyindustries.com`.
3. Upload the contents of the compiled `dist/` directory directly into `public_html`.
4. Ensure the `.htaccess` file (defined below) is present in `public_html` to handle the React Router / client-side SPA routing correctly.

### C. SPA Routing `.htaccess` File
Create or append the following rules inside a `.htaccess` file in your `public_html` directory so that Hostinger routes all sub-page requests through `index.html`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 3. DNS, SSL, & Mail Setup

### A. SSL Configuration
In your **Hostinger hPanel**, go to **Advanced** > **SSL** and click **Install SSL** on `stravonheavyindustries.com`. This will set up a lifetime Let's Encrypt SSL certificate automatically and force HTTPS redirection.

### B. Mail setup for `assetdesk@stravonheavyindustries.com`
Ensure that the target email `assetdesk@stravonheavyindustries.com` is configured and active:
1. Go to **Emails** > **Email Accounts** in Hostinger hPanel.
2. Verify that the mailbox is active on the **Business Email** plan.
3. If using external DNS servers (e.g., Cloudflare), confirm that Hostinger's standard MX records are active:
   - `mx1.hostinger.com` (Priority 10)
   - `mx2.hostinger.com` (Priority 20)
