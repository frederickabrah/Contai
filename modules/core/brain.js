/**
 * Contai Core - Brain Memory System
 * Handles long-term memory storage and retrieval
 */

import fs from 'fs';

const BRAIN_FILE = 'brain.json';

/**
 * Load brain memory from file
 * @returns {Object} Brain memory object
 */
export const loadBrain = () => {
  try {
    if (fs.existsSync(BRAIN_FILE)) {
      return JSON.parse(fs.readFileSync(BRAIN_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('❌ Error loading brain.json:', e.message);
  }
  
  // Generic structure for any niche
  return {
    customers: [],      // People mentioned (victims, users, etc.)
    products: [],       // Products/topics tracked
    trends: [],         // Industry trends/patterns
    stats: {},
    successful_hooks: []
  };
};

/**
 * Save brain memory to file
 * @param {Object} brain - Brain memory object
 */
export const saveBrain = (brain) => {
  try {
    fs.writeFileSync(BRAIN_FILE, JSON.stringify(brain, null, 2));
  } catch (e) {
    console.error('❌ Error saving brain.json:', e.message);
  }
};

/**
 * Add customers to brain
 * @param {Array} customers - Array of customer names/handles
 */
export const addCustomers = (customers) => {
  const brain = loadBrain();
  brain.customers = [...new Set([...brain.customers, ...customers])].slice(-100);
  saveBrain(brain);
};

/**
 * Add products to brain
 * @param {Array} products - Array of product names
 */
export const addProducts = (products) => {
  const brain = loadBrain();
  brain.products = [...new Set([...brain.products, ...products])].slice(-100);
  saveBrain(brain);
};

/**
 * Add trends to brain
 * @param {Array} trends - Array of trend strings
 */
export const addTrends = (trends) => {
  const brain = loadBrain();
  brain.trends = [...new Set([...brain.trends, ...trends])].slice(-50);
  saveBrain(brain);
};

/**
 * Get memory context for prompts
 * @param {Object} terminology - Terminology from config
 * @returns {string} Formatted memory context
 */
export const getMemoryContext = (terminology = {}) => {
  const brain = loadBrain();
  const customerTerm = terminology.customer || 'customers';
  const productTerm = terminology.product || 'products';
  const eventTerm = terminology.event || 'events';

  return `
HISTORICAL CONTEXT (from Brain):
- ${customerTerm} we've helped: ${brain.customers.slice(0, 10).join(', ') || 'None yet'}
- ${productTerm} we've tracked: ${brain.products.slice(0, 10).join(', ') || 'None yet'}
- Total ${eventTerm} tracked: ${brain.stats.total_tracked || 0}
- Common Patterns: ${brain.trends.slice(0, 5).join('; ') || 'None yet'}
Use this to show authority and "wisdom." Reference past ${productTerm} if relevant.`;
};
