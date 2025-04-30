import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";

import { 
  TabsContent, 
  Tabs,
} from "@/components/ui/tabs";
import { useState } from "react";


interface Props {
  darkMode: boolean;
  sidebarOpen: boolean;
}
// interface Reports {
//   report?.name: string;
//   report?.date: date | string;
// }

function Reports({ darkMode }: Props) {

  // const [reports, setReports] = useState

  const handleDownload = (reportName: string, reportDate: string) => {
    // Logic to handle the download of the report
    console.log(`Downloading ${reportName} for ${reportDate}`);
  };

  
  return (
    <div className="animate-fade-in">
      <Tabs defaultValue="reports" className="w-full space-y-6">
      <TabsContent value="reports" className="space-y-6 animate-fade-in">
                    <Card className={`${darkMode ? 
          "bg-gray-900 border-gray-700 text-white" : 
          "bg-white border-gray-200 text-gray-900"} 
          text-base md:text-lg lg:text-xl
          transition-all duration-300`}
        >
                      <CardHeader>
                        <CardTitle>Monthly Reports</CardTitle>
                        <CardDescription>Download detailed monthly reports</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-2">
                          {[
                            { name: "January Report", date: "2025-01-31" },
                            { name: "February Report", date: "2025-02-29" },
                            { name: "March Report", date: "2025-03-31" },
                          ].map((report, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border ${darkMode ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-gray-100"} hover:shadow transition`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-semibold">{report.name}</p>
                                  <p className="text-sm">{report.date}</p>
                                </div>
                                <button
                                  className={`text-sm font-medium px-3 py-1 active:scale-90 rounded-md ${
                                    darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-gray-900"
                                  } hover:opacity-80`}
                                  onClick={() => handleDownload(report.name, report.date)}
                                  aria-label={`Download ${report.name}`}
                                >
                                  Download
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="text-xs">Report generated on April 1, 2025</div>
                      </CardFooter>
                    </Card>
                  </TabsContent>
                  </Tabs>
    </div>
  )
}

export default Reports
