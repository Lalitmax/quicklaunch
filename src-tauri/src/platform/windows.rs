use std::process::Command;
use std::os::windows::process::CommandExt;

/// Opens an application on Windows using cmd.exe.
pub fn open_app(app: &str) -> Result<String, String> {
    // Flag to prevent console window from appearing
    const CREATE_NO_WINDOW: u32 = 0x08000000;

    let result = Command::new("cmd")
        .args(&["/C", "start", "", app])
        .creation_flags(CREATE_NO_WINDOW)
        .spawn();

    match result {
        Ok(_) => Ok(format!("{} opened successfully", app)),
        Err(e) => Err(format!("Failed to open {}: {}", app, e)),
    }
}
