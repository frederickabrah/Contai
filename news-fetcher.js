/**
 * CONTAI - Real-Time News & Trends Engine
 * 
 * Fetches trending topics from multiple sources:
 * - Hacker News API (free, no auth)
 * - Reddit RSS (free, no auth)
 * - Google Trends RSS (free, no auth)
 * - RSS Feeds (free, no auth)
 * - NewsAPI.org (optional API key)
 * 
 * Gemini AI analyzes trends and decides what to search for
 */

import fetch from 'node-fetch';
import { XMLParser } from 'fast-xml-parser';
import { generateContent } from './modules/core/generator.js';

const parser = new XMLParser({ ignoreAttributes: true });

// ============================================================================
// SOURCE 1: HACKER NEWS API (Free, No Auth)
// ============================================================================
const fetchHackerNews = async (limit = 10) => {
  try {
    const topStories = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json').then(r => r.json());
    const stories = await Promise.all(
      topStories.slice(0, limit).map(async (id) => {
        const story = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(r => r.json());
        return {
          source: 'hackernews',
          title: story.title,
          url: story.url || `https://news.ycombinator.com/item?id=${id}`,
          score: story.score,
          comments: story.descendants,
          timestamp: story.time * 1000
        };
      })
    );
    return stories.filter(s => s.title && s.url);
  } catch (e) {
    console.error('❌ Hacker News fetch failed:', e.message);
    return [];
  }
};

// ============================================================================
// SOURCE 2: REDDIT RSS (Free, No Auth) + Full Content Fetch
// ============================================================================
const fetchRedditRSS = async (subreddit, limit = 10) => {
  try {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}/hot/.rss?limit=${limit}`);
    const text = await response.text();
    const result = parser.parse(text);

    if (!result.feed || !result.feed.entry) return [];

    const entries = Array.isArray(result.feed.entry) ? result.feed.entry : [result.feed.entry];
    return await Promise.all(entries.map(async (entry) => {
      const redditItem = {
        source: `reddit/r/${subreddit}`,
        title: entry.title,
        url: entry.link?.href || entry.link,
        author: entry.author?.name,
        timestamp: entry.updated,
        content: entry.summary?._text || entry.summary || '',
        fullContent: ''
      };

      // Try to fetch full Reddit post content
      try {
        if (redditItem.url) {
          const articleResponse = await fetch(redditItem.url.replace('.rss', '.json'), {
            headers: { 'User-Agent': 'Contai/1.0 (News Aggregator)' },
            timeout: 5000
          });
          const jsonData = await articleResponse.json();
          if (jsonData?.[0]?.data?.children?.[0]?.data) {
            redditItem.fullContent = jsonData[0].data.children[0].data.selftext || '';
          }
        }
      } catch (fetchError) {
        // Silently fail - we still have the summary
      }

      return redditItem;
    }));
  } catch (e) {
    console.error(`❌ Reddit r/${subreddit} fetch failed:`, e.message);
    return [];
  }
};

// ============================================================================
// SOURCE 3: GOOGLE TRENDS RSS (Free, No Auth)
// ============================================================================
const fetchGoogleTrends = async (geo = 'US', category = 0) => {
  try {
    const response = await fetch(`https://trends.google.com/trends/trendingsearches/daily/rss?geo=${geo}&category=${category}`);
    const text = await response.text();
    const result = parser.parse(text);
    
    if (!result.rss || !result.rss.channel || !result.rss.channel.item) return [];
    
    const items = Array.isArray(result.rss.channel.item) 
      ? result.rss.channel.item 
      : [result.rss.channel.item];
    
    return items.map(item => ({
      source: 'google-trends',
      title: item.title,
      url: item.link,
      timestamp: item.pubDate,
      traffic: item['ht:approx_traffic'] || 'Unknown'
    }));
  } catch (e) {
    console.error('❌ Google Trends fetch failed:', e.message);
    return [];
  }
};

// ============================================================================
// SOURCE 4: RSS FEEDS (Free, No Auth) + Full Content Fetch
// ============================================================================
const fetchRSSFeed = async (feedUrl, limit = 10) => {
  try {
    const response = await fetch(feedUrl);
    const text = await response.text();
    const result = parser.parse(text);

    // Handle different RSS formats
    let items = [];
    if (result.rss?.channel?.item) {
      items = Array.isArray(result.rss.channel.item)
        ? result.rss.channel.item
        : [result.rss.channel.item];
    } else if (result.feed?.entry) {
      items = Array.isArray(result.feed.entry)
        ? result.feed.entry
        : [result.feed.entry];
    }

    return await Promise.all(items.slice(0, limit).map(async (item) => {
      const newsItem = {
        source: feedUrl,
        title: item.title,
        url: item.link?.href || item.link,
        timestamp: item.pubDate || item.updated,
        content: item.summary || item.description || item.content || '',
        fullContent: '' // Will be populated if fetch succeeds
      };

      // Try to fetch full article content (best effort)
      try {
        if (newsItem.url) {
          const articleResponse = await fetch(newsItem.url, { 
            headers: { 'User-Agent': 'Contai/1.0 (News Aggregator)' },
            timeout: 5000
          });
          const articleText = await articleResponse.text();
          
          // Extract main content (simple heuristic)
          const contentMatch = articleText.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
          if (contentMatch) {
            newsItem.fullContent = contentMatch[1].replace(/<[^>]*>/g, ' ').substring(0, 2000);
          } else {
            // Fallback: extract first 1000 chars of body text
            newsItem.fullContent = articleText.replace(/<[^>]*>/g, ' ').substring(0, 1000);
          }
        }
      } catch (fetchError) {
        // Silently fail - we still have the summary
      }

      return newsItem;
    }));
  } catch (e) {
    console.error(`❌ RSS feed ${feedUrl} fetch failed:`, e.message);
    return [];
  }
};

