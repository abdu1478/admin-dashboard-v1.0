// NavBar.tsx
import { 
    Activity, 
    Users, 
    FileText, 
    ShoppingCart,
    CreditCard
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { RefObject } from "react";
  
// NavBar.tsx
interface NavBarProps {
    sidebarRef: RefObject<HTMLElement | null>; 
    sidebarOpen: boolean;
    darkMode: boolean;
    activeNav: string;
    setActiveNav: (value: string) => void;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
  
  
  function NavBar({
    sidebarRef,
    sidebarOpen,
    darkMode,
    activeNav,
    setActiveNav,
    setSidebarOpen
  }: NavBarProps) {
    return (
      <nav 
        ref={sidebarRef}
        className={`sticky top-16 md:top-14 left-0  h-[calc(100vh-4rem)] transform transition-all duration-300 z-0 ${
          sidebarOpen 
            ? "w-64 translate-x-0 shadow-2xl md:translate-x-0" 
            : "w-16 -translate-x-full md:translate-x-0"
        } ${
          darkMode ? "bg-gray-900" : "bg-white"
        } p-2 overflow-y-auto `}
      >
        <div className="space-y-1 items-start h-full sticky">
          {[
            { id: "analytics", icon: Activity, label: "Analytics" },
            { id: "team", icon: Users, label: "Team" },
            { id: "Reports", icon: FileText, label: "Reports" },
            { id: "sales", icon: ShoppingCart, label: "Sales" },
            { id: "billing", icon: CreditCard, label: "Billing" },
          ].map((navItem) => (
            <Button
              key={navItem.id}
              variant={activeNav === navItem.id ? "secondary" : "ghost"}
              className={`w-full justify-start transition-all mb-2 ${
                activeNav === navItem.id 
                  ? (darkMode ? "bg-gray-700" : "bg-gray-200")
                  : (darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200")
              } text-sm md:text-base`}
              onClick={() => {
                setActiveNav(navItem.id)
                setSidebarOpen(!sidebarOpen)
              }}
              aria-label={navItem.label}
              title={navItem.label}
            >
              <navItem.icon className="mr-2 h-4 w-4 flex-shrink-0" />
              {sidebarOpen && (
                <span className="truncate">{navItem.label}</span>
              )}
            </Button>
          ))}
        </div>
      </nav>
    );
  }
  export default NavBar;
  