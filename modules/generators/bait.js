/**
 * Contai Generators - Reply Bait Generator
 * Generates posts designed to spark engagement and replies
 */

import { loadConfig } from '../core/config.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate 5 posts designed to get replies (engagement bait)
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated reply bait posts
 */
export const generateReplyBait = async (platform = 'twitter') => {
  console.log('Generating engagement bait...');

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const industry = cfg.niche?.industry || 'your industry';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';

  const prompt = `Generate 5 POSTS DESIGNED TO GET REPLIES.

RULES:
- Ask people to comment a keyword
- Offer value in exchange
- Related to ${industry}
- Short, punchy

VISUAL PROMPT (MANDATORY):
Provide 2 📸 VISUAL PROMPTS that would make these bait posts stop the scroll.

EXAMPLES:
- "Most people never check ${productTerm}s before buying. Reply 'CHECK' and I'll show you how to spot ${problemTerm}s in seconds."
- "What's the biggest red flag you've found in a ${productTerm}? I'll analyze the top 3 replies."
- "Drop a ${productTerm} name below. I'll review it for free and tell you if it's worth it."

Now generate 5 reply bait posts:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
