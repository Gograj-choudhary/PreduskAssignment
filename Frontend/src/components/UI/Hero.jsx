export const Hero = () => {
  return (
    <div className="min-h-screen bg-[#FFFDD0] text-[#1A1800] flex flex-col justify-center items-center px-6 py-12">
      {/* Name */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center">
        Hi, I’m <span className="text-[#1A1800]">Gograj </span>
      </h1>

      {/* Title */}
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
        Full-Stack Developer (MERN) | B.Tech ECE @ IIIT Kottayam
      </h2>

      {/* Short Intro */}
      <p className="max-w-2xl text-lg text-center mb-10 leading-relaxed">
        I build real-world problem-solving web applications and have hands-on
        experience working on production-level projects. Currently, I’m exploring{" "}
        <span className="font-semibold">advanced backend systems</span>,{" "}
        <span className="font-semibold">modern frontend frameworks</span>, and{" "}
        <span className="font-semibold">Gen-AI</span>.
      </p>

      {/* Call-to-action buttons */}
      {/* <div className="flex space-x-6">
        <a
          href="/about"
          className="px-6 py-3 rounded-lg bg-[#1A1800] text-[#FFFDD0] font-semibold hover:opacity-90 transition"
        >
          About Me
        </a>
        <a
          href="/get-Project"
          className="px-6 py-3 rounded-lg border-2 border-[#1A1800] text-[#1A1800] font-semibold hover:bg-[#1A1800] hover:text-[#FFFDD0] transition"
        >
          View Projects
        </a>
      </div> */}
    </div>
  );
};
