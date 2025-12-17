import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderIcon,
  GraduationCap,
  Sparkle,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "projects", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkle },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadExistingResume();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link
            to="/app"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#432DD7]"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* LEFT PANEL */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6">
              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>
                    Step {activeSectionIndex + 1} of {sections.length}
                  </span>
                  <span className="font-medium text-[#432DD7]">
                    {activeSection.name}
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#432DD7] transition-all duration-300"
                    style={{
                      width: `${
                        (activeSectionIndex * 100) / (sections.length - 1)
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Section Header */}
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="w-10 h-10 rounded-xl bg-[#432DD7]/10 flex items-center justify-center">
                  <activeSection.icon className="text-[#432DD7]" size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {activeSection.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Fill in your {activeSection.name.toLowerCase()}
                  </p>
                </div>
              </div>

              {/* Form Content */}
              <div className="space-y-6">
                {activeSection?.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                <div>
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onchange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  ></TemplateSelector>
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  ></ColorPicker>
                </div>
                <button
                  onClick={() =>
                    setActiveSectionIndex((prev) => Math.max(prev - 1, 0))
                  }
                  disabled={activeSectionIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border
                  disabled:opacity-40 disabled:cursor-not-allowed
                  hover:border-[#432DD7] hover:text-[#432DD7]"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <button
                  onClick={() =>
                    setActiveSectionIndex((prev) =>
                      Math.min(prev + 1, sections.length - 1)
                    )
                  }
                  disabled={activeSectionIndex === sections.length - 1}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                  bg-[#432DD7] rounded-lg hover:bg-[#3623b3]
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL — Preview */}
          <div className="lg:col-span-6">
            <div>buttons will appear here</div>
            <div className="sticky top-8 bg-white border rounded-2xl shadow-sm p-6 h-[calc(100vh-6rem)] flex items-center justify-center">
              <p className="text-sm text-gray-400">
                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                ></ResumePreview>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResumeBuilder;
