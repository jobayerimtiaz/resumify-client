import { Plus, X, Sparkles } from "lucide-react";
import { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    const skill = newSkill.trim();
    if (!skill || data.includes(skill)) return;

    onChange([...data, skill]);
    setNewSkill("");
  };

  const removeSkill = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
          <p className="text-sm text-gray-500">
            Add technical and professional skills relevant to your role.
          </p>
        </div>
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="e.g. React, Node.js, MongoDB"
          className="flex-1 rounded-xl border px-4 py-2.5 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#432DD7]/30
            focus:border-[#432DD7]"
        />

        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 px-4 py-2.5
            rounded-xl bg-[#432DD7] text-white text-sm font-medium
            hover:bg-[#3623b3] transition"
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {/* Skills List */}
      {data.length === 0 ? (
        <p className="text-sm text-gray-500">
          No skills added yet. Start typing and press Enter.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 px-3 py-1.5
                rounded-full text-sm bg-[#432DD7]/10 text-[#432DD7]"
            >
              {skill}
              <button
                onClick={() => removeSkill(index)}
                className="hover:text-red-500 transition"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Tip */}
      <p className="text-xs text-gray-500">
        Tip: Prioritize role-specific skills (tools, frameworks, methodologies).
      </p>
    </div>
  );
};

export default SkillsForm;
