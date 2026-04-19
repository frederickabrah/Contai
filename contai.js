#!/usr/bin/env node

/**
 * CONTAI - Universal AI Content Generator
 *
 * A command-line utility for generating platform-optimized content
 * using the Google Gemini 2.5 Flash model.
 *
 * Usage:
 * node contai.js thread "topic"     - Generate viral thread
 * node contai.js hooks "topic"      - Generate 10 viral hooks
 * node contai.js tweets "topic"     - Generate 10 quick posts
 * node contai.js case "topic"       - Generate case study
 * node contai.js dm "question"      - Generate DM response
 * node contai.js replies "tweet"    - Generate influencer replies
 * node contai.js bait               - Generate reply bait posts
 * node contai.js hot-takes          - Generate controversial takes
 * node contai.js daily              - Generate daily content package
 * node contai.js week               - Generate full week (7 days)
 * node contai.js batch              - Generate 2 weeks of content
 *
 * Features:
 * - Style Mirroring via local DNA analysis
 * - Platform-specific prompting (Twitter, LinkedIn, Instagram, Facebook)
 * - Model rotation for API quota management
 * - Automated version checking and updates
 */

import fs from 'fs';
import https from 'https';
import readline from 'readline';
import { execSync } from 'child_process';

// Import all modules
import {
  // Core
  loadConfig,
  getBestModel,
  rotateModel,
  FREE_TIER_MODELS,
  genAI,
  // Generators
  generateThread,
  generateThreadWithVibe,
  generateTweets,
  generateTweetsWithVibe,
  generateHooks,
  generateCaseStudy,
  generateDMResponse,
  generateInfluencerReplies,
  generateReplyBait,
  generateControversial,
  generateStory,
  generateTutorial,
  // Features
  generateRepurposedContent,
  auditContent,
  generateSequence,
  exportToCSV,
  // Utils
  isValidPlatform,
  isValidVibe,
  parseArgs,
  // Filters
  VIBE_MODIFIERS,
  getVibeModifier
} from './modules/index.js';

import { fetchTrendingNews, analyzeTrendsWithAI, formatTrendsForFile } from './news-fetcher.js';

// ============================================================================
// VERSION & UPDATE MANAGEMENT
// ============================================================================
const REPO_URL = 'https://raw.githubusercontent.com/frederickabrah/Contai/main/package.json';

const getVersion = () => {
  try {
    const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
    return pkg.version || '1.0.0';
  } catch (e) {
    return '1.0.0';
  }
};

const isNewerVersion = (current, remote) => {
  const c = current.split('.').map(Number);
  const r = remote.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if (r[i] > c[i]) return true;
    if (r[i] < c[i]) return false;
  }
  return false;
};

const BACKUP_DIR = '.contai-backup';

const checkForUpdates = async () => {
  const currentVersion = getVersion();

  return new Promise((resolve) => {
    https.get(REPO_URL, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const remotePkg = JSON.parse(data);
          const remoteVersion = remotePkg.version;

          if (remoteVersion && isNewerVersion(currentVersion, remoteVersion)) {
            // Fetch changelog
            https.get(`${REPO_URL.replace('raw/', '')}blob/main/CHANGELOG.md`, (changelogRes) => {
              let changelog = '';
              changelogRes.on('data', (chunk) => { changelog += chunk; });
              changelogRes.on('end', () => {
                const changelogPreview = changelog.substring(0, 800).replace(/<[^>]*>/g, '').replace(/#/g, '').trim();

                console.log(`\n✨ Update available: v${currentVersion} → v${remoteVersion}`);
                console.log('\n📝 What\'s new:');
                console.log('─'.repeat(50));
                console.log(changelogPreview || 'No changelog available');
                console.log('─'.repeat(50));
                
                const rl = readline.createInterface({
                  input: process.stdin,
                  output: process.stdout
                });

                rl.question('\n👉 Update now? (y/n): ', (answer) => {
                  rl.close();
                  if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                    performUpdate(remoteVersion).then(resolve);
                  } else {
                    console.log('ℹ️  Update skipped');
                    resolve();
                  }
                });
              });
            }).on('error', () => {
              console.log(`\n✨ Update available: v${currentVersion} → v${remoteVersion}`);
              const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
              });
              rl.question('\n👉 Update now? (y/n): ', (answer) => {
                rl.close();
                if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
                  performUpdate(remoteVersion).then(resolve);
                } else {
                  resolve();
                }
              });
            });
          } else {
            resolve();
          }
        } catch (e) {
          resolve();
        }
      });
    }).on('error', () => {
      resolve();
    });
  });
};

