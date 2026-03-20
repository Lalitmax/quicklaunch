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
                className="cursor-pointer border-2 border-white/30 rounded-xl px-8 py-3 w-52 text-white text-xl"
                onClick={() => openApp("notepad")}
            >
                Open notepad
            </button>

            <button
                className="cursor-pointer border-2 border-white/30 rounded-xl px-8 py-3 w-52 text-white text-xl"
                onClick={() => openApp("https://www.google.com")}
            >
                Open google
            </button>
        </div>
    );
}

export default AppLaunchClose;