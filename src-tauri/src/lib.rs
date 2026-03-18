use std::process::Command;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn open_app(app: &str) -> Result<String, String> {
    #[cfg(target_os = "windows")]
    {
        let result = Command::new("cmd")
            .args(&["/C", "start", "", app])
            .spawn();

        match result {
            Ok(_) => Ok(format!("{} opened successfully", app)),
            Err(e) => Err(format!("Failed to open {}: {}", app, e)),
        }
    }

    #[cfg(target_os = "macos")]
    {
        let result = Command::new("open")
            .arg("-a")
            .arg(app)
            .spawn();

        match result {
            Ok(_) => Ok(format!("{} opened successfully", app)),
            Err(e) => Err(format!("Failed to open {}: {}", app, e)),
        }
    }

    #[cfg(target_os = "linux")]
    {
        let result = Command::new(app)
            .spawn();

        match result {
            Ok(_) => Ok(format!("{} opened successfully", app)),
            Err(e) => Err(format!("Failed to open {}: {}", app, e)),
        }
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, open_app])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
