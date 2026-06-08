import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
}

export function SEO({ 
  title = "BreakTime | Rural Utility Cost", 
  description = "A lightweight break-time hub with short, farm-related micro-games, quick puzzles, and mini interactive activities for rural users from Rural Utility Cost.",
  type = "website"
}: SEOProps) {
  const pageTitle = title === "BreakTime | Rural Utility Cost" ? title : `${title} - BreakTime | Rural Utility Cost`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
    </Helmet>
  );
}
