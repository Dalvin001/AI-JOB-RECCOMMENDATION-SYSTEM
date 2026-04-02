import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./components/Profile";
import ProfileForm from "./pages/ProfileForm";

function App() {

  return (

    <Router>

      <div
        className="min-h-screen"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >

        <Navbar />

        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile" element={<Profile />} />
          
          <Route path="/complete-profile" element={<ProfileForm />} />

        </Routes>

      </div>

    </Router>

  );

}

export default App;