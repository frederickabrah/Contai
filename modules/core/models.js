/**
 * Contai Core - Model Rotation System
 * Handles automatic rotation between free tier Gemini models
 */

// Available free tier models (2026)
export const FREE_TIER_MODELS = [
  { name: 'gemini-2.5-flash-lite', priority: 1, maxRPM: 15, maxRPD: 1000 },
  { name: 'gemini-2.5-flash', priority: 2, maxRPM: 10, maxRPD: 250 },
  { name: 'gemini-2.5-pro', priority: 3, maxRPM: 5, maxRPD: 100 }
];

let modelFailures = {};
let dailyQuotaExceeded = {};
let lastResetTime = Date.now();

/**
 * Get best available model based on quota and failures
 * @returns {string} Model name to use
 */
export const getBestModel = () => {
  const now = Date.now();

  // Reset per-minute counters every minute
  if (now - lastResetTime > 60000) {
    modelFailures = {};
    lastResetTime = now;
  }

  // Try models in priority order, skipping those with daily quota exceeded
  for (let i = 0; i < FREE_TIER_MODELS.length; i++) {
    const model = FREE_TIER_MODELS[i];
    const failures = modelFailures[model.name] || 0;
    const quotaExceeded = dailyQuotaExceeded[model.name] || false;

    // Skip if daily quota exceeded
    if (quotaExceeded) {
      console.log(`⏭️  Skipping ${model.name} - daily quota exceeded`);
      continue;
    }

    // Skip if failed 3+ times this minute
    if (failures >= 3) continue;

    return model.name;
  }

  // Fallback to flash-lite (highest quota) - reset its quota flag
  if (dailyQuotaExceeded['gemini-2.5-flash-lite']) {
    console.log('⚠️  All models at quota limit, trying flash-lite anyway...');
    dailyQuotaExceeded['gemini-2.5-flash-lite'] = false;
  }
  
  return 'gemini-2.5-flash-lite';
};

/**
 * Rotate to next model on failure
 * @param {string} failedModel - Name of failed model
 * @param {string} errorMessage - Error message from API
 */
export const rotateModel = (failedModel, errorMessage = '') => {
  modelFailures[failedModel] = (modelFailures[failedModel] || 0) + 1;
  
  // Check if this is a daily quota error (check for multiple patterns)
  const isQuotaError = errorMessage.includes('quota') || 
                       errorMessage.includes('Quota') ||
                       errorMessage.includes('limit') ||
                       errorMessage.includes('Limit');
  
  if (isQuotaError) {
    dailyQuotaExceeded[failedModel] = true;
    console.log(`🚫 Model ${failedModel} DAILY quota exceeded, rotating to next model...`);
  } else {
    console.log(`⚠️  Model ${failedModel} failed ${modelFailures[failedModel]} times (per minute), rotating...`);
  }
  
  // Reset daily quota flags after 1 hour (conservative estimate)
  setTimeout(() => {
    dailyQuotaExceeded[failedModel] = false;
    console.log(`🔄 Reset daily quota flag for ${failedModel}`);
  }, 60 * 60 * 1000);
};

/**
 * Get model info by name
 * @param {string} modelName - Model name
 * @returns {Object} Model info
 */
export const getModelInfo = (modelName) => {
  return FREE_TIER_MODELS.find(m => m.name === modelName) || FREE_TIER_MODELS[0];
};
