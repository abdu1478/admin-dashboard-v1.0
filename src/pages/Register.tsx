import { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/Helper/supabaseClient";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import  {useTheme} from "@/components/theme-provider";

interface RegisterForm {
    name: string;
    email: string;
    password: string;
  }


function Register () {
  const { theme , setTheme } = useTheme(); 
  const darkMode = theme === 'dark';
  const setDarkMode = (darkMode: boolean) => {
    setTheme(darkMode ? 'dark' : 'light');
  };

  const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }
    if (!EMAIL_REGEX.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { name: formData.name },
          emailRedirectTo: window.location.origin + "/login"
        }
      });

      if (error) throw error;

      // toast.success("Check your email for confirmation link!");
      toast.success("Account created successfully! ");
      setFormData({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } catch (error: any) {
      setError(error.message.includes("already registered") 
        ? "Email already registered" 
        : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
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
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create a new account
          </h1>
        </div>
  
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md max-sm:mx-4">
          <section 
            className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10"
            aria-label="Registration form section"
          >
            <form 
              className="space-y-6" 
              onSubmit={handleSubmit}
              aria-label="Registration form"
            >
              {/* Name Input */}
              <div>
                <label 
                  id="name-label"
                  htmlFor="name" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  aria-labelledby="name-label"
                  aria-required="true"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
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
              aria-required="true"
              className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 
                dark:bg-gray-700 dark:text-white pr-10" // Added pr-10 for padding
              value={formData.password}
              onChange={handleChange}
              required
            />
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
        {error && (
          <div className="mb-4 text-red-600 dark:text-red-400 w-full text-center">
            {error}
          </div>
        )}

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
                  "Sign Up"
                )}
              </button>
  
              <div className="flex items-center justify-center gap-2 mt-4">
                <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                  Already have an account? 
                </p>
                <Link 
                  to="/login" 
                  aria-label="Navigate to login page"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                  Sign In
                </Link>
              </div>
            </div>
            </form>
          </section>
        </div>
      </div>
    );
  };

export default Register;