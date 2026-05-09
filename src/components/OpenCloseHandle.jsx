import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { loadData } from "../utils/storage";
import Swal from "sweetalert2";

/**
 * Displays the application launcher and closer buttons
 *
 * @component
 *
 * @param {Object} props - Component props
 * @param {Function} props.openApp - Method to open an app
 * @param {Function} props.openUrlInBrowser - Method to open a URL in a browser
 *
 * @returns {JSX.Element} Rendered app launcher UI
 */
function OpenCloseHandle({ openApp, openUrlInBrowser }) {
    const [apps, setApps] = useState([]);
    const [urls, setUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load saved apps and URLs on component mount
    useEffect(() => {
        const loadSavedData = async () => {
            try {
                const savedData = await loadData();
                if (savedData) {
                    setApps(savedData.apps || []);
                    setUrls(savedData.urls || []);
                    console.log('Loaded data:', savedData);
                }
            } catch (error) {
                console.error('Failed to load data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSavedData();
    }, []);

    // Handle opening all checked apps and URLs
    const handleOpenAll = async () => {
        const checkedApps = apps.filter(app => app.checked);
        const checkedUrls = urls.filter(url => url.checked);

        if (checkedApps.length === 0 && checkedUrls.length === 0) {
            await Swal.fire({
                html: '<strong>No Apps or URLs</strong><p>Please add and select apps or URLs to launch.</p>',
                confirmButtonColor: '#667eea',
                customClass: { popup: 'swal-compact' }
            });
            return;
        }

        // Open all checked apps
        for (const app of checkedApps) {
            try {
                await openApp(app.path);
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                console.error(`Failed to open ${app.name}:`, error);
            }
        }

        // Open all checked URLs
        for (const urlData of checkedUrls) {
            try {
                await openUrlInBrowser(urlData.url, urlData.browser);
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                console.error(`Failed to open ${urlData.url}:`, error);
            }
        }

        await Swal.fire({
            html: `<strong>✓ Launched!</strong><p>Opened ${checkedApps.length} app(s) and ${checkedUrls.length} URL(s)</p>`,
            timer: 2000,
            showConfirmButton: false,
            customClass: { popup: 'swal-compact' }
        });
    };

    // Handle closing all apps (placeholder for future implementation)
    const handleCloseAll = async () => {
        await Swal.fire({
            html: '<strong>Feature Coming Soon</strong><p>Close apps functionality will be implemented in a future update.</p>',
            confirmButtonColor: '#667eea',
            customClass: { popup: 'swal-compact' }
        });
    };

    return (
        <div className="flex flex-row justify-center items-center gap-6">
            <button
                className="group relative cursor-pointer rounded-2xl px-3 py-4
                w-56 text-white text-lg font-semibold
                bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#16a34a]
                bg-size-200 bg-pos-0 hover:bg-pos-100
                shadow-[0_8px_30px_rgba(34,197,94,0.4)]
                hover:shadow-[0_12px_40px_rgba(34,197,94,0.6)]
                transition-all duration-300 ease-out
                hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                overflow-hidden"
                onClick={handleOpenAll}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Launch Workspace'}
            </button>
            <button
                className="group relative cursor-pointer rounded-2xl px-3 py-4
                w-56 text-white text-lg font-semibold
                bg-gradient-to-br from-[#f093fb] via-[#f5576c] to-[#f093fb]
                bg-size-200 bg-pos-0 hover:bg-pos-100
                shadow-[0_8px_30px_rgba(245,87,108,0.4)]
                hover:shadow-[0_12px_40px_rgba(245,87,108,0.6)]
                transition-all duration-300 ease-out
                hover:scale-105 active:scale-95
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                overflow-hidden"
                onClick={handleCloseAll}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Close Workspace'}
            </button>
        </div>
    );
}

export default OpenCloseHandle;