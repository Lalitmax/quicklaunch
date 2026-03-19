import { useState, useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";
import { getVersion } from "@tauri-apps/api/app";

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
        setUpdateInfo(update);
      }
    } catch (error) {
      console.error("Update check failed:", error);
    }
  };

  const handleUpdateClick = async () => {
    if (!updateInfo) return;

    const yes = confirm(
      `Update available: ${updateInfo.version}\n\nDo you want to install it now?`
    );

    if (yes) {
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
              className="bg-green-500 hover:bg-green-600 text-white text-[10px] px-2 py-1 rounded-md
              shadow-lg transition-all duration-200 animate-pulse hover:animate-none font-medium"
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