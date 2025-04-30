import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from  "@/components/theme-provider"



function NotFound() {
  const { theme , setTheme } = useTheme(); 
  const darkMode = theme === 'dark';
  const setDarkMode = (darkMode: boolean) => {
    setTheme(darkMode ? 'dark' : 'light');
  };
  return (
    <div className={`min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 transition-colors duration-300 ${
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

      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="animate-bounce">
          <h1 className={`text-8xl sm:text-7xl font-bold ${
            darkMode ? "text-indigo-400" : "text-indigo-600"
          }`}>
            404
          </h1>
          <p className={`mt-4 text-3xl sm:text-4xl font-semibold ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            Page Not Found
          </p>
        </div>
        
        <p className={`text-lg ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}>
          Oops! The page you're looking for has vanished into the digital void.
        </p>
        
        <div className="mt-8">
          <Link
            to="/"
            className={`inline-flex items-center px-6 py-3 text-base font-medium rounded-md transition-colors duration-200 ${
              darkMode 
                ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
          >
            Return to Home
          </Link>
        </div>

        <div className={`mt-12 text-5xl ${darkMode ? "text-gray-400" : "text-gray-500"}`} role="img" aria-label="Ghost emoji">
          👻
        </div>
      </div>
    </div>
  );
}

export default NotFound;