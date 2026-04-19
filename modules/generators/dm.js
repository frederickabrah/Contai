/**
 * Contai Generators - DM Response Generator
 * Generates helpful responses to direct messages
 */

import { loadConfig } from '../core/config.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate a response to a DM question
 * @param {string} question - The DM question to respond to
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated DM response
 */
export const generateDMResponse = async (question, platform = 'twitter') => {
  console.log('Generating response...');

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const productTerm = terminology.product || 'products';
  const serviceDesc = cfg.product?.features?.[0] || 'our solution';

  const prompt = `Draft a response to this DM: "${question}"

CONTEXT:
- I'm the founder of ${brandName}
- Goal: Help them genuinely, provide value, mention our solution naturally

STRUCTURE:
1. Friendly greeting
2. Direct, helpful answer to their question
3. Offer additional value (free resource, tip, checklist)
4. Natural mention of ${brandName} (only if relevant)
5. Friendly sign-off

TONE: Warm, friendly, genuinely helpful (3-5 sentences)

Now draft the response:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
