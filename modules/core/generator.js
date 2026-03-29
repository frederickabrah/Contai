/**
 * Contai Core - Main Generation Function
 * Handles content generation with model rotation and reflection
 */

import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { getBestModel, rotateModel } from './models.js';
import { getBrandKnowledge } from './config.js';
import { getMemoryContext } from './brain.js';
import { reflectAndRefine } from '../filters/human-like.js';

// Load environment variables
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * Generate content using Gemini AI
 * @param {string} prompt - The generation prompt
 * @param {string} context - Additional context
 * @param {boolean} skipReflection - Whether to skip reflection layer
 * @returns {Promise<string|null>} Generated content
 */
export const generateContent = async (prompt, context = '', skipReflection = false) => {
  let attempts = 0;
  const maxAttempts = 3;

  const brandKnowledge = getBrandKnowledge();
  const memoryContext = getMemoryContext();
  
  // CRITICAL: Pre-generation human-like instruction
  const humanLikeInstruction = `

⚠️ CRITICAL WRITING RULES - SOUND 100% HUMAN:
1. Use short sentences. Fragments. Like this.
2. Sound like you're warning a friend at a bar
3. NO corporate phrases: "In today's", "It's important", "comprehensive", "delve", "leverage"
4. Use human phrases: "Here's the thing", "Real talk", "Look", "Listen", "I've been there"
5. Be specific with examples, not generic advice
6. Maximum 2 exclamation points TOTAL
7. No hashtags like #blessed, #grateful, #winning, #success
8. No motivational poster language
9. No LinkedIn influencer energy
10. If it sounds like documentation, rewrite it

BAD (AI-sounding):
"In today's digital landscape, it's important to leverage comprehensive strategies for success."

GOOD (Human):
"Here's the thing. Most strategies are bullshit. I learned this after losing $50K. Let me save you the pain."

NOW GENERATE CONTENT THAT PASSES THESE RULES.`;

  while (attempts < maxAttempts) {
    try {
      const modelName = getBestModel();
      console.log(`Using model: ${modelName}`);

      const model = genAI.getGenerativeModel({
        model: modelName,
        apiVersion: 'v1'
      });

      const fullPrompt = `${brandKnowledge}\n\n${memoryContext}\n\n${context}\n\n${prompt}\n\n${humanLikeInstruction}`;

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
      // Get the model name again since it's not accessible from try block
      const failedModel = getBestModel();
      rotateModel(failedModel, error.message);

      if (attempts >= maxAttempts) {
        console.error('All model attempts failed:', error.message);
        return null;
      }

      console.log(`Attempt ${attempts}/${maxAttempts} failed, trying next model...`);
    }
  }

  return null;
};

export { genAI };
