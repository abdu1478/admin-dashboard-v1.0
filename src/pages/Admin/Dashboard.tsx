import { useState, useEffect, useRef } from "react";
import Header from "../../components/Dashboard/Header.tsx"
import NavBar from "../../components/Dashboard/NavBar.tsx"
import Main from "../../components/Dashboard/Main/Main.tsx"
import { useTheme } from "@/components/theme-provider";
import { Outlet } from 'react-router-dom';



type Activity = {
  title: string;
  time: string;
  color: "indigo" | "green" | "blue";
};


const activities: Activity[] = [
  { title: "New project created", time: "2 hours ago", color: "indigo" },
  { title: "Revenue received", time: "Yesterday", color: "green" },
  { title: "Team meeting scheduled", time: "3 days ago", color: "blue" },
];

function Dashboard() {
  const { theme , setTheme } = useTheme(); 
  const darkMode = theme === 'dark';
  const setDarkMode = (darkMode: boolean) => {
    setTheme(darkMode ? 'dark' : 'light');
  };
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [activeNav, setActiveNav] = useState<string>("analytics");
  const [search, setSearch] = useState("");
  const sidebarRef = useRef<HTMLElement>(null);

  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(search.toLowerCase())
  );

  

  // Close sidebar on click outside
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setSidebarOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);
  

  // Color classes for activity items
  const colorClasses: Record<string, string> = {
    indigo: "border-indigo-500 ",
    green: "border-green-500 ",
    blue: "border-blue-500 ",
  };
  

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transition-colors duration-500`}>
      {/* Top Navigation */}
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        toggleRef={toggleRef}
        sidebarRef={sidebarRef}
      />

      <main className="flex w-full transition-colors duration-500 relative">
        {/* Sidebar */}
        <NavBar
          setSidebarOpen={setSidebarOpen}
          sidebarRef={sidebarRef}
          sidebarOpen={sidebarOpen}
          darkMode={darkMode}
          activeNav={activeNav}
          setActiveNav={setActiveNav}
          />

        {/* Main Content */}
        <Main
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          filteredActivities={filteredActivities}
          search={search}
          setSearch={setSearch}
          colorClasses={colorClasses}
          activeNav={activeNav}
          sidebarOpen={sidebarOpen} 
         >
          <Outlet />
         </Main>
        
      </main>
    </div>
  );
}

export default Dashboard;
