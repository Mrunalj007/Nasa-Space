import { CommunityReport } from "@/components/CommunityReport";
import { MapView } from "@/components/MapView";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, MapPin, Clock, ThumbsUp } from "lucide-react";
import { useState } from "react";

export default function Community() {
  const [reports] = useState([
    {
      id: "1",
      category: "Air Quality",
      location: "123 Main St, Downtown",
      description: "Heavy smoke detected near industrial area causing breathing issues.",
      timestamp: "2 hours ago",
      upvotes: 24,
      status: "under-review",
    },
    {
      id: "2",
      category: "Green Space",
      location: "Central Park Area",
      description: "Request for more benches and shade structures in the park.",
      timestamp: "5 hours ago",
      upvotes: 15,
      status: "in-progress",
    },
    {
      id: "3",
      category: "Water",
      location: "River Road",
      description: "Water quality concern - unusual color observed in the river.",
      timestamp: "1 day ago",
      upvotes: 32,
      status: "resolved",
    },
  ]);

  const statusColors = {
    "under-review": "bg-chart-3/10 text-chart-3 border-chart-3/20",
    "in-progress": "bg-chart-1/10 text-chart-1 border-chart-1/20",
    "resolved": "bg-chart-2/10 text-chart-2 border-chart-2/20",
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
              <p className="text-muted-foreground">
                Report issues and engage with your community
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button data-testid="button-new-report">
                  <Plus className="h-4 w-4 mr-2" />
                  New Report
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <h2 className="text-2xl font-bold mb-6">Report an Issue</h2>
                <CommunityReport />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-0 overflow-hidden">
            <div className="h-[500px]">
              <MapView />
            </div>
            <div className="p-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Click markers to view reported issues on the map
              </p>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {reports.map((report) => (
                  <div
                    key={report.id}
                    className="border border-border rounded-lg p-4 hover-elevate cursor-pointer"
                    data-testid={`report-${report.id}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {report.category}
                      </Badge>
                      <Badge
                        className={`${
                          statusColors[
                            report.status as keyof typeof statusColors
                          ]
                        } border text-xs`}
                      >
                        {report.status.replace("-", " ")}
                      </Badge>
                    </div>

                    <p className="text-sm font-medium mb-2">
                      {report.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="truncate">{report.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{report.timestamp}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        data-testid={`button-upvote-${report.id}`}
                      >
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {report.upvotes}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Top Contributors</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                      #{i}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Contributor {i}</p>
                      <p className="text-xs text-muted-foreground">
                        {25 - i * 5} reports
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {100 - i * 10} pts
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
