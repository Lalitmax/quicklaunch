import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Toast from "../components/Toast";
import Updater from "../components/Updater";
import Navbar from "../components/Navbar";
import AppLaunchClose from "../components/AppLaunchClose";

function Home() {
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
        <main className="flex flex-col h-screen w-screen overflow-hidden">
            <Navbar />

            <div className="flex-1 flex justify-center items-center">
                <AppLaunchClose openApp={openApp} />
            </div>

            <div className="flex justify-end items-end p-4">
                <Updater
                    onStatusChange={(status) => {
                        setToastMessage(status);
                        setShowToast(true);
                        setTimeout(() => setShowToast(false), 3000);
                    }}
                />
            </div>

            {showToast && <Toast message={toastMessage} />}
        </main>
    );
}

export default Home;
