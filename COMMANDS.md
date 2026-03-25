# 📋 Commands Reference

> **Complete guide to all Contai commands** - Syntax, parameters, and examples

---

## 🎯 Command Structure

```bash
node contai.js <command> [topic] [platform]
```

**Parameters:**
- `<command>` - What to generate (required)
- `[topic]` - What to write about (optional, uses defaults)
- `[platform]` - Where to post (optional, defaults to `twitter`)

---

## 📝 Content Generation Commands

### 1. `thread` - Generate Viral Thread

**Purpose:** Create an 8-10 post viral thread

**Syntax:**
```bash
node contai.js thread [topic] [platform]
```

**Examples:**
```bash
# Twitter thread about design tips
node contai.js thread "logo design mistakes" twitter

# LinkedIn post about industry insights
node contai.js thread "SaaS growth strategies" linkedin

# Instagram caption about your journey
node contai.js thread "my freelancer journey" instagram
```

**Output:** 8-10 connected posts with hook, value, and CTA

**Best For:**
- Educational content
- Storytelling
- Case study breakdowns
- Process explanations

---

### 2. `hooks` - Generate 10 Viral Hooks

**Purpose:** Create 10 scroll-stopping opening lines

**Syntax:**
```bash
node contai.js hooks [topic] [platform]
```

**Examples:**
```bash
# Hooks for productivity content
node contai.js hooks "productivity tips"

# Hooks for tech content on LinkedIn
node contai.js hooks "developer career" linkedin
```

**Output:** 10 different hooks to start threads/posts

**Best For:**
- A/B testing thread openings
- Building a hook library
- Improving thread performance

---

### 3. `tweets` - Generate 10 Quick Posts

**Purpose:** Create 10 standalone posts/tweets

**Syntax:**
```bash
node contai.js tweets [topic] [platform]
```

**Examples:**
```bash
# Quick tips about freelancing
node contai.js tweets "freelance tips" twitter

# Instagram captions about your work
node contai.js tweets "design work" instagram

# Facebook posts for community
node contai.js tweets "business tips" facebook
```

**Output:** 10 short, punchy posts (under 280 chars each)

**Best For:**
- Daily posting
- Filling content calendar
- Quick engagement posts

---

### 4. `case` - Generate Case Study

**Purpose:** Create detailed breakdown/story

**Syntax:**
```bash
node contai.js case [topic] [platform]
```

**Examples:**
```bash
# Client success story
node contai.js case "client doubled revenue" linkedin

# Project breakdown
node contai.js case "website redesign process" twitter

# Personal achievement
node contai.js case "landed first tech job" twitter
```

**Output:** 600-800 word story with hook, timeline, lessons, CTA

**Best For:**
- Showcasing results
- Building credibility
- Teaching through examples

---

### 5. `dm` - Generate DM Response

**Purpose:** Create helpful DM replies

**Syntax:**
```bash
node contai.js dm [question] [platform]
```

**Examples:**
```bash
# Pricing inquiry
node contai.js dm "What are your rates?"

# Service inquiry
node contai.js dm "Do you offer logo design?"

# Advice request
node contai.js dm "How do I start in this field?"
```

**Output:** 3-5 sentence helpful response with natural CTA

**Best For:**
- Responding to inquiries
- Nurturing leads
- Building relationships

---

### 6. `replies` - Generate Influencer Replies

**Purpose:** Create high-value replies to others' content

**Syntax:**
```bash
node contai.js replies [tweet_text] [platform]
```

**Examples:**
```bash
# Reply to someone looking for designer
node contai.js replies "looking for a logo designer" twitter

# Reply to industry discussion
node contai.js replies "hiring is tough in tech right now" linkedin

# Reply to potential client
node contai.js replies "need help with my website" twitter
```

**Output:** 3 different reply variations (educational, personal, data-driven)

**Best For:**
- Getting noticed by potential clients
- Building relationships
- Growing your audience

---

### 7. `bait` - Generate Reply Bait

**Purpose:** Create posts designed to get comments

**Syntax:**
```bash
node contai.js bait [platform]
```

**Examples:**
```bash
# Twitter engagement bait
node contai.js bait twitter

# LinkedIn engagement post
node contai.js bait linkedin
```

**Output:** 5 posts asking for comments/replies

**Best For:**
- Boosting algorithm reach
- Starting conversations
- Building community

---

### 8. `hot-takes` - Generate Controversial Takes

**Purpose:** Create bold, shareable opinions

**Syntax:**
```bash
node contai.js hot-takes [platform]
```

**Examples:**
```bash
# Controversial industry opinions
node contai.js hot-takes twitter

# Bold professional takes
node contai.js hot-takes linkedin
```

**Output:** 5 controversial but not offensive opinions

**Best For:**
- Driving engagement
- Starting discussions
- Going viral

---

## 📦 Batch Generation Commands

### 9. `daily` - Generate Daily Content Package

**Purpose:** Complete daily content in one command

**Syntax:**
```bash
node contai.js daily [platform]
```

**Examples:**
```bash
# Daily content for Twitter
node contai.js daily twitter

# Daily content for LinkedIn
node contai.js daily linkedin
```

**Output:**
- 1 viral thread
- 3 quick posts
- 1 controversial take
- 1 reply bait post
- 5 influencer replies

**Saved to:** `daily-content-YYYY-MM-DD.json`

