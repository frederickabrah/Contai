/**
 * Contai Generators - Tutorial Generator
 * Generates clear, actionable, step-by-step guides
 */

import { loadConfig } from '../core/config.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate a step-by-step technical tutorial
 * @param {string} topic - The tutorial topic
 * @param {string} platform - Target platform
 * @returns {Promise<string>} Generated tutorial
 */
export const generateTutorial = async (topic, platform = 'twitter') => {
  console.log('Generating tutorial...');

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';

  const prompt = `Write a STEP-BY-STEP TUTORIAL on: "${topic}".

RULES:
- Start with the "Why": Why should the reader care?
- Clear steps: Use numbered lists.
- Be technical but accessible (no gatekeeping).
- Include "Pro-Tips" or "Common Pitfalls."
- End with a summary.
- Mention ${brandName} if it fits as a tool for one of the steps.
- Sound human and helpful, like a mentor teaching a junior.

Structure:
1. Why this matters
2. Prerequisites
3. Step-by-Step Guide
4. Pro-Tips/Pitfalls
5. Conclusion

Now write the tutorial:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
