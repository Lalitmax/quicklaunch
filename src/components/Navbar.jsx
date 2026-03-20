import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-between items-center p-4 w-screen mt-4">
        <div className="flex-1"></div>
        <h1 className="text-4xl font-bold text-center text-white">QuickLaunch</h1>
        <div className="flex-1 flex justify-end">
          <img
            onClick={() => navigate("/setting")}
            className="h-10 w-10 cursor-pointer"
            src="src/assets/settings_img.png"
            alt="Settings"
          />
        </div>
      </div>
    );
}

export default Navbar;