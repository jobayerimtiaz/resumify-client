import { User } from "lucide-react";

const PersonalInfoForm = ({
  data,
  onChange,
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div>
      <h3>Personal Information</h3>
      <p>Get started with personal information</p>
      <div>
        <label>
          {data.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
            />
          ) : (
            <div>
              <User>Upload User Image</User>
            </div>
          )}
          <input
            type="file"
            accept="image/jpeg, image/png"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          ></input>
        </label>
        {typeof data.image === "object" && (
          <div>
            <p>Remove Background</p>
            <label>
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="peer peer-checked:bg-blue-500"></div>
              <span className="dot peer-checked:translate-x-4"></span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
export default PersonalInfoForm;
