#!/usr/bin/env node

/**
 * CONTAI - Universal AI Content Generator
 * 
 * A command-line utility for generating platform-optimized content 
 * using the Google Gemini 2.5 Flash model.
 * 
 * Usage:
 * node contai.js thread [topic]     - Generate viral thread
 * node contai.js hooks [topic]      - Generate 10 viral hooks
 * node contai.js tweets [topic]     - Generate 10 quick posts
 * node contai.js case [topic]       - Generate case study
 * node contai.js dm [question]      - Generate DM response
 * node contai.js replies [tweet]    - Generate influencer replies
 * node contai.js bait               - Generate reply bait posts
 * node contai.js hot-takes          - Generate controversial takes
 * node contai.js daily              - Generate daily content package
 * node contai.js week               - Generate full week (7 days)
 * node contai.js batch              - Generate 2 weeks of content
 * 
 * Features:
 * - Style Mirroring via local DNA analysis
 * - Platform-specific prompting (Twitter, LinkedIn, Instagram, Facebook)
 * - Model rotation for API quota management
 * - Automated version checking and updates
 */

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs, { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import https from 'https';
import readline from 'readline';
import { execSync } from 'child_process';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// ============================================================================
// VERSION & UPDATE MANAGEMENT
// ============================================================================
const REPO_URL = 'https://raw.githubusercontent.com/frederickabrah/Contai/main/package.json';

/**
 * Retrieves current version from package.json
 */
const getVersion = () => {
  try {
    const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
    return pkg.version || '1.0.0';
  } catch (e) {
    return '1.0.0';
  }
};

/**
 * Checks for new versions against the remote repository
 */
const checkForUpdates = async () => {
  const currentVersion = getVersion();
  
  return new Promise((resolve) => {
    https.get(REPO_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const remotePkg = JSON.parse(data);
          const remoteVersion = remotePkg.version;

          if (remoteVersion && isNewerVersion(currentVersion, remoteVersion)) {
            console.log(`\n✨ Update available: v${currentVersion} -> v${remoteVersion}`);
            const rl = readline.createInterface({
              input: process.stdin,
              output: process.stdout
            });

            rl.question('👉 Update to latest version? (y/n): ', (answer) => {
              rl.close();
              if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                performUpdate(remoteVersion).then(resolve);
              } else {
                resolve();
              }
            });
          } else {
            resolve();
          }
        } catch (e) {
          resolve();
        }
      });
    }).on('error', () => {
      resolve();
    });
  });
};

/**
 * Semantic version comparison
 */
const isNewerVersion = (current, remote) => {
  const c = current.split('.').map(Number);
  const r = remote.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (r[i] > c[i]) return true;
    if (r[i] < c[i]) return false;
  }
  return false;
};

/**
 * Executes the git-based update process
 */
const performUpdate = async (newVersion) => {
  console.log(`\nUpdating to v${newVersion}...`);
  try {
    if (!fs.existsSync('.git')) {
      console.error('Error: Repository not initialized with Git.');
      return;
    }

    // Preserve local changes
    execSync('git stash', { stdio: 'ignore' });

    // Pull remote changes
    execSync('git pull origin main --rebase', { stdio: 'inherit' });

    // Refresh dependencies
    execSync('npm install', { stdio: 'inherit' });

    // Restore local changes
    try {
      execSync('git stash pop', { stdio: 'ignore' });
    } catch (e) {}

    console.log(`\nUpdated to v${newVersion}. Please restart.`);
    process.exit(0);
  } catch (error) {
    console.error(`Update failed: ${error.message}`);
  }
};

// ============================================================================
// CONFIGURATION HANDLER
// ============================================================================
let config = null;

/**
 * Loads and parses config.json with fallback defaults
 */
const loadConfig = () => {
  if (config) return config;

  try {
    if (fs.existsSync('config.json')) {
      config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
      return config;
    }
  } catch (e) {
    console.error('Config parse error:', e.message);
  }

  // Generic fallback configuration
  config = {
    brand: {
      name: 'Contai',
      tagline: 'The AI-Powered Content Engine',
      url: 'https://github.com/frederickabrah/Contai',
      scarcity: ''
    },
    niche: {
      industry: 'Content Marketing',
      targetAudience: 'Content Creators',
      painPoints: ['Slow production', 'Inconsistent voice']
    },
    brandVoice: {
      tone: 'Direct, educational',
      style: 'Technical expert'
    },
    product: {
      features: ['Automated generation', 'Style mirroring'],
      pricing: { free: 'Open source' }
    },
    content: {
      pillars: { educational: '70%', product: '30%' },
      topics: ['AI Automation']
    }
  };

  return config;
};

