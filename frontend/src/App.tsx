import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AdminAuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import AchievementsPage from "./pages/AchievementsPage";
import GalleryPage from "./pages/GalleryPage";
import HomePage from "./pages/HomePage";
import NewsDetailPage from "./pages/NewsDetailPage";
import NewsPage from "./pages/NewsPage";
import NotFound from "./pages/NotFound";
import VisionPage from "./pages/VisionPage";

// Admin Pages
import { AdminOnlyRoute, AdminRoute } from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import CreateNews from "./pages/admin/CreateNews";
import CreatePhoto from "./pages/admin/CreatePhoto";
import CreateVideo from "./pages/admin/CreateVideo";
import Dashboard from "./pages/admin/Dashboard";
import EditNews from "./pages/admin/EditNews";
import EditPhoto from "./pages/admin/EditPhoto";
import EditVideo from "./pages/admin/EditVideo";
import NewsList from "./pages/admin/NewsList";
import PhotosList from "./pages/admin/PhotosList";
import UsersList from "./pages/admin/UsersList";
import VideosList from "./pages/admin/VideosList";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/vision" element={<VisionPage />} />
              <Route path="/achievements" element={<AchievementsPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/gallery" element={<GalleryPage />} />

              {/* Admin Routes */}
              <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
              <Route path="/admin/login" element={<AdminLogin />} />

              <Route
                element={
                  <AdminRoute>
                    <AdminLayout />
                  </AdminRoute>
                }
              >
                <Route path="/admin/dashboard" element={<Dashboard />} />

                {/* News Routes */}
                <Route path="/admin/news" element={<NewsList />} />
                <Route path="/admin/news/create" element={<CreateNews />} />
                <Route path="/admin/news/:id" element={<EditNews />} />

                {/* Photo Routes */}
                <Route path="/admin/photos" element={<PhotosList />} />
                <Route path="/admin/photos/create" element={<CreatePhoto />} />
                <Route path="/admin/photos/:id" element={<EditPhoto />} />

                {/* Video Routes */}
                <Route path="/admin/videos" element={<VideosList />} />
                <Route path="/admin/videos/create" element={<CreateVideo />} />
                <Route path="/admin/videos/:id" element={<EditVideo />} />

                {/* Users Routes - Admin Only */}
                <Route
                  path="/admin/users"
                  element={
                    <AdminOnlyRoute>
                      <UsersList />
                    </AdminOnlyRoute>
                  }
                />
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
