/**
 * Contai Generators - Viral Hooks Generator
 * Generates attention-grabbing hooks for threads and posts
 */

import fs from 'fs';
import { generateContent } from '../core/generator.js';

/**
 * Generate 10 viral hooks for a given topic
 * @param {string} topic - Topic for the hooks
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated hooks content
 */
export const generateHooks = async (topic, platform = 'twitter') => {
  console.log('Generating viral hooks...');

  const cfg = JSON.parse(fs.readFileSync('config.json', 'utf8') || '{}');
  const brandName = cfg.brand?.name || 'Contai';
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

  const prompt = `Generate 10 VIRAL HOOKS about ${topic}.

${todayNews ? `REAL-TIME CONTEXT (from TODAYnews.md):
${todayNews}

USE THIS NEWS TO:
1. Reference specific ${eventTerm} that happened recently
2. @mention people who tweeted about their experiences
3. Make it TIMELY: "Another day, another ${problemTerm}"
` : ''}

CRITICAL RULES:
- Under 200 characters
- NO corporate speak, sound like a REAL person
- Use short, punchy sentences. Like this.
- Controversial or shocking
- Curiosity-driven, NO emojis in hooks
- Make people NEED to read the next post
- Avoid: "These 5 ${problemTerm} are just the tip of the iceberg" (sounds like AI)
- Use: "If you see this… run. Seriously." (sounds human)

EXAMPLES OF VIRAL HOOKS:
- "If a ${productTerm} has THIS feature, it's almost guaranteed to fail."
- "90% of people never check this before buying."
- "I analyzed 100 ${productTerm}s. 92 of them used the same trick."
- "Most people aren't bad at finding gems. They're bad at avoiding ${problemTerm}s."

AVOID THESE AI PHRASES:
❌ "In today's digital landscape"
❌ "It's important to note"
❌ "This comprehensive guide"
❌ "Stay safe out there"

USE THESE HUMAN PHRASES:
✅ "Here's the thing"
✅ "Real talk"
✅ "I learned this the hard way"
✅ "Let me save you the pain"
✅ "Don't be exit liquidity"

Now generate 10 hooks that sound like a human who learned from experience:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};
