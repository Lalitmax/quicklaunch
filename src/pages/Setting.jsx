import { useNavigate } from "react-router-dom";

/**
 * Setting Component
 *
 * Displays the application settings page
 *
 * @component
 *
 * @returns {JSX.Element} Rendered settings UI
 */
function Setting() {
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center p-4 w-screen mt-4">
            <div className="flex-1 flex justify-left">
                <img
                    onClick={() => navigate("/")}
                    className="h-10 w-10 cursor-pointer bg-white rounded-full p-0.5"
                    src="src/assets/left_arrow.png"
                    alt="Settings"
                />
            </div>
            <h1 className="text-xl font-medium text-center text-white">Add daily favorate apps and brouser urls</h1>
            <div className="flex-1"></div>
        </div>
    );
}

export default Setting;
