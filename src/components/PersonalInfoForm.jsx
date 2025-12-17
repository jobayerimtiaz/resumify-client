import {
  BriefcaseBusiness,
  Globe,
  Mail,
  MapPin,
  Phone,
  User,
  User2,
} from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User2,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: Mail,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone Number", icon: Phone, type: "tel" },
    { key: "location", label: "Location", icon: MapPin, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn Profile",
      icon: LiaLinkedin,
      type: "url",
    },
    { key: "website", label: "Personal Website", icon: Globe, type: "url" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          Personal Information
        </h3>
        <p className="text-sm text-gray-500">
          Get started with your basic details
        </p>
      </div>

      {/* Avatar Upload */}
      <div className="flex items-center gap-6">
        <label className="relative cursor-pointer">
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="Profile"
              className="w-24 h-24 rounded-xl object-cover border"
            />
          ) : (
            <div
              className="w-24 h-24 rounded-xl border-2 border-dashed
              flex flex-col items-center justify-center text-gray-400
              hover:border-[#432DD7] hover:text-[#432DD7] transition"
            >
              <User size={24} />
              <span className="text-xs mt-1">Upload</span>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {typeof data.image === "object" && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Remove Background</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div
                className="w-10 h-6 bg-gray-200 rounded-full peer
                  peer-checked:bg-[#432DD7]
                  transition"
              />
              <span
                className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full
                  transition peer-checked:translate-x-4"
              />
            </label>
          </div>
        )}
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-2 gap-6">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.key} className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>

              <div className="relative">
                <Icon
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={field.type}
                  value={data[field.key] || ""}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  required={field.required}
                  className="w-full pl-10 pr-3 py-2.5 text-sm rounded-lg border
                    focus:outline-none focus:ring-2 focus:ring-[#432DD7]/30
                    focus:border-[#432DD7]"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PersonalInfoForm;
