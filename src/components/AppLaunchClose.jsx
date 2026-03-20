/**
 * Displays the application launcher and closer buttons
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {Function} props.openApp - Method to open an app
 *
 * @returns {JSX.Element} Rendered app launcher UI
 */
function AppLaunchClose({ openApp }) {
    return (
        <div className="flex flex-col justify-center items-center gap-6">
            <button
                className="cursor-pointer border rounded-xl px-6 py-2.5 
                w-48 text-white text-base font-medium bg-gradient-to-r from-[#667eea] to-[#764ba2] 
                hover:from-[#5a6ee0] hover:to-[#6a3f9c] shadow-lg hover:shadow-xl transition-all duration-200 
                ease-in-out hover:scale-105 active:scale-95"
                onClick={() => openApp("notepad")}
            >
                Open notepad
            </button>
        </div>
    );
}

export default AppLaunchClose;