/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./components/profile/Profile";
import { AuthProvider } from "./context/AuthContext";
import { NotesProvider } from "./context/NotesContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./components/Dashboard/Dashboard";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import { useState } from "react";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <NotesProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/*"
                  element={
                    <ProtectedRoute>
                      <Layout
                        selectedCategory={selectedCategory}
                        onCategorySelect={setSelectedCategory}
                      >
                        <Routes>
                          <Route
                            path="/"
                            element={
                              <Dashboard selectedCategory={selectedCategory} />
                            }
                          />
                          <Route path="/profile" element={<Profile />} />
                        </Routes>
                      </Layout>
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </NotesProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

const Layout = ({ children, selectedCategory, onCategorySelect }) => {
  return (
    <div className="flex h-screen">
      <Sidebar onCategorySelect={onCategorySelect} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default App;
