/**
 * Contai Core - Configuration Loading
 * Handles loading and caching of config.json
 */

import fs from 'fs';

let config = null;

/**
 * Load configuration from config.json
 * @returns {Object} Configuration object
 */
export const loadConfig = () => {
  if (config) return config; // Cache after first load

  try {
    if (fs.existsSync('config.json')) {
      config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
      return config;
    }
  } catch (e) {
    console.error('❌ Error loading config.json:', e.message);
  }

  // Fallback to generic mode
  console.log('⚠️  No config.json found. Running in generic mode.');
  console.log('📝 Copy config.example.json to config.json to customize.\n');

  config = {
    brand: {
      name: 'Contai',
      tagline: 'The AI-Powered Content Engine',
      url: 'https://github.com/frederickabrah/Contai',
      scarcity: ''
    },
    niche: {
      industry: 'Content Marketing',
      targetAudience: 'Content Creators',
      painPoints: ['Slow production', 'Inconsistent voice']
    },
    brandVoice: {
      tone: 'Direct, educational',
      style: 'Technical expert'
    },
    product: {
      features: ['Automated generation', 'Style mirroring'],
      pricing: { free: 'Open source' }
    },
    content: {
      pillars: { educational: '70%', product: '30%' },
      topics: ['AI Automation']
    },
    news: {
      enabled: false,
      categories: [],
      sources: {}
    }
  };

  return config;
};

/**
 * Get brand knowledge for prompts
 * @returns {string} Formatted brand knowledge string
 */
export const getBrandKnowledge = () => {
  const cfg = loadConfig();

  const brandName = cfg.brand?.name || 'Contai';
  const tagline = cfg.brand?.tagline || 'Your tagline';
  const url = cfg.brand?.url || 'https://github.com/frederickabrah/Contai';
  const scarcity = cfg.brand?.scarcity || '';
  
  const industry = cfg.niche?.industry || 'Your industry';
  const audience = cfg.niche?.targetAudience || 'Your audience';
  const painPoints = cfg.niche?.painPoints?.join(', ') || 'Common problems';
  
  const tone = cfg.brandVoice?.tone || 'Direct, helpful';
  const style = cfg.brandVoice?.style || 'Like a knowledgeable friend';
  
  const features = cfg.product?.features?.join(', ') || 'Great features';
  const pricing = Object.entries(cfg.product?.pricing || {})
    .map(([tier, desc]) => `${tier.toUpperCase()}: ${desc}`)
    .join(', ') || 'Flexible pricing';
  
  const pillars = cfg.content?.pillars || {};
  const educational = pillars.educational || '40%';
  const caseStudies = pillars.caseStudies || '30%';
  const engagement = pillars.engagement || '20%';
  const product = pillars.product || '10%';

  const terminology = cfg.nicheSpecific?.terminology || {};
  const customerTerm = terminology.customer || 'customers';
  const productTerm = terminology.product || 'products';
  const problemTerm = terminology.problem || 'problems';
  const eventTerm = terminology.event || 'events';

  return `
BRAND IDENTITY:
- Name: ${brandName}
- Tagline: ${tagline}
- URL: ${url}
${scarcity ? `- Scarcity: "${scarcity}"` : ''}

INDUSTRY & AUDIENCE:
- Industry: ${industry}
- Target: ${audience}
- Pain Points: ${painPoints}

BRAND VOICE:
- Tone: ${tone}
- Style: ${style}

PRODUCT/SERVICE:
- Features: ${features}
- Pricing: ${pricing}

CONTENT STRATEGY:
- ${educational} Educational (teach something valuable)
- ${caseStudies} Case Studies (breakdowns/examples)
- ${engagement} Engagement (questions, polls, discussions)
- ${product} Product/Service mentions

TERMINOLOGY:
- Call customers: ${customerTerm}
- Call products: ${productTerm}
- Call problems: ${problemTerm}
- Call industry news: ${eventTerm}

CRITICAL BRANDING RULE:
When mentioning ${brandName}, ALWAYS use the EXACT URL: "${url}".
DO NOT use variations of the URL.
`;
};

/**
 * Get config for news features
 * @returns {Object} News configuration
 */
export const getNewsConfig = () => {
  const cfg = loadConfig();
  return cfg.news || { enabled: false };
};
