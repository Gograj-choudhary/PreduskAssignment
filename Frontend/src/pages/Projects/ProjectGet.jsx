import { useEffect, useState } from "react";
import { useProject } from "../../hooks/useProject";
import { DeleteProject, GetProject } from "../../services/ProjectServices";
import { GrAdd } from "react-icons/gr";
import { IoPencil } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";

export const ProjectGet = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchSkill, setSearchSkill] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 2;

  const { mutate: fetchProjects, isPending } = useProject(GetProject);
  const { mutate: deleteProject } = useProject(DeleteProject);

  useEffect(() => {
    fetchProjects(undefined, {
      onSuccess: (response) => {
        console.log("Project data", response);
        setData(response.projects || []);
      },
      onError: (error) => {
        console.log("Error in Project", error);
      },
    });
  }, []);

  const handleAddProject = () => {
    window.location.href = "/add-project";
  };

  const handleEditProject = (project) => {
    navigate("/update-project", { state: { project } });
  };

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteProject(projectId, {
        onSuccess: (response) => {
          console.log("Deleted project:", response);
          setData((prevData) => prevData.filter((p) => p._id !== projectId));
        },
        onError: (error) => {
          console.log("Error deleting project:", error);
          alert("Unauthorize. Please Login");
        },
      });
    }
  };

  // Filtered projects by skill
  const filteredProjects = data.filter((proj) =>
    proj.skillsUsed?.some((skill) =>
      skill.toLowerCase().includes(searchSkill.toLowerCase())
    )
  );

  // Pagination logic
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] p-2 md:p-12 pt-24">
      <div className="max-w-6xl width-full mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1800]">
            Projects
          </h1>
          <button
            onClick={handleAddProject}
            className="flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-3 rounded-lg hover:bg-[#3a2323] transition-colors shadow-md"
          >
            <GrAdd className="text-lg" />
            <span>Add</span>
          </button>
        </div>

        {/* Search filter */}
        <div className="mb-6">
          <input
            type="text"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
            placeholder="Filter by skill (e.g., React, Node.js)"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1800]"
          />
        </div>

        {isPending && (
          <p className="text-center text-[#1A1800]/70 italic text-lg">
            Loading projects...
          </p>
        )}

        <div className="space-y-8">
          {currentProjects?.map((proj) => (
            <div
              key={proj._id}
              className="bg-[#FFFDD0] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-[#1A1800]/10 relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteProject(proj._id)}
                className="absolute top-4 right-16 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Delete Project"
              >
                <MdDelete className="text-[#1A1800] text-lg" />
              </button>

              {/* Edit Button */}
              <button
                onClick={() => handleEditProject(proj)}
                className="absolute top-4 right-4 bg-[#1A1800]/10 hover:bg-[#1A1800]/20 p-2 rounded-full transition-colors"
                aria-label="Edit Project"
              >
                <IoPencil className="text-[#1A1800] text-lg" />
              </button>

              <div className="pr-8">
                <h2 className="text-2xl font-semibold text-[#1A1800]">
                  {proj.title}
                </h2>
                {proj.links?.demo && (
                  <a
                    href={proj.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-[#1A1800]/80 hover:underline"
                    >
                    View Project <FaExternalLinkAlt className="ml-1" />
                  </a>
                )}

                {/* Skills */}
                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-[#1A1800]/80">
                  {proj.skillsUsed?.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-[#FFFBA5] px-3 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <ul className="mt-4 space-y-1 text-[#1A1800]/90">
                  {proj.description?.map((point, index) => (
                    <li
                      key={index}
                      className="flex items-start leading-relaxed"
                    >
                      <span className="text-[#1A1800] mr-2 mt-0 text-md">•</span>
                      <span className="text-base">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === i + 1
                    ? "bg-[#1A1800] text-[#FFFDD0]"
                    : "bg-[#FFFDD0] text-[#1A1800] border-[#1A1800]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {data?.length === 0 && !isPending && (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-[#1A1800]/70">No projects added yet.</p>
            <button
              onClick={handleAddProject}
              className="mt-4 inline-flex items-center gap-2 bg-[#1A1800] text-[#FFFDD0] px-4 py-2 rounded-lg hover:bg-[#3a2323] transition-colors"
            >
              <GrAdd />
              <span>Add Your First Project</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
