/**
 * Contai Platforms - Platform-Specific Prompts
 * Handles platform-specific content formatting
 */

export const getPlatformPrompt = (platform, contentType) => {
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

/**
 * Get all available platforms
 * @returns {Array} Array of platform names
 */
export const getAvailablePlatforms = () => {
  return ['twitter', 'linkedin', 'instagram', 'facebook'];
};

/**
 * Validate platform
 * @param {string} platform - Platform to validate
 * @returns {boolean} Whether platform is valid
 */
export const isValidPlatform = (platform) => {
  return getAvailablePlatforms().includes(platform);
};
