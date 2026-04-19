/**
 * Contai Generators - Narrative/Story Generator
 * Generates personal, engaging stories to build connection and trust
 */

import { loadConfig } from '../core/config.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate an authentic personal story
 * @param {string} topic - The theme of the story
 * @param {string} platform - Target platform
 * @returns {Promise<string>} Generated story
 */
export const generateStory = async (topic, platform = 'twitter') => {
  console.log('Generating narrative story...');

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';

  const prompt = `Write an AUTHENTIC PERSONAL STORY about: "${topic}".

RULES:
- Start with a "hook moment": A specific event in time.
- Show, don't tell: Describe the sights, sounds, and feelings.
- Vulnerability is key: Share a struggle or a lesson learned.
- Relate it back to your journey: How did this change your perspective?
- No "marketing speak." No "In today's landscape." No "We are proud to announce."
- Write like a human telling a friend at a quiet bar.
- Mention ${brandName} naturally only if it fits the story arc.

Structure:
1. The Setup (The moment it started)
2. The Conflict/Struggle
3. The Turning Point
4. The Lesson/Transformation

Now write the story:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
