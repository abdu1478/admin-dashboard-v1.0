import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import {useTheme} from "@/components/theme-provider"


function Home() {
  const { theme , setTheme } = useTheme(); 
    const darkMode = theme === 'dark';
    const setDarkMode = (darkMode: boolean) => {
      setTheme(darkMode ? 'dark' : 'light');
    };
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800" 
        : "bg-gradient-to-br from-indigo-50 to-white"
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

      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            darkMode ? "text-indigo-300" : "text-indigo-800"
          }`}>
            Welcome to Admin Page
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}>
            Sign in to get start up
          </p>
        </header>
        
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <Link
            to="/login"
            className={`sign-in px-6 py-3 font-medium rounded-lg transition duration-200 text-center ${
              darkMode 
                ? "bg-indigo-500 hover:bg-indigo-600 text-white" 
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            Sign In
          </Link>
          {/* <Link
            to="/register"
            className={`sign-up px-6 py-3 font-medium rounded-lg transition duration-200 text-center border ${
              darkMode 
                ? "border-indigo-400 text-indigo-400 hover:bg-gray-800" 
                : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            Sign Up
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default Home;