/**
 * Contai Generators - Case Study Generator
 * Generates detailed case studies and breakdowns with storytelling
 */

import { loadConfig } from '../core/config.js';
import { generateContent } from '../core/generator.js';

/**
 * Generate a detailed case study/breakdown for a given topic
 * @param {string} topic - Topic for the case study
 * @param {string} platform - Target platform (twitter, linkedin, etc.)
 * @returns {Promise<string>} Generated case study content
 */
export const generateCaseStudy = async (topic, platform = 'twitter') => {
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
