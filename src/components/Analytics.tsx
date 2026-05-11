// ============================================================
// Analytics.tsx — Scripts analytics (GA4 via GTM + Clarity)
//
// Chargement conditionnel :
//   - En production uniquement (pas de pollution en dev)
//   - GTM contient GA4, Clarity, et tout autre tag
//
// RGPD : les scripts sont chargés après consentement (géré par
//   le composant BanniereConsentement via window.dataLayer.push)
//
// Variables d'environnement requises :
//   NEXT_PUBLIC_GTM_ID    → ex: GTM-XXXXXXX
//   NEXT_PUBLIC_GA_ID     → ex: G-XXXXXXXXXX (si GTM non utilisé)
//   NEXT_PUBLIC_CLARITY_ID → ex: xxxxxxxxxx
// ============================================================

import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

// Composant GTM — snippet officiel Google Tag Manager
function GTMHead() {
  if (!GTM_ID) return null;
  return (
    <Script
      id="gtm-head"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
      }}
    />
  );
}

// Composant GA4 direct (fallback si pas de GTM)
function GA4Direct() {
  if (!GA_ID || GTM_ID) return null; // GTM a priorité
  return (
    <>
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="ga4-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  page_path: window.location.pathname,
  anonymize_ip: true,
});`,
        }}
      />
    </>
  );
}

// Composant Microsoft Clarity
function ClarityScript() {
  if (!CLARITY_ID) return null;
  return (
    <Script
      id="ms-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_ID}");`,
      }}
    />
  );
}

export function GTMBodyTag() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}

// Helper : pusher un event GA4 depuis n'importe quel composant client
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.dataLayer) {
    w.dataLayer.push({ event: eventName, ...params });
  } else if (w.gtag) {
    w.gtag("event", eventName, params);
  }
}

// Export principal : à insérer dans <head> via layout.tsx
export default function Analytics() {
  // Ne pas charger les scripts analytics en local/dev
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <GTMHead />
      <GA4Direct />
      <ClarityScript />
    </>
  );
}
