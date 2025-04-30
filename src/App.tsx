import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Admin/Dashboard";
import Profile from "@/pages/Admin/Profile";
import NotFound from "@/pages/NotFound";
import { Toaster } from "@/components/ui/sonner"
import Wrapper from "@/pages/Wrapper";
import Reset from "@/pages/Reset.tsx"
import UpdatePassword from "@/pages/UpdatePassword.tsx";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
function App() {
    const [email, setResetEmail] = useState<string>("");
  return (
    
      <BrowserRouter>
      <ThemeProvider storageKey="ui-theme">

        <Routes>
          <Route path="/" element={<Home  />} />
          <Route path="/login" element={<Login  />} />
          <Route path="/register" element={<Register  />} />
          <Route path="/dashboard" element={<Wrapper><Dashboard  /></Wrapper>} />
          <Route path="/profile" element={<Wrapper><Profile  /></Wrapper>} />
          <Route path="/reset" element={<Reset setResetEmail={setResetEmail}  />} />
          <Route path="/update-password" element={<UpdatePassword  email={email} />} />
          <Route path="*" element={<NotFound  />} />
        </Routes>
        <Toaster />
      </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
