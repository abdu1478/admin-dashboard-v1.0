import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


interface RecentActivityProps {
    darkMode: boolean;
    search: string;
    setSearch: (value: string) => void;
    filteredActivities: Array<{ title: string; time: string; color: string }>;
    colorClasses: { [key: string]: string };
  }
  
  export function RecentActivity({ darkMode, search, setSearch, filteredActivities, colorClasses }: RecentActivityProps) {
    return (
      <Card className={`${darkMode ? "bg-gray-900 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900"} col-span-3 lg:col-span-3 max-md:w-[100%]`}>
        <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>{filteredActivities.length} results found</CardDescription>
        </CardHeader>
        <CardContent>
            <Input
            placeholder="Search activities..."
            className={`${darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"} focus:-translate-y-0.5 text-xs md:text-sm h-8 md:h-10 focus mb-4`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <div className="space-y-2 md:space-y-4">
            {filteredActivities.map((activity, index) => (
                <div 
                key={index}
                className={`border-l-2 pl-4 ${darkMode ? "bg-gray-800" : "bg-accent"} ${colorClasses[activity.color]} md:p-3 rounded-r-lg transition-all hover:translate-x-1 p-2 text-xs md:text-sm`}
                >
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs">{activity.time}</p>
                </div>
            ))}
            {filteredActivities.length === 0 && (
                <div className="text-center py-4">No activities found</div>
            )}
            </div>
        </CardContent>
      </Card>
    );
  }