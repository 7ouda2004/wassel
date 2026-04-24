import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

const ThemeConfig = () => {
  const [colors, setColors] = useState({
    medical100: '#e6f7ff',
    medical200: '#bae7ff',
    medical300: '#91d5ff',
    medical400: '#69c0ff',
    medical500: '#40a9ff',
    medical600: '#1890ff',
    medical700: '#096dd9',
    medical800: '#0050b3',
    medical900: '#003a8c',
    medical950: '#002766',
  });

  const handleColorChange = (key: string, value: string) => {
    setColors(prev => ({ ...prev, [key]: value }));
  };

  const applyColors = () => {
    // Here we'll update CSS variables
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">تخصيص الألوان</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(colors).map(([key, value]) => (
            <Card key={key} className="p-4">
              <div className="space-y-2">
                <Label htmlFor={key}>{key}</Label>
                <div className="flex gap-4">
                  <Input
                    id={key}
                    type="color"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="w-20 h-10"
                  />
                  <Input
                    type="text"
                    value={value}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    className="flex-1"
                  />
                </div>
                <div 
                  className="h-8 rounded-md"
                  style={{ backgroundColor: value }}
                ></div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button 
            onClick={applyColors}
            size="lg"
            className="px-8"
          >
            تطبيق الألوان
          </Button>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
            size="lg"
            className="px-8"
          >
            إعادة تعيين
          </Button>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">معاينة الألوان</h2>
          <div className="grid grid-cols-5 gap-4">
            {Object.entries(colors).map(([key, value]) => (
              <div key={key} className="text-center">
                <div 
                  className="h-20 rounded-md mb-2"
                  style={{ backgroundColor: value }}
                ></div>
                <p className="text-sm font-medium">{key}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeConfig;