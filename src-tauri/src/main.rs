// Prevents additional console window on Windows in both debug and release
#![windows_subsystem = "windows"]

/// Application entry point
fn main() {
    quicklaunch_lib::run()
}