// ============================================================================
// PLATFORM-SPECIFIC PROMPT BUILDER (MOVED TO TOP)
// ============================================================================
const getPlatformPrompt = (platform, contentType) => {
  const platforms = {
    twitter: {
      name: 'Twitter/X',
      thread: `Write a VIRAL TWITTER THREAD`,
      tweets: `Generate 10 PUNCHY TWEETS`,
      hooks: `Generate 10 VIRAL TWITTER HOOKS`,
      length: '280 characters per tweet',
      tone: 'Direct, punchy, conversational',
      hashtags: '2-3 hashtags max',
      emojis: 'Use emojis strategically (🔴🟢⚠️🛡️🚨)',
      format: 'Number tweets (1/8, 2/8)',
      cta: 'Link in last tweet or bio',
      tips: 'Hook must stop scroll in 0.5 seconds'
    },
    linkedin: {
      name: 'LinkedIn',
      thread: `Write a PROFESSIONAL LINKEDIN POST`,
      tweets: `Generate 10 LINKEDIN POSTS`,
      hooks: `Generate 10 LINKEDIN HOOKS`,
      length: '1,300 characters (LinkedIn limit)',
      tone: 'Professional but authentic, industry insights',
      hashtags: '3-5 relevant hashtags',
      emojis: 'Minimal emojis (professional)',
      format: 'Long-form, paragraphs, bullet points',
      cta: 'Professional CTA (learn more, connect)',
      tips: 'Lead with value, establish credibility'
    },
    instagram: {
      name: 'Instagram',
      thread: `Write an INSTAGRAM CAPTION`,
      tweets: `Generate 10 INSTAGRAM CAPTIONS`,
      hooks: `Generate 10 INSTAGRAM HOOKS`,
      length: '2,200 characters (but keep engaging)',
      tone: 'Visual, emotional, story-driven',
      hashtags: '10-15 hashtags (mix popular + niche)',
      emojis: 'Emoji-heavy (visual storytelling)',
      format: 'Hook + value + CTA, line breaks',
      cta: 'Link in bio, DM for info',
      tips: 'First 125 characters must hook (visible before "...more")'
    },
    facebook: {
      name: 'Facebook',
      thread: `Write a FACEBOOK POST`,
      tweets: `Generate 10 FACEBOOK POSTS`,
      hooks: `Generate 10 FACEBOOK HOOKS`,
      length: '250-400 characters (optimal engagement)',
      tone: 'Mixed (casual + informative), community-focused',
      hashtags: '1-3 hashtags',
      emojis: 'Moderate emojis (relatable)',
      format: 'Short paragraphs, questions, shareable',
      cta: 'Share, comment, tag friends',
      tips: 'Ask questions to drive comments'
    }
  };
  
  return platforms[platform] || platforms.twitter;
};

// ============================================================================
// MODEL ROTATION SYSTEM (Free Tier Optimization)
// ============================================================================
// Available free tier models (2026):
// - gemini-2.5-pro: 5 RPM, 100 RPD (highest quality, lowest quota)
// - gemini-2.5-flash: 10 RPM, 250 RPD (balanced)
// - gemini-2.5-flash-lite: 15 RPM, 1000 RPD (lowest quality, highest quota)

const FREE_TIER_MODELS = [
  { name: 'gemini-2.5-flash-lite', priority: 1, maxRPM: 15, maxRPD: 1000 },
  { name: 'gemini-2.5-flash', priority: 2, maxRPM: 10, maxRPD: 250 },
  { name: 'gemini-2.5-pro', priority: 3, maxRPM: 5, maxRPD: 100 }
];

let currentModelIndex = 0;
let modelFailures = {};
let lastResetTime = Date.now();

// Get best available model
const getBestModel = () => {
  const now = Date.now();
  
  // Reset counters every minute
  if (now - lastResetTime > 60000) {
    modelFailures = {};
    lastResetTime = now;
  }
  
  // Try models in priority order
  for (let i = 0; i < FREE_TIER_MODELS.length; i++) {
    const model = FREE_TIER_MODELS[i];
    const failures = modelFailures[model.name] || 0;
    
    // Skip if failed 3+ times this minute
    if (failures >= 3) continue;
    
    return model.name;
  }
  
  // Fallback to flash-lite (highest quota)
  return 'gemini-2.5-flash-lite';
};

