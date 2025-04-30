import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface User {
  login: {
    uuid: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  location: {
    city: string;
    country: string;
  };
  picture: {
    medium: string;
  };
  status?: string; // Optional since it's not in the API response
}

interface Props {
  darkMode: boolean;
}

function UserTable({darkMode}: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // Check cache first
        const cachedData = localStorage.getItem('cachedUsers');
        const cacheTime = localStorage.getItem('usersCacheTime');
        
        if (cachedData && cacheTime && Date.now() - Number(cacheTime) < 300000) { // 5 minutes cache 
          setUsers(JSON.parse(cachedData));
          return;
        }
  
        // Proceed with API call
        const response = await axios.get("https://randomuser.me/api/?results=10");
        
        const usersWithStatus = response.data.results.map((user: any) => ({
          ...user,
          status: Math.random() > 0.5 ? "active" : "inactive"
        }));
  
        // Update cache
        localStorage.setItem('cachedUsers', JSON.stringify(usersWithStatus));
        localStorage.setItem('usersCacheTime', Date.now().toString());
  
        setUsers(usersWithStatus);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);


      const handleDeleteUser = (uuid: string) => {
        console.log(`Deleting user with UUID: ${uuid}`);
        setUsers(users.filter(user => user.login.uuid !== uuid));
      };

      return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow animate-fade-in">
          {error && (
            <div className="p-4 text-red-500 dark:text-red-400">{error}</div>
          )}
      
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Team Members
            </h2>
          </div>
      
          {loading ? (
            <div className="p-4 text-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-indigo-600 mx-auto"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              <div className="p-4">
                <Input
                  placeholder="Search User..."
                  className={`${
                    darkMode 
                      ? "bg-gray-800 text-white border-gray-700" 
                      : "bg-gray-100 text-gray-900 border-gray-300"
                  } w-full`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
      
              {users
                .filter(user => {
                  const searchTerm = search.toLowerCase();
                  return (
                    user.name.first.toLowerCase().includes(searchTerm) ||
                    user.name.last.toLowerCase().includes(searchTerm) ||
                    user.email.toLowerCase().includes(searchTerm)
                  );
                })
                .map(user => (
                  <div
                    key={user.login.uuid}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <img
                        src={user.picture.medium}
                        alt={`${user.name.first} ${user.name.last}`}
                        className="w-10 h-10 rounded-full border-2 border-indigo-100 dark:border-indigo-900"
                      />
                      <div className="space-y-1">
                        <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                          {user.name.first} {user.name.last}
                        </h3>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">
                          {user.email}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.location.city}, {user.location.country}
                        </p>
                      </div>
                    </div>
                    
                    <button 
                      className="p-2 rounded-full hover:bg-indigo-100/50 dark:hover:bg-indigo-900/20 transition-colors"
                      onClick={() => handleDeleteUser(user.login.uuid)}
                      aria-label="Delete user"
                    >
                      <Trash2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer" />
                    </button>
                  </div>
                ))}
              
              {!loading && users.length === 0 && (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  No users found
                </div>
              )}
            </div>
          )}
        </div>
      );
}

export default UserTable
