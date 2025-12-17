import { Check, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Red", value: "#EF4444" },
    { name: "Green", value: "#22C55E" },
    { name: "Yellow", value: "#F59E0B" },
    { name: "Orange", value: "#F97316" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Lime", value: "#84CC16" },
    { name: "Magenta", value: "#DB2777" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Palette />
        Accent
      </button>
      {isOpen && (
        <div>
          {colors.map((color) => (
            <div
              key={color.value}
              className="flex flex-col items-center gap-1 cursor-pointer"
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: color.value }}
                ></div>
                {selectedColor === color.value && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 mt-1">{color.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default ColorPicker;
