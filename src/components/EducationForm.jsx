import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    onChange([
      ...data,
      {
        institution: "",
        degree: "",
        field: "",
        graduation_date: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Education</h3>
          <p className="text-sm text-gray-500">
            Add your educational background in reverse chronological order.
          </p>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium
            rounded-lg border border-[#432DD7]/30 text-[#432DD7]
            hover:bg-[#432DD7]/5 transition"
        >
          <Plus size={16} />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="border rounded-xl p-8 text-center text-gray-500">
          <GraduationCap className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium">No education added yet</p>
          <p className="text-sm">
            Click “Add Education” to include your academic details
          </p>
        </div>
      )}

      {/* Education Cards */}
      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={index} className="border rounded-xl p-5 space-y-4 bg-white">
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">
                Education {index + 1}
              </h4>

              <button
                onClick={() => removeEducation(index)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Institution name"
                value={edu.institution}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                className="input"
              />

              <input
                type="text"
                placeholder="Degree (e.g. Bachelor of Science)"
                value={edu.degree}
                onChange={(e) =>
                  updateEducation(index, "degree", e.target.value)
                }
                className="input"
              />

              <input
                type="text"
                placeholder="Field of study"
                value={edu.field}
                onChange={(e) =>
                  updateEducation(index, "field", e.target.value)
                }
                className="input"
              />

              <input
                type="month"
                value={edu.graduation_date}
                onChange={(e) =>
                  updateEducation(index, "graduation_date", e.target.value)
                }
                className="input"
              />

              <input
                type="text"
                placeholder="GPA (optional)"
                value={edu.gpa}
                onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                className="input"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;
