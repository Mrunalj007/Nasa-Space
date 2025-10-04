import { MapView } from "@/components/MapView";
import { MetricCard } from "@/components/MetricCard";
import { DataChart } from "@/components/DataChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Wind,
  Thermometer,
  Droplet,
  Search,
  Layers,
  Calendar,
} from "lucide-react";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Dashboard() {
  const [selectedLayers, setSelectedLayers] = useState<string[]>(["aqi"]);

  const metrics = [
    {
      title: "Air Quality Index",
      value: 42,
      unit: "AQI",
      icon: Wind,
      trend: { value: 12, direction: "down" as const },
      status: "good" as const,
    },
    {
      title: "Vegetation Index",
      value: 0.68,
      unit: "NDVI",
      icon: Leaf,
      trend: { value: 5, direction: "up" as const },
      status: "good" as const,
    },
    {
      title: "Temperature",
      value: 28,
      unit: "°C",
      icon: Thermometer,
      trend: { value: 3, direction: "up" as const },
      status: "warning" as const,
    },
    {
      title: "Water Quality",
      value: 7.2,
      unit: "pH",
      icon: Droplet,
      status: "good" as const,
    },
  ];

  const chartData = [
    { date: "Jan", value: 45 },
    { date: "Feb", value: 52 },
    { date: "Mar", value: 48 },
    { date: "Apr", value: 61 },
    { date: "May", value: 55 },
    { date: "Jun", value: 67 },
  ];

  const layers = [
    { id: "aqi", label: "Air Quality", color: "bg-chart-1" },
    { id: "ndvi", label: "Vegetation", color: "bg-chart-2" },
    { id: "temp", label: "Temperature", color: "bg-chart-3" },
    { id: "water", label: "Water", color: "bg-chart-4" },
  ];

  const toggleLayer = (layerId: string) => {
    setSelectedLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search & Controls Bar */}
      <div className="border-b border-border bg-card/50 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search location or coordinates..."
                  className="pl-10"
                  data-testid="input-search-location"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Select defaultValue="2024">
                <SelectTrigger className="w-[150px]" data-testid="select-time-range">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" data-testid="button-layer-control">
                    <Layers className="h-4 w-4 mr-2" />
                    Layers ({selectedLayers.length})
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm mb-3">Data Layers</h4>
                    {layers.map((layer) => (
                      <label
                        key={layer.id}
                        className="flex items-center gap-3 p-2 rounded-md hover-elevate cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLayers.includes(layer.id)}
                          onChange={() => toggleLayer(layer.id)}
                          className="rounded"
                        />
                        <div className={`h-3 w-3 rounded ${layer.color}`} />
                        <span className="text-sm">{layer.label}</span>
                      </label>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric, index) => (
            <MetricCard key={index} {...metric} />
          ))}
        </div>
      </div>

      {/* Map & Charts */}
      <div className="container mx-auto px-4 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-0 overflow-hidden">
            <div className="h-[500px]">
              <MapView />
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {layers.map((layer) => (
                  <Badge
                    key={layer.id}
                    variant={
                      selectedLayers.includes(layer.id) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => toggleLayer(layer.id)}
                  >
                    <div className={`h-2 w-2 rounded-full ${layer.color} mr-2`} />
                    {layer.label}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <DataChart
              title="Air Quality Trend"
              data={chartData}
              color="hsl(var(--chart-1))"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
