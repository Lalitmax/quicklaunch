import { useNavigate } from "react-router-dom";
import settingsImg from "../assets/settings_img.png";

/**
 * Displays the application header with settings icon
 *
 * @component
 *
 * @returns {JSX.Element} Rendered navbar UI
 */
function Navbar() {
    const navigate = useNavigate();

    return (
      <div className="flex justify-between items-center px-6 py-5 w-full animate-fade-in">
        {/* Left spacer for centering */}
        <div className="flex-1"></div>

        {/* App Title with gradient and modern styling */}
        <h1 className="text-4xl font-bold text-center text-white tracking-tight
          drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]
          hover:scale-105 transition-transform duration-300 cursor-default">
          Quick<span className="text-cyan-300">Launch</span>
        </h1>

        {/* Settings button with glassmorphism */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={() => navigate("/setting")}
            className="bg-white/10 group relative p-2 rounded-xl glass
              hover:bg-white/15 active:scale-95
              transition-all duration-200 cursor-pointer
              shadow-lg hover:shadow-xl"
            aria-label="Settings"
          >
            <img
              className="h-8 w-8 transition-transform duration-200
                group-hover:rotate-90 group-hover:scale-110"
              src={settingsImg}
              alt="Settings"
            />
            {/* Tooltip */}
            <span className="absolute -bottom-10 right-0 px-3 py-1.5 bg-gray-900/95
              text-white text-xs rounded-lg opacity-0 group-hover:opacity-100
              transition-opacity duration-200 pointer-events-none whitespace-nowrap
              shadow-xl border border-white/10">
              Settings
            </span>
          </button>
        </div>
      </div>
    );
}

export default Navbar;