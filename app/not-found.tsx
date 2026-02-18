import { getLocale } from 'next-intl/server';
import { redirect } from 'next/navigation';

// This is the root-level not-found handler.
// Since our routing is centered around [locale], 
// we'll try to redirect users to a localized 404 if possible.

export default async function NotFound() {
  const locale = await getLocale();
  
  // If we can determine a locale, we could theoretically redirect to /[locale]/404
  // but for a simple root handler, we just render a minimal valid UI 
  // that will be wrapped by the root layout.
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-display font-bold text-emerald-400 mb-4">404</h1>
      <p className="text-ivory/60 mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <a href={`/${locale}/dashboard`} className="px-6 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all font-accent text-sm">
        Return to Dashboard
      </a>
    </div>
  );
}
