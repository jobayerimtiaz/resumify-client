import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import {
  Plus,
  PencilIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = [
    "from-[#432DD7] to-[#686CFF]",
    "from-[#FF6B6B] to-[#FF8787]",
    "from-[#1DD1A1] to-[#48DBFB]",
    "from-[#FFD93D] to-[#FFAD69]",
    "from-[#6C5CE7] to-[#A29BFE]",
    "from-[#FF9F43] to-[#FFC048]",
    "from-[#00CEC9] to-[#00B894]",
  ];

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUplaodResume, setShowUplaodResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const navigate = useNavigate();

  const createResume = (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`);
  };

  const loadAllResumes = () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Action Cards */}
      <div className="md:w-2/4 grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Create Resume Card */}
        <div className=" flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition">
          <div className="p-6 bg-[#432DD7] text-white rounded-2xl mb-4 flex items-center justify-center">
            <Plus onClick={() => setShowCreateResume(true)} size={48} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Create Resume</h3>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Start building a new resume from scratch using templates.
          </p>
        </div>

        {/* Upload Resume Card */}
        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl cursor-pointer transition">
          <div className="p-6 bg-[#686CFF] text-white rounded-2xl mb-4 flex items-center justify-center">
            <UploadCloudIcon size={48} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Upload Resume</h3>
          <p className="text-gray-500 text-sm mt-1 text-center">
            Upload an existing resume to edit or manage it here.
          </p>
        </div>
      </div>

      {/* Resume Cards */}
      <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allResumes.map((resume, index) => {
          const gradient = colors[index % colors.length];

          return (
            <div
              key={index}
              className={`relative p-6 rounded-xl shadow-lg text-white bg-linear-to-br ${gradient} hover:scale-105 transform transition-all group`}
            >
              <Plus size={24} className="mb-4" />
              <h3 className="text-lg font-semibold">{resume.title}</h3>
              <p className="text-sm mt-1">
                Updated on: {new Date(resume.updatedAt).toLocaleDateString()}
              </p>

              {/* Hover actions */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white/20 p-1 rounded hover:bg-white/40">
                  <PencilIcon size={16} />
                </button>
                <button className="bg-white/20 p-1 rounded hover:bg-white/40">
                  <TrashIcon size={16} />
                </button>
              </div>
            </div>
          );
        })}
        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white p-6 rounded-lg shadow-lg"
            >
              <h2 className="text-lg font-semibold mb-4">Create a Resume</h2>
              <input
                type="text"
                className="border border-gray-300 rounded px-3 py-2 mb-4 w-full"
              />
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">
                Create Resume
              </button>
              <XIcon
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="absolute top-2 right-2 w-5 h-5 text-gray-500 cursor-pointer hover:text-gray-700"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
