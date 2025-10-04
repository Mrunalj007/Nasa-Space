import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function Policy() {
  const [generating, setGenerating] = useState(false);
  const [location, setLocation] = useState("New York");
  const { toast } = useToast();

  const { data: metricsData } = useQuery({
    queryKey: ["/api/nasa/metrics", location],
  });

  const generateReport = async () => {
    if (!metricsData) {
      toast({
        title: "Error",
        description: "No data available to generate report",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: `Urban Planning Report - ${location}`,
          data: {
            metrics: metricsData,
            insights: [],
          },
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `urban-planning-report-${Date.now()}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        toast({
          title: "Report Generated",
          description: "Your report has been downloaded successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const sustainabilityScore = 73;

  const metrics = [
    {
      category: "Environmental Health",
      score: 78,
      status: "good",
      icon: CheckCircle2,
    },
    {
      category: "Urban Development",
      score: 65,
      status: "warning",
      icon: AlertTriangle,
    },
    {
      category: "Community Wellbeing",
      score: 82,
      status: "good",
      icon: CheckCircle2,
    },
    {
      category: "Resource Management",
      score: 70,
      status: "good",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Policy Insights</h1>
              <p className="text-muted-foreground">
                Data-driven recommendations for sustainable urban development
              </p>
            </div>
            <Button
              onClick={generateReport}
              disabled={generating}
              data-testid="button-generate-report"
            >
              <Download className="h-4 w-4 mr-2" />
              {generating ? "Generating..." : "Download Report"}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sustainability Index */}
          <Card className="lg:col-span-2 p-8">
            <h2 className="text-2xl font-bold mb-6">
              Sustainability & Wellbeing Index
            </h2>

            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="h-48 w-48 rounded-full border-8 border-primary/20 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="text-5xl font-bold text-primary"
                      data-testid="text-sustainability-score"
                    >
                      {sustainabilityScore}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      out of 100
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-0 rounded-full border-8 border-primary"
                  style={{
                    clipPath: `polygon(0 0, 100% 0, 100% ${sustainabilityScore}%, 0 ${sustainabilityScore}%)`,
                  }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="border border-border rounded-lg p-4"
                  data-testid={`metric-${index}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <metric.icon
                        className={`h-5 w-5 ${
                          metric.status === "good"
                            ? "text-chart-2"
                            : "text-chart-3"
                        }`}
                      />
                      <span className="font-medium">{metric.category}</span>
                    </div>
                    <span className="text-lg font-bold">{metric.score}</span>
                  </div>
                  <Progress value={metric.score} className="h-2" />
                </div>
              ))}
            </div>
          </Card>

          {/* Key Recommendations */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Key Recommendations
            </h3>
            <div className="space-y-4">
              <div className="border-l-4 border-chart-2 pl-4">
                <p className="text-sm font-medium mb-1">High Priority</p>
                <p className="text-xs text-muted-foreground">
                  Expand green infrastructure in high-density zones
                </p>
              </div>
              <div className="border-l-4 border-chart-3 pl-4">
                <p className="text-sm font-medium mb-1">Medium Priority</p>
                <p className="text-xs text-muted-foreground">
                  Enhance public transportation connectivity
                </p>
              </div>
              <div className="border-l-4 border-chart-1 pl-4">
                <p className="text-sm font-medium mb-1">Low Priority</p>
                <p className="text-xs text-muted-foreground">
                  Update zoning regulations for mixed-use development
                </p>
              </div>
            </div>
          </Card>

          {/* Comparative Analysis */}
          <Card className="lg:col-span-3 p-6">
            <h2 className="text-2xl font-bold mb-6">
              Scenario Comparison Analysis
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Business as Usual
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Air Quality
                      </span>
                      <span className="font-mono">AQI 65</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Green Coverage
                      </span>
                      <span className="font-mono">22%</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Water Quality
                      </span>
                      <span className="font-mono">6.8 pH</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Energy Efficiency
                      </span>
                      <span className="font-mono">58%</span>
                    </div>
                    <Progress value={58} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="border-2 border-primary rounded-lg p-6 bg-primary/5">
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Sustainable Growth Plan
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Air Quality
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">AQI 42</span>
                        <span className="text-xs text-chart-2 font-semibold">
                          -35%
                        </span>
                      </div>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Green Coverage
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">35%</span>
                        <span className="text-xs text-chart-2 font-semibold">
                          +59%
                        </span>
                      </div>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Water Quality
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">7.2 pH</span>
                        <span className="text-xs text-chart-2 font-semibold">
                          +6%
                        </span>
                      </div>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        Energy Efficiency
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono">78%</span>
                        <span className="text-xs text-chart-2 font-semibold">
                          +34%
                        </span>
                      </div>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
