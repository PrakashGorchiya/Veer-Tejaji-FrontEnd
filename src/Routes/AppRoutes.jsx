import { Routes, Route } from "react-router-dom";

import Home from "../Pages/Home";
import About from "../Pages/About";
import Activities from "../Pages/Activities";
import Committee from "../Pages/Committee";
import Gallery from "../Pages/Gallery";
import Donate from "../Pages/Donate";
import Contact from "../Pages/Contact";

// Admin Pages
import AdminLogin from "../Pages/Admin/AdminLogin";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import ManageCommittee from "../Pages/Admin/ManageCommittee";
import ManageGallery from "../Pages/Admin/ManageGallery";
import ManageVolunteers from "../Pages/Admin/ManageVolunteers";
import ManageDonors from "../Pages/Admin/ManageDonors";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ProtectedRoute from "../Components/Common/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/committee" element={<Committee />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="/contact" element={<Contact />} />
      
      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/committee"
        element={
          <ProtectedRoute>
            <ManageCommittee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/gallery"
        element={
          <ProtectedRoute>
            <ManageGallery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/volunteers"
        element={
          <ProtectedRoute>
            <ManageVolunteers />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/donors"
        element={
          <ProtectedRoute>
            <ManageDonors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <ManageUsers />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
