import { useState } from "react";
import Swal from "sweetalert2";
import GetIcon from "./GetIcon";
import Toast from "./Toast";
import { saveUrls, loadData } from "../utils/storage";
import { useEffect } from "react";

/**
 * Displays the URL list
 *
 * @component
 *
 * @returns {JSX.Element} Rendered URL list UI
 */
function Urls() {
    const [urls, setUrls] = useState([]);
    const [inputUrl, setInputUrl] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [tooltip, setTooltip] = useState(null);
    const [toastMessage, setToastMessage] = useState("");
    const [showToast, setShowToast] = useState(false);

    // Toggle URL checked state and save to storage
    const toggleUrl = (id) => {
        const updatedUrls = urls.map(url => url.id === id ? { ...url, checked: !url.checked } : url);
        setUrls(updatedUrls);
        saveUrls(updatedUrls);
    };

    // Load saved URLs on component mount
    useEffect(() => {
        const loadSavedUrls = async () => {
            const savedData = await loadData();
            if (savedData && savedData.urls && savedData.urls.length > 0) {
                // Ensure all URLs have a checked property for backward compatibility
                const urlsWithChecked = savedData.urls.map(url => ({
                    ...url,
                    checked: url.checked !== undefined ? url.checked : false
                }));
                setUrls(urlsWithChecked);
                console.log('Loaded URLs from storage:', urlsWithChecked);
            } else {
                setUrls([]);
            }
        };

        loadSavedUrls();
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        if (openMenuId === null) return;
        const handleClickOutside = () => setOpenMenuId(null);
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openMenuId]);

    // Validate URL
    function isValidURL(url) {
        console.log("Validating URL:", url);

        if (url.startsWith("http://") || url.startsWith("https://")) {
            return true;
        } else if (url.startsWith("www.")) {
            return true;
        } else {
            setIsValid(true);
            setTimeout(() => setIsValid(false), 2000);
            return false;
        }
    }

    const handleRemoveUrl = (id) => {
        const updatedUrls = urls.filter(url => url.id !== id);
        setUrls(updatedUrls);
        saveUrls(updatedUrls);
        setOpenMenuId(null);
    };

    const toggleMenu = (id) => {
        setOpenMenuId(openMenuId === id ? null : id);
    };

    const handleAddUrl = async () => {
        // Early return if no URL entered
        if (!inputUrl.trim()) {
            setToastMessage("You can't add an empty URL!");
            setShowToast(true);
            setTimeout(() => setShowToast(false), 2500);
            return;
        }

        // Validate URL
        if (!isValidURL(inputUrl)) {
            return;
        }

        // Check if URL already exists
        const alreadyExists = urls.some(existingUrl => existingUrl.url === inputUrl);

        if (alreadyExists) {
            setIsValid(true);
            setTimeout(() => setIsValid(false), 2000);
            return;
        }

        // Variable to store selected browser
        let selectedBrowser = null;

        // Confirm the browser selection name
        const result = await Swal.fire({
            title: 'Select Browser 🌐',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            html: `
                <style>
                    .browser-btn {
                        padding: 0.6rem 0.8rem;
                        border: 2px solid rgba(255, 255, 255, 0.2);
                        border-radius: 8px;
                        background: rgba(255, 255, 255, 0.1);
                        color: white;
                        cursor: pointer;
                        font-size: 0.85rem;
                        font-weight: 600;
                        transition: all 0.2s;
                        width: 100px;
                        height: 70px;
                    }
                    .browser-btn:hover {
                        border-color: rgba(255, 255, 255, 0.5);
                        background: rgba(255, 255, 255, 0.2);
                    }
                </style>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.8rem; margin-top: 1rem;">
                    <button class="browser-btn" data-browser="Google Chrome">🌈<br>Chrome</button>
                    <button class="browser-btn" data-browser="Microsoft Edge">🟦<br>Edge</button>
                    <button class="browser-btn" data-browser="Firefox">🦊<br>Firefox</button>
                    <button class="browser-btn" data-browser="Safari">🧭<br>Safari</button>
                </div>
            `,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText: 'Cancel',
            didOpen: () => {
                document.querySelectorAll('.browser-btn').forEach(btn => {
                    btn.onclick = () => {
                        selectedBrowser = btn.dataset.browser;
                        Swal.clickConfirm();
                    };
                });
            },
            preConfirm: () => {
                return selectedBrowser;
            }
        });

        // Check if user selected a browser (not cancelled)
        if (result.isConfirmed && result.value) {
            // Generate unique ID based on max existing ID
            const maxId = urls.length > 0 ? Math.max(...urls.map(url => url.id)) : 0;
            const newUrl = {
                id: maxId + 1,
                browser: result.value,
                url: inputUrl,
                checked: false
            };
            setUrls((prev) => {
                const updated = [...prev, newUrl];
                saveUrls(updated);
                return updated;
            });
            setInputUrl("");
        }
    };

    return (
        <div className="flex flex-col h-full p-2">
            {/* URL List */}
            <div className="flex flex-col gap-2 flex-1 mb-2 overflow-y-auto">
                {urls.map((url) => (
                    <label
                        key={url.id}
                        className="flex items-center gap-3 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10
                                   border border-white/10 transition-all duration-150 relative cursor-pointer"
                    >
                        {/* Checkbox */}
                        <input
                            type="checkbox"
                            checked={url.checked}
                            onChange={() => toggleUrl(url.id)}
                            className="accent-cyan-400 w-3.5 h-3.5 cursor-pointer shrink-0"
                        />

                        <GetIcon browserName={url.browser} />
                        <div className="flex flex-col flex-1 min-w-0 relative">
                            <span
                                className="text-blue-100 text-md font-medium truncate cursor-default select-text"
                                onMouseEnter={(e) => {
                                    if (e.target.scrollWidth > e.target.clientWidth) {
                                        setTooltip({ id: url.id, text: url.url });
                                    }
                                }}
                                onMouseLeave={() => setTooltip(null)}
                            >
                                {url.url}
                            </span>
                            <span className="text-white/70 text-xs truncate">
                                {url.browser}
                            </span>
                            {tooltip?.id === url.id && (
                                <div className="absolute left-0 top-full mt-1 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg z-50 w-[86%] break-all">
                                    {tooltip.text}
                                </div>
                            )}
                        </div>

                        {/* Three-dot menu button */}
                        <div className="relative">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleMenu(url.id);
                                }}
                                className="cursor-pointer text-white/50 hover:text-white/90 px-3 py-1 rounded hover:bg-white/10 transition-all text-lg"
                            >
                                ⋮
                            </button>

                            {/* Context menu */}
                            {openMenuId === url.id && (
                                <div onClick={(e) => e.stopPropagation()} className="absolute -top-1 right-8 mt-1 bg-gray-800 border border-red-400/50 rounded-lg shadow-lg overflow-hidden z-10 min-w-[100px]">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleRemoveUrl(url.id);
                                        }}
                                        className="cursor-pointer w-full px-4 py-2 text-left text-red-400 hover:bg-red-400/20 transition-colors text-sm whitespace-nowrap"
                                    >
                                        Remove
                                    </button>
                                </div>
                            )}
                        </div>
                    </label>
                ))}
            </div>

            {/* Add URL */}
            <div className="sticky bottom-0 w-full">
                <div className="flex items-center gap-2 border border-white/10 rounded-xl 
                bg-gray-800/80 backdrop-blur-md px-1 py-1 shadow-lg">

                    <input
                        type="text"
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddUrl()}
                        placeholder="Enter a valid URL..."
                        className="flex-1 bg-transparent px-3 py-2 text-white placeholder-gray-400 
                        outline-none text-sm focus:placeholder-gray-500"
                    />

                    <button
                        onClick={handleAddUrl}
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
            {isValid && <Toast message="URL already exists or invalid!" />}
            {showToast && <Toast message={toastMessage} />}
        </div>
    );
}

export default Urls;