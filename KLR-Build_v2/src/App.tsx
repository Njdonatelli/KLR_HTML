import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import { initAnalytics, trackPageView } from "@/hooks/useAnalytics";

/**
 * The marketing home page is the critical path and stays in the entry chunk.
 * Everything else is split out — the auth pages in particular drag in the
 * Supabase client, which no visitor to the marketing site should be paying to
 * download.
 */
const ProjectsPage = lazy(() => import("./pages/Projects"));
const JournalPage = lazy(() => import("./pages/Journal"));
const ArticlePage = lazy(() => import("./pages/Article"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const OAuthConsent = lazy(() => import("./pages/OAuthConsent"));

const queryClient = new QueryClient();

/**
 * Reports a GA4 page_view per client-side navigation. The gtag config sets
 * send_page_view:false so this is the only source of views — no double counts.
 */
const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`);
  }, [location.pathname, location.search]);

  return null;
};

/** Height-holding placeholder so a lazy route swap does not collapse layout. */
const RouteFallback = () => (
  <div className="min-h-screen" role="status" aria-live="polite" aria-label="Loading" />
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* First focusable element on every route; target is <main id="content">. */}
        <a href="#content" className="skip-link">
          Skip to main content
        </a>
        <RouteAnalytics />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/:slug" element={<ArticlePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
