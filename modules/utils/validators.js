/**
 * Contai Utils - Validators
 * Input validation utilities for CLI arguments and data
 */

/**
 * Valid platforms supported by Contai
 */
export const VALID_PLATFORMS = ['twitter', 'linkedin', 'instagram', 'facebook'];

/**
 * Valid vibe modifiers
 */
export const VALID_VIBES = ['aggressive', 'empathetic', 'sarcastic', 'scientific', 'minimalist', 'helpful'];

/**
 * Valid commands
 */
export const VALID_COMMANDS = [
  'thread', 'hooks', 'tweets', 'case', 'dm', 'replies',
  'bait', 'hot-takes', 'daily', 'week', 'batch',
  'multiply', 'audit', 'csv', 'sequence', 'trends', 'trend-content',
  'help', '--help', '-h', '--version', '-v'
];

/**
 * Validate platform name
 * @param {string} platform - Platform to validate
 * @returns {boolean} Whether platform is valid
 */
export const isValidPlatform = (platform) => {
  return VALID_PLATFORMS.includes(platform?.toLowerCase());
};

/**
 * Validate vibe modifier
 * @param {string} vibe - Vibe to validate
 * @returns {boolean} Whether vibe is valid
 */
export const isValidVibe = (vibe) => {
  return VALID_VIBES.includes(vibe?.toLowerCase());
};

/**
 * Validate command
 * @param {string} command - Command to validate
 * @returns {boolean} Whether command is valid
 */
export const isValidCommand = (command) => {
  return VALID_COMMANDS.includes(command?.toLowerCase());
};

/**
 * Validate sequence days
 * @param {string|number} days - Days to validate
 * @returns {boolean} Whether days is valid (3 or 5)
 */
export const isValidSequenceDays = (days) => {
  const numDays = parseInt(days, 10);
  return numDays === 3 || numDays === 5;
};

/**
 * Validate topic string
 * @param {string} topic - Topic to validate
 * @returns {boolean} Whether topic is valid (non-empty string)
 */
export const isValidTopic = (topic) => {
  return typeof topic === 'string' && topic.trim().length > 0;
};

/**
 * Validate file path exists
 * @param {string} filePath - File path to validate
 * @returns {boolean} Whether file exists
 * @note For synchronous file checks, use fs.existsSync() directly in calling code
 */
export const fileExists = (filePath) => {
  // This is a placeholder - use fs.existsSync() directly for sync checks
  // Kept for API compatibility
  return false;
};

/**
 * Parse CLI arguments
 * @param {Array<string>} args - Process arguments
 * @returns {Object} Parsed arguments object
 */
export const parseArgs = (args) => {
  const result = {
    command: null,
    topic: null,
    platform: 'twitter',
    vibe: 'helpful',
    days: 3,
    file: null
  };

  // Skip node and script path
  const cleanArgs = args.slice(2);

  if (cleanArgs.length === 0) {
    return result;
  }

  result.command = cleanArgs[0]?.toLowerCase();

  for (let i = 1; i < cleanArgs.length; i++) {
    const arg = cleanArgs[i];

    if (arg.startsWith('--vibe=')) {
      result.vibe = arg.split('=')[1]?.toLowerCase() || 'helpful';
    } else if (arg === '3' || arg === '5') {
      result.days = parseInt(arg, 10);
    } else if (VALID_PLATFORMS.includes(arg.toLowerCase())) {
      result.platform = arg.toLowerCase();
    } else if (!arg.startsWith('--') && !result.topic) {
      result.topic = arg;
    }
  }

  return result;
};

/**
 * Sanitize topic for filename
 * @param {string} topic - Topic to sanitize
 * @returns {string} Sanitized topic string
 */
export const sanitizeForFilename = (topic) => {
  return topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Validate JSON content
 * @param {string} content - Content to validate
 * @returns {boolean} Whether content is valid JSON
 */
export const isValidJSON = (content) => {
  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get validation error message
 * @param {string} type - Type of validation that failed
 * @param {string} value - Invalid value
 * @returns {string} Error message
 */
export const getValidationError = (type, value) => {
  const errors = {
    platform: `Invalid platform: "${value}". Valid platforms: ${VALID_PLATFORMS.join(', ')}`,
    vibe: `Invalid vibe: "${value}". Valid vibes: ${VALID_VIBES.join(', ')}`,
    command: `Unknown command: "${value}". Use "node contai.js help" for usage.`,
    days: `Invalid days: "${value}". Must be 3 or 5 for sequence command.`,
    topic: 'Topic is required for this command.',
    file: `File not found: "${value}"`
  };

  return errors[type] || `Validation error: ${value}`;
};
