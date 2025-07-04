import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StrictMode, useEffect } from "react";
import { LoadingProvider } from "@/components/LoadingProvider";
import { AuthProvider } from "@/components/AuthProvider";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AITools from "./pages/AITools";
import UseCases from "./pages/UseCases";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Footer from "@/components/Footer";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const lastReset = localStorage.getItem("lastCreditReset");
    if (lastReset !== today) {
      localStorage.setItem("credits", "0");
      localStorage.setItem("lastCreditReset", today);
    }
  }, []);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <TooltipPrimitive.Provider>
            <TooltipProvider>
              <AuthProvider>
                <LoadingProvider>
                  <div className="min-h-screen">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/ai-tools" element={<AITools />} />
                      <Route path="/use-cases" element={<UseCases />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/privacy" element={<Privacy />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                    <Toaster />
                    <Sonner />
                    <Footer />
                  </div>
                </LoadingProvider>
              </AuthProvider>
            </TooltipProvider>
          </TooltipPrimitive.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