**Best For:**
- Daily posting routine
- Consistent content creation
- Saving time

---

### 10. `week` - Generate Full Week of Content

**Purpose:** 7 days of content at once

**Syntax:**
```bash
node contai.js week [platform]
```

**Examples:**
```bash
# Week of Twitter content
node contai.js week twitter

# Week of LinkedIn content
node contai.js week linkedin
```

**Output:**
- 7× daily packages (7 threads + 21 posts + 7 controversial + 7 bait + 35 replies)

**Best For:**
- Weekly content batching
- Planning ahead
- Consistency

---

### 11. `batch` - Generate 2 Weeks of Content

**Purpose:** Maximum content generation

**Syntax:**
```bash
node contai.js batch [platform]
```

**Examples:**
```bash
# 2 weeks of Twitter content
node contai.js batch twitter

# 2 weeks of LinkedIn content
node contai.js batch linkedin
```

**Output:**
- 6 viral threads
- 25+ quick posts
- 2 case studies

**Saved to:** `content-batch-YYYY-MM-DD.json`

**Best For:**
- Monthly content planning
- Bulk creation
- Maximum efficiency

---

## 🆘 Help Command

### `help` - Show All Commands

**Purpose:** Display command reference

**Syntax:**
```bash
node contai.js help
```

**Output:** Full command list with examples

---

## 📱 Platform Options

| Platform | Best For | Content Style |
|----------|----------|---------------|
| `twitter` | Threads, quick tips, engagement | Short, punchy, 280 chars |
| `linkedin` | Professional content, B2B | Longer, professional tone |
| `instagram` | Visual content, lifestyle | Emoji-heavy, captions |
| `facebook` | Community, mixed audience | Shareable, conversational |

**Default:** `twitter` (if no platform specified)

---

## 💡 Command Examples by Use Case

### Freelancer Finding Gigs

```bash
# Find opportunities
node contai.js replies "looking for designer" twitter

# Showcase work
node contai.js thread "recent brand project" twitter

# Share expertise
node contai.js tweets "design tips" twitter

# Daily routine
node contai.js daily twitter
```

### Job Seeker

```bash
# Show expertise
node contai.js thread "my latest project" linkedin

# Industry insights
node contai.js tweets "tech trends" linkedin

# Network building
node contai.js replies "hiring developers" twitter

# Professional content
node contai.js batch linkedin
```

### Author

```bash
# Book teasers
node contai.js thread "character introduction" instagram

# Writing process
node contai.js tweets "writing tips" twitter

# Reader engagement
node contai.js bait twitter

# Launch content
node contai.js daily instagram
```

### Educator

```bash
# Educational content
node contai.js thread "common mistakes" twitter

# Student wins
node contai.js case "student grade improvement" twitter

# Course promotion
node contai.js tweets "study tips" instagram

# Build audience
node contai.js batch twitter
```

### Creator

```bash
# Behind-the-scenes
node contai.js thread "day in my life" instagram

# Fan engagement
node contai.js bait twitter

# Content teasers
node contai.js tweets "video coming soon" twitter

# Growth content
node contai.js daily twitter
```

---

## ⏱️ Expected Generation Times

| Command | Time |
|---------|------|
| `thread` | 10-20 seconds |
| `hooks` | 10-15 seconds |
| `tweets` | 10-15 seconds |
| `case` | 20-30 seconds |
| `dm` | 5-10 seconds |
| `replies` | 10-15 seconds |
| `bait` | 5-10 seconds |
| `hot-takes` | 10-15 seconds |
| `daily` | 45-60 seconds |
| `week` | 5-7 minutes |
| `batch` | 3-5 minutes |

---

## 📁 Output Files

| Command | Output File |
|---------|-------------|
| `daily` | `daily-content-YYYY-MM-DD.json` |
| `batch` | `content-batch-YYYY-MM-DD.json` |
| `week` | Multiple daily files |

**All output is also displayed in terminal for immediate use.**

---

## 🎯 Pro Tips

### 1. Chain Commands
```bash
# Generate thread, then hooks for it
node contai.js thread "topic" twitter
node contai.js hooks "topic" twitter

# Pick best hook, regenerate thread
```

### 2. Topic Variations
```bash
# Same topic, different platforms
node contai.js thread "design tips" twitter
node contai.js thread "design tips" linkedin
node contai.js thread "design tips" instagram
```

### 3. Save Best Outputs
```bash
# Generate, review, save favorites
node contai.js tweets "tips" twitter

# Copy best ones to a separate file for later
```

### 4. Use with News
```bash
# Create TODAYnews.md with industry news
# Then generate timely content
node contai.js daily twitter
```

---

## ✅ Command Checklist

Before running commands:

- [ ] Config file exists (`config.json`)
- [ ] API key is set (`.env`)
- [ ] Topic is relevant to your config
- [ ] Platform matches your audience

---

## 📚 Related Documentation

- **Setup:** [`QUICKSTART.md`](QUICKSTART.md)
- **Configuration:** [`CONFIG_GUIDE.md`](CONFIG_GUIDE.md)
- **Workflows:** [`WORKFLOWS.md`](WORKFLOWS.md)
- **Strategy:** [`CONTENT_STRATEGY.md`](CONTENT_STRATEGY.md)

---

**Master these commands and you'll never run out of content!** 🚀
