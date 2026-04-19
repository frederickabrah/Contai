/**
 * Contai Generators - Influencer Replies Generator
 * Generates high-value replies to influencer tweets/posts
 */

import { loadConfig } from '../core/config.js';
import { getPlatformPrompt } from '../platforms/index.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate 3 high-value replies to an influencer's tweet/post
 * @param {string} tweetText - The original tweet/post text
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated reply content
 */
export const generateInfluencerReplies = async (tweetText, platform = 'twitter') => {
  console.log('Generating influencer replies...');

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const industry = cfg.niche?.industry || 'your industry';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';

  const platformInfo = getPlatformPrompt(platform, 'replies');

  const prompt = `Someone tweeted: "${tweetText}"

Write 3 HIGH-VALUE REPLIES that:
- Add insight about ${industry}
- Are helpful, not spammy
- Subtly mention ${brandName} as a tool/solution
- Sound like a real person, not a bot

PLATFORM: ${platformInfo.name}
${platformInfo.cta}

⚠️ CRITICAL: When mentioning ${brandName}, ALWAYS use the EXACT URL:
✅ CORRECT: "${url}"
❌ WRONG: Variations of the URL

Make each reply different:
1. Educational angle
2. Personal experience angle
3. Data-driven angle

4. VISUAL PROMPT (OPTIONAL):
Provide 1 📸 VISUAL PROMPT that would work as a reply image for the best of the 3 replies.

Now write 3 replies:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
