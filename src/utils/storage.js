import { appDataDir } from '@tauri-apps/api/path';
import { readTextFile, writeTextFile, exists, mkdir } from '@tauri-apps/plugin-fs';

/**
 * Storage utility for QuickLaunch app
 * Handles saving and loading apps and URLs data to/from AppData directory
 */

const DATA_FILE_NAME = 'quicklaunch-data.json';

/**
 * Get the full path to the data file
 * @returns {Promise<string>} Full path to the data file
 */
async function getDataFilePath() {
    const appDataPath = await appDataDir();
    // Ensure proper path separator between directory and filename
    const separator = appDataPath.endsWith('\\') || appDataPath.endsWith('/') ? '' : '\\';
    return `${appDataPath}${separator}${DATA_FILE_NAME}`;
}

/**
 * Ensure the app data directory exists
 * @returns {Promise<void>}
 */
async function ensureDataDirExists() {
    const appDataPath = await appDataDir();
    const dirExists = await exists(appDataPath);
    
    if (!dirExists) {
        await mkdir(appDataPath, { recursive: true });
        console.log('Created app data directory:', appDataPath);
    }
}

/**
 * Save apps and URLs data to persistent storage
 * @param {Object} data - The data to save
 * @param {Array} data.apps - Array of app objects
 * @param {Array} data.urls - Array of URL objects
 * @returns {Promise<boolean>} True if save was successful
 */
export async function saveData(data) {
    try {
        await ensureDataDirExists();
        const filePath = await getDataFilePath();
        
        const dataToSave = {
            apps: data.apps || [],
            urls: data.urls || [],
            lastUpdated: new Date().toISOString()
        };
        
        await writeTextFile(filePath, JSON.stringify(dataToSave, null, 2));
        console.log('Data saved successfully to:', filePath);
        return true;
    } catch (error) {
        console.error('Failed to save data:', error);
        return false;
    }
}

/**
 * Load apps and URLs data from persistent storage
 * @returns {Promise<Object|null>} The loaded data or null if file doesn't exist
 */
export async function loadData() {
    try {
        const filePath = await getDataFilePath();
        const fileExists = await exists(filePath);
        
        if (!fileExists) {
            console.log('No saved data found, returning null');
            return null;
        }
        
        const fileContent = await readTextFile(filePath);
        const data = JSON.parse(fileContent);
        
        console.log('Data loaded successfully from:', filePath);
        return {
            apps: data.apps || [],
            urls: data.urls || []
        };
    } catch (error) {
        console.error('Failed to load data:', error);
        return null;
    }
}

/**
 * Save only apps data
 * @param {Array} apps - Array of app objects
 * @returns {Promise<boolean>} True if save was successful
 */
export async function saveApps(apps) {
    try {
        const existingData = await loadData() || { apps: [] };
        return await saveData({ ...existingData, apps });
    } catch (error) {
        console.error('Failed to save apps:', error);
        return false;
    }
}

/**
 * Save only URLs data
 * @param {Array} urls - Array of URL objects
 * @returns {Promise<boolean>} True if save was successful
 */
export async function saveUrls(urls) {
    try {
        const existingData = await loadData() || { apps: [] };
        return await saveData({ ...existingData, urls });
    } catch (error) {
        console.error('Failed to save URLs:', error);
        return false;
    }
}

/**
 * Get the app data directory path (for debugging)
 * @returns {Promise<string>} The app data directory path
 */
export async function getAppDataPath() {
    return await appDataDir();
}