const performUpdate = async (newVersion) => {
  console.log(`\n🔄 Updating to v${newVersion}...`);
  
  try {
    if (!fs.existsSync('.git')) {
      console.error('❌ Error: Repository not initialized with Git.');
      console.log('\nManual update:');
      console.log('1. git pull origin main');
      console.log('2. npm install');
      return;
    }

    // Create backup
    console.log('📦 Creating backup...');
    try {
      if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
      }
      const filesToBackup = ['config.json', '.env', 'contai.js', 'package.json'];
      filesToBackup.forEach(file => {
        if (fs.existsSync(file)) {
          fs.copyFileSync(file, `${BACKUP_DIR}/${file}`);
        }
      });
      console.log('✅ Backup created');
    } catch (e) {
      console.warn('⚠️  Backup failed, continuing anyway...');
    }

    // Stash local changes
    console.log('💾 Saving local changes...');
    execSync('git stash -u', { stdio: 'ignore' });

    // Pull updates
    console.log('⬇️  Downloading updates...');
    execSync('git pull origin main --rebase', { stdio: 'inherit', timeout: 60000 });

    // Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm install', { stdio: 'inherit', timeout: 120000 });

    // Restore local changes
    console.log('💾 Restoring local changes...');
    try {
      execSync('git stash pop', { stdio: 'ignore' });
    } catch (e) {
      console.log('ℹ️  Some local changes may need manual merge');
    }

    console.log(`\n✅ Successfully updated to v${newVersion}!`);
    console.log('ℹ️  Please restart Contai to apply updates.');
    
    // Clean backup after successful update
    try {
      if (fs.existsSync(BACKUP_DIR)) {
        fs.rmSync(BACKUP_DIR, { recursive: true, force: true });
      }
    } catch (e) {}
    
    process.exit(0);
  } catch (updateError) {
    console.error(`\n❌ Update failed: ${updateError.message}`);
    
    // Attempt rollback
    console.log('\n🔄 Rolling back to previous version...');
    try {
      if (fs.existsSync(BACKUP_DIR)) {
        const filesToRestore = ['config.json', '.env', 'contai.js', 'package.json'];
        filesToRestore.forEach(file => {
          const backupPath = `${BACKUP_DIR}/${file}`;
          if (fs.existsSync(backupPath)) {
            fs.copyFileSync(backupPath, file);
          }
        });
        console.log('✅ Rollback successful!');
        console.log('ℹ️  You can continue using the previous version.');
      } else {
        console.error('❌ No backup found. Manual intervention required.');
      }
    } catch (rollbackError) {
      console.error(`❌ Rollback failed: ${rollbackError.message}`);
      console.error('ℹ️  Manual intervention required.');
    }
  }
};

// ============================================================================
// DAILY & BATCH CONTENT GENERATORS
// ============================================================================
const generateDailyContent = async (platform = 'twitter') => {
  console.log('Generating daily package...');
  const cfg = loadConfig();
  const topics = cfg.content?.topics || ['industry tips', 'common mistakes', 'best practices'];

  console.log('Includes:');
  console.log('- 1 viral thread/post (with hook optimization)');
  console.log('- 3 quick posts/tweets');
  console.log('- 1 controversial take');
  console.log('- 1 reply bait post');
  console.log('- 5 influencer replies\n');

  const date = new Date().toISOString().split('T')[0];

  const daily = {
    date: date,
    platform: platform,
    thread: await generateThread(topics[0] || 'industry tips', platform),
    tweets: await generateTweets(topics[1] || 'common mistakes', platform),
    controversial: await generateControversial(platform),
    replyBait: await generateReplyBait(platform),
    influencerReplies: await generateInfluencerReplies(topics[2] || 'industry trends', platform)
  };

  const filename = `daily-content-${date}.json`;
  fs.writeFileSync(filename, JSON.stringify(daily, null, 2));
  console.log(`\nContent saved to ${filename}`);

  return daily;
};