// Rotate to next model on failure
const rotateModel = (failedModel) => {
  modelFailures[failedModel] = (modelFailures[failedModel] || 0) + 1;
  console.log(`Model ${failedModel} failed ${modelFailures[failedModel]} times, rotating...`);
};

// ============================================================================
// LONG-TERM MEMORY (brain.json management)
// ============================================================================
const BRAIN_FILE = 'brain.json';

const loadBrain = () => {
  try {
    if (fs.existsSync(BRAIN_FILE)) {
      return JSON.parse(fs.readFileSync(BRAIN_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading brain.json:', e.message);
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

const saveBrain = (brain) => {
  try {
    fs.writeFileSync(BRAIN_FILE, JSON.stringify(brain, null, 2));
  } catch (e) {
    console.error('Error saving brain.json:', e.message);
  }
};

const syncBrain = async (newsContent) => {
  console.log('Syncing brain with local state...');
  const brain = loadBrain();
  const cfg = loadConfig();

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

    // Update brain with generic terms
    brain.customers = [...new Set([...brain.customers, ...(data.new_customers || [])])].slice(-100);
    brain.products = [...new Set([...brain.products, ...(data.new_products || [])])].slice(-100);
    brain.trends = [...new Set([...brain.trends, ...(data.new_trends || [])])].slice(-50);

    brain.stats.total_tracked = (brain.stats.total_tracked || 0) + (data.new_products || []).length;
    brain.stats.last_updated = new Date().toISOString().split('T')[0];

    saveBrain(brain);
    console.log('Syncing state memory...');
  } catch (e) {
    console.error('Brain sync failed:', e.message);
  }
};

// ============================================================================
// REAL-TIME NEWS READER (Industry news integration)
// ============================================================================
const readTodayNews = async () => {
  const newsFile = 'TODAYnews.md';

  try {
    if (fs.existsSync(newsFile)) {
      const newsContent = fs.readFileSync(newsFile, 'utf8');
      console.log(`Read news context (${newsContent.length} chars)\n`);

      // Sync brain with this news before generating
      await syncBrain(newsContent);

      // Return the raw content - AI will parse and use what's relevant
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
      console.log('News context not found. Generating without local news.\n');
      return null;
    }
  } catch (error) {
    console.error('Error reading news context:', error.message);
    return null;
  }
};

// ============================================================================
// STYLE DNA READER (Identity Injector)
// ============================================================================
const readStyleDNA = () => {
  const styleFile = 'my-style.txt';
  const exampleFile = 'my-style.example.txt';

  try {
    if (fs.existsSync(styleFile)) {
      const content = fs.readFileSync(styleFile, 'utf8');
      return `
USER WRITING STYLE DNA (Mimic this exactly):
${content}

ANALYSIS INSTRUCTIONS:
1. Extract sentence rhythm and length patterns.
2. Identify unique vocabulary, slang, and "insider" terms.
3. Mimic the specific emoji usage (sparse vs heavy).
4. Note the level of aggression, empathy, or wit.
5. DO NOT sound like AI. Sound like the person who wrote the examples above.
`;
    } else if (fs.existsSync(exampleFile)) {
      console.log('Tip: Create my-style.txt with your own writing to unlock Style Mirroring.\n');
      return '';
    }
  } catch (e) {
    console.error('Error reading style DNA:', e.message);
  }
  return '';
};

// ============================================================================
// BRAND KNOWLEDGE BUILDER (Dynamic from config.json)
// ============================================================================
const buildBrandKnowledge = () => {
  const cfg = loadConfig();
  const styleDNA = readStyleDNA();

  const brandName = cfg.brand?.name || 'Contai';
  const tagline = cfg.brand?.tagline || 'Your tagline';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const scarcity = cfg.brand?.scarcity || '';
  
  const industry = cfg.niche?.industry || 'Your industry';
  const audience = cfg.niche?.targetAudience || 'Your audience';
  const painPoints = cfg.niche?.painPoints?.join(', ') || 'Common problems';
  
  const tone = cfg.brandVoice?.tone || 'Direct, helpful';
  const style = cfg.brandVoice?.style || 'Like a knowledgeable friend';
  
  const features = cfg.product?.features?.join(', ') || 'Great features';
  const pricing = Object.entries(cfg.product?.pricing || {})
    .map(([tier, desc]) => `${tier.toUpperCase()}: ${desc}`)
    .join(', ') || 'Flexible pricing';
  
  const pillars = cfg.content?.pillars || {};
  const educational = pillars.educational || '40%';
  const caseStudies = pillars.caseStudies || '30%';
  const engagement = pillars.engagement || '20%';
  const product = pillars.product || '10%';

  const terminology = cfg.nicheSpecific?.terminology || {};
  const customerTerm = terminology.customer || 'customers';
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';
  const eventTerm = terminology.event || 'events';

  return `
${styleDNA}

BRAND IDENTITY:
- Name: ${brandName}
- Tagline: ${tagline}
- URL: ${url}
${scarcity ? `- Scarcity: "${scarcity}"` : ''}

INDUSTRY & AUDIENCE:
- Industry: ${industry}
- Target: ${audience}
- Pain Points: ${painPoints}

BRAND VOICE:
- Tone: ${tone}
- Style: ${style}

PRODUCT/SERVICE:
- Features: ${features}
- Pricing: ${pricing}

CONTENT STRATEGY:
- ${educational} Educational (teach something valuable)
- ${caseStudies} Case Studies (breakdowns/examples)
- ${engagement} Engagement (questions, polls, discussions)
- ${product} Product/Service mentions

TERMINOLOGY:
- Call customers: ${customerTerm}
- Call products: ${productTerm}
- Call problems: ${problemTerm}
- Call industry news: ${eventTerm}

CRITICAL BRANDING RULE:
When mentioning ${brandName}, ALWAYS use the EXACT URL:
✅ CORRECT: "${url}"
❌ WRONG: Variations of the URL

This is non-negotiable. Use "${url}" every time.
`;
};

// ============================================================================
// REFLECTION LAYER (Self-Critique & Refinement)
// ============================================================================
const reflectAndRefine = async (content, originalPrompt, modelName) => {
  console.log('Analyzing content for authenticity...');
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';

  const critiquePrompt = `
You are a Viral Content Editor.
Review the content below and provide a refinement.

ORIGINAL CONTENT:
${content}

CRITICAL RULES:
1. Is the hook scroll-stopping? (Must be punchy, curiosity-driven)
2. Does it sound like AI? (Avoid: "In today's landscape", "important to note", "comprehensive")
3. Is it authentic/real? (Sound like a genuine human)
4. Is it concise? (Remove unnecessary words)
5. ⚠️ URL RULE: If there is a link to ${brandName}, it MUST be EXACTLY "${url}".
   DO NOT use variations of the URL.

If it scores below 8/10, rewrite it to be better.
Otherwise, return the original.

OUTPUT ONLY THE FINAL REFINED CONTENT:`;

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(critiquePrompt);
    const response = await result.response;
    return response.text().trim();
  } catch (e) {
    console.error('Reflection failed, using original:', e.message);
    return content;
  }
};

// ============================================================================
// CORE GENERATION FUNCTION (with model rotation + brain + reflection)
// ============================================================================
const generateContent = async (prompt, context = '', skipReflection = false) => {
  let attempts = 0;
  const maxAttempts = 3;
  const brain = loadBrain();
  const cfg = loadConfig();
  const brandKnowledge = buildBrandKnowledge();

  // Get terminology from config
  const terminology = cfg.nicheSpecific?.terminology || {};
  const customerTerm = terminology.customer || 'customers';
  const productTerm = terminology.product || 'products';
  const eventTerm = terminology.event || 'events';

  // Inject Long-Term Memory context (generic)
  const memoryContext = `
HISTORICAL CONTEXT (from Brain):
- ${customerTerm} we've helped: ${brain.customers.slice(0, 10).join(', ') || 'None yet'}
- ${productTerm} we've tracked: ${brain.products.slice(0, 10).join(', ') || 'None yet'}
- Total ${eventTerm} tracked: ${brain.stats.total_tracked || 0}
- Common Patterns: ${brain.trends.slice(0, 5).join('; ') || 'None yet'}
Use this to show authority and "wisdom." Reference past ${productTerm} if relevant.`;

  while (attempts < maxAttempts) {
    try {
      const modelName = getBestModel();
      console.log(`Using model: ${modelName}`);

      const model = genAI.getGenerativeModel({
        model: modelName,
        apiVersion: 'v1'
      });

      const fullPrompt = `${brandKnowledge}\n\n${memoryContext}\n\n${context}\n\n${prompt}`;

      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      let finalContent = response.text();

      // Apply Reflection Layer
      if (!skipReflection) {
        finalContent = await reflectAndRefine(finalContent, prompt, modelName);
      }

      return finalContent;
    } catch (error) {
      attempts++;
      const failedModel = error.message.includes('model') ? 'current' : 'unknown';
      rotateModel(failedModel);

      if (attempts >= maxAttempts) {
        console.error('All model attempts failed:', error.message);
        return null;
      }

      console.log(`Attempt ${attempts}/${maxAttempts} failed, trying next model...`);
    }
  }

  return null;
};
// ============================================================================
// VIRAL HOOK GENERATOR (ChatGPT's #1 recommendation)
// ============================================================================
const generateHooks = async (topic, platform = 'twitter') => {
  console.log('Generating viral hooks...');
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';

  const todayNews = await readTodayNews();

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

// ============================================================================
// THREAD/POST GENERATOR (with real-time news + human-like + platform)
// ============================================================================
const generateThread = async (topic, platform = 'twitter') => {
  console.log('Generating content thread...');
  const cfg = loadConfig();
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

// ============================================================================
// QUICK POSTS/TWEETS GENERATOR (with real-time news + human-like)
// ============================================================================
const generateTweets = async (topic, platform = 'twitter') => {
  console.log('Generating standalone posts...');
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';
  const eventTerm = terminology.event || 'events';

  const todayNews = await readTodayNews();

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

// ============================================================================
// CASE STUDY GENERATOR (storytelling, not documentation)
// ============================================================================
const generateCaseStudy = async (topic, platform = 'twitter') => {
  console.log('Generating case study...');
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const customerTerm = terminology.customer || 'customers';
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';
  const eventTerm = terminology.event || 'events';

  const prompt = `Write a detailed CASE STUDY/BREAKDOWN about ${topic}.

CRITICAL RULES:

1. TELL A STORY, DON'T JUST LIST FACTS:
- Start with the impact: "People lost $500K. Here's how."
- Make it personal: "I saw this and knew it was going to fail"
- Use emotion: Anger, frustration, triumph

2. SOUND HUMAN:
- Write like you're telling a story at a bar
- Use short sentences. Fragments.
- Be passionate about the issue
- Empathetic to affected ${customerTerm}s

3. VISUAL PROMPT (MANDATORY):
At the end, provide a 📸 VISUAL PROMPT for a data-driven or atmospheric image that represents the case study.

STRUCTURE:
1. HOOK (1-2 sentences about the impact + emotion)
2. TIMELINE (story format, not bullet points)
3. RED FLAGS MISSED (3-5 specific things, told as story)
4. LESSONS LEARNED (actionable, personal)
5. HOW ${brandName.toUpperCase()} WOULD'VE HELPED (natural mention)

TONE:
- Educational but passionate
- Empathetic to affected ${customerTerm}s
- Angry at the root cause
- Helpful to readers

LENGTH: 600-800 words

Now write a case study that sounds like a human telling a story, not a robot documenting facts:`;

  return await generateContent(prompt, '', platform !== 'twitter');
};

// ============================================================================
// DM RESPONSE GENERATOR
// ============================================================================
const generateDMResponse = async (question, platform = 'twitter') => {
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

// ============================================================================
// INFLUENCER REPLY ENGINE (Growth hack from ChatGPT)
// ============================================================================
const generateInfluencerReplies = async (tweetText, platform = 'twitter') => {
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

// ============================================================================
// REPLY BAIT GENERATOR (Growth hack from ChatGPT)
// ============================================================================
const generateReplyBait = async (platform = 'twitter') => {
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

// ============================================================================
// CONTROVERSIAL TAKES GENERATOR (Growth hack from ChatGPT)
// ============================================================================
const generateControversial = async (platform = 'twitter') => {
  console.log('Generating controversial takes...');
  const cfg = loadConfig();
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

// ============================================================================
// DAILY CONTENT PACKAGE
// ============================================================================
const generateDailyContent = async (platform = 'twitter') => {
  console.log('Generating daily package...');
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const industry = cfg.niche?.industry || 'your industry';
  const topics = cfg.content?.topics || ['industry tips', 'common mistakes', 'best practices'];

  console.log('Includes:');
  console.log('- 1 viral thread/post (with hook optimization)');
  console.log('- 3 quick posts/tweets');
  console.log('- 1 controversial take');
  console.log('- 1 reply bait post');
  console.log('- 5 influencer replies\n');

  const date = new Date().toISOString().split('T')[0];

  // Get topics from config or use generics
  const topic1 = topics[0] || 'industry tips';
  const topic2 = topics[1] || 'common mistakes';
  const influencerTopic = topics[2] || 'industry trends';

  const daily = {
    date: date,
    platform: platform,
    thread: await generateThread(topic1, platform),
    tweets: await generateTweets(topic2, platform),
    controversial: await generateControversial(platform),
    replyBait: await generateReplyBait(platform),
    influencerReplies: await generateInfluencerReplies(influencerTopic, platform)
  };

  // Save to file
  const filename = `daily-content-${date}.json`;
  fs.writeFileSync(filename, JSON.stringify(daily, null, 2));
  console.log(`\nContent saved to ${filename}`);

  return daily;
};

// ============================================================================
// FULL BATCH GENERATOR (2 weeks of content)
// ============================================================================
const generateBatchContent = async (platform = 'twitter') => {
  console.log('Generating batch content...');
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const industry = cfg.niche?.industry || 'your industry';
  const topics = cfg.content?.topics || [
    '5 common mistakes in ' + industry,
    'How to avoid ' + industry.toLowerCase() + ' problems',
    'Best practices for ' + industry.toLowerCase(),
    'Industry secrets revealed',
    'My complete process',
    'Comparison guide'
  ];

  const batch = {
    generated: new Date().toISOString(),
    platform: platform,
    threads: [],
    tweets: [],
    caseStudies: []
  };

  // Generate 6 threads from config topics
  const threadTopics = topics.slice(0, 6);
  for (const topic of threadTopics) {
    console.log(`\nGenerating thread: ${topic}`);
    const thread = await generateThread(topic, platform);
    batch.threads.push({ topic, content: thread });
  }

  // Generate quick tweets from config topics
  const tweetTopics = topics.slice(0, 5);
  for (const topic of tweetTopics) {
    console.log(`\nGenerating posts: ${topic}`);
    const tweets = await generateTweets(topic, platform);
    batch.tweets.push({ topic, content: tweets });
  }

  // Generate 2 case studies (use example products/topics from config or generic)
  const caseStudyTopics = [
    cfg.niche?.painPoints?.[0] || 'Common problem #1',
    cfg.niche?.painPoints?.[1] || 'Common problem #2'
  ];

  for (const topic of caseStudyTopics) {
    console.log(`\nGenerating case study: ${topic}`);
    const caseStudy = await generateCaseStudy(topic, platform);
    batch.caseStudies.push({ topic, content: caseStudy });
  }

  // Save to file
  const filename = `content-batch-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(filename, JSON.stringify(batch, null, 2));

  console.log('\nBATCH CONTENT GENERATED');
  console.log(`- ${batch.threads.length} threads/posts`);
  console.log(`- ${batch.tweets.length} post sets (25+ posts)`);
  console.log(`- ${batch.caseStudies.length} case studies`);
  console.log(`\nSaved to ${filename}`);

  return batch;
};

// ============================================================================
// CLI INTERFACE
// ============================================================================
const showHelp = () => {
  console.log(`
🤖 AI GROWTH ENGINE - UNIVERSAL CONTENT GENERATOR

Setup: Copy config.example.json to config.json and customize for your brand!

USAGE:
  node contai.js <command> [topic] [platform]

PLATFORMS:
  twitter   - Twitter/X threads & posts (default)
  linkedin  - LinkedIn posts (professional tone)
  instagram - Instagram captions (visual, emoji-heavy)
  facebook  - Facebook posts (mixed audience)

  If no platform specified, defaults to twitter

COMMANDS:
  thread [topic] [platform]      - Generate viral thread/post
  hooks [topic] [platform]       - Generate 10 viral hooks
  tweets [topic] [platform]      - Generate 10 posts/tweets
  case [topic] [platform]        - Generate case study/breakdown
  dm [question] [platform]       - Generate DM response
  replies [tweet] [platform]     - Generate influencer replies
  bait [platform]                - Generate engagement bait
  hot-takes [platform]           - Generate controversial takes
  daily [platform]               - Generate daily content package
  week [platform]                - Generate full week (7 days)
  batch [platform]               - Generate 2 weeks of content

EXAMPLES:
  node contai.js thread "5 tips for productivity" twitter
  node contai.js thread "SaaS growth strategies" linkedin
  node contai.js tweets "customer retention" instagram
  node contai.js case "failed product launch" facebook
  node contai.js daily twitter
  node contai.js batch linkedin

PLATFORM-SPECIFIC OPTIMIZATION:
  Twitter:   Short, punchy, threads, hashtags
  LinkedIn:  Professional, longer form, industry insights
  Instagram: Visual captions, emoji-heavy, hashtags
  Facebook:  Mixed tone, shareable, community-focused

OUTPUT:
  All content is saved to JSON files in this directory

CONFIG:
  Edit config.json to customize:
  - Brand name, tagline, URL
  - Industry and target audience
  - Brand voice and tone
  - Product features and pricing
  - Content topics and strategy
`);
};

const main = async () => {
  const command = process.argv[2];

  // Handle version flag
  if (command === '--version' || command === '-v') {
    const version = getVersion();
    console.log(`Contai v${version}`);
    return;
  }

  // Check for updates on every start
  await checkForUpdates();

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const industry = cfg.niche?.industry || 'your industry';

  console.log(`CONTAI v${getVersion()}`);
  console.log(`Brand: ${brandName}`);
  console.log(`Industry: ${industry}`);
  console.log('');

  const topic = process.argv[3] || 'industry tips';
  const platform = (process.argv[4] || 'twitter').toLowerCase();

  // Validate platform
  const validPlatforms = ['twitter', 'linkedin', 'instagram', 'facebook'];
  if (!validPlatforms.includes(platform)) {
    console.log(`Invalid platform: ${platform}`);
    console.log(`Valid platforms: ${validPlatforms.join(', ')}`);
    console.log('Defaulting to twitter\n');
  }

  const platformInfo = getPlatformPrompt(platform, 'general');
  console.log(`Platform: ${platformInfo.name}`);
  console.log('');

  if (!command || command === 'help' || command === '--help') {
    showHelp();
    return;
  }

  switch (command) {
    case 'thread':
      const thread = await generateThread(topic, platform);
      console.log('\nTHREAD:\n', thread);
      break;

    case 'hooks':
      const hooks = await generateHooks(topic, platform);
      console.log('\nHOOKS:\n', hooks);
      break;

    case 'tweets':
      const tweets = await generateTweets(topic, platform);
      console.log('\nPOSTS:\n', tweets);
      break;

    case 'case':
      const caseStudy = await generateCaseStudy(topic, platform);
      console.log('\nCASE STUDY:\n', caseStudy);
      break;

    case 'dm':
      const dmResponse = await generateDMResponse(topic, platform);
      console.log('\nRESPONSE:\n', dmResponse);
      break;

    case 'replies':
      const replies = await generateInfluencerReplies(topic, platform);
      console.log('\nENGAGEMENT REPLIES:\n', replies);
      break;

    case 'bait':
      const bait = await generateReplyBait(platform);
      console.log('\nREPLY BAIT:\n', bait);
      break;

    case 'hot-takes':
      const hotTakes = await generateControversial(platform);
      console.log('\nHOT TAKES:\n', hotTakes);
      break;

    case 'daily':
      await generateDailyContent(platform);
      break;

    case 'week':
      console.log('📅 Generating 7 days of content...\n');
      for (let i = 0; i < 7; i++) {
        console.log(`\n--- DAY ${i + 1} ---\n`);
        await generateDailyContent(platform);
      }
      break;

    case 'batch':
      await generateBatchContent(platform);
      break;

    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
  }
};

// Run if called directly
if (process.argv[1] && (process.argv[1].includes('contai') || process.argv[1].includes('ai-growth-engine'))) {
  main();
}

export {
  generateContent,
  generateHooks,
  generateThread,
  generateTweets,
  generateCaseStudy,
  generateDMResponse,
  generateInfluencerReplies,
  generateReplyBait,
  generateControversial,
  generateDailyContent,
  generateBatchContent
};
