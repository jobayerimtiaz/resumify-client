import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ClassicTemplate = ({ data, accentColor }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 px-10 py-8 text-sm leading-relaxed">
      {/* Header */}
      <header className="mb-8">
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: accentColor }}
        >
          {data.personal_info?.full_name || "Your Name"}
        </h1>

        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-gray-600">
          {data.personal_info?.email && (
            <span className="flex items-center gap-1">
              <Mail className="size-4" /> {data.personal_info.email}
            </span>
          )}
          {data.personal_info?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="size-4" /> {data.personal_info.phone}
            </span>
          )}
          {data.personal_info?.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-4" /> {data.personal_info.location}
            </span>
          )}
          {data.personal_info?.linkedin && (
            <span className="flex items-center gap-1 break-all">
              <Linkedin className="size-4" /> {data.personal_info.linkedin}
            </span>
          )}
          {data.personal_info?.website && (
            <span className="flex items-center gap-1 break-all">
              <Globe className="size-4" /> {data.personal_info.website}
            </span>
          )}
        </div>
      </header>

      {/* Divider */}
      <div
        className="h-px w-full mb-6"
        style={{ backgroundColor: accentColor }}
      />

      {/* Summary */}
      {data.professional_summary && (
        <section className="mb-6">
          <h2
            className="font-semibold uppercase tracking-wide mb-2"
            style={{ color: accentColor }}
          >
            Professional Summary
          </h2>
          <p className="text-gray-700">{data.professional_summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-semibold uppercase tracking-wide mb-4"
            style={{ color: accentColor }}
          >
            Experience
          </h2>

          <div className="space-y-5">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs">
                    {formatDate(exp.start_date)} –{" "}
                    {exp.is_current ? "Present" : formatDate(exp.end_date)}
                  </span>
                </div>

                {exp.description && (
                  <ul className="mt-2 ml-4 list-disc text-gray-700 space-y-1">
                    {exp.description.split("\n").map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.project?.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-semibold uppercase tracking-wide mb-4"
            style={{ color: accentColor }}
          >
            Projects
          </h2>

          <div className="space-y-3">
            {data.project.map((proj, i) => (
              <div key={i}>
                <h3 className="font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-gray-700">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <section className="mb-6">
          <h2
            className="font-semibold uppercase tracking-wide mb-4"
            style={{ color: accentColor }}
          >
            Education
          </h2>

          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i} className="flex justify-between">
                <div>
                  <p className="font-semibold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </p>
                  <p className="text-gray-700">{edu.institution}</p>
                </div>
                <span className="text-gray-500 text-xs">
                  {formatDate(edu.graduation_date)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <h2
            className="font-semibold uppercase tracking-wide mb-4"
            style={{ color: accentColor }}
          >
            Skills
          </h2>

          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 border rounded text-gray-700"
                style={{ borderColor: accentColor }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;
