import { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";


const Profile = () => {
  const { theme , setTheme } = useTheme(); 
  const darkMode = theme === 'dark';
  const setDarkMode = (darkMode: boolean) => {
    setTheme(darkMode ? 'dark' : 'light');
  };
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-100"} py-10 px-4 sm:px-6 lg:px-8`}>
      <div className={`max-w-3xl mx-auto ${darkMode ? "bg-gray-800" : "bg-white"} p-8 rounded-lg shadow-md`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
            My Profile
          </h2>
          <Button 
            variant="ghost"
            className={darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"}
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-gray-300" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <div className={`w-24 h-24 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-300"} flex items-center justify-center text-xl text-white font-bold`}>
            {formData.name.charAt(0)}
          </div>
          <p className={darkMode ? "text-gray-300" : "text-gray-700"}>
            {formData.email}
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="name" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode 
                  ? "bg-gray-700 border-gray-600 text-white" 
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className={`font-semibold py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                darkMode 
                  ? "bg-indigo-600 text-white hover:bg-indigo-700" 
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Save Changes
            </button>
          </div>
        </form>

        <div className={`mt-6 text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
          <Link 
            to="/dashboard" 
            className={`hover:underline ${
              darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500"
            }`}
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;