import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/Helper/supabaseClient";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import axios from "axios";

interface userData {
  _id: string;
  email: string;
  createdAt?: Date;
  last_sign_in?: Date;
  role?: string;
}


function Login () {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { theme , setTheme } = useTheme(); 
  const darkMode = theme === 'dark';
  const setDarkMode = (darkMode: boolean) => {
    setTheme(darkMode ? 'dark' : 'light');
  };
  const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showError, setShowError] = useState<boolean>(false);
    const navigate = useNavigate()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form data
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      toast.error("Please fill all fields")
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        setIsLoading(false);
        return;
    }
    if (formData.password.length < 6) {
        toast.error("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
        }
    // Call your login function here
    try {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });
        if (error) {
            toast.error("Login failed. Please check your credentials.");
            setError(error.message);
            return;
        }
        if (data?.user) {
          console.log("User data:", data.user);
          try {
            const { data: userData } = await supabase.auth.getUser();
            
            if (userData.user) {
              const users_data = {
                id: userData.user.id,
                email: userData.user.email,
                createdAt: userData.user.created_at,
                last_sign_in: userData.user.last_sign_in_at,
                role: userData.user.role
              };

              // Send to your backend API endpoint
              await axios.post('http://localhost:5000/api/users', users_data);
              
              toast.success("Login successful! Redirecting to dashboard...");
              setFormData({ email: "", password: "" });
              
              setTimeout(() => {
                navigate("/dashboard", { replace: true });
              }, 500);
            }
          } catch (error) {
            console.error('Error saving user data:', error);
            toast.error('Failed to save user data');
          }
        }
    } catch (error: any) {
          toast.error(`An error occurred: ${error.message}`);
        }finally {
            setIsLoading(false);
        }
      };
  useEffect(() => {
    if(error) {
      setShowError(true);
      const timer = setTimeout(()=> {
        setShowError(false);
        setError(null);
      }, 2000);
      return ()=> clearTimeout(timer);
    }
  }, [error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 ${
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
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md max-sm:mx-4">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                aria-invalid={!!error}
                aria-describedby="email-error"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                  dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
              
            </div>

            <div>
          <label 
            id="password-label"
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              aria-labelledby="password-label"
              arial-invalid={!!error}
              arial-describedby="password-error"
              aria-required="true"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                dark:bg-gray-700 dark:text-white pr-10" // Added pr-10 for padding
              value={formData.password}
              onChange={handleChange}
              required
            />
            {showError && error && (
              <p id="error" className="text-red-600 dark:text-red-400 mt-1">
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"

                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded 
                    dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to={"/reset"} className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
                  Forgot password?
                </Link>
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
                    Loading...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
              {/* <div className="flex items-center justify-center gap-2 mt-4">
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Don't have an account? 
                </p>
                <Link 
                  to="/register" 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Sign Up
                </Link>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;