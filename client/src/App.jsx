import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase-config";
import LoginPage from "./views/LoginPage";
import SignupPage from "./views/SignupPage";
import DuePage from "./views/DuePage";
import AddedPage from "./views/AddedPage";
import BrowsePage from "./views/BrowsePage";
import NavBar from "./components/NavBar";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      {user ? <NavBar /> : null}
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/due" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/due" /> : <SignupPage />}
        />
        <Route
          path="/due"
          element={user ? <DuePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/added"
          element={user ? <AddedPage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/browse"
          element={user ? <BrowsePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/due" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
