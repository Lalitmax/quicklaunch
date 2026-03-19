import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./index.css"; 
import Toast from "./components/Toast";

function App() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

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
      {showToast && <Toast message={toastMessage} />}
    </main>
  );
}

export default App;
