import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import { getVersion } from "@tauri-apps/api/app";
import "./index.css";
import Toast from "./components/Toast";
import Updater from "./components/Updater";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [version, setVersion] = useState("");

  useEffect(() => {
    getVersion().then(setVersion);
  }, []);

  // Open app method
  const openApp = async (appName) => {
    try {
      const result = await invoke("open_app", { app: appName });
      console.log(result);
      setToastMessage(`${appName} opened successfully!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.error(`Failed to open ${appName}:`, error);
      setToastMessage(`Failed to open ${appName}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  return (
    <main className="flex justify-center items-center h-screen">
      <button
        className="bg-white/90 hover:bg-white text-purple-700 font-semibold
        px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
        onClick={() => openApp("notepad")}
      >
        Open Notepad
      </button>

      <Updater onStatusChange={(status) => {
        setToastMessage(status);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }} />

      {showToast && <Toast message={toastMessage} />}

      {version && <div className="absolute bottom-4 right-4 text-white/50 text-xs">v{version}</div>}
    </main>
  );
}

export default App;
