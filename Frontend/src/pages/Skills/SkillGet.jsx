import { useEffect, useState } from "react";
import { useSkill } from "../../hooks/useSkill";
import { DeleteSkill, GetSkill } from "../../services/SkillServices";
import { GrAdd } from "react-icons/gr";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const SkillGet = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { mutate: fetchSkills, isPending } = useSkill(GetSkill);
  const { mutate: deleteSkill } = useSkill(DeleteSkill);

  useEffect(() => {
    fetchSkills(undefined, {
      onSuccess: (response) => {
        console.log("Skill data", response);
        setData(response.skills || []);
      },
      onError: (error) => {
        console.log("Error in Skill", error);
      },
    });
  }, []);

  const handleAddSkill = () => {
    window.location.href = "/add-skill";
  };

  const handleEditSkill = (skill) => {
    navigate("/update-skill", { state: { skill } });
  };

  const handleDeleteSkill = (skillId) => {
    if (window.confirm("Are you sure you want to delete this Skill?")) {
      deleteSkill(skillId, {
        onSuccess: (response) => {
          console.log("Deleted Skill:", response);
          setData((prevData) => prevData.filter((s) => s._id !== skillId));
        },
        onError: (error) => {
          console.log("Error deleting Skill:", error);
          alert("Unauthorize. Please Login");
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] p-2 md:p-12">
      <div className="max-w-6xl width-full mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1800]">
            Technical Skills
          </h1>
          <button
            onClick={handleAddSkill}
            className="flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-3 rounded-lg hover:bg-[#3a2323] transition-colors shadow-md"
          >
            <GrAdd className="text-lg" />
            <span>Add</span>
          </button>
        </div>

        {isPending && (
          <p className="text-center text-[#1A1800]/70 italic text-lg">
            Loading Skills...
          </p>
        )}

        <div className="space-y-8">
          {data?.map((skillObj) => (
            <div
              key={skillObj._id}
              className="bg-[#FFFDD0] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#1A1800]/10 relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteSkill(skillObj._id)}
                className="absolute top-4 right-16 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Delete Skill"
              >
                <MdDelete className="text-[#1A1800] text-lg" />
              </button>

              {/* Edit Button */}
              <button
                onClick={() => handleEditSkill(skillObj)}
                className="absolute top-4 right-4 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Edit Skill"
              >
                <IoPencil className="text-[#1A1800] text-lg" />
              </button>

              <div className="pr-8">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-[#1A1800]">
                  {skillObj.title}
                </h2>

                {/* Skills List */}
                <div className="flex flex-wrap items-center gap-2 mt-4 text-sm text-[#1A1800]/80">
                  {skillObj.skills
                    ?.split(",")
                    .map((s, index) => (
                      <span
                        key={index}
                        className="bg-[#FFFBA5] px-3 py-1 rounded-full"
                      >
                        {s.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && !isPending && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-[#1A1800]/70">No Skills added yet.</p>
            <button
              onClick={handleAddSkill}
              className="mt-4 inline-flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-2 rounded-lg hover:bg-[#3a2323] transition-colors"
            >
              <GrAdd />
              <span>Add Your First Skill</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
