import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import Loader from "../components/Loader";
import ResumePreview from "../components/ResumePreview";
import { useParams } from "react-router-dom";

const Preview = () => {
  const { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const [resumeData, setResumeData] = useState(null);

  const loadResume = async () => {
    setResumeData(
      dummyResumeData.find((resume) => resume._id === resumeId || null)
    );
    setIsLoading(false);
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div>
      <div>
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
        ></ResumePreview>
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>Resume not found</h1>
        </div>
      )}
    </div>
  );
};
export default Preview;
