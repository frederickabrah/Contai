/**
 * Contai Filters - Vibe/MODE Modifiers
 * Sentiment overrides for content generation
 */

export const VIBE_MODIFIERS = {
  aggressive: `
TONE: Aggressive, bold, confrontational
- Use strong language ("This is bullshit", "Stop doing this")
- Call out bad behavior directly
- No sugar-coating
- Challenge the reader
- Example: "If you're still doing X in 2026, you're an idiot."
`,
  empathetic: `
TONE: Warm, understanding, supportive
- Use gentle language ("I get it", "This is tough")
- Share personal struggles
- Offer encouragement
- Validate their feelings
- Example: "I've been there. It's hard. But you've got this."
`,
  sarcastic: `
TONE: Witty, dry humor, slightly cynical
- Use irony and sarcasm
- Call out industry BS with humor
- Self-deprecating jokes
- Example: "Oh great, another 'growth hack' thread. Just what we needed."
`,
  scientific: `
TONE: Data-driven, analytical, precise
- Cite studies and statistics
- Use technical terminology
- Include numbers and percentages
- Example: "According to a 2025 study of 10,000 posts, engagement increased by 347%."
`,
  minimalist: `
TONE: Brief, direct, no fluff
- Short sentences
- No emojis (or minimal)
- Get straight to the point
- Example: "Do this. Not that. Results will follow."
`,
  helpful: `
TONE: Friendly teacher, patient, encouraging
- Step-by-step explanations
- Offer additional help
- Use analogies
- Example: "Think of it like this... Here's how it works..."
`
};

/**
 * Get vibe modifier string
 * @param {string} vibe - Vibe name
 * @returns {string} Vibe modifier prompt
 */
export const getVibeModifier = (vibe) => {
  return VIBE_MODIFIERS[vibe?.toLowerCase()] || '';
};

/**
 * Get all available vibes
 * @returns {Array} Array of vibe names
 */
export const getAvailableVibes = () => {
  return Object.keys(VIBE_MODIFIERS);
};

/**
 * Validate vibe
 * @param {string} vibe - Vibe to validate
 * @returns {boolean} Whether vibe is valid
 */
export const isValidVibe = (vibe) => {
  return Object.keys(VIBE_MODIFIERS).includes(vibe?.toLowerCase());
};
