/**
 * Contai Features - Narrative Arc System (Sequence Generator)
 * Generates multi-day storytelling sequences for sustained engagement
 */

import fs from 'fs';
import { loadConfig } from '../core/config.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate a narrative sequence (3-day or 5-day storytelling arc)
 * @param {string} topic - Topic for the sequence
 * @param {number} days - Number of days (3 or 5)
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<Object>} Sequence data object
 */
export const generateSequence = async (topic, days = 3, platform = 'twitter') => {
  console.log(`📚 Generating ${days}-day narrative sequence...\n`);

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const terminology = cfg.nicheSpecific?.terminology || {};
  const problemTerm = terminology.problem || 'problems';
  const customerTerm = terminology.customer || 'customers';

  // Define the narrative arc
  const sequenceTypes = {
    3: {
      name: '3-Day Rabbit Hole',
      days: [
        {
          name: 'Day 1: Stir the Pot',
          type: 'controversial',
          instruction: `Create a CONTROVERSIAL post that challenges common beliefs about ${topic}.
          - Hook must be polarizing (people either agree hard or disagree hard)
          - Call out a common mistake or industry BS
          - Don't provide the solution yet (create curiosity)
          - End with a question or cliffhanger
          - Goal: Spark debate, get comments, create FOMO`
        },
        {
          name: 'Day 2: The Teach',
          type: 'educational',
          instruction: `Provide the DEEP DIVE solution to the problem from Day 1 about ${topic}.

CRITICAL: This must be about THE SAME TOPIC as Day 1 (${topic}), NOT about social media strategy.

- Reference yesterday's controversy explicitly ("Yesterday I said [specific from Day 1]. Here's why...")
- Provide actionable, step-by-step value about ${topic}
- Use specific examples, numbers, real cases
- Include ${brandName} naturally as part of solution
- Format as Twitter thread (8-10 tweets, numbered 1/8, 2/8, etc.)
- Each tweet under 280 characters
- Goal: Establish authority on ${topic}, provide real value`
        },
        {
          name: 'Day 3: Social Proof',
          type: 'casestudy',
          instruction: `Show REAL RESULTS from applying the Day 2 solution about ${topic}.

CRITICAL: This must be about THE SAME TOPIC as Day 1 & 2 (${topic}), NOT about social media strategy.

- Share a specific ${customerTerm} story or your own results about ${topic}
- Reference previous days ("Day 1: I called out the problem. Day 2: I gave you the solution. Today: Proof it works.")
- Include before/after, numbers, screenshots
- Format as Twitter thread (8-10 tweets, numbered 1/8, 2/8, etc.)
- Address objections ("I know what you're thinking...")
- Clear CTA to ${url}
- Goal: Convert believers into users`
        }
      ]
    },
    5: {
      name: '5-Day Hero Journey',
      days: [
        {
          name: 'Day 1: The Problem',
          type: 'pain',
          instruction: `Highlight the PAIN of ${topic}. Make it hurt.

CRITICAL: This must be about ${topic}, NOT about social media strategy.

- Share a painful story or statistic about ${topic}
- Make reader feel the problem deeply
- "This is happening to you right now"
- No solution yet (create tension)
- Format as Twitter thread (8-10 tweets)
- Goal: Make them NEED a solution`
        },
        {
          name: 'Day 2: The Enemy',
          type: 'villain',
          instruction: `Identify WHO or WHAT is causing the problem about ${topic}.

CRITICAL: This must be about ${topic}, NOT about social media strategy.

- Name the enemy (industry, gurus, bad advice, etc.) related to ${topic}
- "They lied to you about ${topic}"
- Build righteous anger
- Create us vs. them mentality
- Format as Twitter thread (8-10 tweets)
- Goal: Unite against common enemy`
        },
        {
          name: 'Day 3: The Discovery',
          type: 'breakthrough',
          instruction: `Share the BREAKTHROUGH moment about ${topic}.

CRITICAL: This must be about ${topic}, NOT about social media strategy.

- "Then I discovered something..."
- The lightbulb moment about ${topic}
- What everyone else gets wrong about ${topic}
- Tease the solution (don't give it all yet)
- Format as Twitter thread (8-10 tweets)
- Goal: Create hope + curiosity`
        },
        {
          name: 'Day 4: The Solution',
          type: 'educational',
          instruction: `Provide the COMPLETE solution about ${topic}.

CRITICAL: This must be about ${topic}, NOT about social media strategy.

- Step-by-step framework for ${topic}
- Specific, actionable, detailed
- Include ${brandName} as the tool
- Screenshots, examples, proof
- Format as Twitter thread (8-10 tweets)
- Goal: Make implementation obvious`
        },
        {
          name: 'Day 5: The Transformation',
          type: 'transformation',
          instruction: `Show the AFTER state from applying the solution about ${topic}.

CRITICAL: This must be about ${topic}, NOT about social media strategy.

- Before/after comparison about ${topic}
- Specific results (numbers, $, time saved)
- Multiple ${customerTerm} testimonials if possible
- Clear CTA with urgency
- Format as Twitter thread (8-10 tweets)
- "This could be you in 30 days"
- Goal: Convert desire into action`
        }
      ]
    }
  };

  const sequence = sequenceTypes[days] || sequenceTypes[3];
  const sequenceData = {
    topic: topic,
    platform: platform,
    sequenceName: sequence.name,
    generated: new Date().toISOString(),
    days: []
  };

  console.log(`📖 ${sequence.name}`);
  console.log(`📌 Topic: ${topic}`);
  console.log(`📱 Platform: ${platform}\n`);

  // Generate each day's content
  let previousContent = '';
  for (let i = 0; i < sequence.days.length; i++) {
    const day = sequence.days[i];
    console.log(`\n${'='.repeat(50)}`);
    console.log(`${day.name}`);
    console.log(`${'='.repeat(50)}\n`);

    const prompt = `${day.instruction}

BRAND: ${brandName}
URL: ${url}
PLATFORM: ${platform}

${previousContent ? `PREVIOUS DAYS CONTENT (for context and continuity):
${previousContent}
` : ''}

CRITICAL RULES:
- Sound human, not AI (no corporate phrases)
- Use short sentences. Fragments.
- Be specific with examples
- Reference previous days explicitly (Day 1, Day 2, etc.)
- Maintain the same topic (${topic}) throughout
- Build narrative tension across the sequence

Generate the content now:`;

    try {
      // Use the centralized generateContent function which handles model rotation
      const content = await generateContent(prompt);

      if (!content) {
        throw new Error('Content generation returned null');
      }

      sequenceData.days.push({
        day: i + 1,
        name: day.name,
        type: day.type,
        content: content
      });

      previousContent += `\nDAY ${i + 1} (${day.name}):\n${content}\n`;

      console.log(content);
      console.log(`\n✅ Day ${i + 1} generated\n`);

    } catch (e) {
      console.error(`❌ Error generating Day ${i + 1}:`, e.message);
      sequenceData.days.push({
        day: i + 1,
        name: day.name,
        type: day.type,
        content: `Error generating content: ${e.message}`
      });
    }
  }

  // Save sequence to file
  const filename = `sequence-${topic.replace(/\s+/g, '-').toLowerCase()}-${days}day-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(filename, JSON.stringify(sequenceData, null, 2));

  console.log(`\n${'='.repeat(50)}`);
  console.log(`🎉 SEQUENCE COMPLETE!`);
  console.log(`${'='.repeat(50)}`);
  console.log(`\n📊 Generated:`);
  console.log(`   - ${sequenceData.days.length} days of content`);
  console.log(`   - Narrative arc: ${sequence.name}`);
  console.log(`   - Topic: ${topic}`);
  console.log(`\n💾 Saved to: ${filename}`);
  console.log(`\n📌 POSTING STRATEGY:`);
  console.log(`   - Post once per day at same time`);
  console.log(`   - Reference previous day in each post`);
  console.log(`   - Engage heavily with comments on Day 1`);
  console.log(`   - Day 3 (or 5) is your money post - pin it`);

  return sequenceData;
};
