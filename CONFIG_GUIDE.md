# ⚙️ Configuration Guide (v2.2.0)

> **Complete reference for config.json** - Every field explained with examples

---

## 📋 Overview

The `config.json` file is the **brain** of Contai. It tells the AI who you are, who you serve, and what you sound like. v2.2.0 introduces **Multi-Profile Support** and **Real-Time News Integration**.

---

## 📂 File Structure

```json
{
  "brand": { ... },
  "niche": { ... },
  "brandVoice": { ... },
  "product": { ... },
  "content": { ... },
  "nicheSpecific": { ... },
  "news": { ... }
}
```

---

## 🆕 1. Multi-Profile Support (`--brand` flag)

Contai now supports multiple brands effortlessly. You no longer need to manually rename files.
1. Create a file named `config.{name}.json` (e.g., `config.crypto.json`).
2. Run any command with the `--brand` flag:
```bash
node contai.js daily twitter --brand=crypto
```
Contai will automatically load `config.crypto.json` instead of the default `config.json`.

---

## 🆕 2. News Section (Real-Time Integration)

**Purpose:** Configure how Contai fetches industry news for "Trend-Jacking" content.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `enabled` | boolean | Toggle real-time news fetching |
| `categories` | array | Keywords for industry searches (e.g., "blockchain", "SaaS") |
| `sources` | object | Enable/disable sources (`reddit`, `hackernews`, `googleTrends`) |
| `subreddits` | array | Specific subreddits to monitor |
| `rssFeeds` | array | Custom RSS feed URLs |

### Example
```json
"news": {
  "enabled": true,
  "categories": ["cryptocurrency", "blockchain", "DeFi"],
  "sources": {
    "hackernews": true,
    "reddit": true,
    "googleTrends": true,
    "rssFeeds": true
  },
  "subreddits": ["cryptocurrency", "ethtrader"],
  "rssFeeds": ["https://techcrunch.com/feed/"]
}
```

---

## 3. Brand Section

**Purpose:** Your identity - name, tagline, and URL.

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Your brand/personal name | `"Acme Design Co"` |
| `url` | Your primary website/portfolio | `"https://acme.design"` |
| `scarcity`| Optional urgency text | `"2 spots open for January"` |

---

## 4. Niche Section

**Purpose:** Your industry and target audience.

| Field | Description | Example |
|-------|-------------|---------|
| `industry` | Your specific vertical | `"B2B SaaS for HR"` |
| `targetAudience` | Who you're talking to | `"SaaS founders raising seed"` |
| `painPoints` | Array of problems you solve | `["High churn", "Slow growth"]` |

---

## 5. Brand Voice Section

**Purpose:** How your content sounds. v2.2.0 uses these to seed the "Writing DNA."

| Field | Description | Example |
|-------|-------------|---------|
| `tone` | Adjectives for tone | `"Direct, no-BS, educational"` |
| `style` | Comparison phrase | `"Like a friend who tells hard truths"` |

---

## 6. Product Section

**Purpose:** Your features and pricing tiers.

```json
"product": {
  "features": ["Logo design", "Brand strategy"],
  "pricing": {
    "starter": "$500 - Logo only",
    "pro": "$1500 - Full brand"
  }
}
```

---

## 7. Content Section

**Purpose:** Your content pillars and topics.

```json
"content": {
  "pillars": {
    "educational": "40%",
    "caseStudies": "30%",
    "engagement": "20%",
    "product": "10%"
  },
  "topics": ["Logo design mistakes", "Startup branding"]
}
```

---

## 🎯 Advanced: Local Writing DNA (`my-style.txt`)

To take humanization even further, create a file named `my-style.txt` in the root directory. Paste 3-5 examples of your best writing. Contai will analyze your rhythm, slang, and emoji usage to mirror your specific identity.

---

## ✅ Config Checklist

- [ ] `brand.name` - Matches your social profiles.
- [ ] `brand.url` - Full URL with `https://`.
- [ ] `niche.painPoints` - Uses the exact language of your customers.
- [ ] `news.enabled` - Set to `true` if you want trend-jacking support.

---

**Contai v2.2.0 - Fully modular, multi-brand, and news-integrated.** 🚀
