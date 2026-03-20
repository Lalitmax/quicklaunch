import { useState, useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";
import Swal from "sweetalert2";

function Updater({ onStatusChange }) {
  const [updateInfo, setUpdateInfo] = useState(null);
  const [version, setVersion] = useState("");

  // Get app version
  useEffect(() => {
    getVersion().then(setVersion);
  }, []);

  // Check for updates silently on component mount
  useEffect(() => {
    checkForUpdatesSilently();
  }, []);

  const checkForUpdatesSilently = async () => {
    try {
      const update = await check();

      if (update) {
        console.log("Update available:", update.version);
        setUpdateInfo(update);
      } else {
        console.log("No updates available - app is up to date");
      }
    } catch (error) {
      // Silently handle update check errors to avoid disrupting user experience
      // Common errors: network issues, missing signature in latest.json, etc.
      console.warn("Update check failed (this is normal if no release exists):", error.message || error);
    }
  };

  const handleUpdateClick = async () => {
    if (!updateInfo) return;

    const result = await Swal.fire({
      html: `
        <div style="text-align: center; color: #fff;">
          <div style="font-size: 1.75rem; margin-bottom: 0.5rem;">⚡</div>
          <div style="font-size: 1.05rem; font-weight: 500; margin-bottom: 0.25rem;">
            Update Available
          </div>
          <div style="font-size: 0.9rem; color: #e0e7ff; opacity: 0.9;">
            Version <b style="color: #fff; font-size: 1rem;">v${updateInfo.version}</b> is ready to install
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      background: "#667eea",
      color: "#fff",
      confirmButtonColor: "#54d075",
      cancelButtonColor: "#ffffff20",
      buttonsStyling: false,  // Disable default styling
      customClass: {
        confirmButton: 'px-3 py-1 text-md cursor-pointer rounded bg-[#764ba2] text-white hover:bg-[#464ba2] hover:scale-105 transition-all duration-200 ease-in-out',
        cancelButton: 'px-3 py-1 text-md cursor-pointer rounded bg-white/10 text-white ml-2 hover:bg-white/20 hover:scale-105 transition-all duration-200 ease-in-out'
      },
      width: "300px",
      padding: "1em",
    });

    if (result.isConfirmed) {
      onStatusChange?.("Downloading update...");

      try {
        await updateInfo.downloadAndInstall();

        onStatusChange?.("Update installed! Restarting...");
        setTimeout(async () => {
          await relaunch();
        }, 1000);
      } catch (error) {
        console.error("Update installation failed:", error);
        onStatusChange?.("Update installation failed");
      }
    }
  };

  return (
    <>
      {version && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <span className="text-white/50 text-xs">v{version}</span>
          {updateInfo && (
            <button
              onClick={handleUpdateClick}
              className="cursor-pointer bg-[#667eea] text-white text-[10px] px-2 py-1 rounded-md-500 text-white text-[10px] px-2 py-1 rounded-md
              shadow-md transition-all duration-200 animate-pulse animate-ping hover:animate-none font-medium"
              title="Click to update"
            >
              New Update
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Updater;