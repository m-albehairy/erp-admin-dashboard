import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, X, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface FilterPreset {
  name: string;
  filters: Record<string, string>;
}

interface AdvancedFiltersProps {
  onApplyFilters: (filters: Record<string, string>) => void;
  onClearFilters: () => void;
  filterOptions: Record<string, { label: string; options: string[] }>;
}

export default function AdvancedFilters({
  onApplyFilters,
  onClearFilters,
  filterOptions,
}: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [presets, setPresets] = useState<FilterPreset[]>([
    { name: "Active Items", filters: { status: "active" } },
    { name: "Recent", filters: { dateRange: "last30days" } },
  ]);
  const [presetName, setPresetName] = useState("");

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleClear = () => {
    setFilters({});
    onClearFilters();
  };

  const handleSavePreset = () => {
    if (presetName.trim()) {
      setPresets([...presets, { name: presetName, filters: { ...filters } }]);
      setPresetName("");
    }
  };

  const handleLoadPreset = (preset: FilterPreset) => {
    setFilters(preset.filters);
    onApplyFilters(preset.filters);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter size={16} />
          Advanced Filters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Filter Controls */}
          <div className="space-y-3">
            {Object.entries(filterOptions).map(([key, { label, options }]) => (
              <div key={key}>
                <label className="text-sm font-medium text-foreground mb-1 block">
                  {label}
                </label>
                <Select value={filters[key] || ""} onValueChange={(value) => handleFilterChange(key, value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Preset Section */}
          <div className="border-t pt-4">
            <p className="text-sm font-medium text-foreground mb-2">Saved Presets</p>
            <div className="space-y-2">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => handleLoadPreset(preset)}
                >
                  {preset.name}
                </Button>
              ))}
            </div>

            {/* Save New Preset */}
            <div className="flex gap-2 mt-3">
              <Input
                placeholder="Preset name"
                value={presetName}
                onChange={(e) => setPresetName(e.target.value)}
                className="text-sm"
              />
              <Button size="sm" onClick={handleSavePreset}>
                <Save size={14} />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" className="flex-1" onClick={handleClear}>
              <X size={16} className="mr-2" />
              Clear
            </Button>
            <Button className="flex-1 bg-primary hover:bg-red-700" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
