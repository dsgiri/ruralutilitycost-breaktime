import { useParams } from "react-router-dom";
import { SEO } from "../components/ui/SEO";
import { NotFound } from "./NotFound";
import { ContactForm } from "../components/ui/ContactForm";

export function SharedPage() {
  const { pageName } = useParams<{ pageName: string }>();
  
  const validPages = ['legal', 'privacy', 'terms', 'disclaimer', 'contact'];
  if (pageName && !validPages.includes(pageName.toLowerCase())) {
    return <NotFound />;
  }

  // Default to Information if no page name is provided, or capitalize it
  const title = pageName ? pageName.charAt(0).toUpperCase() + pageName.slice(1) : 'Information';

  return (
    <div className="max-w-3xl mx-auto space-y-8 min-h-[50vh]">
      <SEO title={title} description={`${title} | Legal and Information for BreakTime hub at RuralOpsTools.`} />
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 border border-stone-200 dark:border-stone-800 transition-colors">
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100 mb-6">{title}</h1>
        
        <div className="prose prose-stone dark:prose-invert max-w-none text-stone-600 dark:text-stone-300 space-y-6 text-lg">
          <p>
            BreakTime is part of the <strong>RuralOpsTools</strong> ecosystem. This subdomain offers short farm-themed micro-games and quick interactive breaks for users in rural and agricultural settings.
          </p>
          <p>
            The goal is to make short breaks more engaging without disrupting the serious tools in the master ecosystem.
          </p>
          
          {title === 'Legal' || title === 'Disclaimer' || title === 'Terms' ? (
            <div className="mt-8 p-6 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
              <h2 className="text-xl font-bold mb-3">Important Notice</h2>
              <p>
                The micro-games on this platform are for entertainment and light educational use only. They <strong>do not replace</strong> formal training, safety procedures, supervision, or operational judgment. Any scores, streaks, or progress indicators are purely for engagement.
              </p>
            </div>
          ) : null}

          {title === 'Contact' ? (
            <ContactForm />
          ) : (
            <div className="mt-12 pt-8 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-base">
              <span className="text-stone-500 dark:text-stone-400">Source of truth maintained at ruralopstools.com</span>
              <a href="#" className="font-bold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300">Return to Master Site &rarr;</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