const generateBatchContent = async (platform = 'twitter') => {
  console.log('Generating batch content...');
  const cfg = loadConfig();
  const industry = cfg.niche?.industry || 'your industry';
  const topics = cfg.content?.topics || [
    '5 common mistakes in ' + industry,
    'How to avoid ' + industry.toLowerCase() + ' problems',
    'Best practices for ' + industry.toLowerCase(),
    'Industry secrets revealed',
    'My complete process',
    'Comparison guide'
  ];

  const batch = {
    generated: new Date().toISOString(),
    platform: platform,
    threads: [],
    tweets: [],
    caseStudies: []
  };

  const threadTopics = topics.slice(0, 6);
  for (const topic of threadTopics) {
    console.log(`\nGenerating thread: ${topic}`);
    const thread = await generateThread(topic, platform);
    batch.threads.push({ topic, content: thread });
  }

  const tweetTopics = topics.slice(0, 5);
  for (const topic of tweetTopics) {
    console.log(`\nGenerating posts: ${topic}`);
    const tweets = await generateTweets(topic, platform);
    batch.tweets.push({ topic, content: tweets });
  }

  const caseStudyTopics = [
    cfg.niche?.painPoints?.[0] || 'Common problem #1',
    cfg.niche?.painPoints?.[1] || 'Common problem #2'
  ];

  for (const topic of caseStudyTopics) {
    console.log(`\nGenerating case study: ${topic}`);
    const caseStudy = await generateCaseStudy(topic, platform);
    batch.caseStudies.push({ topic, content: caseStudy });
  }

  const filename = `content-batch-${new Date().toISOString().split('T')[0]}.json`;
  fs.writeFileSync(filename, JSON.stringify(batch, null, 2));

  console.log('\nBATCH CONTENT GENERATED');
  console.log(`- ${batch.threads.length} threads/posts`);
  console.log(`- ${batch.tweets.length} post sets (25+ posts)`);
  console.log(`- ${batch.caseStudies.length} case studies`);
  console.log(`\nSaved to ${filename}`);

  return batch;
};

// ============================================================================
// HELP MESSAGE
// ============================================================================
const showHelp = () => {
  console.log(`
🤖 CONTAI v2.2.0 - UNIVERSAL CONTENT GENERATOR

Setup: Copy config.example.json to config.json and customize for your brand!

USAGE:
  node contai.js <command> [topic] [platform] [--vibe=vibe]

PLATFORMS:
  twitter   - Twitter/X threads & posts (default)
  linkedin  - LinkedIn posts (professional tone)
  instagram - Instagram captions (visual, emoji-heavy)
  facebook  - Facebook posts (mixed audience)

VIBES (--vibe flag):
  aggressive   - Bold, confrontational, no-BS
  empathetic   - Warm, understanding, supportive
  sarcastic    - Witty, dry humor, cynical
  scientific   - Data-driven, analytical, precise
  minimalist   - Brief, direct, no fluff
  helpful      - Friendly teacher, patient (default)

COMMANDS:
  thread [topic] [platform] [--vibe=x]  - Generate viral thread/post
  hooks [topic] [platform]              - Generate 10 viral hooks
  tweets [topic] [platform] [--vibe=x]  - Generate 10 posts/tweets
  case [topic] [platform]               - Generate case study/breakdown
  dm [question] [platform]              - Generate DM response
  replies [tweet] [platform]            - Generate influencer replies
  bait [platform]                       - Generate engagement bait
  hot-takes [platform]                  - Generate controversial takes
  daily [platform]                      - Generate daily content package
  week [platform]                       - Generate full week (7 days)
  batch [platform]                      - Generate 2 weeks of content

  🆕 STORY [topic] [platform]           - Generate authentic personal story
  🆕 TUTORIAL [topic] [platform]        - Generate step-by-step technical guide
  🆕 MULTIPLY [url/file/text] [platform]- Repurpose content into 7 formats
  🆕 AUDIT [url/file/text] [platform]   - Audit your content (Content Doctor)
  🆕 LAST                               - Preview most recent generated content
  🆕 CSV [file]                         - Export batch content to CSV
  🆕 SEQUENCE [topic] [3|5] [platform]  - Generate 3 or 5-day story sequence
  🆕 TRENDS [category]                  - Fetch real-time trending topics
  🆕 TREND-CONTENT [category] [platform]- Generate content from trends

FLAGS:
  --brand=name    - Use config.{name}.json profile
  --config=path   - Use specific config file path
  --vibe=vibe     - Apply sentiment modifier

EXAMPLES:
  node contai.js story "my first win" twitter
  node contai.js tutorial "smart contracts" --brand=crypto
  node contai.js multiply https://example.com/blog twitter
  node contai.js last
  node contai.js sequence "crypto scams" 5 twitter
  node contai.js thread "5 tips" twitter --vibe=aggressive

NEW IN v2.2.0:
  ✨ Multi-Profile Support - Manage multiple brands with --brand flag
  ✨ URL Scraper - Repurpose any web article into content
  ✨ Narrative Stories - Personal, authentic storytelling archetype
  ✨ Technical Tutorials - Step-by-step authority building guides
  ✨ Lazy Mode - Run "last" to preview content without opening files
  ✨ Robust AI - Model rotation for 429/Quota errors
  ✨ Writing DNA - Enhanced Human-like reflection layers

OUTPUT:
  All content is saved to JSON files in this directory

CONFIG:
  Edit config.json to customize:
  - Brand name, tagline, URL
  - Industry and target audience
  - Brand voice and tone
  - Product features and pricing
  - Content topics and strategy
`);
};

