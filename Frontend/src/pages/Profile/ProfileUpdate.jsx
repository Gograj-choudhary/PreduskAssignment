import { useLocation } from "react-router-dom";
import { useProfile } from "../../hooks/useProfile";
import { UpdateProfile } from "../../services/ProfileServices";

export const ProfileUpdate = () => {
  const { mutate, isPending, isError, error } = useProfile(UpdateProfile);
  const location = useLocation();
  const { profile } = location.state || {};
  console.log("Profile Data in Update Page:", profile);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Nest education inside an array
    data.education = [
      {
        degree: data.degree || "",
        field: data.field || "",
        institute: data.institute || "",
      },
    ];

    // Nest links object
    data.links = {
      github: data.github || "",
    };

    // Keep profile ID
    data._id = profile._id;

    console.log("Profile Data to Update:", data);

    mutate(data, {
      onSuccess: (response) => {
        console.log("Profile Updated:", response);
        window.location.href = "/get-Profile";
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] p-2 md:p-12 flex justify-center">
      <form
        onSubmit={handleUpdateProfile}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Update Profile</h1>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={profile?.name || ""}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={profile?.email || ""}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium mb-1">Degree</label>
          <input
            type="text"
            name="degree"
            defaultValue={profile?.education?.[0]?.degree || ""}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Field</label>
          <input
            type="text"
            name="field"
            defaultValue={profile?.education?.[0]?.field || ""}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Institute</label>
          <input
            type="text"
            name="institute"
            defaultValue={profile?.education?.[0]?.institute || ""}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Links */}
        <div>
          <label className="block text-sm font-medium mb-1">GitHub</label>
          <input
            type="url"
            name="github"
            defaultValue={profile?.links?.github || ""}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => (window.location.href = "/get-Profile")}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 bg-[#1A1800] text-[#FFFDD0] rounded-lg hover:bg-[#3a2323]"
          >
            {isPending ? "Updating..." : "Update"}
          </button>
        </div>

        {/* Error message */}
        {isError && (
          <p className="text-red-600 text-center mt-2">
            {error?.message || "Failed to update profile"}
          </p>
        )}
      </form>
    </div>
  );
};
