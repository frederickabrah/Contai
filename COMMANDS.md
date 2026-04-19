# 📋 Commands Reference (v2.2.0)

> **Complete guide to all Contai commands** - Syntax, parameters, and examples

---

## 🎯 Command Structure

```bash
node contai.js <command> [topic/url/file] [platform] [--brand=name] [--vibe=vibe]
```

**Parameters:**
- `<command>` - What to generate (required)
- `[topic/url/file]` - What to write about or source material (optional)
- `[platform]` - Where to post (defaults to `twitter`)
- `--brand=name` - Use a specific profile (e.g., `--brand=crypto` loads `config.crypto.json`)
- `--vibe=vibe` - Apply tone modifier (e.g., `--vibe=aggressive`)

---

## 🆕 New in v2.2.0

### 1. `story` - Personal Narrative Archetype
**Purpose:** Create authentic, vulnerability-driven personal stories.
```bash
node contai.js story "how I failed at my first startup" twitter
```

### 2. `tutorial` - Technical Guide Archetype
**Purpose:** Create step-by-step educational guides.
```bash
node contai.js tutorial "how to setup a node project" linkedin
```

### 3. `last` - Lazy Mode Preview
**Purpose:** Instantly preview the most recent content generated without opening JSON files.
```bash
node contai.js last
```

### 4. `multiply` - URL/File Repurposing
**Purpose:** Turn a URL, file, or raw text into 7 different content formats.
```bash
# Repurpose a blog post from a URL
node contai.js multiply https://techcrunch.com/article-link twitter

# Repurpose from a local text file
node contai.js multiply my-blog-post.txt linkedin
```

### 5. `audit` - Content Doctor
**Purpose:** Get a virality score and human-likeness audit for any URL or text.
```bash
node contai.js audit https://my-post.com twitter
```

---

## 📝 Content Generation Commands

### `thread` - Viral Threads
**Syntax:** `node contai.js thread [topic] [platform]`
```bash
node contai.js thread "logo design" twitter --vibe=aggressive
```

### `hooks` - 10 Scroll-Stoppers
**Syntax:** `node contai.js hooks [topic] [platform]`
```bash
node contai.js hooks "productivity"
```

### `tweets` - 10 Standalone Posts
**Syntax:** `node contai.js tweets [topic] [platform]`
```bash
node contai.js tweets "freelance tips" instagram
```

### `case` - Case Study Breakdown
**Syntax:** `node contai.js case [topic] [platform]`
```bash
node contai.js case "client doubled revenue" linkedin
```

### `dm` - Relationship Builders
**Syntax:** `node contai.js dm [question] [platform]`
```bash
node contai.js dm "What are your rates?"
```

### `replies` - Influencer Engagement
**Syntax:** `node contai.js replies [text] [platform]`
```bash
node contai.js replies "looking for a developer" twitter
```

### `bait` - Engagement Bait
**Syntax:** `node contai.js bait [platform]`
```bash
node contai.js bait twitter
```

### `hot-takes` - Controversial Opinions
**Syntax:** `node contai.js hot-takes [platform]`
```bash
node contai.js hot-takes linkedin
```

---

## 📦 Batch & Advanced Commands

### `daily` - Daily Content Pack
**Output:** 1 thread + 3 posts + 1 hot-take + 1 bait + 5 replies.
```bash
node contai.js daily twitter --brand=saas
```

### `week` - 7 Days of Content
**Output:** 7 full daily packages.
```bash
node contai.js week twitter
```

### `batch` - 2 Weeks of Content
**Output:** 6 threads + 25+ posts + 2 case studies.
```bash
node contai.js batch linkedin
```

### `csv` - Export to Scheduler
**Purpose:** Convert a JSON batch file into a CSV for Buffer/Hypefury/Taplio.
```bash
node contai.js csv content-batch-2026-04-18.json
```

### `sequence` - Narrative Arcs
**Purpose:** Generate a 3 or 5-day connected story sequence.
```bash
node contai.js sequence "productivity" 5 twitter
```

### `trends` - Fetch Real-Time News
**Purpose:** Fetch industry trends based on your `config.news` settings.
```bash
node contai.js trends crypto
```

---

## 📱 Platform Options

| Platform | Best For | Content Style |
|----------|----------|---------------|
| `twitter` | Threads & Engagement | Short, punchy (default) |
| `linkedin` | Professional & B2B | Thought leadership |
| `instagram`| Visual & Lifestyle | Emoji-heavy, captions |
| `facebook` | Community | Conversational |

---

## 🎭 Vibes (--vibe flag)

| Vibe | Tone | Use Case |
|------|------|----------|
| `aggressive` | Bold, No-BS | Contrarian takes |
| `empathetic` | Warm, Personal | Personal stories |
| `sarcastic` | Witty, Dry | Humor/Engagement |
| `scientific` | Data-driven | Tech/Case studies |
| `minimalist` | Brief, Direct | Quick tips |
| `helpful` | Teacher-like | Tutorials (default) |

---

## 🎯 Pro Tips

1. **Chain for Success**: Run `audit` on your `multiply` output to ensure maximum virality.
2. **Multi-Brand**: Use `--brand=crypto` to instantly switch your identity without editing files.
3. **Lazy Mode**: Always run `node contai.js last` after a batch to quickly review your work.

**Contai v2.2.0 - One tool. Any niche. Unlimited content.** 🚀
