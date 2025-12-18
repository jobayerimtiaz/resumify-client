import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";

const ExperienceForm = ({ data, onChange }) => {
  const addExperience = () => {
    onChange([
      ...data,
      {
        company: "",
        position: "",
        start_date: "",
        end_date: "",
        description: "",
        is_current: false,
      },
    ]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Work Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your professional experience, starting with the most recent.
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium
            rounded-lg border border-[#432DD7]/30 text-[#432DD7]
            hover:bg-[#432DD7]/5 transition"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="border rounded-xl p-8 text-center text-gray-500">
          <Briefcase className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium">No experience added yet</p>
          <p className="text-sm">Click “Add Experience” to get started</p>
        </div>
      )}

      {/* Experience Cards */}
      <div className="space-y-6">
        {data.map((experience, index) => (
          <div key={index} className="border rounded-xl p-5 space-y-4 bg-white">
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">
                Experience {index + 1}
              </h4>

              <button
                onClick={() => removeExperience(index)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Company name"
                value={experience.company}
                onChange={(e) =>
                  updateExperience(index, "company", e.target.value)
                }
                className="input"
              />

              <input
                type="text"
                placeholder="Job title"
                value={experience.position}
                onChange={(e) =>
                  updateExperience(index, "position", e.target.value)
                }
                className="input"
              />

              <input
                type="month"
                value={experience.start_date}
                onChange={(e) =>
                  updateExperience(index, "start_date", e.target.value)
                }
                className="input"
              />

              <input
                type="month"
                value={experience.end_date}
                disabled={experience.is_current}
                onChange={(e) =>
                  updateExperience(index, "end_date", e.target.value)
                }
                className="input disabled:bg-gray-100"
              />
            </div>

            {/* Current Role Toggle */}
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={experience.is_current}
                onChange={(e) =>
                  updateExperience(index, "is_current", e.target.checked)
                }
              />
              Currently working here
            </label>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Job Description
                </label>

                <button
                  type="button"
                  className="flex items-center gap-1 text-sm text-[#432DD7]
                    hover:underline"
                >
                  <Sparkles size={14} />
                  Enhance with AI
                </button>
              </div>

              <textarea
                rows={4}
                placeholder="Describe your responsibilities and achievements..."
                value={experience.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="w-full resize-none rounded-lg border p-3 text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#432DD7]/30
                  focus:border-[#432DD7]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;
