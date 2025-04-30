import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/Helper/supabaseClient";

function Wrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setAuthenticated(!!session);
        setLoading(false);
      }
    );

    // Initial check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return authenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

export default Wrapper;