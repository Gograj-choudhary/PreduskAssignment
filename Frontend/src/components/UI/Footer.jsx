export const Footer = () => {
  return (
    <footer className="bg-[#1A1800] text-[#FFFDD0] py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left: Copyright */}
        <p className="text-sm text-center md:text-left">
          © {new Date().getFullYear()} Gograj Dadarwal. All Rights Reserved.
        </p>

        {/* Right: Links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <a
            href="https://www.linkedin.com/in/gograj-dadarwal-3343b4255/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#FFFBA5] transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Gograj-choudhary"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-[#FFFBA5] transition"
          >
            GitHub
          </a>
          <p
            className="hover:text-[#FFFBA5] transition"
          >
            Mail  -  gograjchoudhary781@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};
