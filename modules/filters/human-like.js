/**
 * Contai Filters - Human-Like Content Filtering
 * Detects and removes AI-sounding language
 */

import { genAI } from '../core/generator.js';
import { loadConfig } from '../core/config.js';

// STRICT AI PHRASE BLACKLIST - Auto-reject these
export const AI_PHRASES_TO_BAN = [
  "Brutal",
  "In today's",
  "in today's world",
  "in today's landscape",
  "in the modern",
  "It's important to",
  "It's crucial to",
  "It's essential to",
  "important to note",
  "crucial to note",
  "worth noting",
  "comprehensive",
  "comprehensive guide",
  "comprehensive analysis",
  "delve into",
  "delve deep",
  "explore the world of",
  "navigate the world of",
  "in the world of",
  "ever-evolving",
  "rapidly changing",
  "fast-paced world",
  "digital landscape",
  "digital age",
  "modern world",
  "Stay safe",
  "stay informed",
  "stay ahead",
  "Remember to",
  "remember that",
  "Keep in mind",
  "this comprehensive",
  "this article will",
  "this guide will",
  "we'll explore",
  "we'll dive into",
  "let's explore",
  "let's dive into",
  "tip of the iceberg",
  "just the beginning",
  "only the beginning",
  "game changer",
  "game-changing",
  "revolutionize",
  "revolutionary",
  "unlock the secrets",
  "unlock the power",
  "harness the power",
  "leverage the power",
  "in conclusion",
  "to summarize",
  "in summary",
  "ultimately",
  "moreover",
  "furthermore",
  "additionally",
  "consequently",
  "therefore",
  "thus",
  "hence",
  "as such",
  "given that",
  "it is worth",
  "one should",
  "individuals should",
  "people often",
  "many people",
  "some people",
  "experts say",
  "studies show",
  "research indicates",
  "according to research",
  "in fact",
  "as a matter of fact",
  "needless to say",
  "at the end of the day",
  "when it comes to",
  "in terms of",
  "with that being said",
  "having said that",
  "on the other hand",
  "conversely",
  "nevertheless",
  "nonetheless",
  "notwithstanding",
  "aforementioned",
  "herein",
  "therein",
  "wherein",
  "utilize",
  "leverage",
  "facilitate",
  "implement",
  "demonstrate",
  "showcase",
  "exemplify",
  "elucidate",
  "articulate",
  "endeavor",
  "strive",
  "strive for",
  "aim to",
  "seek to",
  "look to",
  "hope to",
  "aspire to",
  "not only... but also",
  "seamlessly",
  "pioneer",
  "landscape",
  "ecosystem",
  "synergy",
  "streamline",
  "optimize",
  "robust",
  "scalable",
  "sustainable",
  "holistic",
  "well-positioned",
  "look no further",
  "search no more",
  "one-stop-shop",
  "top-notch",
  "state-of-the-art",
  "world-class",
  "driven by",
  "powered by",
  "designed to",
  "helps you to",
  "enables you to",
  "empowers you to",
  "look at",
  "let's look at",
  "let's explore",
  "let's take a look",
  "take a closer look",
  "have you ever",
  "did you know",
  "are you tired of",
  "look no further than",
  "you're in luck",
  "without further ado",
  "last but not least",
  "to sum up",
  "as mentioned before",
  "it goes without saying",
  "it's no secret",
  "to be honest",
  "honestly",
  "truth be told",
  "believe it or not",
  "like it or not",
  "whether you like it or not",
  "whether you agree or not"
];