// ============================================================================
// SOURCE 5: NEWSAPI.ORG (Optional API Key)
// ============================================================================
const fetchNewsAPI = async (category, apiKey, limit = 10) => {
  if (!apiKey) {
    console.log('⚠️  NewsAPI key not provided, skipping...');
    return [];
  }
  
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(category)}&sortBy=publishedAt&language=en&pageSize=${limit}&apiKey=${apiKey}`
    );
    const data = await response.json();
    
    if (data.status !== 'ok') {
      console.error('❌ NewsAPI error:', data.message);
      return [];
    }
    
    return data.articles.map(article => ({
      source: article.source.name,
      title: article.title,
      url: article.url,
      author: article.author,
      timestamp: article.publishedAt,
      content: article.description,
      image: article.urlToImage
    }));
  } catch (e) {
    console.error('❌ NewsAPI fetch failed:', e.message);
    return [];
  }
};

// ============================================================================
// MAIN: FETCH ALL ENABLED SOURCES
// ============================================================================
export const fetchTrendingNews = async (config) => {
  const newsConfig = config.news || {};
  
  if (!newsConfig.enabled) {
    console.log('📰 News fetching disabled in config');
    return [];
  }
  
  console.log('\n📰 Fetching real-time trends...\n');
  
  const allNews = [];
  const categories = newsConfig.categories || [config.niche?.industry || 'technology'];
  
  // Fetch from each enabled source
  if (newsConfig.sources?.hackernews) {
    console.log('Fetching Hacker News...');
    const hn = await fetchHackerNews(15);
    allNews.push(...hn);
  }
  
  if (newsConfig.sources?.googleTrends) {
    console.log('Fetching Google Trends...');
    const trends = await fetchGoogleTrends(
      newsConfig.googleTrends?.geo || 'US',
      newsConfig.googleTrends?.category || 0
    );
    allNews.push(...trends);
  }
  
  if (newsConfig.sources?.reddit && newsConfig.subreddits) {
    console.log('Fetching Reddit...');
    for (const subreddit of newsConfig.subreddits.slice(0, 5)) {
      const reddit = await fetchRedditRSS(subreddit, 10);
      allNews.push(...reddit);
    }
  }
  
  if (newsConfig.sources?.rssFeeds && newsConfig.rssFeeds) {
    console.log('Fetching RSS Feeds...');
    for (const feedUrl of newsConfig.rssFeeds.slice(0, 5)) {
      const rss = await fetchRSSFeed(feedUrl, 10);
      allNews.push(...rss);
    }
  }
  
  if (newsConfig.sources?.newsAPI) {
    console.log('Fetching NewsAPI...');
    const newsApiKey = process.env.NEWS_API_KEY;
    for (const category of categories.slice(0, 3)) {
      const news = await fetchNewsAPI(category, newsApiKey, 10);
      allNews.push(...news);
    }
  }
  
  // Remove duplicates and sort by recency
  const unique = allNews.filter((item, index, self) =>
    index === self.findIndex(t => t.title === item.title)
  );
  
  const sorted = unique.sort((a, b) => 
    new Date(b.timestamp || 0) - new Date(a.timestamp || 0)
  );
  
  console.log(`✅ Fetched ${sorted.length} trending items\n`);
  
  return sorted.slice(0, 30); // Return top 30 trending items
};

// ============================================================================
// GEMINI AI: ANALYZE TRENDS & DECIDE WHAT TO SEARCH
// ============================================================================
export const analyzeTrendsWithAI = async (trends, config, genAI) => {
  if (!trends || trends.length === 0) {
    return { summary: 'No trends found', topics: [], contentIdeas: [] };
  }

  const brandName = config.brand?.name || 'Contai';
  const industry = config.niche?.industry || 'your industry';
  const categories = config.news?.categories || [industry];

  // FIRST: Filter trends by relevance to categories
  const categoryKeywords = categories.join(' ').toLowerCase().split(',').map(k => k.trim());
  const relevantTrends = trends.filter(trend => {
    // Search in title, summary, AND full content
    const trendText = `${trend.title} ${trend.content || ''} ${trend.fullContent || ''}`.toLowerCase();
    return categoryKeywords.some(keyword =>
      keyword && trendText.includes(keyword.toLowerCase())
    );
  });

  // If no relevant trends found, use top trends but warn
  const trendsToAnalyze = relevantTrends.length > 0 ? relevantTrends : trends.slice(0, 10);

  if (relevantTrends.length === 0) {
    console.log('⚠️  No trends matching your categories. Using general trends.');
    console.log(`   Your categories: ${categoryKeywords.join(', ')}`);
    console.log(`   Consider adding broader keywords to config.news.categories`);
  }

  // Build trend display with full content when available
  const trendDisplay = trendsToAnalyze.slice(0, 20).map((t, i) => {
    let display = `${i + 1}. [${t.source}] ${t.title}`;
    if (t.fullContent) {
      display += `\n   Full Content: ${t.fullContent.substring(0, 500)}...`;
    } else if (t.content) {
      display += `\n   Summary: ${t.content.substring(0, 300)}...`;
    }
    return display;
  }).join('\n');

  const prompt = `You are a Trend Analysis AI. Analyze these trending topics and identify content opportunities.

