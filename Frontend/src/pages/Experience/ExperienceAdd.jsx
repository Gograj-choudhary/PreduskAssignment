import { useExperience } from "../../hooks/useExperience";
import { AddExperience } from "../../services/ExperienceServices";

export const ExperienceAdd = () => {
  const { mutate, isPending, isError, error } = useExperience(AddExperience);

  const handleAddExperience = (e) => {
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

    console.log("Experience Data", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("Experience Data", response);
        window.location.href = "/get-experience";
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-[#FFFDD0] shadow-md rounded-xl p-8 ">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Experience</h1>

        <form onSubmit={handleAddExperience} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title:</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Eg. Software Engineer"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-medium mb-1">Company:</label>
            <input
              type="text"
              name="company"
              required
              placeholder="Eg. Google"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1">Location:</label>
            <input
              type="text"
              name="location"
              required
              placeholder="Eg. Remote or Bangalore"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date:</label>
            <input
              type="text"
              name="startDate"
              required
              placeholder="Eg. July 2025"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium mb-1">End Date:</label>
            <input
              type="text"
              name="endDate"
              required
              placeholder="Eg. November 2025"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description:</label>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="Enter each responsibility/achievement on a new line"
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
              {isPending ? "Adding..." : "Add Experience"}
            </button>
          </div>

          {/* Error */}
          {isError && (
            <p className="text-red-600 text-center mt-4">
              {error?.response?.data?.message || "Unauthorize. Please Login"}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
