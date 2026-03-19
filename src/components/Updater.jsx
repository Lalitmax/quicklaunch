import { useState, useEffect } from "react";
import { check } from "@tauri-apps/plugin-updater";
import { relaunch } from "@tauri-apps/plugin-process";

function Updater({ onStatusChange }) {
  const [isChecking, setIsChecking] = useState(false);

  // Check for updates on component mount
  useEffect(() => {
    checkForUpdates();
  }, []);

  const checkForUpdates = async () => {
    setIsChecking(true);
    
    try {
      const update = await check();
      
      if (update?.available) {
        const yes = confirm(
          `Update available: ${update.version}\n\nCurrent version: 0.1.0\n\nDo you want to install it now?`
        );

        if (yes) {
          onStatusChange?.("Downloading update...");

          await update.downloadAndInstall();
          
          onStatusChange?.("Update installed! Restarting...");
          setTimeout(async () => {
            await relaunch();
          }, 1000);
        }
      } else {
        // Show "No updates available" toast
        onStatusChange?.("No updates available");
      }
    } catch (error) {
      console.error("Update check failed:", error);
      // Show "No updates available" for any error (including missing release)
      onStatusChange?.("No updates available");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <button
      className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white text-sm
      px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      onClick={checkForUpdates}
      disabled={isChecking}
    >
      {isChecking ? "Checking..." : "Check for Updates"}
    </button>
  );
}

export default Updater;