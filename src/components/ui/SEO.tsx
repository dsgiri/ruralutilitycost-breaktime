import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  url?: string;
  image?: string;
}

export function SEO({ 
  title = "BreakTime", 
  description = "A lightweight break-time hub with short, farm-related micro-games, quick puzzles, and mini interactive activities for rural users from RuralOpsTools.",
  type = "website",
  url = "https://break.ruralopstools.com",
  image = "https://break.ruralopstools.com/og-image.jpg"
}: SEOProps) {
  const pageTitle = title === "BreakTime" ? "BreakTime - Optimized for search" : `${title} - Optimized for search`;
  const canonicalUrl = url.replace(/\/$/, "");

  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": description,
    "url": canonicalUrl
  };

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="rural, farm, micro-games, puzzle, breaktime, agriculture, utility cost" />
      <meta name="author" content="RuralOpsTools" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
