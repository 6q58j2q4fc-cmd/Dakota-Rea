import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import Speaking from "./pages/Speaking";
import Consulting from "./pages/Consulting";
import Books from "./pages/Books";
import Foundation from "./pages/Foundation";
import Contact from "./pages/Contact";
import Press from "./pages/Press";
import AINews from "./pages/AINews";
import Orders from "./pages/Orders";
import Blog from "./pages/Blog";
import MemberPortal from "./pages/MemberPortal";
import AdminDashboard from "./pages/AdminDashboard";
import AlfredChat from "./components/AlfredChat";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/speaking" component={Speaking} />
      <Route path="/consulting" component={Consulting} />
      <Route path="/books" component={Books} />
      <Route path="/foundation" component={Foundation} />
      <Route path="/contact" component={Contact} />
      <Route path="/press" component={Press} />
      <Route path="/ai-news" component={AINews} />
      <Route path="/orders" component={Orders} />
      <Route path="/blog" component={Blog} />
      <Route path="/members" component={MemberPortal} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/*
  DESIGN PHILOSOPHY: Timeless Editorial Luxury
  Inspired by Kinfolk, Cereal Magazine - curated minimalism with photographic storytelling
  
  Colors:
  - Primary: Warm Charcoal (#2D2926) - sophisticated, timeless
  - Secondary: Cream (#FAF7F2) - warmth, editorial elegance
  - Accent: Terracotta (#C4785A) - worldly, warm
  - Highlight: Sage (#8B9D83) - growth, philanthropy
  
  Typography:
  - Display: Libre Baskerville - editorial elegance
  - Body: Lora - readable warm serif
  - Accent: Montserrat - modern sans-serif for navigation
*/

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
          <AlfredChat />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
