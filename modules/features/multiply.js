/**
 * Contai Features - Repurposing Engine
 * Multiplies single content into 7 different formats
 */

import fs from 'fs';
import { generateContent } from '../core/generator.js';

/**
 * Repurpose seed content into multiple formats
 * @param {string} seedContent - Original content to repurpose
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<Object|null>} Repurposed content object or null
 */
export const generateRepurposedContent = async (seedContent, platform = 'twitter') => {
  console.log('🔄 Repurposing your content into multiple formats...\n');

  const cfg = JSON.parse(fs.readFileSync('config.json', 'utf8') || '{}');
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://rugsnitch.pages.dev';

  const prompt = `You are a Content Repurposing Expert.

SEED CONTENT:
${seedContent}

TASK: Break this seed content into organized, clean content formats.

OUTPUT FORMAT (VALID JSON ONLY - NO MARKDOWN, NO EXTRA TEXT):
{
  "thread": {
    "title": "Catchy thread title",
    "tweets": [
      "1/10 First tweet with strong hook",
      "2/10 Second tweet building on first",
      "3/10 Third tweet with value",
      "4/10 Fourth tweet with example",
      "5/10 Fifth tweet with insight",
      "6/10 Sixth tweet with data",
      "7/10 Seventh tweet with solution",
      "8/10 Eighth tweet mentioning ${brandName}",
      "9/10 Ninth tweet with benefit",
      "10/10 Tenth tweet with CTA and ${url}"
    ]
  },
  "tweets": [
    "Standalone tweet 1 (under 280 chars)",
    "Standalone tweet 2 (under 280 chars)",
    "Standalone tweet 3 (under 280 chars)",
    "Standalone tweet 4 (under 280 chars)",
    "Standalone tweet 5 (under 280 chars)"
  ],
  "caseStudy": {
    "title": "Compelling case study title",
    "content": "600-word case study with: hook, timeline, problem, solution, results, CTA. Use paragraphs, not one block."
  },
  "linkedinPost": "Professional LinkedIn post (1000-1300 chars) with paragraphs, not one block. Include hook, value, insight, CTA.",
  "instagramCaption": "Visual Instagram caption (200-300 words) with emojis, line breaks, hashtags at end",
  "engagementQuestions": [
    "Question 1 to spark discussion",
    "Question 2 to spark discussion",
    "Question 3 to spark discussion",
    "Question 4 to spark discussion",
    "Question 5 to spark discussion"
  ],
  "visualPrompts": [
    "Detailed AI image prompt 1 for Midjourney/DALL-E (include style, mood, lighting, composition)",
    "Detailed AI image prompt 2 for Midjourney/DALL-E (include style, mood, lighting, composition)",
    "Detailed AI image prompt 3 for Midjourney/DALL-E (include style, mood, lighting, composition)"
  ]
}

RULES:
- ALL content must sound human, not AI
- Include specific examples from seed content
- Add ${brandName} mentions naturally (not forced)
- Platform-optimized for ${platform}
- NO markdown formatting in JSON values
- NO extra text before or after JSON
- Use proper escaping for quotes inside strings
- Thread tweets MUST be numbered (1/10, 2/10, etc.)
- All content must be clean, organized, ready to post

Return ONLY the JSON object, nothing else.`;

  try {
    const result = await generateContent(prompt, '', false); // false = ENABLE self-critique
    
    // Extract JSON from response
    const jsonMatch = result?.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const content = JSON.parse(jsonMatch[0]);

    if (content) {
      const filename = `repurposed-${new Date().toISOString().split('T')[0]}.json`;
      fs.writeFileSync(filename, JSON.stringify(content, null, 2));
      console.log(`\n💾 Repurposed content saved to ${filename}`);
      console.log('\n✅ Generated:');
      console.log(`   - 1 thread (${platform}) - ${content.thread?.tweets?.length || 0} tweets`);
      console.log(`   - ${content.tweets?.length || 0} standalone tweets`);
      console.log(`   - 1 case study (${content.caseStudy?.title || 'untitled'})`);
      console.log(`   - 1 LinkedIn post`);
      console.log(`   - 1 Instagram caption`);
      console.log(`   - ${content.engagementQuestions?.length || 0} engagement questions`);
      console.log(`   - ${content.visualPrompts?.length || 0} visual prompts`);
    }

    return content;
  } catch (e) {
    console.error('❌ Error repurposing content:', e.message);
    return null;
  }
};
