import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricCard } from "../analytics/MetricsCard";
import { SalesChart } from "../analytics/SalesChart";
import { AdEngagementChart } from "../analytics/AdEngagementChart";
import { RecentActivity } from "../analytics/RecentActivity";
import { 
  Users, 
  DollarSign,
  Folder,
  ShoppingCart,
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";


// Import your data
import { salesData, adEngagementData } from "@/data/Analytics";

interface Props {
  darkMode: boolean;
  activeTab: string;
  setActiveTab: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  filteredActivities: Array<{ title: string; time: string; color: string }>;
  colorClasses: { [key: string]: string };
}

export function Analytics({ darkMode, activeTab, setActiveTab, search, setSearch, filteredActivities, colorClasses }: Props) {
  return (
    <div className="animate-fade-in">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 md:space-y-6">
        <TabsList className={`${darkMode ? "bg-gray-800" : "bg-gray-200"} px-1 py-1 md:px-2 w-full flex-wrap md:flex-nowrap`}>
          {["overview", "analytics"].map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className={`data-[state=active]:shadow-sm text-xs md:text-sm px-2 md:px-4 py-1 ${
                activeTab === tab 
                  ? (darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900")
                  : (darkMode ? "text-white" : "text-gray-900")
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            <MetricCard
              darkMode={darkMode}
              title="Total Revenue"
              value="$45,231"
              description="+20.1% from last month"
              icon={<DollarSign className={`${darkMode ? "text-gray-400" : "text-gray-500"} h-4 w-4`} />}
              className="p-2 md:p-4"
              />
            
            <MetricCard
              className="p-2 md:p-4"
              darkMode={darkMode}
              title="Active Users"
              value="2,345"
              description="+15% from last month"
              icon={<Users className={`${darkMode ? "text-gray-400" : "text-gray-500"} h-4 w-4`} />}
              />

            <MetricCard
              className="p-2 md:p-4"
              darkMode={darkMode}
              title="Projects"
              value="12"
              description="3 completed this month"
              icon={<Folder className={`${darkMode ? "text-gray-400" : "text-gray-500"} h-4 w-4`} />}
            />

            <MetricCard
              className="p-2 md:p-4"
              darkMode={darkMode}
              title="Sales"
              value="1,234"
              description="+12% from last month"
              icon={<ShoppingCart className={`${darkMode ? "text-gray-400" : "text-gray-500"} h-4 w-4`} />}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7  ">
            <Card className={`${darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} col-span-4`}>
              <CardHeader>
                <CardTitle className={darkMode ? "text-gray-200" : "text-gray-900"}>
                  Sales Overview
                </CardTitle>
                <CardDescription className={darkMode ? "text-gray-400" : "text-gray-600"}>
                  Monthly sales performance (2024)
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <SalesChart darkMode={darkMode} data={salesData} />
              </CardContent>
            </Card>
              </div>
            <div className="max-md:min-w-full">
            <RecentActivity
              darkMode={darkMode}
              search={search}
              setSearch={setSearch}
              filteredActivities={filteredActivities}
              colorClasses={colorClasses}
              />
            </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6 animate-fade-in">
          <Card className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <CardHeader>
              <CardTitle>Ad Engagement</CardTitle>
              <CardDescription>Weekly clicks across social platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} h-96 rounded-lg`}>
                <AdEngagementChart darkMode={darkMode} data={adEngagementData} />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
          <Card className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
                        <CardHeader>
                          <CardTitle>Active Users</CardTitle>
                          <CardDescription>By device type</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span>Desktop</span>
                                <span>65%</span>
                              </div>
                              <Progress value={65} className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} h-2`} />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span>Mobile</span>
                                <span>30%</span>
                              </div>
                              <Progress value={32} className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} h-2`} />
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span>Tablet</span>
                                <span>5%</span>
                              </div>
                              <Progress value={6} className={`${darkMode ? "bg-gray-700" : "bg-gray-200"} h-2`} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
      
                      <Card className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
                        <CardHeader>
                          <CardTitle>Top Countries</CardTitle>
                          <CardDescription>User distribution</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {[
                              { country: "United States", users: "2345", percentage: 45 },
                              { country: "Germany", users: "1200", percentage: 25 },
                              { country: "Japan", users: "980", percentage: 20 },
                              { country: "Other", users: "500", percentage: 10 },
                            ].map((item, index) => (
                              <div key={index}>
                                <div className="flex justify-between mb-2">
                                  <span>{item.country}</span>
                                  <span>{item.percentage}%</span>
                                </div>
                                <Progress value={item.percentage} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
export default Analytics;