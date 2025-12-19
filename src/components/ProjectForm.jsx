import { FolderKanban, Plus, Trash2, Sparkles } from "lucide-react";

const ProjectForm = ({ data, onChange }) => {
  const addProject = () => {
    onChange([
      ...data,
      {
        name: "",
        type: "",
        description: "",
      },
    ]);
  };

  const removeProject = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Projects</h3>
          <p className="text-sm text-gray-500">
            Showcase real-world or personal projects that demonstrate your
            skills.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium
            rounded-lg border border-[#432DD7]/30 text-[#432DD7]
            hover:bg-[#432DD7]/5 transition"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="border rounded-xl p-8 text-center text-gray-500">
          <FolderKanban className="mx-auto mb-3 text-gray-400" />
          <p className="font-medium">No projects added yet</p>
          <p className="text-sm">Click “Add Project” to highlight your work</p>
        </div>
      )}

      {/* Project Cards */}
      <div className="space-y-6">
        {data.map((project, index) => (
          <div key={index} className="border rounded-xl p-5 space-y-4 bg-white">
            {/* Card Header */}
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-800">
                Project {index + 1}
              </h4>

              <button
                onClick={() => removeProject(index)}
                className="text-gray-400 hover:text-red-500 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Inputs */}
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Project name"
                value={project.name}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                className="input"
              />

              <input
                type="text"
                placeholder="Project type (Personal, Academic, Freelance)"
                value={project.type}
                onChange={(e) => updateProject(index, "type", e.target.value)}
                className="input"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Project Description
                </label>

                <button
                  type="button"
                  className="flex items-center gap-1 text-xs font-medium
                    text-[#432DD7] hover:underline"
                >
                  <Sparkles size={14} />
                  Enhance with AI
                </button>
              </div>

              <textarea
                rows={4}
                placeholder="Built a full-stack MERN application that allows users to..."
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                className="w-full resize-none rounded-xl border p-4 text-sm
                  focus:outline-none focus:ring-2 focus:ring-[#432DD7]/30
                  focus:border-[#432DD7]"
              />

              <div className="flex justify-between text-xs text-gray-500">
                <p>Tip: Focus on impact, tech stack, and results.</p>
                <span>{project.description?.length || 0} characters</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
