/**
 * Contai Generators - Tweets/Posts Generator
 * Generates punchy standalone posts for any platform
 */

import fs from 'fs';
import { getPlatformPrompt } from '../platforms/index.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate 10 punchy posts/tweets for a given platform
 * @param {string} topic - Topic for the posts
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated posts content
 */
export const generateTweets = async (topic, platform = 'twitter') => {
  console.log('Generating standalone posts...');

  const cfg = JSON.parse(fs.readFileSync('config.json', 'utf8') || '{}');
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';
  const eventTerm = terminology.event || 'events';

  // Read today's news if available
  let todayNews = null;
  const newsFile = 'TODAYnews.md';
  try {
    if (fs.existsSync(newsFile)) {
      todayNews = fs.readFileSync(newsFile, 'utf8');
    }
  } catch (e) {
    // News file not available, continue without it
  }

  const prompt = `Generate 10 PUNCHY POSTS/TWEETS about ${topic}.

${todayNews ? `REAL-TIME CONTEXT (from TODAYnews.md):
${todayNews}

USE THIS NEWS TO:
1. Reference specific ${eventTerm}s that happened recently
2. @mention people who tweeted about their experiences
3. Make it TIMELY
4. Offer help to people affected
5. Mention ${brandName} as prevention/solution
` : ''}

CRITICAL RULES:

1. A/B HOOKS FOR EVERY POST (MANDATORY):
For EACH of the 10 posts, provide 2 hook variations (Short vs Long).

2. SOUND HUMAN, NOT AI:
- Write like you're texting your friend
- Use fragments. Not full sentences.
- Be authentic. Be real.
- Avoid corporate speak

3. VISUAL PROMPTS (MANDATORY):
After every 3 posts, provide a 📸 VISUAL PROMPT for an image that fits those posts.

4. AVOID THESE AI PHRASES:
❌ "In today's digital landscape"
❌ "It's important to note"
❌ "This comprehensive guide"
❌ "Stay safe out there"
❌ "These ${problemTerm}s are just the tip of the iceberg"
❌ "Remember to always do your own research"

Now generate 10 posts that sound like a human who learned from experience:${todayNews ? ' Use the real-time news to make them TIMELY.' : ''}`;

  return await generateContent(prompt, '', platform !== 'twitter');
};

/**
 * Generate tweets with vibe modifier
 * @param {string} topic - Topic for the posts
 * @param {string} platform - Target platform
 * @param {string} vibe - Vibe modifier (aggressive, empathetic, etc.)
 * @returns {Promise<string>} Generated posts content
 */
export const generateTweetsWithVibe = async (topic, platform = 'twitter', vibe = 'helpful') => {
  const { getVibeModifier } = await import('../filters/vibe.js');
  const vibeModifier = getVibeModifier(vibe);

  const prompt = `Generate 10 PUNCHY TWEETS about ${topic}.

${vibeModifier}

RULES:
- Under 280 characters each
- 1-2 emojis max
- Sound human, not AI

Now generate the tweets:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
