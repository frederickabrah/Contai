/**
 * Contai - Main Module Exports
 * Central export point for all modules
 */

// Core modules
export { loadConfig, getBrandKnowledge, getNewsConfig } from './core/config.js';
export { getBestModel, rotateModel, FREE_TIER_MODELS, getModelInfo } from './core/models.js';
export { loadBrain, saveBrain, addCustomers, addProducts, addTrends, getMemoryContext } from './core/brain.js';
export { generateContent, genAI } from './core/generator.js';

// Filters
export {
  AI_PHRASES_TO_BAN,
  HUMAN_PHRASES,
  reflectAndRefine,
  detectAIPhrases,
  scoreHumanLikeness
} from './filters/human-like.js';

export { VIBE_MODIFIERS, getVibeModifier, getAvailableVibes } from './filters/vibe.js';

// Platforms
export { getPlatformPrompt, getAvailablePlatforms } from './platforms/index.js';

// Generators - Content Generation Functions
export { generateThread, generateThreadWithVibe } from './generators/thread.js';
export { generateTweets, generateTweetsWithVibe } from './generators/tweets.js';
export { generateHooks } from './generators/hooks.js';
export { generateCaseStudy } from './generators/case-study.js';
export { generateDMResponse } from './generators/dm.js';
export { generateInfluencerReplies } from './generators/replies.js';
export { generateReplyBait } from './generators/bait.js';
export { generateControversial } from './generators/controversial.js';

// Features - Advanced Functionality
export { generateRepurposedContent } from './features/multiply.js';
export { auditContent } from './features/audit.js';
export { generateSequence } from './features/sequence.js';
export { exportToCSV } from './features/csv-export.js';

// Utils - Helper Functions
export {
  LOG_LEVELS,
  setLogLevel,
  getLogLevel,
  debug,
  info,
  warn,
  error,
  success,
  logGeneration,
  logFileSave,
  logModelRotation,
  progressBar
} from './utils/logger.js';

export {
  VALID_PLATFORMS,
  VALID_VIBES,
  VALID_COMMANDS,
  isValidPlatform,
  isValidVibe,
  isValidCommand,
  isValidSequenceDays,
  isValidTopic,
  fileExists,
  parseArgs,
  sanitizeForFilename,
  isValidJSON,
  getValidationError
} from './utils/validators.js';
