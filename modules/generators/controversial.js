/**
 * Contai Generators - Controversial Takes Generator
 * Generates bold, shareable controversial opinions
 */

import fs from 'fs';
import { generateContent } from '../core/generator.js';

/**
 * Generate 5 controversial opinions about an industry
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated controversial takes
 */
export const generateControversial = async (platform = 'twitter') => {
  console.log('Generating controversial takes...');

  const cfg = JSON.parse(fs.readFileSync('config.json', 'utf8') || '{}');
  const brandName = cfg.brand?.name || 'Contai';
  const industry = cfg.niche?.industry || 'your industry';
  const audience = cfg.niche?.targetAudience || 'your audience';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';

  const prompt = `Generate 5 CONTROVERSIAL OPINIONS about ${industry}.

RULES:
- Bold and confident
- Slightly confrontational
- Not offensive
- Shareable

VISUAL PROMPT (MANDATORY):
Provide 1 📸 VISUAL PROMPT for a striking, bold image to accompany these takes.

EXAMPLES:
- "Most ${audience} aren't bad at finding gems. They're bad at avoiding ${problemTerm}s."
- "If you're not using a ${productTerm} checker in 2026, you're donating money to scammers."
- "99% of 'influencers' wouldn't know a ${problemTerm} if it printed on their face."

Now generate 5 controversial takes:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
