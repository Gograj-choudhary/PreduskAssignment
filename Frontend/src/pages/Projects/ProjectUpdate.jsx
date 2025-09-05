import { useLocation } from "react-router-dom";
import { useProject } from "../../hooks/useProject";
import { UpdateProject } from "../../services/ProjectServices";

export const ProjectUpdate = () => {
  const { mutate, isPending, isError, error } = useProject(UpdateProject);

    const location = useLocation();
    const { project } = location.state || {} ;
    console.log("Project Data in Update Page:", project);

  const handleUpdateProject = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convert description (textarea) into array of strings
    if (data.description) {
      data.description = data.description
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    }

    console.log("Project Data", data);

    mutate({id: project._id, data}, {
      onSuccess: (response) => {
        console.log("Project Data", response);
        window.location.href = "/get-Project";
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-[#FFFBA5] shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Update Project</h1>

        <form onSubmit={handleUpdateProject} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              name="title"
                defaultValue={project?.title}
              required
              placeholder="Eg. My Shop (E-commerce App)"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Skills Used */}
          <div>
            <label className="block text-sm font-medium mb-1">Skills Used:</label>
            <textarea
              name="skillsUsed"
                defaultValue={project?.skillsUsed?.join("\n")}
              required
              rows={4}
              placeholder={`Enter one skill per line\nEg:\nReact.js\nNode.js\nMongoDB\nJWT`}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            ></textarea>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium mb-1">Link:</label>
            <input
              type="text"
              name="link"
                defaultValue={project?.links?.demo}
              required
              placeholder="Eg. GitHub repo or live demo link"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description:</label>
            <textarea
              name="description"
                defaultValue={project?.description?.join("\n")}
              required
              rows={5}
              placeholder={`Enter each responsibility/achievement on a new line\nEg:\n- Built secure CRUD APIs\n- Integrated Razorpay payments\n- Optimized MongoDB queries`}
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
              {isPending ? "Updateing..." : "Update Project"}
            </button>
          </div>

          {/* Error */}
          {isError && (
            <p className="text-red-600 text-center mt-4">
              {error?.response?.data?.message || "Unauthorized. Please Login"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
