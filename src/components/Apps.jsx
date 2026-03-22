import { useState } from "react";
import appMappings from "../data/appMappings.json";
import Toast from "./Toast";

import { saveApps, loadData } from "../utils/storage";
import { useEffect } from "react";
/**
 * Displays the application list
 *
 * @component
 *
 * @returns {JSX.Element} Rendered app list UI
 */
function Apps() {
    const [apps, setApps] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [openMenuId, setOpenMenuId] = useState(null);

    // Load saved apps on component mount
    useEffect(() => {
        const loadSavedApps = async () => {
            const savedData = await loadData();
            if (savedData && savedData.apps && savedData.apps.length > 0) {
                setApps(savedData.apps);
                console.log('Loaded apps from storage:', savedData.apps);
            } else {
                // Default apps if no saved data
                setApps([]);
            }
        };

        loadSavedApps();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        if (openMenuId === null) return;
        const handleClickOutside = () => setOpenMenuId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openMenuId]);

    // Toggle app checked state and save to storage
    const toggleApp = (id) => {
        const updatedApps = apps.map(app => app.id === id ? { ...app, checked: !app.checked } : app);
        setApps(updatedApps);
        saveApps(updatedApps);
    };

    const handleRemoveApp = (id) => {
        const updatedApps = apps.filter(app => app.id !== id);
        setApps(updatedApps);
        saveApps(updatedApps);
        setOpenMenuId(null);
    };

    const toggleMenu = (id, e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenMenuId(openMenuId === id ? null : id);
    };

    // Search function that matches keywords
    const handleSearch = (value) => {
        setSearchTerm(value);

        if (value.trim().length > 0) {
            const searchLower = value.toLowerCase();
            const suggestions = appMappings.apps.filter(app => {
                // Check if app name or any keyword matches
                const nameMatch = app.name.toLowerCase().includes(searchLower);
                const keywordMatch = app.keywords.some(keyword =>
                    keyword.toLowerCase().includes(searchLower)
                );
                // Show all matching apps (removed the notAdded filter)
                return nameMatch || keywordMatch;
            }).slice(0, 5); // Limit to 5 suggestions

            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    };

    // Add app to list and save to storage
    const handleAddApp = (appData = null) => {
        // Early return if no app data and search term is empty
        if (!searchTerm.trim()) {
            setToastMessage("You can't add an empty app!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
            return;
        }

        if (appData) {
            // Add from suggestion - check if already exists
            const alreadyExists = apps.some(existingApp => existingApp.name === appData.name);

            if (alreadyExists) {
                setToastMessage("App already added!");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
                return;
            }

            // Generate unique ID based on max existing ID
            const maxId = apps.length > 0 ? Math.max(...apps.map(app => app.id)) : 0;
            const newApp = {
                id: maxId + 1,
                name: appData.name,
                path: appData.path,
                icon: appData.icon,
                checked: false
            };
            const updatedApps = [...apps, newApp];
            setApps(updatedApps);
            saveApps(updatedApps);
            setSearchTerm("");
            setSearchSuggestions([]);
        } else if (searchTerm.trim()) {
            // Check if the app exists in appMappings.json
            const searchLower = searchTerm.toLowerCase();
            const foundInMappings = appMappings.apps.find(app =>
                app.name.toLowerCase() === searchLower ||
                app.keywords.some(keyword => keyword.toLowerCase() === searchLower)
            );

            // If not found in mappings, show toast and return
            if (!foundInMappings) {
                setToastMessage("App may not be found in system!");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2500);
                return;
            }

            // Check if already exists
            const alreadyExists = apps.some(existingApp => existingApp.name === foundInMappings.name);

            if (alreadyExists) {
                setToastMessage("App already added!");
                setShowToast(true);
                setTimeout(() => setShowToast(false), 2000);
                return;
            }

            // Generate unique ID based on max existing ID
            const maxId = apps.length > 0 ? Math.max(...apps.map(app => app.id)) : 0;
            // Add the app from mappings
            const newApp = {
                id: maxId + 1,
                name: foundInMappings.name,
                path: foundInMappings.path,
                icon: foundInMappings.icon,
                checked: false
            };

            // Update apps state and save to storage
            setApps(prev => {
                const updated = [...prev, newApp];
                saveApps(updated);
                return updated;
            });

            // Clear search and suggestions
            setSearchTerm("");
            setSearchSuggestions([]);
        }
    };

    return (
        <div className="flex flex-col h-full p-2">
            <div className="grid grid-cols-3 gap-1.5 flex-1 mb-4 overflow-y-auto scrollbar-hide pr-2 content-start">
                {apps.map((app) => (
                    <label key={app.id} className="flex items-center cursor-pointer w-full h-fit">
                        <div className="flex items-center gap-1.5 px-2 py-2.5 rounded-lg bg-white/5 hover:bg-white/10
                            transition-all duration-200 cursor-pointer w-full
                            hover:scale-[1.02] active:scale-[0.98] relative">

                            <input
                                type="checkbox"
                                checked={app.checked}
                                onChange={() => toggleApp(app.id)}
                                className="accent-cyan-400 w-3.5 h-3.5 cursor-pointer shrink-0"
                            />

                            <span className="text-lg shrink-0">{app.icon}</span>

                            <span className="text-white text-base font-medium
                                hover:text-cyan-300 transition-colors truncate flex-1 min-w-0">
                                {app.name}
                            </span>

                            {/* Three-dot menu button */}
                            <div className="relative ml-auto shrink-0">
                                <button
                                    onClick={(e) => toggleMenu(app.id, e)}
                                    className="cursor-pointer text-white/50 hover:text-white/90 px-3 py-1 rounded hover:bg-white/10 transition-all text-lg"
                                >
                                    ⋮
                                </button>

                                {/* Context menu */}
                                {openMenuId === app.id && (
                                    <div onClick={(e) => e.stopPropagation()} className="absolute -top-1 right-8 mt-1 bg-gray-800 border border-red-400/50 rounded-lg shadow-lg overflow-hidden z-10 min-w-[100px]">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleRemoveApp(app.id);
                                            }}
                                            className="cursor-pointer w-full px-4 py-2 text-left text-red-400 hover:bg-red-400/20 transition-colors text-sm whitespace-nowrap"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </label>
                ))}
            </div>

            {/* Search and Add - Fixed at bottom */}
            <div className="relative">
                {/* Suggestions dropdown */}
                {searchSuggestions.length > 0 && (
                    <div className="absolute bottom-full mb-2 w-1/2 bg-gray-800 border border-cyan-400/50 rounded-lg overflow-hidden shadow-lg max-h-48 overflow-y-auto">
                        {searchSuggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onClick={() => handleAddApp(suggestion)}
                                className="flex items-center gap-3 px-4 py-2 hover:bg-cyan-400/20 cursor-pointer transition-colors"
                            >
                                <span className="text-xl">{suggestion.icon}</span>
                                <span className="text-white text-sm font-medium">{suggestion.name}</span>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Search bar */}
                <div className="flex items-center gap-2 border border-white/10 rounded-xl 
                    bg-gray-800/80 backdrop-blur-md px-1 py-1 shadow-lg
                    focus-within:ring-2 focus-within:ring-cyan-500/40 transition-all">

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddApp()}
                        placeholder="Search and add apps..."
                        className="flex-1 bg-transparent px-3 py-2 text-white 
                        placeholder-gray-400 outline-none text-sm focus:placeholder-gray-500"
                    />

                    <button
                        onClick={handleAddApp}
                        className="cursor-pointer px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 
                        text-white text-sm font-medium 
                        hover:from-cyan-400 hover:to-blue-500 
                        hover:shadow-[0_4px_20px_rgba(6,182,212,0.4)]
                        active:scale-95 transition-all duration-200"
                    >
                        Add
                    </button>

                </div>
            </div>

            {/* Toast notification */}
            {showToast && <Toast message={toastMessage} />}
        </div>
    );
}

export default Apps;