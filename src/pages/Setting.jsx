import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Apps from "../components/Apps";
import Urls from "../components/Urls";
import leftArrowImg from "../assets/left_arrow.png";

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
    const [activeTab, setActiveTab] = useState("apps");

    return (
        <div className="flex flex-col h-screen p-2 select-none">
            {/* Header */}
            <div className="flex justify-between items-center px-3 py-3 pb-5 w-full animate-fade-in">
                {/* Back button with glassmorphism */}
                <div className="flex-1">
                    <button
                        onClick={() => navigate("/")}
                        className="bg-white/80 group relative p-1 rounded-full glass
                            hover:bg-white/60 active:scale-95
                            transition-all duration-200 cursor-pointer
                            shadow-lg hover:shadow-xl"
                        aria-label="Go Back"
                    >
                        <img
                            className="h-9 w-9 transition-transform duration-200
                                group-hover:-translate-x-1"
                            src={leftArrowImg}
                            alt="Back"
                        />
                        {/* Tooltip */}
                        <span className="absolute -bottom-10 left-0 px-3 py-1.5 bg-gray-900/95
                            text-white text-xs rounded-lg opacity-0 group-hover:opacity-100
                            transition-opacity duration-200 pointer-events-none whitespace-nowrap
                            shadow-xl border border-white/10">
                            Go Back
                        </span>
                    </button>
                </div>

                {/* Page Title with gradient and modern styling */}
                <h1 className="text-xl font-bold text-center text-white cursor-default">
                    Add your favorite apps and <span className="text-cyan-300">browser URLs</span> for open instantly
                </h1>

                {/* Right spacer for centering */}
                <div className="flex-1"></div>
            </div>

            {/* Main Content */}
            <div className="border border-cyan-400/50 rounded-xl flex-1 flex flex-col overflow-hidden">
                <div className="flex border-b border-cyan-400/50">
                    <button
                        onClick={() => setActiveTab("apps")}
                        className={`flex-1 py-3 text-lg font-medium transition-colors cursor-pointer ${
                            activeTab === "apps" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-white/70"
                        }`}
                    >
                        APPS
                    </button>
                    <button
                        onClick={() => setActiveTab("urls")}
                        className={`flex-1 py-3 text-lg font-medium transition-colors cursor-pointer ${
                            activeTab === "urls" ? "text-cyan-400 border-b-2 border-cyan-400" : "text-white/70"
                        }`}
                    >
                        URLS
                    </button>
                </div>

                <div className="flex-1 overflow-auto">
                    {activeTab === "apps" ? <Apps /> : <Urls />}
                </div>
            </div>
        </div>
    );
}

export default Setting;
