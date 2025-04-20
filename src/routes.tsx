// routes.tsx
import { RouteObject } from "react-router-dom";
import { lazy, Suspense, ReactNode } from "react";
import { PrivateRoute } from "./auth/PrivateRoute";
import { AuthRoute } from "./auth/AuthRoute"; // Assuming this redirects AWAY from auth pages for logged-in users
import { LoadingSpinner } from "@/components/ui/loading-spinner"; // Assuming you have a loading spinner component

interface SuspenseWrapperProps {
  children: ReactNode;
}

const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => (
  // You could potentially check authLoading here too if needed,
  // but the top-level check in App.tsx combined with Private/AuthRoute
  // is usually sufficient to avoid flicker. Suspense is mainly for lazy loading.
  <Suspense fallback={<LoadingSpinner fullPage />}>
    {children}
  </Suspense>
);

// Lazy-loaded components
const Index = lazy(() => import("./pages/Index"));
const Communities = lazy(() => import("./pages/Communities"));
const Safety = lazy(() => import("./pages/Safety"));
const Health = lazy(() => import("./pages/Health"));
const Rights = lazy(() => import("./pages/Rights"));
const CommunityDetail = lazy(() => import("./pages/CommunityDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Family = lazy(() => import("./pages/Family"));
const Stories = lazy(() => import("./pages/Stories"));
const Login = lazy(() => import("./pages/auth/Login"));
const LostFound = lazy(() => import("./pages/LostFound"));
const ChatbotPage = lazy(() => import("./pages/ChatbotPage"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Profile = lazy(() => import("./pages/Profile"));
const BaitulMaal = lazy(() => import("./pages/BaitulMaal"));
const MentalGPT = lazy(() => import("./pages/MentalGPT"));
const AboutUs = lazy(() => import("./pages/about"));
const Muhafiz = lazy(() => import("./pages/Muhafiz"));


export const routes: RouteObject[] = [
  // Public routes that should redirect if authenticated
  {
    path: "/login",
    element: (
// AuthRoute redirects logged-in users away
      <AuthRoute>
        <SuspenseWrapper>
          <Login />
        </SuspenseWrapper>
      </AuthRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthRoute>
        <SuspenseWrapper>
          <Signup />
        </SuspenseWrapper>
      </AuthRoute>
    ),
  },

  // Protected routes - All these routes now require authentication
  {
    path: "/",
    element: (
      <PrivateRoute>
        <SuspenseWrapper>
          <Index />
        </SuspenseWrapper>
      </PrivateRoute>
    ),
  },
{
    path: "/ChatbotPage",
    element: (
      <PrivateRoute>
        <SuspenseWrapper>
          <ChatbotPage />
        </SuspenseWrapper>
      </PrivateRoute>
    ),
  },
{
    path: "/BaitulMaal",
    element: (
      <PrivateRoute>
        <SuspenseWrapper>
          <BaitulMaal />
        </SuspenseWrapper>
      </PrivateRoute>
    ),
  },
{
    path: "/MentalGPT",
    element: (
      <PrivateRoute>
        <SuspenseWrapper>
          <MentalGPT />
        </SuspenseWrapper>
      </PrivateRoute>
    ),
  },
{
    path: "/Profile",
    // Protected
    element: (
      <PrivateRoute>
        <SuspenseWrapper>
          <Profile />
        </SuspenseWrapper>
      </PrivateRoute>
    ),
  },
  {
    path: "/safety",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <Safety />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/Muhafiz",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <Muhafiz />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/about",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <AboutUs />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/LostFound",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <LostFound />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/communities",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <Communities />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/communities/:id",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <CommunityDetail />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/health",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <Health />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/rights",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <Rights />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/family",
    element: (
        <PrivateRoute>
            <SuspenseWrapper>
                <Family />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },
  {
    path: "/stories",
    element: (
        <PrivateRoute> 
            <SuspenseWrapper>
                <Stories />
            </SuspenseWrapper>
        </PrivateRoute>
    ),
  },


  // 404 catch-all (can remain public or be protected if desired)
   // Keeping 404 public is common, but depends on app logic
  {
    path: "*",
    element: <SuspenseWrapper><NotFound /></SuspenseWrapper>,
  },
];