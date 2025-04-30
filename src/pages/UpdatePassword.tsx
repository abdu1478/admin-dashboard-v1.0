import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/Helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/components/theme-provider";

interface Props {
  email: string;
}

const UpdatePassword = ({ email }: Props) => {
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigate = useNavigate();
    const { theme , setTheme } = useTheme(); 
    const darkMode = theme === 'dark';
    const setDarkMode = (darkMode: boolean) => {
        setTheme(darkMode ? 'dark' : 'light');
    };






        const handleUpdatePassword = async (e: React.FormEvent) => {
            e.preventDefault();
            setIsLoading(true);
            if (password.length < 6) {
                toast.error("Password must be at least 6 characters long");
                setIsLoading(false);
                return;
              }
              if (password !== confirmPassword) {
                toast.error("Passwords do not match");
                setIsLoading(false);
                return;
              }
        
            try {
            
                const { data, error } = await supabase.auth.updateUser({
                    email: email,
                    password: password,
                  })
                if (error) throw error;
    
                if (error) throw error;
                // sessionStorage.removeItem("resetEmail");
                toast.success("Password updated! Redirecting...");
        } catch (error: any) {
            toast.error(`Update failed: ${error.message}`);
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
            setTimeout(() => navigate("/login", { replace: true }), 2000);
            }
        };
  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 items-center sm:px-6 lg:px-8 transition-colors duration-300 ${
      darkMode ? "bg-gray-900" : "bg-gray-50"
    }`}>
      <Button 
        variant="ghost" 
        size="icon"
        className="absolute top-4 right-4 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-gray-300" />
        ) : (
          <Moon className="h-5 w-5 text-gray-600" />
        )}
      </Button>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className={`mt-6 text-center text-3xl font-extrabold ${
          darkMode ? "text-white" : "text-gray-900"
        }`}>
          Update Your Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${darkMode ? "bg-gray-800" : "bg-white"} py-8 px-4 shadow sm:rounded-lg sm:px-10`}>
          <form className="space-y-6" onSubmit={handleUpdatePassword}>
            <div>
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                New Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword.password ? "text" : "password"}
                  id="password"
                  name="password"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword.password ? "Hide password" : "Show password"}
                >
                  {showPassword.password ? (
                    <EyeOff className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                  ) : (
                    <Eye className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium ${
                  darkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Confirm Password
              </label>
              <div className="relative mt-1">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    darkMode 
                      ? "bg-gray-700 border-gray-600 text-white" 
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium transition-colors ${
                  isLoading 
                    ? "bg-indigo-400 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700"
                } ${
                  darkMode 
                    ? "text-white focus:ring-indigo-500" 
                    : "text-white focus:ring-indigo-500"
                } focus:outline-none focus:ring-2 focus:ring-offset-2`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;