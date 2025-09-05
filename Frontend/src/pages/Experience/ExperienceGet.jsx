import { useEffect, useState } from "react";
import { useExperience } from "../../hooks/useExperience";
import { DeleteExperience, GetExperience } from "../../services/ExperienceServices";
import { GrAdd } from "react-icons/gr";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const ExperienceGet = () => {
    const navigate = useNavigate();

  const [data, setData] = useState([]);

  const { mutate: fetchExperiences, isPending } = useExperience(GetExperience);
  const { mutate: deleteExperience } = useExperience(DeleteExperience);


  useEffect(() => {
    fetchExperiences(undefined, {
      onSuccess: (response) => {
        console.log("Experience data", response);
        setData(response.experiences || []);
      },
      onError: (error) => {
        console.log("Error in Experience", error);
      },
    });
  }, []);

  // Handler functions for buttons
  const handleAddExperience = () => {
    window.location.href = "/add-experience";
    
  };

  const handleEditExperience = (exp) => {
    navigate("/update-experience", { state: { experience: exp } });
    
  };

    const handleDeleteExperience = (expId) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
        deleteExperience(expId, {
        onSuccess: (response) => {
            console.log("Deleted Experience:", response);
            // Remove the deleted experience from local state
            setData((prevData) => prevData.filter((exp) => exp._id !== expId));
        },
        onError: (error) => {
            console.log("Error deleting experience:", error);
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
          Experience
          </h1>
          <button
            onClick={handleAddExperience}
            className="flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-3 rounded-lg hover:bg-[#3a2323] transition-colors shadow-md"
          >
            <GrAdd className="text-lg" />
            <span>Add</span>
          </button>
        </div>

        {isPending && (
          <p className="text-center text-[#1A1800]/70 italic text-lg">
            Loading experiences...
          </p>
        )}

        <div className="space-y-8 "> 
          {data?.map((exp) => (
            <div
              key={exp._id} 
              className="bg-[FFFBA5] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#1A1800]/10 relative"
            >
                <button
                onClick={() => handleDeleteExperience(exp._id)}
                className="absolute top-4 right-16 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Edit experience"
              >
                <MdDelete  className="text-[#1A1800] text-lg" /> 
              </button>

              <button
                onClick={() => handleEditExperience(exp)}
                className="absolute top-4 right-4 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Edit experience"
              >
                <IoPencil className="text-[#1A1800] text-lg" /> 
              </button>

              <div className="pr-8">
                <h2 className="text-2xl font-semibold text-[#1A1800]">
                  {exp.title} <span className="font-normal">@ {exp.company}</span>
                </h2>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[#1A1800]/80">
                  <span className="bg-[#FFFDD0] px-3 py-1 rounded-full">
                    {exp.startDate} – {exp.endDate}
                  </span>
                  <span className="bg-[#FFFDD0] px-3 py-1 rounded-full">
                    {exp.location}
                  </span>
                </div>

                <ul className="mt-4 space-y-1 text-[#1A1800]/90">
                  {exp.description.map((point, index) => (
                    <li key={index} className="flex items-start leading-relaxed">
                      <span className="text-[#1A1800] mr-2 mt-0 text-md">•</span>
                      <span className="text-base">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && !isPending && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-[#1A1800]/70">No experiences added yet.</p>
            <button
              onClick={handleAddExperience}
              className="mt-4 inline-flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-2 rounded-lg hover:bg-[#3a2323] transition-colors"
            >
              <GrAdd />
              <span>Add Your First Experience</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};