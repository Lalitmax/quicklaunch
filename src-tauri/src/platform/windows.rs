use std::process::Command;
use std::os::windows::process::CommandExt;

// Open an URL in given browser name
pub fn open_url_in_browser(url: &str, browser: &str) -> Result<String, String> {
    // Flag to prevent console window from appearing
    const CREATE_NO_WINDOW: u32 = 0x08000000;

    let result = Command::new("cmd")
        .args(&["/C", "start", browser, url])
        .creation_flags(CREATE_NO_WINDOW)
        .spawn();

    match result {
        Ok(_) => Ok(format!("{} opened successfully in {}", url, browser)),
        Err(e) => Err(format!("Failed to open {} in {}: {}", url, browser, e)),
    }
}

/// Open an application on Windows using cmd.exe.
pub fn open_app(app: &str) -> Result<String, String> {
    // Flag to prevent console window from appearing
    const CREATE_NO_WINDOW: u32 = 0x08000000;

    let result = Command::new("cmd")
        .args(&["/C", "start", "/B", "", app])
        .creation_flags(CREATE_NO_WINDOW)
        .spawn();

    match result {
        Ok(_) => Ok(format!("{} opened successfully", app)),
        Err(e) => Err(format!("Failed to open {}: {}", app, e)),
    }
}
