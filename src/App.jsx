import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
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
    <main className="container">
      <button onClick={() => openApp("notepad")}>Open Notepad</button>
      <span>|</span>
      <button onClick={() => openApp("firefox")}>Open Firefox</button>
      {showToast && <Toast message={toastMessage} />}
    </main>
  );
}

export default App;
