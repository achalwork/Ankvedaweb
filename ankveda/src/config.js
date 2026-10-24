// Price shown in the UI. The REAL amount is fixed on the server (application.properties: app.price-paise=9900) — keep both at 99.
export const PRICE = 99;

// ⚠️ Replace these with your real details before going live (Razorpay also checks that the site shows them).
export const CONTACT = {
  business: 'AnkVeda',
  email: 'support@yourdomain.com',
  phone: '+91 98XXXXXXXX',        // shown on the Contact page
  whatsapp: '9198XXXXXXXX',        // digits only, with country code (for the WhatsApp button)
  address: '',                      // optional postal address; leave '' to hide
  hours: { mr: 'सोम–शनि, सकाळी १० ते सायं ७', en: 'Mon–Sat, 10 am – 7 pm IST' },
  updated: { mr: '२४ ऑक्टोबर २०२६', en: '24 October 2026' },
};