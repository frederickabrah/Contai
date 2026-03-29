/**
 * Contai Generators - Thread/Post Generator
 * Generates viral threads and posts with real-time news integration
 */

import fs from 'fs';
import { getBrandKnowledge } from '../core/config.js';
import { getBestModel } from '../core/models.js';
import { loadBrain } from '../core/brain.js';
import { getPlatformPrompt } from '../platforms/index.js';
import { generateContent } from '../core/generator.js';
import { reflectAndRefine } from '../filters/human-like.js';
import { genAI } from '../core/generator.js';

const BRAIN_FILE = 'brain.json';

/**
 * Read today's news from file
 * @returns {Promise<string|null>} News content or null
 */
const readTodayNews = async () => {
  const newsFile = 'TODAYnews.md';

  try {
    if (fs.existsSync(newsFile)) {
      const newsContent = fs.readFileSync(newsFile, 'utf8');

      // Sync brain with this news before generating
      await syncBrain(newsContent);

      return `RAW NEWS DATA (AI will extract relevant info):
${newsContent}

[AI INSTRUCTION: Extract from above:
1. User handles/people mentioned (@mentions)
2. Products/services mentioned
3. Amounts/impact (losses, gains, etc.)
4. Relevant context (industry-specific)
5. Emotional quotes from people
6. Specific events/projects called out
Use this to make content TIMELY and RELEVANT. @mention people, reference specific events, make it URGENT.]`;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error reading news context:', error.message);
    return null;
  }
};

/**
 * Sync brain with news content
 * @param {string} newsContent - News content to process
 */
const syncBrain = async (newsContent) => {
  console.log('Syncing brain with local state...');
  const brain = loadBrain();
  const cfg = JSON.parse(fs.readFileSync('config.json', 'utf8') || '{}');

  const terminology = cfg.nicheSpecific?.terminology || {};
  const customerTerm = terminology.customer || 'customers';
  const productTerm = terminology.product || 'products';

  const prompt = `
EXTRACT DATA FOR LONG-TERM MEMORY:
RAW NEWS:
${newsContent}

OUTPUT ONLY JSON:
{
  "new_customers": ["@handle1", "@handle2"],
  "new_products": ["${productTerm} 1", "${productTerm} 2"],
  "new_trends": ["Trend/pattern identified"],
  "estimated_impact": "Total $ amount or impact mentioned"
}
`;

  try {
    const modelName = getBestModel();
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const data = JSON.parse(response.text().replace(/```json|```/g, '').trim());

    brain.customers = [...new Set([...brain.customers, ...(data.new_customers || [])])].slice(-100);
    brain.products = [...new Set([...brain.products, ...(data.new_products || [])])].slice(-100);
    brain.trends = [...new Set([...brain.trends, ...(data.new_trends || [])])].slice(-50);

    brain.stats.total_tracked = (brain.stats.total_tracked || 0) + (data.new_products || []).length;
    brain.stats.last_updated = new Date().toISOString().split('T')[0];

    fs.writeFileSync(BRAIN_FILE, JSON.stringify(brain, null, 2));
    console.log('Syncing state memory...');
  } catch (e) {
    console.error('Brain sync failed:', e.message);
  }
};

/**
 * Generate a viral thread/post for a given platform
 * @param {string} topic - Topic for the thread
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated thread content
 */
export const generateThread = async (topic, platform = 'twitter') => {
  console.log('Generating content thread...');

  const cfg = JSON.parse(fs.readFileSync('config.json', 'utf8') || '{}');
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const customerTerm = terminology.customer || 'customers';
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';
  const eventTerm = terminology.event || 'events';

  const todayNews = await readTodayNews();
  const platformInfo = getPlatformPrompt(platform, 'thread');

  let newsSection = '';
  let engagementRule = '';

  if (todayNews) {
    if (platform === 'twitter') {
      newsSection = `REAL-TIME CONTEXT (from TODAYnews.md):
${todayNews}

USE THIS NEWS TO:
1. @mention actual people who tweeted about their experiences
2. Reference specific ${productTerm}s related to recent ${eventTerm}s
3. Reference specific amounts/impact
4. Make it TIMELY - reference what's happening now
5. Offer ${brandName} as the solution

EXAMPLE:
"Another brutal day. @user1 lost on ${productTerm}1. @user2 had issues with ${productTerm}2.
This is why I built ${brandName}. We catch these ${problemTerm}s BEFORE you buy."`;

      engagementRule = `4. ENGAGE WITH PEOPLE (if news available):
- @mention people who tweeted about their experiences
- Reply to their pain with genuine empathy + solution
- Don't be salesy, be helpful`;
    } else {
      newsSection = `REAL-TIME CONTEXT (from TODAYnews.md):
${todayNews}

USE THIS NEWS TO:
1. Reference the EVENTS (not Twitter handles - different platform)
2. Say "people reported" instead of @mentions
3. Reference specific ${productTerm}s involved
4. Reference specific amounts/impact
5. Make it TIMELY
6. Offer ${brandName} as the solution

NOTE: Do NOT use Twitter @handles for non-Twitter platforms.`;

      engagementRule = `4. ADAPT FOR THIS PLATFORM:
- No Twitter @mentions (different user base)
- Reference events generally: "people reported" not "@user reported"
- Focus on the lesson, not individual people`;
    }
  }

  const prompt = `${platformInfo.thread} about ${topic}.

PLATFORM: ${platformInfo.name}
FORMAT: ${platformInfo.format}
LENGTH: ${platformInfo.length}
TONE: ${platformInfo.tone}
HASHTAGS: ${platformInfo.hashtags}
EMOJIS: ${platformInfo.emojis}
CTA: ${platformInfo.cta}
TIP: ${platformInfo.tips}

${newsSection}

CRITICAL RULES:

1. A/B HOOK VARIATIONS (MANDATORY):
Before the thread content, generate 3-5 different HOOK variations for the first post.
Label them: [CURIOSITY HOOK], [CONTRARIAN HOOK], [HARD TRUTH HOOK], [DATA HOOK].

2. SOUND HUMAN, NOT AI:
- Use short sentences. Like this.
- Be authentic. Be real.
- Avoid: "These 5 ${problemTerm}s are just the tip of the iceberg"
- Use: "If you see this… run. Seriously."
- Write like you're warning a friend, not writing documentation

3. MENTION ${brandName.toUpperCase()} EARLY (2nd-4th post, not just at end):
- Post 2: "Most people don't check this. That's why I built ${brandName}."
- Post 4: "This is exactly what ${brandName} scans for automatically."
- Don't wait until the end - people drop off

4. VISUAL PROMPT (MANDATORY):
At the end of the thread, provide a 📸 VISUAL PROMPT for an AI image generator (Midjourney/DALL-E) that matches the thread's theme. Make it high-quality, professional, and evocative.

${engagementRule}

Now write content that sounds like a human who wants to help others avoid ${problemTerm}s.${todayNews ? ' Use the real-time news to make it TIMELY and RELEVANT.' : ''}`;

  return await generateContent(prompt);
};

/**
 * Generate thread with vibe modifier
 * @param {string} topic - Topic for the thread
 * @param {string} platform - Target platform
 * @param {string} vibe - Vibe modifier (aggressive, empathetic, etc.)
 * @returns {Promise<string>} Generated thread content
 */
export const generateThreadWithVibe = async (topic, platform = 'twitter', vibe = 'helpful') => {
  const { getVibeModifier } = await import('../filters/vibe.js');
  const vibeModifier = getVibeModifier(vibe);
  const cfg = JSON.parse(fs.readFileSync('config.json', 'utf8') || '{}');
  const brandName = cfg.brand?.name || 'Contai';

  const todayNews = await readTodayNews();
  const platformInfo = getPlatformPrompt(platform, 'thread');

  const prompt = `${platformInfo.thread} about ${topic}.

${vibeModifier}

PLATFORM: ${platformInfo.name}
FORMAT: ${platformInfo.format}
LENGTH: ${platformInfo.length}

${todayNews ? `REAL-TIME CONTEXT:
${todayNews}

Use this news to make it timely and relevant.` : ''}

CRITICAL RULES:
1. Hook must stop scroll in 0.5 seconds
2. Sound human, not AI
3. Mention ${brandName} early (tweet 2-4)

Now write the thread:`;

  return await generateContent(prompt);
};