// HUMAN PHRASES - Good to use
export const HUMAN_PHRASES = [
  "Here's the thing",
  "Real talk",
  "Look",
  "Listen",
  "I've been there",
  "I learned this the hard way",
  "Trust me on this",
  "You're probably thinking",
  "It sucks",
  "It's rough",
  "It's hard",
  "It's not easy",
  "It's a nightmare",
  "It's a mess",
  "It's a disaster",
  "Let me save you the pain",
  "Don't make my mistakes",
  "Seriously",
  "No BS",
  "Directly",
  "I get it",
  "Believe me",
  "Let me be real",
  "Let's be honest",
  "Let's be real",
  "Here's what happened",
  "Here's what I learned",
  "Here's the truth",
  "The truth is",
  "Truth bomb",
  "Hot take",
  "Unpopular opinion",
  "Change my mind",
  "Fight me",
  "I'm calling it",
  "Mark my words",
  "Called it",
  "Told you so",
  "I warned you",
  "Don't say I didn't warn you",
  "You've been warned",
  "This is why",
  "That's why",
  "This is how",
  "That's how",
  "This is what",
  "That's what",
  "Here's how",
  "Here's what",
  "Check this out",
  "Peep this",
  "Get this",
  "Guess what",
  "You know what",
  "You know what's crazy",
  "You know what's wild",
  "Here's the deal",
  "Here's the thing though",
  "Thing is",
  "Problem is",
  "Fact is",
  "Truth is",
  "Reality is",
  "Realistically",
  "Honestly",
  "Frankly",
  "No joke",
  "No bullshit",
  "No fluff",
  "No filler",
  "Straight up",
  "Straight up though",
  "Deadass",
  "For real",
  "For real though",
  "Lowkey",
  "Highkey",
  "Ngl",
  "Not gonna lie",
  "Imma be honest",
  "Imma keep it real",
  "Keep it 100",
  "Keep it a buck",
  "Say what you want",
  "Love it or hate it",
  "Agree or disagree",
  "Like it or not",
  "Whether you like it or not",
  "Whether you agree or not"
];

// HUMAN WRITING LAWS - Architectural Constraints
export const HUMAN_WRITING_LAWS = [
  "Rhythm: Use the 1-short-1-long-1-fragment cadence. Vary it.",
  "Vocabulary: Use simple, punchy, conversational English. No 'large' words where small ones work.",
  "Show, Don't Tell: Never summarize the 'lesson.' The story should stand alone.",
  "The Messy Detail: Include at least one specific, slightly irrelevant detail (like 'I was wearing my old hoodie' or 'My coffee was cold').",
  "No Thematic Overload: Do not write sentences like 'This teaches us that...' or 'In conclusion...'"
];

/**
 * Reflect and refine content to sound more human
 * @param {string} content - Content to refine
 * @param {string} originalPrompt - Original prompt
 * @param {string} modelName - Model name used
 * @returns {Promise<string>} Refined content
 */
