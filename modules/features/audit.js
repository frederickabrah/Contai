/**
 * Contai Features - Content Audit (The Content Doctor)
 * Audits content for virality, AI detection, and improvement suggestions
 */

import fs from 'fs';
import { loadConfig } from '../core/config.js';
import { generateContent } from '../core/generator.js';

/**
 * Audit content for virality and AI detection
 * @param {string} userContent - Content to audit
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string|null>} Audit results or null
 */
export const auditContent = async (userContent, platform = 'twitter') => {
  console.log('🔍 Auditing your content...\n');

  let actualContent = userContent;
  if (fs.existsSync(userContent)) {
    actualContent = fs.readFileSync(userContent, 'utf8');
    console.log(`📖 Read content from file: ${userContent}\n`);
  }

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';

  const prompt = `You are a Viral Content Editor and Consultant.

CONTENT TO AUDIT:
${actualContent}

TASK: Provide a comprehensive audit with:

1. VIRALITY SCORE (1-10):
   - Hook strength (0-10)
   - Value delivery (0-10)
   - Engagement potential (0-10)
   - Authenticity (0-10)
   - Overall score (average)

2. AI SMELL DETECTION:
   List specific phrases that sound AI-generated
   (e.g., "In today's landscape", "It's important to note", "comprehensive")

3. PROBLEMS FOUND:
   - Weak hook
   - Too long/wordy
   - No clear CTA
   - Generic advice
   - Corporate speak
   - Missing emotion

4. PRO VERSIONS:
   Rewrite the content 3 different ways:
   - Version A: More aggressive/bold
   - Version B: More personal/story-driven
   - Version C: More data-driven/specific

5. SPECIFIC FIXES:
   Line-by-line suggestions for improvement

OUTPUT FORMAT:
Be brutally honest but constructive. Act like a $10,000/month content consultant.

Platform: ${platform}
Brand: ${brandName}

Now audit this content:`;

  try {
    const result = await generateContent(prompt, '', false);

    console.log('\n📊 CONTENT AUDIT RESULTS:\n');
    console.log(result);

    // Save audit results
    const filename = `audit-${new Date().toISOString().split('T')[0]}.txt`;
    fs.writeFileSync(filename, result);
    console.log(`\n💾 Audit saved to ${filename}`);

    return result;
  } catch (e) {
    console.error('❌ Error auditing content:', e.message);
    return null;
  }
};
