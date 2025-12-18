import { Check, Palette } from "lucide-react";
import { useState } from "react";

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorGroups = [
    {
      title: "Professional",
      colors: [
        { name: "Indigo", value: "#432DD7" },
        { name: "Navy", value: "#1E3A8A" },
        { name: "Slate", value: "#334155" },
        { name: "Charcoal", value: "#1F2933" },
      ],
    },
    {
      title: "Creative",
      colors: [
        { name: "Teal", value: "#0F766E" },
        { name: "Emerald", value: "#047857" },
        { name: "Purple", value: "#6D28D9" },
        { name: "Rose", value: "#BE123C" },
      ],
    },
    {
      title: "Bold",
      colors: [
        { name: "Crimson", value: "#B91C1C" },
        { name: "Amber", value: "#B45309" },
        { name: "Sky", value: "#0369A1" },
      ],
    },
  ];

  return (
    <div className="relative w-fit">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-3 px-4 py-2.5 rounded-lg border bg-white
          hover:border-[#432DD7] transition"
      >
        <Palette size={18} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Accent Color</span>

        <span
          className="w-5 h-5 rounded-full border"
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="absolute z-30 mt-2 w-72 bg-white rounded-xl border shadow-lg p-4 space-y-4">
          {colorGroups.map((group) => (
            <div key={group.title}>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                {group.title}
              </p>

              <div className="grid grid-cols-6 gap-3">
                {group.colors.map((color) => {
                  const isActive = selectedColor === color.value;

                  return (
                    <button
                      key={color.value}
                      onClick={() => {
                        onChange(color.value);
                        setIsOpen(false);
                      }}
                      className="relative group"
                      title={color.name}
                    >
                      <div
                        className={`w-9 h-9 rounded-full border-2 transition
                          ${
                            isActive
                              ? "border-[#432DD7] scale-105"
                              : "border-gray-200"
                          }`}
                        style={{ backgroundColor: color.value }}
                      />

                      {isActive && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <p className="text-xs text-gray-400 pt-2 border-t">
            Tip: Professional colors perform best for ATS screening
          </p>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