export const reflectAndRefine = async (content, originalPrompt, modelName) => {
  // Robust JSON detection: Check if content contains a JSON structure
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  const isJSON = jsonMatch !== null;
  
  console.log(`🧐 CRITICAL: Applying Human Writing Laws${isJSON ? ' (JSON Mode)' : ''}...\n`);
  
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';

  // If it's JSON, we only want to process the JSON part
  const contentToProcess = isJSON ? jsonMatch[0] : content;

  // Build strict AI detection prompt
  const critiquePrompt = `
You are a Ruthless Viral Content Editor. Your job is to ELIMINATE all AI-sounding language and enforce the Human Writing Laws.

ORIGINAL CONTENT:
${contentToProcess}

${isJSON ? '⚠️ CRITICAL: The content above is JSON. You MUST return ONLY valid, parseable JSON with the exact same keys. Only humanize the string values inside the JSON.' : ''}

⚠️ BANNED AI PHRASES (STRICT - AUTO-FAIL IF USED):
${AI_PHRASES_TO_BAN.join(', ')}

⚠️ ARCHITECTURAL WRITING LAWS:
${HUMAN_WRITING_LAWS.join('\n')}

🚨 AUTO-FAIL CONDITIONS:
- Contains ANY phrase from the "BANNED AI PHRASES" list above.
- Sounds like documentation or marketing copy
- Uses corporate speak or jargon
- Has generic advice without specifics
- Hook doesn't create immediate curiosity
- More than 3 exclamation points
- Uses hashtags like #blessed, #grateful
- Sounds like a LinkedIn influencer
- Explains the "moral of the story" instead of just telling it.

IF CONTENT FAILS:
- REWRITE IT COMPLETELY. 
- You MUST follow the Writing Laws and BANNED PHRASES list above.
${isJSON ? '- MAINTAIN VALID JSON STRUCTURE. DO NOT ADD EXTRA TEXT.' : ''}

OUTPUT FORMAT:
Return ONLY the final rewritten content${isJSON ? ' as JSON' : ''}. No scoring, no explanations.`;

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(critiquePrompt);
    const response = await result.response;
    let refinedContent = response.text().trim();
    
    // If it's JSON, we MUST extract ONLY the JSON part
    if (isJSON) {
      const extractedJSON = refinedContent.match(/\{[\s\S]*\}/);
      if (extractedJSON) {
        refinedContent = extractedJSON[0];
      }
    }

    // Double-check for banned phrases in the refined content
    const hasAIPhrase = AI_PHRASES_TO_BAN.some(phrase => 
      refinedContent.toLowerCase().includes(phrase.toLowerCase())
    );
    
    if (hasAIPhrase) {
      console.log('⚠️  AI phrases detected - requesting rewrite...\n');
      // One more pass to clean up
      const cleanupPrompt = `
Rewrite this content to sound 100% human. Remove ALL corporate/AI phrases.

CONTENT:
${refinedContent}

${isJSON ? '⚠️ CRITICAL: The content above is JSON. You MUST return ONLY valid JSON. Only humanize the values.' : ''}

RULES:
- Replace corporate phrases with casual language
- Use fragments. Short sentences.
- Sound like you're warning a friend at a bar
- Be specific, not generic
- NO: "In today's", "It's important", "comprehensive", "delve", "leverage", "utilize"
- YES: "Here's the thing", "Real talk", "Look", "Listen"
${isJSON ? '- MAINTAIN VALID JSON STRUCTURE. NO EXTRA TEXT.' : ''}

Rewrite it now:`;
      
      const cleanupResult = await model.generateContent(cleanupPrompt);
      const cleanedText = cleanupResult.response.text().trim();
      
      // If it was JSON, ensure we extract only the JSON part from the cleanup result
      if (isJSON) {
        const finalJsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        return finalJsonMatch ? finalJsonMatch[0] : cleanedText;
      }
      
      return cleanedText;
    }
    
    return refinedContent;
  } catch (e) {
    console.error('⚠️  Reflection failed, using original:', e.message);
    return content;
  }
};

/**
 * Check if content contains AI phrases
 * @param {string} content - Content to check
 * @returns {Array} Array of detected AI phrases
 */
export const detectAIPhrases = (content) => {
  const detected = [];
  const lowerContent = content.toLowerCase();
  
  AI_PHRASES_TO_BAN.forEach(phrase => {
    if (lowerContent.includes(phrase.toLowerCase())) {
      detected.push(phrase);
    }
  });
  
  return detected;
};

/**
 * Score content for human-likeness
 * @param {string} content - Content to score
 * @returns {Object} Score breakdown
 */
export const scoreHumanLikeness = (content) => {
  const aiPhrases = detectAIPhrases(content);
  const humanPhraseCount = HUMAN_PHRASES.filter(phrase => 
    content.includes(phrase)
  ).length;
  
  return {
    aiPhrasesDetected: aiPhrases,
    humanPhrasesUsed: humanPhraseCount,
    aiScore: Math.max(0, 10 - aiPhrases.length),
    humanScore: Math.min(10, humanPhraseCount * 2),
    overallScore: Math.max(0, 10 - aiPhrases.length + humanPhraseCount)
  };
};
