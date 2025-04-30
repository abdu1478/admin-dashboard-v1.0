import Analytics from "./Analytics";
import Billing from "./Billing";
import Reports from "./Reports";
import { SalesData } from "./SalesData";
import UserTable from "./UserTable";

interface Props {
  darkMode: boolean;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  filteredActivities: Array<{ title: string; time: string; color: string }>;
  // colorClasses: { [key: string]: string };
  colorClasses: Record<string, string>;
  activeNav: string;
  sidebarOpen: boolean;
  children?: React.ReactNode;
}


function Main({
  darkMode, 
  activeTab,
  setActiveTab,
  search,
  setSearch,
  filteredActivities,
  colorClasses,
  activeNav,
  sidebarOpen
} : Props) {

  console.log(activeNav)
  return (
    <section className={`flex-1 p-2 md:p-2 transition-all duration-300 md:ml-2 ${
      sidebarOpen ? "md:ml-2" : ""
    } max-md:w-full`}
    >
      {activeNav === "analytics" && <Analytics darkMode={darkMode} activeTab={activeTab} setActiveTab={setActiveTab} search={search} setSearch={setSearch} filteredActivities={filteredActivities} colorClasses={colorClasses} />}
      {activeNav === "team" && <UserTable darkMode={darkMode} />} 
      {activeNav === "Reports" && <Reports sidebarOpen={sidebarOpen} darkMode={darkMode} />}
      {activeNav === "sales" && <SalesData darkMode={darkMode} sidebarOpen={sidebarOpen} />} 
      {activeNav === "billing" && <Billing darkMode={darkMode} />}      
    </section>
  )
}

export default Main
