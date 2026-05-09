//! Platform-specific application launcher implementations

// Windows platform
#[cfg(target_os = "windows")]
mod windows;
#[cfg(target_os = "windows")]
pub use windows::{open_app, open_url, close_app, close_url};

// macOS platform
#[cfg(target_os = "macos")]
mod macos;
#[cfg(target_os = "macos")]
pub use macos::open_app;

// Linux platform
#[cfg(target_os = "linux")]
mod linux;
#[cfg(target_os = "linux")]
pub use linux::open_app;