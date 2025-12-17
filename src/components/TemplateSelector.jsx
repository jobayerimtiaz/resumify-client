import { Check, Layout } from "lucide-react";
import { useState } from "react";

const TemplateSelector = ({ selectedTemplate, onchange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const templates = [
    {
      id: "classic",
      name: "Classic",
      preview:
        "A clean traditional resume format, often associated with a modern look and feel.",
    },
    {
      id: "modern",
      name: "Modern",
      preview:
        "Sleek and minimal resume design, often featuring a clean and modern look and feel.",
    },
    {
      id: "minimal",
      name: "Minimal",
      preview:
        "A simple and minimal resume format, often featuring a clean and modern look and feel.",
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview:
        "A simple and minimal resume format, often featuring a clean and modern look and feel.",
    },
  ];
  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)}>
        <Layout />
        Template
      </button>
      {isOpen && (
        <div>
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onchange(template.id);
                setIsOpen(false);
              }}
              className={`${
                selectedTemplate === template.id ? "bg-gray-200" : ""
              } p-2 cursor-pointer hover:bg-gray-200`}
            >
              {selectedTemplate === template.id && (
                <div>
                  <div>
                    <Check className="w-3 h-3 text-white"></Check>
                  </div>
                </div>
              )}
              <div>
                <h4>{template.name}</h4>
                <div>{template.preview}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default TemplateSelector;
