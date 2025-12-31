import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeft,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkle,
  User,
} from "lucide-react";

import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import SkillsForm from "../components/SkillsForm";

const ResumeBuilder = () => {
  const { resumeId } = useParams();

  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#4F46E5",
    public: false,
  });

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
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  }, [resumeId]);

  const changeResumeVisibility = () => {
    setResumeData((prev) => ({ ...prev, public: !prev.public }));
  };

  const handleShare = () => {
    const frontendUrl = window.location.href.split("/app")[0];
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      navigator.clipboard.writeText(resumeUrl);
      alert("Link copied to clipboard");
    }
  };

  const DownloadResume = () => {
    window.print();
  };

  const saveChanges = () => {
    console.log("Saving resume", resumeData);
    // hook API here
  };

  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEFT PANEL */}
          <section className="bg-white rounded-2xl border shadow-sm p-5 sm:p-6 space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-500">
                <span>
                  Step {activeSectionIndex + 1} of {sections.length}
                </span>
                <span className="font-medium text-indigo-600">
                  {activeSection.name}
                </span>
              </div>
              <div className="h-2 bg-slate-200 rounded-full">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all"
                  style={{
                    width: `${
                      (activeSectionIndex / (sections.length - 1)) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <activeSection.icon className="text-indigo-600" size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {activeSection.name}
                </h2>
                <p className="text-sm text-slate-500">
                  Complete this section carefully
                </p>
              </div>
            </div>

            {/* FORMS */}
            {activeSection.id === "personal" && (
              <PersonalInfoForm
                data={resumeData.personal_info}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, personal_info: data }))
                }
                removeBackground={removeBackground}
                setRemoveBackground={setRemoveBackground}
              />
            )}

            {activeSection.id === "summary" && (
              <ProfessionalSummary
                data={resumeData.professional_summary}
                onChange={(data) =>
                  setResumeData((prev) => ({
                    ...prev,
                    professional_summary: data,
                  }))
                }
              />
            )}

            {activeSection.id === "experience" && (
              <ExperienceForm
                data={resumeData.experience}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, experience: data }))
                }
              />
            )}

            {activeSection.id === "education" && (
              <EducationForm
                data={resumeData.education}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, education: data }))
                }
              />
            )}

            {activeSection.id === "projects" && (
              <ProjectForm
                data={resumeData.project}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, project: data }))
                }
              />
            )}

            {activeSection.id === "skills" && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(data) =>
                  setResumeData((prev) => ({ ...prev, skills: data }))
                }
              />
            )}

            {/* FOOTER */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <TemplateSelector
                  selectedTemplate={resumeData.template}
                  onchange={(template) =>
                    setResumeData((prev) => ({ ...prev, template }))
                  }
                />
                <ColorPicker
                  selectedColor={resumeData.accent_color}
                  onChange={(color) =>
                    setResumeData((prev) => ({ ...prev, accent_color: color }))
                  }
                />
              </div>

              <div className="flex justify-between items-center gap-3">
                <button
                  disabled={activeSectionIndex === 0}
                  onClick={() => setActiveSectionIndex((i) => i - 1)}
                  className="px-4 py-2 border rounded-lg text-sm"
                >
                  <ChevronLeft size={16} />
                </button>

                <button
                  onClick={saveChanges}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  Save Changes
                </button>

                <button
                  disabled={activeSectionIndex === sections.length - 1}
                  onClick={() => setActiveSectionIndex((i) => i + 1)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <section className="bg-white rounded-2xl border shadow-sm p-4 sm:p-6 lg:sticky lg:top-6 h-fit">
            <div className="flex flex-wrap gap-3 mb-4">
              {resumeData.public && (
                <button onClick={handleShare} className="btn-primary">
                  <Share2Icon size={16} /> Share
                </button>
              )}

              <button onClick={changeResumeVisibility} className="btn-primary">
                {resumeData.public ? (
                  <EyeIcon size={16} />
                ) : (
                  <EyeOffIcon size={16} />
                )}
                {resumeData.public ? "Public" : "Private"}
              </button>

              <button onClick={DownloadResume} className="btn-primary">
                <DownloadIcon size={16} /> Download
              </button>
            </div>

            <div className="max-h-[75vh] overflow-auto border rounded-lg">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ResumeBuilder;