// ============================================================================
// MAIN CLI HANDLER
// ============================================================================
const main = async () => {
  const command = process.argv[2];

  // Handle version flag
  if (command === '--version' || command === '-v') {
    console.log(`Contai v${getVersion()}`);
    return;
  }

  // Check for updates on every start
  await checkForUpdates();

  const cfg = loadConfig();
  const brandName = cfg.brand?.name || 'Contai';
  const industry = cfg.niche?.industry || 'your industry';

  console.log(`CONTAI v${getVersion()}`);
  console.log(`Brand: ${brandName}`);
  console.log(`Industry: ${industry}`);
  console.log('');

  // Parse arguments
  let topic = process.argv[3] || 'industry tips';
  let platform = 'twitter';
  let vibe = 'helpful';

  for (let i = 4; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (arg.startsWith('--vibe=')) {
      vibe = arg.split('=')[1]?.toLowerCase() || 'helpful';
    } else if (isValidPlatform(arg)) {
      platform = arg;
    }
  }

  // Validate platform
  if (!isValidPlatform(platform)) {
    console.log(`Invalid platform: ${platform}`);
    console.log(`Valid platforms: twitter, linkedin, instagram, facebook`);
    console.log('Defaulting to twitter\n');
    platform = 'twitter';
  }

  // Validate vibe
  if (!isValidVibe(vibe)) {
    console.log(`Invalid vibe: ${vibe}`);
    console.log(`Valid vibes: aggressive, empathetic, sarcastic, scientific, minimalist, helpful`);
    console.log('Defaulting to helpful\n');
    vibe = 'helpful';
  }

  console.log(`Platform: ${platform === 'twitter' ? 'Twitter/X' : platform.charAt(0).toUpperCase() + platform.slice(1)}`);
  if (vibe !== 'helpful') {
    console.log(`Vibe: ${vibe}`);
  }
  console.log('');

  if (!command || command === 'help' || command === '--help') {
    showHelp();
    return;
  }

  switch (command) {
    case 'thread':
      const thread = vibe !== 'helpful'
        ? await generateThreadWithVibe(topic, platform, vibe)
        : await generateThread(topic, platform);
      console.log('\nTHREAD:\n', thread);
      break;

    case 'hooks':
      const hooks = await generateHooks(topic, platform);
      console.log('\nHOOKS:\n', hooks);
      break;

    case 'tweets':
      const tweets = vibe !== 'helpful'
        ? await generateTweetsWithVibe(topic, platform, vibe)
        : await generateTweets(topic, platform);
      console.log('\nPOSTS:\n', tweets);
      break;

    case 'case':
      const caseStudy = await generateCaseStudy(topic, platform);
      console.log('\nCASE STUDY:\n', caseStudy);
      break;

    case 'dm':
      const dmResponse = await generateDMResponse(topic, platform);
      console.log('\nRESPONSE:\n', dmResponse);
      break;

    case 'replies':
      const replies = await generateInfluencerReplies(topic, platform);
      console.log('\nENGAGEMENT REPLIES:\n', replies);
      break;

    case 'bait':
      const bait = await generateReplyBait(platform);
      console.log('\nREPLY BAIT:\n', bait);
      break;

    case 'hot-takes':
      const hotTakes = await generateControversial(platform);
      console.log('\nHOT TAKES:\n', hotTakes);
      break;

    case 'story':
      const story = await generateStory(topic, platform);
      console.log('\nSTORY:\n', story);
      break;

    case 'tutorial':
      const tutorial = await generateTutorial(topic, platform);
      console.log('\nTUTORIAL:\n', tutorial);
      break;

    case 'daily':
      await generateDailyContent(platform);
      break;

    case 'week':
      console.log('📅 Generating 7 days of content...\n');
      for (let i = 0; i < 7; i++) {
        console.log(`\n--- DAY ${i + 1} ---\n`);
        await generateDailyContent(platform);
      }
      break;

    case 'batch':
      await generateBatchContent(platform);
      break;

    case 'multiply':
      await generateRepurposedContent(topic, platform);
      break;

    case 'audit':
      await auditContent(topic, platform);
      break;

    case 'csv':
      try {
        const content = JSON.parse(fs.readFileSync(topic, 'utf8'));
        exportToCSV(content, `content-schedule-${new Date().toISOString().split('T')[0]}.csv`);
      } catch (e) {
        console.error('❌ Error reading file:', e.message);
        console.log('Usage: node contai.js csv <filename.json>');
      }
      break;

    case 'sequence':
      const seqDays = process.argv[4] === '5' ? 5 : 3;
      const seqPlatform = process.argv[5] || platform;
      await generateSequence(topic, seqDays, seqPlatform);
      break;

    case 'last':
      console.log('📂 Finding your most recent content...\n');
      const files = fs.readdirSync('.')
        .filter(f => f.endsWith('.json') && (
          f.startsWith('daily-content-') || 
          f.startsWith('content-batch-') || 
          f.startsWith('repurposed-') || 
          f.startsWith('trend-content-') || 
          f.startsWith('sequence-')
        ))
        .map(f => ({ name: f, time: fs.statSync(f).mtime.getTime() }))
        .sort((a, b) => b.time - a.time);

      if (files.length === 0) {
        console.log('❌ No generated content found in this directory.');
        break;
      }

      const latestFile = files[0].name;
      console.log(`✨ Showing content from: ${latestFile}\n`);
      
      try {
        const content = JSON.parse(fs.readFileSync(latestFile, 'utf8'));
        
        // Pretty print logic based on content type
        if (content.thread) {
          console.log('🧵 THREAD:\n' + '─'.repeat(30));
          if (content.thread.tweets) {
            content.thread.tweets.forEach(t => console.log(t + '\n'));
          } else {
            console.log(content.thread + '\n');
          }
        }

        if (content.tweets && Array.isArray(content.tweets)) {
          console.log('🐦 STANDALONE POSTS:\n' + '─'.repeat(30));
          content.tweets.forEach((t, i) => console.log(`[${i+1}] ${t}\n`));
        }

        if (content.caseStudy) {
          console.log('📄 CASE STUDY:\n' + '─'.repeat(30));
          console.log(content.caseStudy.content || content.caseStudy);
        }

        if (content.days && Array.isArray(content.days)) {
          console.log('📚 SEQUENCE:\n' + '─'.repeat(30));
          content.days.forEach(d => {
            console.log(`\n📍 ${d.name}\n${d.content}\n`);
          });
        }

        console.log('\n✅ End of content.');
      } catch (e) {
        console.error('❌ Error reading latest file:', e.message);
      }
      break;

    case 'trends':
      const trendCategory = topic || cfg.niche?.industry || 'technology';
      console.log(`\n📰 Fetching trends for: ${trendCategory}\n`);
      const trends = await fetchTrendingNews(cfg);

      if (trends.length > 0) {
        console.log('\n🔥 TRENDING NOW:\n');
        trends.slice(0, 15).forEach((item, i) => {
          console.log(`${i + 1}. 🔥 ${item.title}`);
          console.log(`   Source: ${item.source}`);
          console.log(`   URL: ${item.url}\n`);
        });

        const analysis = await analyzeTrendsWithAI(trends, cfg, genAI);
        const trendsContent = formatTrendsForFile(trends, analysis);
        const filename = `trends-${trendCategory.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.md`;
        fs.writeFileSync(filename, trendsContent);
        console.log(`\n💾 Trends saved to ${filename}`);
        console.log(`\n💡 Use "node contai.js trend-content ${trendCategory}" to generate content from these trends`);
      } else {
        console.log('No trends found. Check your config.news settings.');
      }
      break;

    case 'trend-content':
      const contentCategory = topic || cfg.niche?.industry || 'technology';
      const trendPlatform = process.argv[4] || 'twitter';
      console.log(`\n🚀 Generating content from trends for: ${contentCategory}\n`);

      const categoryTrends = await fetchTrendingNews(cfg);

      if (categoryTrends.length === 0) {
        console.log('No trends found. Run "node contai.js trends" first.');
        break;
      }

      const trendAnalysis = await analyzeTrendsWithAI(categoryTrends, cfg, genAI);

      const topTrend = trendAnalysis.topTrends?.[0];
      if (topTrend) {
        console.log(`\n📌 Creating content from: ${topTrend.title}\n`);

        const thread = await generateThread(topTrend.title, trendPlatform);
        console.log('\n🧵 THREAD:\n', thread);

        const tweets = await generateTweets(topTrend.title, trendPlatform);
        console.log('\n🐦 TWEETS:\n', tweets);

        // Create organized, clean output structure
        const filename = `trend-content-${contentCategory.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
        fs.writeFileSync(filename, JSON.stringify({
          metadata: {
            generated: new Date().toISOString(),
            category: contentCategory,
            platform: trendPlatform,
            version: '2.0.0'
          },
          trend: {
            title: topTrend.title || 'Untitled Trend',
            source: topTrend.source || 'Unknown',
            relevance: topTrend.relevance || '',
            contentAngle: topTrend.contentAngle || '',
            urgency: topTrend.urgency || 'medium'
          },
          analysis: {
            topTrends: trendAnalysis.topTrends?.map(t => ({
              title: t.title,
              source: t.source,
              relevance: t.relevance,
              contentAngle: t.contentAngle,
              urgency: t.urgency
            })) || [],
            contentIdeas: trendAnalysis.contentIdeas || [],
            searchSuggestions: trendAnalysis.searchSuggestions || [],
            crisisAlerts: trendAnalysis.crisisAlerts || []
          },
          content: {
            thread: {
              title: `Trend Analysis: ${topTrend.title}`,
              platform: trendPlatform,
              tweets: thread ? thread.split('\n').filter(line => line.trim()) : []
            },
            tweets: tweets ? tweets.split('\n\n').filter(t => t.trim()) : [],
            visualPrompts: trendAnalysis.visualPrompts || []
          },
          usage: {
            thread: 'Post as Twitter thread or LinkedIn article',
            tweets: 'Schedule throughout the week',
            visualPrompts: 'Use with Midjourney/DALL-E for images'
          }
        }, null, 2));

        console.log(`\n💾 Content saved to ${filename}`);
        console.log('\n📊 Generated:');
        console.log(`   - 1 thread (${trendPlatform})`);
        console.log(`   - ${tweets ? tweets.split('\n\n').filter(t => t.trim()).length : 0} tweets`);
        console.log(`   - ${trendAnalysis.topTrends?.length || 0} trend analysis items`);
        console.log(`   - ${trendAnalysis.contentIdeas?.length || 0} content ideas`);
      }
      break;

    default:
      console.log(`Unknown command: ${command}`);
      showHelp();
  }
};

// Run if called directly
if (process.argv[1] && (process.argv[1].includes('contai') || process.argv[1].includes('ai-growth-engine'))) {
  main();
}
