# 🚀 Contai

> **Universal AI-powered content growth engine** - Generate viral threads, posts, and engagement content for ANY brand, niche, or industry.

[![npm version](https://img.shields.io/npm/v/contai.svg)](https://www.npmjs.com/package/contai)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node version](https://img.shields.io/node/v/contai.svg)](https://nodejs.org/)

**Powered by Google Gemini AI** • **Fully Customizable** • **Multi-Platform**

---

## 🎯 What Is Contai?

Contai is a **universal content generation tool** that creates viral social media content using AI. Unlike generic AI writers, it's **fully customizable** via a simple config file - making it perfect for:

- 📱 **Freelancers** - Find gigs, showcase work, attract clients
- 💼 **Job Seekers** - Attract recruiters, showcase skills
- ✍️ **Authors** - Build audience, launch books
- 🎓 **Educators** - Sell courses, share knowledge
- 🎬 **Creators** - Grow audience, engage fans
- 🏢 **Businesses** - SaaS, E-commerce, Crypto, and more

**One tool. Any niche. Unlimited content.**

---

## 🆕 What's New in v2.0.0

### 🔄 Repurposing Engine (Multiply Command)
**Turn 1 idea into 7 formats.** Paste a blog post, winning tweet, or any content:
```bash
node contai.js multiply "your content here" twitter
```
Generates: 1 thread, 5 tweets, 1 case study, LinkedIn post, Instagram caption, 5 questions, 3 visual prompts

### 🎭 Sentiment Overrides (Vibe Control)
**Control the tone** with `--vibe` flag:
```bash
node contai.js thread "topic" twitter --vibe=aggressive
node contai.js tweets "tips" linkedin --vibe=scientific
```
Available vibes: `aggressive`, `empathetic`, `sarcastic`, `scientific`, `minimalist`, `helpful`

### 📊 CSV Export forSchedulers
**Import directly to Buffer, Hypefury, or Taplio:**
```bash
node contai.js csv content-batch-2026-03-21.json
```
Generates a CSV file ready to upload to your scheduler.

### 🩺 Content Doctor (Audit Command)
**Get a viral score** for your content:
```bash
node contai.js audit "your post draft" twitter
```
Returns: Virality score, AI smell detection, 3 pro versions, line-by-line fixes

### 📚 Narrative Sequences (NEW!)
**Tell stories, not random posts:**
```bash
# 3-Day Rabbit Hole
node contai.js sequence "your topic" 3 twitter

# 5-Day Hero Journey
node contai.js sequence "your topic" 5 linkedin
```

**3-Day Arc:**
- Day 1: Stir the Pot (controversial)
- Day 2: The Teach (solution)
- Day 3: Social Proof (results)

**5-Day Arc:**
- Day 1: The Problem (pain)
- Day 2: The Enemy (villain)
- Day 3: The Discovery (breakthrough)
- Day 4: The Solution (framework)
- Day 5: The Transformation (results)

**Why it works:** Creates a "rabbit hole" effect. People follow the story, engage daily, and convert by the end.

---

## 🚀 Advanced Features (v2.0.0)

### 1. 🧬 Style Mirroring (Identity Injector)
**Stop sounding like AI.** Create `my-style.txt` and paste 3-5 examples of your best writing. Contai will analyze your sentence rhythm, emoji usage, and unique slang to generate content that sounds exactly like **YOU**.

### 2. 🪝 A/B Hook Variations (Algorithm Hacker)
**Don't leave virality to chance.** For every thread or post, Contai generates 3-5 different "hooks" (Curiosity, Contrarian, Hard Truth, Data-driven). Pick the one that hits hardest for your audience.

### 3. 📸 Visual Prompt Generator
**Full-package posting.** Every piece of content includes a professional, high-quality 📸 **Visual Prompt** for AI image generators (Midjourney/DALL-E) that perfectly matches the vibe of your text.

### 4. 🧠 Self-Critique Engine (Human-Like Filter)
**Every piece of content is reviewed before you see it.** Contai automatically critiques generated content for:
- AI-sounding language (removes corporate speak)
- Hook strength (must stop scroll in 0.5 seconds)
- Authenticity (sounds like a real human)
- Conciseness (no fluff, every word matters)

If content scores below 8/10, it's automatically rewritten until it's perfect.

### 5. 🔄 Smart Model Rotation (Free Tier Optimized)
**Never hit rate limits.** Contai automatically rotates between 3 Google Gemini models:
- `gemini-2.5-flash-lite` - 1,000 requests/day (fastest)
- `gemini-2.5-flash` - 250 requests/day (balanced)
- `gemini-2.5-pro` - 100 requests/day (best quality)

If one model hits quota, Contai seamlessly switches to the next. **Result: 1,350+ requests/day on free tier.**

### 6. 📰 Real-Time News Integration (Trend Jacking)
**Make content timely and relevant.** Create `TODAYnews.md` with industry news (paste from Grok/Twitter). Contai automatically:
- Extracts trending topics, events, and people
- @mentions relevant users
- References specific events/amounts
- Makes content URGENT and timely

**Engagement boost: 3-10x higher on timely content.**

### 7. 🧠 Long-Term Memory (Brain System)
**Contai remembers and learns.** Every news sync, every generated piece, every victim/customer mentioned is stored in `brain.json`. Over time, Contai builds:
- Customer/user database (who you've helped)
- Product/project tracker (what you've covered)
- Industry trends (patterns you've identified)
- Successful hooks (what worked before)

**Result: Content gets smarter and more specific over time.**

### 8. 🎯 9 Pre-Built Config Templates
**Ready for any use case:**
- `config.freelancer.json` - Freelancers finding gigs
- `config.jobseeker.json` - Job seekers attracting recruiters
- `config.author.json` - Authors launching books
- `config.educator.json` - Educators selling courses
- `config.creator.json` - Content creators growing audience
- `config.saas.json` - B2B SaaS companies
- `config.ecommerce.json` - E-commerce stores
- `config.crypto.json` - Crypto projects
- `config.example.json` - Blank template

**Copy, customize, start posting in 2 minutes.**

### 9. 🌍 Multi-Platform Optimization
**One command, 4 platforms:**
- **Twitter** - Short, punchy, 280 chars, threads
- **LinkedIn** - Professional, longer form, industry insights
- **Instagram** - Visual captions, emoji-heavy, hashtags
- **Facebook** - Community-focused, shareable

**Same topic, automatically adapted for each platform.**

### 10. 📦 Batch Generation (Time Saver)
**Generate weeks of content in minutes:**
- `daily` - 1 thread + 3 posts + 5 replies + bait + controversial
- `week` - 7 days of content (7× daily packages)
- `batch` - 2 weeks of content (6 threads + 25+ posts + 2 case studies)

**20 minutes on Sunday = content for 2 weeks. Saves 10+ hours.**

---

## ⚡ Quick Start (5 Minutes)

### Step 1: Install
```bash
# Clone from GitHub
git clone https://github.com/frederickabrah/Contai.git
cd contai
npm install
```

### Step 2: Setup
```bash
# Get your free API key from Google
# https://makersuite.google.com/app/apikey

# Create .env file
cat > .env << EOF
GEMINI_API_KEY=your-api-key-here
EOF

# Copy config template
cp config.example.json config.json
```

### Step 3: Customize Config
Edit `config.json` with your brand details:
```json
{
  "brand": {
    "name": "Your Name",
    "url": "https://github.com/frederickabrah/Contai"
  },
  "niche": {
    "industry": "Content Marketing"
  }
}
```

### Step 4: Generate Content
```bash
# Show all commands
node contai.js help

# Generate a viral thread
node contai.js thread "your topic" twitter

# Generate daily content
node contai.js daily

# Generate 2 weeks of content
node contai.js batch
```

**That's it! You're now AI-powered.** 🎉

---

## 📋 All Commands

### Content Generation

| Command | Description | Example |
|---------|-------------|---------|
| `thread [topic] [platform]` | Generate viral thread | `node contai.js thread "tips" twitter` |
| `hooks [topic] [platform]` | Generate 10 viral hooks | `node contai.js hooks "productivity"` |
| `tweets [topic] [platform]` | Generate 10 posts | `node contai.js tweets "tips" instagram` |
| `case [topic] [platform]` | Generate case study | `node contai.js case "client win" linkedin` |
| `dm [question] [platform]` | Generate DM response | `node contai.js dm "pricing?"` |
| `replies [tweet] [platform]` | Generate replies | `node contai.js replies "looking for designer"` |
| `bait [platform]` | Generate reply bait | `node contai.js bait twitter` |
| `hot-takes [platform]` | Generate controversial takes | `node contai.js hot-takes` |

### Batch Generation

| Command | Description | Output |
|---------|-------------|--------|
| `daily [platform]` | Daily content package | 1 thread + 3 posts + replies |
| `week [platform]` | Full week (7 days) | 7× daily packages |
| `batch [platform]` | 2 weeks of content | 6 threads + 25+ posts |

### Platforms
- `twitter` - Short, punchy content (default)
- `linkedin` - Professional, longer form
- `instagram` - Visual, emoji-heavy
- `facebook` - Community-focused

---

## 🎯 Use Cases & Config Templates

### 📱 Freelancer Looking for Gigs
```bash
cp config.freelancer.json config.json
node contai.js replies "looking for designer" twitter
node contai.js daily
```

### 💼 Job Seeker Attracting Recruiters
```bash
cp config.jobseeker.json config.json
node contai.js batch linkedin
```

### ✍️ Author Launching a Book
```bash
cp config.author.json config.json
node contai.js daily instagram
```

### 🎓 Educator Selling Courses
```bash
cp config.educator.json config.json
node contai.js batch twitter
```

### 🎬 Creator Growing Audience
```bash
cp config.creator.json config.json
node contai.js daily twitter
```

### 🏢 Business (SaaS, E-commerce, Crypto)
```bash
cp config.saas.json config.json
cp config.ecommerce.json config.json
cp config.crypto.json config.json
```

---

## ⚙️ Configuration

Contai is **fully customizable** via `config.json`. Edit these sections:

```json
{
  "brand": {
    "name": "Contai",
    "tagline": "Your tagline",
    "url": "https://github.com/frederickabrah/Contai"
  },
  "niche": {
    "industry": "Your industry",
    "targetAudience": "Who you serve",
    "painPoints": ["Problems you solve"]
  },
  "brandVoice": {
    "tone": "Direct, friendly",
    "style": "Like a knowledgeable friend"
  },
  "product": {
    "features": ["Feature 1", "Feature 2"],
    "pricing": {
      "tier1": "$0 - Free tier",
      "tier2": "$10/month - Pro"
    }
  },
  "content": {
    "topics": ["Topic 1", "Topic 2", "Topic 3"]
  }
}
```

**See:** [`CONFIG_GUIDE.md`](CONFIG_GUIDE.md) for complete documentation.

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [`README.md`](README.md) | This file - Overview & quick start |
| [`QUICKSTART.md`](QUICKSTART.md) | 5-minute setup guide |
| [`CONFIG_GUIDE.md`](CONFIG_GUIDE.md) | Complete configuration reference |
| [`COMMANDS.md`](COMMANDS.md) | All commands with examples |
| [`WORKFLOWS.md`](WORKFLOWS.md) | Real-world workflows by use case |
| [`CONTENT_STRATEGY.md`](CONTENT_STRATEGY.md) | Posting schedules & strategy |
| [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) | Common issues & solutions |
| [`EXAMPLES.md`](EXAMPLES.md) | Real output examples |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | How to contribute |
| [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) | Community guidelines |

---

## 💡 Example Output

### Sample Thread (Twitter)
```
1/7
If you're still designing logos in Photoshop alone, you're losing clients.

Here's the workflow that 3x'd my freelance income:

2/7
First, I start with a discovery call.

Not about colors or fonts.

About their business, customers, and competitors.

Most skip this. Big mistake.

[continues...]

7/7
Ready to stop competing on price?

I'm opening 2 spots for January brand packages.

Portfolio: https://yourportfolio.com

DM "BRAND" to apply.
```

**See:** [`EXAMPLES.md`](EXAMPLES.md) for more samples.

---

## 🚀 Pro Tips

### 1. Batch Create Content
```bash
# Every Sunday, generate 2 weeks of content
node contai.js batch twitter

# Review and schedule throughout the week
# Takes 20 minutes, saves 10+ hours
```

### 2. Find Opportunities (Freelancers/Job Seekers)
```bash
# Find people looking for your skills
node contai.js replies "looking for designer" twitter
node contai.js replies "hiring developer" twitter
```

### 3. Use Real-Time News
```bash
# Create TODAYnews.md with industry news
# Tool automatically makes content timely
node contai.js daily twitter
```

### 4. Multi-Platform Strategy
```bash
# Generate once, post everywhere
node contai.js thread "topic" twitter
node contai.js thread "topic" linkedin
node contai.js thread "topic" instagram
```

---

## ❓ FAQ

### Is this really free?
**Yes!** Google Gemini has a generous free tier:
- 1,000 requests/day (enough for 50-100 content pieces)
- No credit card required
- Paid tier available for heavy users

### Do I need coding experience?
**No.** If you can edit a JSON file and run `node [command]`, you're set.

### How do I get my API key?
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key"
4. Copy it to `.env` file

### Can I use this for my client's business?
**Absolutely!** That's exactly what it's designed for. Customize config.json for each client.

### What if I don't like the output?
1. Check your config - be more specific
2. Try different topics
3. Regenerate (takes seconds)
4. Edit the output (it's yours to keep)

### Is the content copyright-free?
**Yes.** You own all generated content. Use it commercially, modify it, resell it - it's yours.

---

## 🆘 Troubleshooting

### "Module not found"
```bash
npm install
```

### "Invalid API Key"
1. Check `.env` file exists
2. Verify API key is correct (no quotes)
3. Should be: `GEMINI_API_KEY=AIzaSy...`

### "Config not found"
```bash
cp config.example.json config.json
```

**See:** [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) for more solutions.

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

**See:** [`CONTRIBUTING.md`](CONTRIBUTING.md) for detailed guidelines.

---

## 📄 License

ISC License - Use freely for personal or commercial projects.

**See:** [`LICENSE`](LICENSE) for full text.

---

## 🙏 Credits

**Built with:**
- Google Gemini AI (https://ai.google.dev/)
- Node.js ES Modules
- Community feedback from builders

**Inspired by:**
- The best content creators on Twitter/LinkedIn
- Growth hacking strategies that actually work
- The belief that AI should amplify humans, not replace them

---

## 📞 Support

- **Documentation:** See all docs above
- **Issues:** https://github.com/frederickabrah/Contai/issues
- **Discussions:** https://github.com/frederickabrah/Contai/discussions

---

## 🚀 Ready to Grow?

```bash
# Install
git clone https://github.com/frederickabrah/Contai.git
cd contai
npm install

# Setup
cp config.example.json config.json
# Edit config.json with your details

# Generate content
node contai.js daily

# Post and grow!
```

**Your AI-powered content engine is ready. Now go create!** 🎉

---

**Version:** 1.0.0  
**Last Updated:** 2026-03-21  
**Status:** Production Ready  
**Repository:** https://github.com/frederickabrah/Contai
