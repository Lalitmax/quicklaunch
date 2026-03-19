use std::process::Command;

/// Opens an application on Linux by executing it directly.
pub fn open_app(app: &str) -> Result<String, String> {
    let result = Command::new(app)
        .spawn();

    match result {
        Ok(_) => Ok(format!("{} opened successfully", app)),
        Err(e) => Err(format!("Failed to open {}: {}", app, e)),
    }
}
