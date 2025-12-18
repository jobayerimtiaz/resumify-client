import { Check, Layout } from "lucide-react";
import { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onchange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview: "A clean traditional resume format with a professional tone.",
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Sleek, minimal layout with strong visual hierarchy.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Simple, distraction-free resume design.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Minimal layout with profile image emphasis.",
    },
  ];

  return (
    <div className="relative w-full max-w-sm">
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3
          px-4 py-2.5 rounded-lg border bg-white
          hover:border-[#432DD7] transition"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Layout size={18} />
          Template
        </div>

        <span className="text-sm font-semibold text-[#432DD7] capitalize">
          {selectedTemplate.replace("-", " ")}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-20 mt-2 w-full bg-white rounded-xl border shadow-lg overflow-hidden">
          {templates.map((template) => {
            const isActive = selectedTemplate === template.id;

            return (
              <div
                key={template.id}
                onClick={() => {
                  onchange(template.id);
                  setIsOpen(false);
                }}
                className={`relative flex gap-4 p-4 cursor-pointer transition
                  hover:bg-gray-50
                  ${isActive ? "bg-[#432DD7]/5" : ""}`}
              >
                {/* Check Indicator */}
                <div
                  className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center
                    ${isActive ? "bg-[#432DD7]" : "border border-gray-300"}`}
                >
                  {isActive && <Check size={12} className="text-white" />}
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {template.name}
                  </h4>
                  <p className="text-xs text-gray-500">{template.preview}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;
