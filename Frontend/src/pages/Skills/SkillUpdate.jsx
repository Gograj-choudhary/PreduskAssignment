import { useLocation, useNavigate } from "react-router-dom";
import { useSkill } from "../../hooks/useSkill";
import { UpdateSkill } from "../../services/SkillServices";

export const SkillUpdate = () => {
  const { mutate, isPending, isError, error } = useSkill(UpdateSkill);
  const navigate = useNavigate();
  const location = useLocation();
  const { skill } = location.state || {};
  console.log("Skill Data in Update Page:", skill);

  const handleUpdateSkill = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data.skills) {
  data.skills = data.skills
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join(", ");  
}

    // Attach ID for update
    data._id = skill?._id;

    console.log("Updated Skill Data", data);

    mutate({id: skill._id, data}, {
      onSuccess: (response) => {
        console.log("Skill Updated", response);
        navigate("/get-skill"); 
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-[#FFFBA5] shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Technical Skill</h1>

        <form onSubmit={handleUpdateSkill} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              name="title"
              defaultValue={skill?.title}
              required
              placeholder="Eg. Languages, Frameworks, Tools"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium mb-1">Skills:</label>
            <textarea
              name="skills"
              defaultValue={skill?.skills}
              required
              rows={4}
              placeholder={`Enter one skill per line\nEg:\nReact.js\nNode.js\nMongoDB\nJWT`}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#1A1800] text-[#FFFDD0] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              {isPending ? "Updating..." : "Update Skill"}
            </button>
          </div>

          {/* Error */}
          {isError && (
            <p className="text-red-600 text-center mt-4">
              {error?.response?.data?.message || "Unauthorize. Please Login."}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
