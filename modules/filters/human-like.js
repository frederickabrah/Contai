/**
 * Contai Filters - Human-Like Content Filtering
 * Detects and removes AI-sounding language
 */

import { genAI } from '../core/generator.js';
import { loadConfig } from '../core/config.js';

// STRICT AI PHRASE BLACKLIST - Auto-reject these
export const AI_PHRASES_TO_BAN = [
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
  "aspire to"
];

// HUMAN PHRASES TO ENCOURAGE
export const HUMAN_PHRASES = [
  "Here's the thing",
  "Real talk",
  "Look",
  "Listen",
  "I get it",
  "I've been there",
  "Trust me",
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
  "Seriously",
  "No joke",
  "No BS",
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

/**
 * Reflect and refine content to sound more human
 * @param {string} content - Content to refine
 * @param {string} originalPrompt - Original prompt
 * @param {string} modelName - Model name used
 * @returns {Promise<string>} Refined content
 */
export const reflectAndRefine = async (content, originalPrompt, modelName) => {
  console.log('🧐 CRITICAL: Checking for AI-sounding language...\n');
  
  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';

  // Build strict AI detection prompt
  const critiquePrompt = `
You are a RUTHLESS Viral Content Editor. Your job is to ELIMINATE all AI-sounding language.

ORIGINAL CONTENT:
${content}

⚠️ STRICT AI DETECTION - AUTO-REJECT THESE PHRASES:
${AI_PHRASES_TO_BAN.slice(0, 30).join(', ')}
(And 100+ more corporate/AI phrases)

✅ HUMAN PHRASES TO USE INSTEAD:
${HUMAN_PHRASES.slice(0, 20).join(', ')}

CRITICAL SCORING RULES (BE HARSH):
1. HOOK (0-10): Must stop scroll in 0.5 seconds. Generic = 0
2. AI SMELL (0-10): ANY corporate phrase = automatic 0
3. HUMAN VIBE (0-10): Must sound like texting a friend
4. CONCISE (0-10): Every word must earn its place
5. SPECIFIC (0-10): Vague = 0, Specific examples = 10

🚨 AUTO-FAIL CONDITIONS (Score below 8 = REWRITE):
- Contains ANY phrase from AI blacklist
- Sounds like documentation or marketing copy
- Uses corporate speak or jargon
- Has generic advice without specifics
- Hook doesn't create immediate curiosity
- More than 3 exclamation points
- Uses hashtags like #blessed, #grateful, #winning
- Sounds like a LinkedIn influencer or motivational poster

IF CONTENT SCORES BELOW 8/10:
- REWRITE IT COMPLETELY
- Remove ALL AI phrases
- Add SPECIFIC examples
- Make it sound like a REAL human warning a friend
- Use short sentences. Fragments. Like this.
- Be aggressive. Be real. Be specific.

IF CONTENT SCORES 8/10 OR HIGHER:
- Return original with minor tweaks only

⚠️ URL RULE: If there is a link to ${brandName}, it MUST be EXACTLY "${url}".

OUTPUT FORMAT:
1. First line: "SCORE: X/10"
2. Second line: List any AI phrases found (or "✅ No AI phrases detected")
3. Third line: "REWRITE NEEDED: Yes/No"
4. Blank line
5. Final refined content (or original if score >= 8)

OUTPUT ONLY THE FINAL CONTENT. No explanations.`;

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(critiquePrompt);
    const response = await result.response;
    let refinedContent = response.text().trim();
    
    // Extract just the content (remove score lines if present)
    const contentMatch = refinedContent.match(/(?:SCORE:.*?\n.*?\n.*?\n)?\n?([\s\S]+)/);
    const finalContent = contentMatch ? contentMatch[1].trim() : refinedContent;
    
    // Double-check for banned phrases
    const hasAIPhrase = AI_PHRASES_TO_BAN.some(phrase => 
      finalContent.toLowerCase().includes(phrase.toLowerCase())
    );
    
    if (hasAIPhrase) {
      console.log('⚠️  AI phrases detected - requesting rewrite...\n');
      // One more pass to clean up
      const cleanupPrompt = `
Rewrite this content to sound 100% human. Remove ALL corporate/AI phrases.

CONTENT:
${finalContent}

RULES:
- Replace corporate phrases with casual language
- Use fragments. Short sentences.
- Sound like you're warning a friend at a bar
- Be specific, not generic
- NO: "In today's", "It's important", "comprehensive", "delve", "leverage", "utilize"
- YES: "Here's the thing", "Real talk", "Look", "Listen"

Rewrite it now:`;
      
      const cleanupResult = await model.generateContent(cleanupPrompt);
      return cleanupResult.response.text().trim();
    }
    
    return finalContent;
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
