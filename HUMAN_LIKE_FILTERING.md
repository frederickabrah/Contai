# 🤖 Enhanced Human-Like Content Filtering (v2.2.0)

## What Changed

Contai v2.2.0 moves beyond simple phrase detection. It now uses **Architectural Writing Constraints** (Human Writing Laws) to ensure every piece of content sounds like it was written by a human with a unique rhythm and personality.

---

## 🔥 New Features

### 1. **The Human Writing Laws**
Residing in `modules/filters/human-like.js`, these laws force the AI to follow human-specific writing patterns:
- **Rhythm Cadence**: Mandatory use of the "1-short, 1-long, 1-fragment" sentence structure.
- **The Messy Detail**: Automatically injects a specific, slightly irrelevant personal detail (e.g., "my coffee was cold", "I was wearing my old hoodie").
- **Show, Don't Tell**: Banned from summarizing themes or "moralizing" the story.
- **Vocabulary Constraint**: Uses simple, punchy, conversational English. No "large" words.

### 2. **JSON-Aware Reflection**
Contai can now humanize structured data. When generating batch content or CSV exports, the reflection layer:
- Detects JSON structures.
- Humanizes only the string values.
- Preserves strict JSON validity for tool compatibility.

### 3. **AI Phrase Blacklist (120+ Banned Phrases)**
Rigorously filters out corporate and AI-sounding jargon like:
- "In today's digital landscape..."
- "It's important to leverage..."
- "This comprehensive guide..."
- "Delve deep into..."
- "Unlock the power of..."

---

## 🎯 Technical Implementation

### Core Files
- `modules/filters/human-like.js`: Contains the `reflectAndRefine()` engine, `AI_PHRASES_TO_BAN`, and `HUMAN_WRITING_LAWS`.
- `modules/core/generator.js`: Injects pre-generation "Writing DNA" instructions into every prompt.

### Two-Pass Filtering System

**Pass 1: Pre-Generation Instruction**
Every generation includes strict human-like rules and examples of "Bad AI" vs "Good Human" writing.

**Pass 2: Post-Generation Reflection**
The `reflectAndRefine` function (in `modules/filters/human-like.js`) acts as a ruthless editor:
1. Scans for banned AI phrases.
2. Enforces the Human Writing Laws.
3. Rewrites content until it achieves a high human-likeness score.
4. Extends valid JSON if structured output is detected.

---

## 📊 Before vs After

### Before (AI-Sounding):
```
In today's digital landscape, it's important to leverage comprehensive strategies for success. Many experts say that individuals should utilize data-driven approaches to navigate the ever-evolving world of social media.
```

### After (v2.2.0 Humanized):
```
Most strategies are bullshit. I learned this after losing $50K while sitting in my messy kitchen. Data doesn't lie. Feelings do.
```

---

## ✅ Testing Your Content

### Test Command:
```bash
node contai.js audit "your post draft" twitter
```

### What to Look For:
- ✅ **Rhythm**: Does it have varying sentence lengths?
- ✅ **Specifics**: Does it mention a real, "messy" detail?
- ✅ **No Jargon**: Did it avoid "comprehensive", "landscape", and "leverage"?
- ✅ **Directness**: Does it sound like a friend at a bar?

---

## 🚀 Pro Tips

### 1. **Style Mirroring**
Create a `my-style.txt` file with 3-5 examples of your best writing. Contai analyzes this to inject **YOUR** specific DNA into the generation.

### 2. **Vibe Overrides**
Use the `--vibe` flag to shift the human personality:
- `--vibe=aggressive`: Direct, no-BS, confrontational.
- `--vibe=empathetic`: Warm, personal, story-driven.

---

**Contai v2.2.0 - Content that sounds 100% human, every single time.** 🤖
