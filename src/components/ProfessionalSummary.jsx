import { Sparkles } from "lucide-react";

const ProfessionalSummary = ({ data, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add a short summary that highlights your experience
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium
            rounded-lg border border-[#432DD7]/30 text-[#432DD7]
            hover:bg-[#432DD7]/5 transition"
        >
          <Sparkles size={16} />
          AI Enhance
        </button>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        <textarea
          value={data || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={7}
          placeholder="Results-driven software engineer with 5+ years of experience..."
          className="w-full resize-none rounded-xl border p-4 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#432DD7]/30
            focus:border-[#432DD7]"
        />

        <div className="flex items-center justify-between text-xs text-gray-500">
          <p>Tip: Keep it concise, impact-focused, and under 3–4 lines.</p>
          <span>{data?.length || 0} characters</span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
