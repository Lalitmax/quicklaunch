mod platform;

/// Opens an application using platform-specific methods.
#[tauri::command]
fn open_app(app: &str) -> Result<String, String> {
    platform::open_app(app)
}

/// Initializes and runs the Tauri application.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .invoke_handler(tauri::generate_handler![open_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}