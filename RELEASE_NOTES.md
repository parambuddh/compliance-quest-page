# ComplianceVista Release Notes & Handoff Instructions

**Project**: ComplianceVista Sales Page  
**Build Date**: 2026-04-13  
**Audience**: Sarang (Hosting/Deployment)

## 1. Deployment Package Contents
The `dist/` folder contains the final production-ready static assets. These should be uploaded to the Bluehost web root (public_html).

### Essential Hosting Files (included in bundle):
- **.htaccess**: Configured for React SPA fallback, forcing HTTPS, and redirecting `www` to Root.
- **robots.txt**: Production SEO configuration.
- **sitemap.xml**: Final sitemap pointing to `https://compliancevista.com`.
- **favicon.ico / .png / .webp**: Branded favicons.

## 2. Environment Dependencies
- **PHP Version**: 7.4 or higher recommended.
- **Mailer Configuration**:
    - Endpoint: `/api/contact.php`
    - Recipient (Primary): `parambuddh26@gmail.com`
    - CC Recipient: `gajeramilan518@gmail.com`
    - Current Setup: Integrated with Gmail SMTP (Gmail account: `zeon6080@gmail.com`).

## 3. Public Routes Inventory
All navigation is handled via React Router. The following hash-based routes are priority for the one-page scroll:
- `/` (Home)
- `/#overview` (The Challenge)
- `/#features` (Enterprise Features)
- `/#benefits` (Key Benefits)
- `/#use-cases` (Use Cases)
- `/#contact` (Contact/Demo)
- `/terms-of-use` (Legal Page)
- `/privacy-policy` (Legal Page)

## 4. QA Sign-off
- [x] Home page, main navigation, and footer links all work.
- [x] All public routes load directly and survive browser refresh.
- [x] Images and fonts load correctly from production-style build.
- [x] React 404 page correctly renders on unknown routes.
- [x] sitemap.xml and robots.txt use final production domain.
- [x] No visible console errors on major landing areas.
- [x] Layout is responsive at mobile and desktop breakpoints.

## 5. Post-Deployment Smoke Test
After uploading to Bluehost, please confirm:
1. Navigate directly to `https://compliancevista.com/privacy-policy` to ensure `.htaccess` is correctly routing to the internal page.
2. Refresh an internal page to verify the SPA fallback.
3. Test a fake route like `https://compliancevista.com/asdf` to verify the custom 404 page.
