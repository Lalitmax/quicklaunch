import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import Toast from "../components/Toast";
import Navbar from "../components/Navbar";
import OpenCloseHandle from "../components/OpenCloseHandle";
import Updater from "../components/Updater";

function Home() {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Open url in browser method
    const openUrl = async (url, browser) => {
        try {
            const result = await invoke("open_url", { url, browser });
            console.log(result);
        } catch (error) {
            console.error(`Failed to open ${url} in ${browser}:`, error);
        }
    };

    // Open app method
    const openApp = async (appName) => {
        try {
            const result = await invoke("open_app", { app: appName });
            console.log(result);
            await new Promise(resolve => setTimeout(resolve, 400));
            setToastMessage(`${appName} opened successfully!`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 1500);
        } catch (error) {
            console.error(`Failed to open ${appName}:`, error);
            setToastMessage(`Failed to open ${appName}`);
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <main className="flex flex-col h-screen w-screen overflow-hidden select-none">
            <Navbar />

            <div className="flex-1 flex justify-center items-center">
                <OpenCloseHandle openApp={openApp} openUrl={openUrl} />
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
