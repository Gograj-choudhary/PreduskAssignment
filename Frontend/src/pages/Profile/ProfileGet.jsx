import { useEffect, useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { DeleteProfile, GetProfile } from "../../services/ProfileServices";
import { GrAdd } from "react-icons/gr";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const ProfileGet = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const { mutate: fetchProfiles, isPending } = useProfile(GetProfile);
  const { mutate: deleteProfile } = useProfile(DeleteProfile);

  useEffect(() => {
    fetchProfiles(undefined, {
      onSuccess: (response) => {
        console.log("Profile data", response);
        setData(response.profiles || []);
      },
      onError: (error) => {
        console.log("Error in Profile", error);
      },
    });
  }, []);

  const handleAddProfile = () => {
    navigate("/add-Profile");
  };

  const handleEditProfile = (profile) => {
    navigate("/update-Profile", { state: { profile } });
  };

  const handleDeleteProfile = (profileId) => {
    if (window.confirm("Are you sure you want to delete this Profile?")) {
      deleteProfile(profileId, {
        onSuccess: (response) => {
          console.log("Deleted Profile:", response);
          setData((prevData) => prevData.filter((p) => p._id !== profileId));
        },
        onError: (error) => {
          console.log("Error deleting Profile:", error);
          alert("Failed to delete Profile. Please try again.");
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] p-2 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1800]">
            Profile
          </h1>
          <button
            onClick={handleAddProfile}
            className="flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-3 rounded-lg hover:bg-[#3a2323] transition-colors shadow-md"
          >
            <GrAdd className="text-lg" />
            <span>Add</span>
          </button>
        </div>

        {isPending && (
          <p className="text-center text-[#1A1800]/70 italic text-lg">
            Loading Profiles...
          </p>
        )}

        <div className="space-y-8">
          {data?.map((profile) => (
            <div
              key={profile._id}
              className="bg-[#FFFBA5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#1A1800]/10 relative"
            >
              {/* Action buttons */}
              <button
                onClick={() => handleDeleteProfile(profile._id)}
                className="absolute top-4 right-16 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Delete Profile"
              >
                <MdDelete className="text-[#1A1800] text-lg" />
              </button>

              <button
                onClick={() => handleEditProfile(profile)}
                className="absolute top-4 right-4 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Edit Profile"
              >
                <IoPencil className="text-[#1A1800] text-lg" />
              </button>

              {/* Profile Info */}
              <div className="pr-8">
                <h2 className="text-2xl font-semibold text-[#1A1800]">
                  {profile.name}
                </h2>
                <p className="text-[#1A1800]/80 text-sm">{profile.email}</p>

                {/* Education */}
                <div className="mt-4">
                  <h3 className="font-semibold text-lg">Education</h3>
                  <ul className="list-disc list-inside text-[#1A1800]/90 mt-2">
                    {profile.education?.map((edu) => (
                      <li key={edu._id}>
                        {edu.degree} in {edu.field} @ {edu.institute}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                {profile.links && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-lg">Links</h3>
                    <a
                      href={profile.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      GitHub
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && !isPending && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-[#1A1800]/70">No Profiles added yet.</p>
            <button
              onClick={handleAddProfile}
              className="mt-4 inline-flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-2 rounded-lg hover:bg-[#3a2323] transition-colors"
            >
              <GrAdd />
              <span>Add Your First Profile</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
