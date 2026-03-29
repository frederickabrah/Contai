/**
 * Contai Utils - Logger
 * Centralized logging utilities for consistent output formatting
 */

/**
 * Log levels
 */
export const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  SILENT: 4
};

let currentLevel = LOG_LEVELS.INFO;

/**
 * Set the current log level
 * @param {number} level - Log level to set
 */
export const setLogLevel = (level) => {
  currentLevel = level;
};

/**
 * Get the current log level
 * @returns {number} Current log level
 */
export const getLogLevel = () => {
  return currentLevel;
};

/**
 * Log debug message
 * @param {string} message - Message to log
 * @param {...any} args - Additional arguments
 */
export const debug = (message, ...args) => {
  if (currentLevel <= LOG_LEVELS.DEBUG) {
    console.log(`🔍 [DEBUG] ${message}`, ...args);
  }
};

/**
 * Log info message
 * @param {string} message - Message to log
 * @param {...any} args - Additional arguments
 */
export const info = (message, ...args) => {
  if (currentLevel <= LOG_LEVELS.INFO) {
    console.log(`ℹ️  [INFO] ${message}`, ...args);
  }
};

/**
 * Log warning message
 * @param {string} message - Message to log
 * @param {...any} args - Additional arguments
 */
export const warn = (message, ...args) => {
  if (currentLevel <= LOG_LEVELS.WARN) {
    console.warn(`⚠️  [WARN] ${message}`, ...args);
  }
};

/**
 * Log error message
 * @param {string} message - Message to log
 * @param {...any} args - Additional arguments
 */
export const error = (message, ...args) => {
  if (currentLevel <= LOG_LEVELS.ERROR) {
    console.error(`❌ [ERROR] ${message}`, ...args);
  }
};

/**
 * Log success message
 * @param {string} message - Message to log
 * @param {...any} args - Additional arguments
 */
export const success = (message, ...args) => {
  if (currentLevel <= LOG_LEVELS.INFO) {
    console.log(`✅ [SUCCESS] ${message}`, ...args);
  }
};

/**
 * Log generation status
 * @param {string} type - Type of content being generated
 * @param {string} status - Status message
 */
export const logGeneration = (type, status) => {
  if (currentLevel <= LOG_LEVELS.INFO) {
    console.log(`📝 [GENERATING] ${type}: ${status}`);
  }
};

/**
 * Log file save operation
 * @param {string} filename - Name of file saved
 */
export const logFileSave = (filename) => {
  if (currentLevel <= LOG_LEVELS.INFO) {
    console.log(`💾 [SAVED] ${filename}`);
  }
};

/**
 * Log model rotation
 * @param {string} fromModel - Previous model
 * @param {string} toModel - New model
 * @param {string} reason - Reason for rotation
 */
export const logModelRotation = (fromModel, toModel, reason) => {
  if (currentLevel <= LOG_LEVELS.INFO) {
    console.log(`🔄 [MODEL ROTATION] ${fromModel} → ${toModel} (${reason})`);
  }
};

/**
 * Create a progress bar
 * @param {number} current - Current progress
 * @param {number} total - Total progress
 * @param {string} label - Progress label
 */
export const progressBar = (current, total, label = '') => {
  if (currentLevel <= LOG_LEVELS.INFO) {
    const percentage = Math.round((current / total) * 100);
    const filled = Math.round((percentage / 100) * 20);
    const empty = 20 - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);
    process.stdout.write(`\r${label} [${bar}] ${percentage}% (${current}/${total})`);
    if (current >= total) {
      console.log();
    }
  }
};
