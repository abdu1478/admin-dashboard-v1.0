import { 
    Settings, Bell, LogOut, User, Menu, Sun, Moon, X 
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { 
    DropdownMenu, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
  } from "@/components/ui/dropdown-menu";
  import { toast } from "sonner";
  import { useNavigate } from "react-router-dom";
  import { supabase } from "../../Helper/supabaseClient";
  import { notifications } from "@/data/Notification"
import { useState } from "react";
  
  interface HeaderProps {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    toggleRef: React.RefObject<HTMLButtonElement | null>;
    sidebarRef: React.RefObject<HTMLElement | null>;
  }
  
  
  const Header: React.FC<HeaderProps> = ({
    darkMode,
    setDarkMode,
    sidebarOpen,
    setSidebarOpen,
    toggleRef
  }) => {
    const navigate = useNavigate();
  
    const handleSidebar = () => {
      window.scrollTo({
        top: -1,
        behavior: 'smooth'
      })
      setTimeout(() => {
        setSidebarOpen(!sidebarOpen);
      },400)
    };
    const [notificationState, setNotificationState] = useState(notifications.map(n => ({...n, read: false})))
  
    return (
      <header className={`z-10 ${darkMode ? "bg-gray-900" : "bg-white"} shadow-sm sticky top-0 ${darkMode ? "text-white" : "text-gray-900"}`}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Button
              ref={toggleRef}
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-200"
              onClick={handleSidebar}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
  
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-200"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-gray-200 focus:ring-2 focus:ring-primary/50"
              >
                {/* Responsive icon size */}
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                
                {/* Notification badge - hidden on smallest screens */}
                {
                  notificationState.filter(n => !n.read).length > 0 && (
                    <span className="absolute top-1 right-1 sm:top-1.5 sm:right-1.5 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full" />
                  )
                }
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className={`w-[300px] max-w-[90vw] ${
                darkMode 
                  ? "bg-gray-900 border-gray-700 text-white" 
                  : "bg-white text-gray-900"
              } transition cursor-pointer rounded-lg shadow-xl`}
            >
              {/* Responsive header */}
              <DropdownMenuLabel className="px-4 py-3 text-sm sm:text-base">
                Notifications
                <span className="ml-2 text-xs text-muted-foreground">{notificationState.length}</span>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator className={darkMode ? "bg-gray-700" : "bg-gray-200"} />

              {/* Scrollable content area */}
              <div className="max-h-[60vh] overflow-y-auto p-2 space-y-2 bg-accent">
                {/* Notification items */}
                {notificationState.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-md text-sm ${
                      darkMode 
                        ? "hover:bg-gray-800" 
                        : "hover:bg-gray-100"
                    }
                     ${notification.read
                      ? "opacity-50"        
                      : `${darkMode ? "bg-gray-600 text-white" : "bg-indigo-200 text-gray-900"}`}
                       transition-colors`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-1">
                        {notification.icon}
                      </span>
                      <div>
                        <p className="font-medium line-clamp-1">
                          {notification.title}
                        </p>
                        <p className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        } mt-1 line-clamp-2`}>
                          {notification.description}
                        </p>
                        <time className="text-xs text-muted-foreground mt-1 block">
                          {new Date(notification.timestamp).toLocaleDateString('en-US', {
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })}
                        </time>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <DropdownMenuSeparator className={darkMode ? "bg-gray-700" : "bg-gray-200"} />
              <div className="p-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => {setNotificationState(prev => 
                      prev.map(notification => ({
                        ...notification,
                        read: true
                      })))
                    console.log("clicked")}
                    }
                >
                  Mark all as read
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className={`hover:bg-gray-100 ${darkMode ? "bg-gray-900" : "bg-white"}`}
                >
                  <User className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} hover:shadow-md transition cursor-pointer`} />
                </Button>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent 
                align="end"
                className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white text-gray-900"}  transition cursor-pointer`}
              >
                <DropdownMenuItem 
                  className={`${darkMode ? "bg-gray-900 text-white" : "bg-white  text-gray-900"} transition cursor-pointer`}
                  onClick={() => navigate("/profile")}
                >
                  <User />
                  <span className="ml-2">Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                className="hover:bg-gray-100"
                onClick={() => {
                  supabase.auth.signOut()
                    .then(() => {
                      toast.success("Logged out successfully");
                      // Use replace navigation to prevent back button issues
                      navigate("/", { replace: true });
                    })
                    .catch((error: any) => {
                      toast.error("Logout failed: " + error.message);
                    });
                }}
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span>Logout</span>
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-gray-200"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;
  