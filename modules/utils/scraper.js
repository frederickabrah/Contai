/**
 * Contai Utils - Smart Scraper
 * Intelligently extracts core content from URLs
 */

import fetch from 'node-fetch';

/**
 * Scrape content from a URL
 * @param {string} url - URL to scrape
 * @returns {Promise<Object>} Object containing title and content
 */
export const scrapeUrl = async (url) => {
  console.log(`📡 Accessing URL: ${url}...`);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      },
      timeout: 10000
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }

    const html = await response.text();

    // 1. Extract Title
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled Content';

    // 2. Intelligent Content Extraction (Heuristic-based)
    let content = '';

    // Strategy A: Look for <article> tag (Best)
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    if (articleMatch) {
      content = articleMatch[1];
    } 
    // Strategy B: Look for <main> tag
    else {
      const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      if (mainMatch) {
        content = mainMatch[1];
      }
      // Strategy C: Look for the largest <div> or specific blog IDs
      else {
        content = html; // Fallback to full HTML if no structural tags
      }
    }

    // 3. Clean the content
    const cleanContent = content
      .replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '') // Remove scripts
      .replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '')   // Remove styles
      .replace(/<nav[^>]*>([\s\S]*?)<\/nav>/gi, '')       // Remove navbars
      .replace(/<footer[^>]*>([\s\S]*?)<\/footer>/gi, '') // Remove footers
      .replace(/<[^>]*>/g, ' ')                           // Remove all remaining tags
      .replace(/\s+/g, ' ')                               // Normalize whitespace
      .replace(/&nbsp;/g, ' ')                            // Remove entities
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .trim();

    return {
      title,
      content: cleanContent.substring(0, 15000) // Limit to 15k chars for AI safety
    };
  } catch (error) {
    console.error(`❌ Scraper Error: ${error.message}`);
    return null;
  }
};
