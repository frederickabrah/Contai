# 🧩 Contai Modular Architecture

## 📁 File Structure

```
contai/
├── contai.js                 # Main entry point (CLI)
├── modules/
│   ├── index.js              # Central export point
│   │
│   ├── core/
│   │   ├── config.js         # Config loading & brand knowledge
│   │   ├── models.js         # Model rotation system
│   │   ├── brain.js          # Long-term memory
│   │   └── generator.js      # Core generation function
│   │
│   ├── filters/
│   │   ├── human-like.js     # AI phrase detection & Human Writing Laws
│   │   └── vibe.js           # Vibe/sentiment modifiers
│   │
│   ├── platforms/
│   │   └── index.js          # Platform-specific prompts
│   │
│   ├── generators/           # Content-specific templates
│   │   ├── thread.js         # Thread generation logic
│   │   ├── tweets.js         # Standalone post logic
│   │   ├── hooks.js          # Hook generation logic
│   │   ├── case-study.js     # Case study logic
│   │   ├── dm.js             # DM response logic
│   │   ├── replies.js        # Influencer reply logic
│   │   ├── bait.js           # Engagement bait logic
│   │   ├── controversial.js  # Hot-take logic
│   │   ├── story.js          # Personal narrative logic
│   │   └── tutorial.js       # Technical guide logic
│   │
│   ├── features/             # High-level engine features
│   │   ├── multiply.js       # Repurposing engine (URL/File/Text)
│   │   ├── audit.js          # Content Doctor (Critique/Scoring)
│   │   ├── sequence.js       # Narrative story sequences
│   │   └── csv-export.js     # CSV export for schedulers
│   │
│   └── utils/                # Shared utilities
│       ├── logger.js         # Console logging formatting
│       ├── scraper.js        # Web/URL scraping logic
│       └── validators.js     # Input/Arg validation
│
├── news-fetcher.js           # Real-time news & trend integration
└── docs/                     # All documentation
```

---

## ✅ Modularization Status (100% Complete)

### **Core Modules:**
- ✅ `modules/core/config.js` - Multi-profile support, brand knowledge
- ✅ `modules/core/models.js` - Smart rotation, quota management
- ✅ `modules/core/brain.js` - Long-term memory system
- ✅ `modules/core/generator.js` - Main generation with "Writing DNA"

### **Filter Modules:**
- ✅ `modules/filters/human-like.js` - Writing Laws, AI Blacklist, JSON-aware reflection
- ✅ `modules/filters/vibe.js` - 6 Sentiment overrides (Aggressive to Empathetic)

### **Generator Modules:**
- ✅ `modules/generators/` - All 10 content archetypes fully modularized

### **Feature Modules:**
- ✅ `modules/features/` - Repurposing, Auditing, and Sequencing engines

---

## 🚀 How to Use Modules

### **Import Everything:**
```javascript
import {
  loadConfig,
  generateContent,
  reflectAndRefine,
  generateThread,
  generateRepurposedContent,
  auditContent
} from './modules/index.js';
```

### **Import Specific Modules:**
```javascript
// Just filters
import { reflectAndRefine, HUMAN_WRITING_LAWS } from './modules/filters/human-like.js';

// Just generators
import { generateStory, generateTutorial } from './modules/generators/index.js';
```

---

## 📋 Technical Features

### **1. Human Writing Laws**
Resides in `modules/filters/human-like.js`. Instead of just banning phrases, it enforces architectural constraints:
- **Rhythm Cadence**: 1-short-1-long-1-fragment.
- **The Messy Detail**: Mandatory authentic injection.
- **Show, Don't Tell**: Automatic removal of thematic summaries.

### **2. JSON-Aware Reflection**
The reflection layer in `modules/filters/human-like.js` can detect if content is JSON and only humanizes the values while preserving valid JSON structure.

### **3. Multi-Profile logic**
Found in `modules/core/config.js`. Uses the `--brand` flag to dynamically load `config.{brand}.json`.

---

## 🎯 Architectural Benefits

- **Scalability**: Add new content types by dropping a file in `modules/generators/`.
- **Reliability**: Model rotation handles `429` errors across different files.
- **Humanity**: Shared reflection layer ensures every module sounds like a real person.

---

**Contai v2.2.0 is fully modularized and production-ready.** 🚀
