use std::process::Command;
use std::os::windows::process::CommandExt;

// Open an URL in given browser name
pub fn open_url(url: &str, browser: &str) -> Result<String, String> {
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

// Map browser full name to process name for closing
fn get_browser_process_name(browser: &str) -> &str {
    match browser {
        "Google Chrome" => "chrome.exe",
        "Microsoft Edge" => "msedge.exe",
        "Firefox" => "firefox.exe",
        "Safari" => "Safari.exe",
        _ => browser, // fallback to the browser name itself
    }
}

// Close an application using taskkill.
pub fn close_app(app: &str) -> Result<String, String> {
    // Flag to prevent console window from appearing
    const CREATE_NO_WINDOW: u32 = 0x08000000;

    // Extract process name if it's a path and add .exe if needed
    let process_name = if app.contains('\\') || app.contains('/') {
        // Extract filename from path
        let filename = app.split('\\').last()
            .or_else(|| app.split('/').last())
            .unwrap_or(app);
        if filename.ends_with(".exe") {
            filename.to_string()
        } else {
            format!("{}.exe", filename)
        }
    } else if app.ends_with(".exe") {
        app.to_string()
    } else {
        // Add .exe extension if not present
        format!("{}.exe", app)
    };

    let result = Command::new("taskkill")
        .args(&["/F", "/IM", &process_name])
        .creation_flags(CREATE_NO_WINDOW)
        .output();

    match result {
        Ok(output) => {
            if output.status.success() {
                Ok(format!("{} closed successfully", app))
            } else {
                let stderr = String::from_utf8_lossy(&output.stderr);
                if stderr.contains("not found") {
                    Err(format!("{} is not running", app))
                } else {
                    Err(format!("Failed to close {}: {}", app, stderr))
                }
            }
        }
        Err(e) => Err(format!("Failed to close {}: {}", app, e)),
    }
}

// Close a URL by closing the browser application.
pub fn close_url(browser: &str) -> Result<String, String> {
    let process_name = get_browser_process_name(browser);
    close_app(process_name)
}