INDUSTRY: ${industry}
BRAND: ${brandName}
INTEREST CATEGORIES: ${categories.join(', ')}

TRENDING NOW (Last 24h) - WITH FULL ARTICLE CONTENT:
${trendDisplay}

TASK:
1. Identify top 5 trends relevant to ${industry}
2. For each trend, suggest a content angle
3. Flag any crisis/opportunity trends (urgent content needed)
4. Suggest what to search for next (related topics)

OUTPUT JSON:
{
  "topTrends": [
    {
      "title": "Trend title",
      "source": "Source name",
      "relevance": "Why this matters to ${industry}",
      "contentAngle": "How to cover this",
      "urgency": "high/medium/low"
    }
  ],
  "contentIdeas": [
    "Thread idea 1",
    "Hot take idea 2",
    "Case study idea 3"
  ],
  "searchSuggestions": [
    "Related topic to search 1",
    "Related topic to search 2"
  ],
  "crisisAlerts": [
    "Urgent trend that needs immediate response"
  ]
}

Return ONLY valid JSON.`;

  try {
    // Use the centralized generateContent function for model rotation
    const text = await generateContent(prompt, '', true); // true = skip reflection layer
    
    if (!text) {
      throw new Error('AI trend analysis returned null');
    }

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
    
    return analysis || {
      topTrends: trendsToAnalyze.slice(0, 5).map(t => ({
        title: t.title,
        source: t.source,
        relevance: 'Trending in your industry',
        contentAngle: 'Create content around this',
        urgency: 'medium'
      })),
      contentIdeas: ['Create content about trending topics'],
      searchSuggestions: categories,
      crisisAlerts: []
    };
  } catch (e) {
    console.error('⚠️  AI trend analysis failed:', e.message);
    return {
      topTrends: trendsToAnalyze.slice(0, 5).map(t => ({
        title: t.title,
        source: t.source,
        relevance: 'Trending',
        contentAngle: 'Create content',
        urgency: 'medium'
      })),
      contentIdeas: ['Create trending content'],
      searchSuggestions: categories,
      crisisAlerts: []
    };
  }
};

// ============================================================================
// FORMAT TRENDS FOR TODAYnews.md
// ============================================================================
export const formatTrendsForFile = (trends, analysis) => {
  let content = `# Real-Time Trends - ${new Date().toLocaleDateString()}\n\n`;
  content += `**Generated:** ${new Date().toISOString()}\n\n`;
  
  if (analysis.crisisAlerts?.length > 0) {
    content += `## 🚨 CRISIS ALERTS\n`;
    analysis.crisisAlerts.forEach(alert => {
      content += `- ${alert}\n`;
    });
    content += '\n';
  }
  
  content += `## 🔥 TOP TRENDING\n\n`;
  
  analysis.topTrends?.forEach((trend, i) => {
    content += `### ${i + 1}. ${trend.title}\n`;
    content += `**Source:** ${trend.source}\n`;
    content += `**Why it matters:** ${trend.relevance}\n`;
    content += `**Content angle:** ${trend.contentAngle}\n`;
    content += `**Urgency:** ${trend.urgency}\n\n`;
  });
  
  content += `## 💡 CONTENT IDEAS\n\n`;
  analysis.contentIdeas?.forEach((idea, i) => {
    content += `${i + 1}. ${idea}\n`;
  });
  
  content += `\n## 🔍 SEARCH SUGGESTIONS\n\n`;
  analysis.searchSuggestions?.forEach(suggestion => {
    content += `- ${suggestion}\n`;
  });
  
  return content;
};
