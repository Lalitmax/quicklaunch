use std::process::Command;

/// Opens an application on macOS using the 'open' command.
pub fn open_app(app: &str) -> Result<String, String> {
    let result = Command::new("open")
        .arg("-a")
        .arg(app)
        .spawn();

    match result {
        Ok(_) => Ok(format!("{} opened successfully", app)),
        Err(e) => Err(format!("Failed to open {}: {}", app, e)),
    }
}
