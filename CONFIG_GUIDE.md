# ⚙️ Configuration Guide

> **Complete reference for config.json** - Every field explained with examples

---

## 📋 Overview

The `config.json` file is the **brain** of AI Growth Engine. It tells the AI:
- Who you are (brand)
- Who you're talking to (niche/audience)
- What you sound like (voice)
- What you offer (product)
- What to post about (content)

**One config file = Completely customized content for YOUR brand.**

---

## 📁 File Structure

```json
{
  "brand": { ... },
  "niche": { ... },
  "brandVoice": { ... },
  "product": { ... },
  "content": { ... },
  "nicheSpecific": { ... }
}
```

---

## 1. Brand Section

**Purpose:** Your identity - what people know you as

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `name` | string | ✅ Yes | Your brand/business/personal name | `"Acme Design Co"` |
| `tagline` | string | ⚠️ Recommended | Your catchy one-liner | `"Design that converts"` |
| `url` | string | ✅ Yes | Your website/portfolio URL | `"https://acme.design"` |
| `scarcity` | string | ❌ Optional | Urgency/scarcity text | `"2 spots open for January"` |

### Example
```json
"brand": {
  "name": "Sarah Design Co",
  "tagline": "Turning startups into brands that investors love",
  "url": "https://sarahdesigns.com",
  "scarcity": "Booking February projects - 3 spots left"
}
```

### Best Practices
- **Name:** Use what you're known as (personal name or business)
- **Tagline:** Keep it under 10 words, focus on outcome
- **URL:** Always use full URL with `https://`
- **Scarcity:** Only if you have real scarcity (don't fake it)

### Common Mistakes
❌ `"name": "My Company"` (too vague)  
✅ `"name": "Acme SaaS Solutions"`

❌ `"url": "sarahdesigns.com"` (missing https)  
✅ `"url": "https://sarahdesigns.com"`

---

## 2. Niche Section

**Purpose:** Your industry and who you serve

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `industry` | string | ✅ Yes | Your industry/vertical | `"B2B SaaS"` |
| `targetAudience` | string | ✅ Yes | Who you're talking to | `"Startup founders raising Series A"` |
| `painPoints` | array | ✅ Yes | Problems your audience faces | `["Can't find product-market fit", "Running out of runway"]` |

### Example
```json
"niche": {
  "industry": "Freelance Web Development",
  "targetAudience": "Small business owners who need websites that actually generate leads",
  "painPoints": [
    "Websites that look pretty but don't convert",
    "Getting quoted $20K+ from agencies",
    "DIY website builders that look amateur",
    "Developers who miss deadlines"
  ]
}
```

### Best Practices
- **Industry:** Be specific (not just "Tech" but "B2B SaaS for HR")
- **Target Audience:** Include demographics + psychographics
- **Pain Points:** List 3-5 specific problems, use their language

### Common Mistakes
❌ `"industry": "Business"` (too broad)  
✅ `"industry": "B2B SaaS for HR Tech"`

❌ `"targetAudience": "Everyone"` (too vague)  
✅ `"targetAudience": "HR managers at 50-200 person companies"`

---

## 3. Brand Voice Section

**Purpose:** How your content sounds

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `tone` | string | ✅ Yes | Your communication style | `"Direct, no-BS, educational"` |
| `style` | string | ✅ Yes | How you come across | `"Like a friend who tells hard truths"` |

### Example
```json
"brandVoice": {
  "tone": "Friendly, encouraging, patient, relatable",
  "style": "Like a tutor who actually cares and explains things clearly"
}
```

### Voice Examples by Use Case

**Freelancer:**
```json
"tone": "Confident, reliable, creative, friendly",
"style": "Like a creative partner who delivers on time"
```

**Job Seeker:**
```json
"tone": "Professional, humble, passionate, collaborative",
"style": "Like a teammate who ships quality code"
```

**Author:**
```json
"tone": "Mysterious, engaging, witty, thoughtful",
"style": "Like a storyteller around a campfire"
```

**Educator:**
```json
"tone": "Patient, encouraging, relatable, enthusiastic",
"style": "Like a tutor who explains things clearly"
```

**Creator:**
```json
"tone": "Fun, authentic, energetic, relatable",
"style": "Like a friend hanging out and sharing cool stuff"
```

### Best Practices
- Use 3-4 adjectives for tone
- Style should be a comparison ("Like a...")
- Match how you actually talk in real life

### Common Mistakes
❌ `"tone": "Professional"` (too generic)  
✅ `"tone": "Professional but approachable, data-driven"`

---

## 4. Product Section

**Purpose:** What you offer and pricing

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `features` | array | ✅ Yes | What you offer | `["Logo design", "Brand identity"]` |
| `pricing` | object | ⚠️ Recommended | Your pricing tiers | See examples below |

### Example
```json
"product": {
  "features": [
    "Logo design that stands out",
    "Complete brand identity packages",
    "Website design and UI/UX",
    "Social media graphics and templates",
    "Fast turnaround (3-5 days)",
    "Unlimited revisions until perfect"
  ],
  "pricing": {
    "starter": "$500 - Logo design only",
    "pro": "$1500 - Full brand identity",
    "premium": "$3000 - Brand + website"
  }
}
```

### Pricing Examples by Use Case

**Freelancer:**
```json
"pricing": {
  "starter": "$500 - Logo only",
  "pro": "$1500 - Full brand identity",
  "premium": "$3000 - Brand + website"
}
```

**Job Seeker:**
```json
"pricing": {
  "fulltime": "Open to full-time roles ($120K-$180K)",
  "contract": "Available for contract work ($80-$150/hour)",
  "remote": "Prefer remote but open to hybrid"
}
```

**Educator:**
```json
"pricing": {
  "free": "$0 - YouTube content",
  "course": "$97 - Full course",
  "tutoring": "$50/hour - 1-on-1 sessions",
  "premium": "$197 - Course + monthly coaching"
}
```

**Author:**
```json
"pricing": {
  "ebook": "$4.99 - Kindle/PDF/EPUB",
  "paperback": "$14.99 - Print edition",
  "audiobook": "$19.99 - Audible",
  "boxset": "$29.99 - Complete series"
}
```

### Best Practices
- **Features:** List 5-7 specific features/benefits
- **Pricing:** Use descriptive tier names
- Include outcomes, not just features

### Common Mistakes
❌ `"features": ["Good service"]` (too vague)  
✅ `"features": ["24-hour turnaround", "Unlimited revisions"]`

---

## 5. Content Section

**Purpose:** Your content strategy

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `pillars` | object | ⚠️ Recommended | Content mix percentages | See below |
| `topics` | array | ✅ Yes | Topics to cover | `["Design tips", "Client work"]` |

### Content Pillars

```json
"pillars": {
  "educational": "40%",
  "caseStudies": "30%",
  "engagement": "20%",
  "product": "10%"
}
```

**What each means:**
- **Educational (40%):** Teach something valuable
- **Case Studies (30%):** Show client/customer results
- **Engagement (20%):** Questions, polls, discussions
- **Product (10%):** Mention your offering

### Topics Examples

**Freelancer:**
```json
"topics": [
  "Logo design mistakes to avoid",
  "Brand identity tips for startups",
  "Color psychology in design",
  "Before/after redesigns",
  "Client success stories",
  "Design trends in 2026"
]
```

**Job Seeker:**
```json
"topics": [
  "Code optimization tips",
  "Project build breakdowns",
  "Tech stack comparisons",
  "Learning journey posts",
  "Open source contributions",
  "Interview prep tips"
]
```

**Educator:**
```json
"topics": [
  "Common calculus mistakes",
  "Quick problem-solving tricks",
  "Student success stories",
  "Study tips and exam prep",
  "Math anxiety coaching",
  "Real-world math applications"
]
```

### Best Practices
- **Topics:** List 5-10 specific topics
- Use language your audience uses
- Mix evergreen and timely topics

### Common Mistakes
❌ `"topics": ["Tips"]` (too vague)  
✅ `"topics": ["5 logo design mistakes that cost clients customers"]`

---

## 6. Niche Specific Section

**Purpose:** Industry-specific terminology

### Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `terminology` | object | ⚠️ Recommended | Industry language | See below |

### Terminology Examples

**Freelancer:**
```json
"terminology": {
  "customer": "Clients",
  "product": "Design projects",
  "problem": "Design mistakes",
  "event": "Project launches"
}
```

**Job Seeker:**
```json
"terminology": {
  "customer": "Companies/Teams",
  "product": "Projects/Code",
  "problem": "Technical challenges",
  "event": "Product launches"
}
```

**Author:**
```json
"terminology": {
  "customer": "Readers/Fans",
  "product": "Books/Stories",
  "problem": "Writer's block",
  "event": "Book launches"
}
```

**Educator:**
```json
"terminology": {
  "customer": "Students",
  "product": "Courses/Lessons",
  "problem": "Learning challenges",
  "event": "Exam seasons"
}
```

### Why This Matters
The AI uses these terms when generating content, making it sound like you actually work in your industry.

---

## 🎯 Complete Config Example

Here's a fully customized config for a freelance web developer:

```json
{
  "brand": {
    "name": "DevName Solutions",
    "tagline": "Building websites that turn visitors into customers",
    "url": "https://devname.dev",
    "scarcity": "2 spots open for February"
  },
  "niche": {
    "industry": "Freelance Web Development",
    "targetAudience": "Small business owners who need websites that generate leads",
    "painPoints": [
      "Websites that look pretty but don't convert",
      "Getting quoted $20K+ from agencies",
      "DIY builders that look amateur",
      "Developers who miss deadlines"
    ]
  },
  "brandVoice": {
    "tone": "Confident, reliable, friendly, no-BS",
    "style": "Like a developer friend who tells you what you need to hear"
  },
  "product": {
    "features": [
      "Custom website design",
      "Conversion-optimized layouts",
      "Mobile-responsive design",
      "SEO-friendly structure",
      "Fast loading (under 2 seconds)",
      "30-day support included"
    ],
    "pricing": {
      "starter": "$2000 - Landing page",
      "pro": "$5000 - 5-page website",
      "premium": "$10000 - Full site + SEO"
    }
  },
  "content": {
    "pillars": {
      "educational": "40%",
      "caseStudies": "30%",
      "engagement": "20%",
      "product": "10%"
    },
    "topics": [
      "Website mistakes that kill conversions",
      "Mobile optimization tips",
      "Before/after redesigns",
      "Client success stories",
      "SEO basics for business owners",
      "Website speed optimization"
    ]
  },
  "nicheSpecific": {
    "terminology": {
      "customer": "Clients",
      "product": "Websites/Projects",
      "problem": "Conversion issues",
      "event": "Website launches"
    }
  }
}
```

---

## 🔄 Switching Between Configs

Want to use a different template?

```bash
# Backup current config
cp config.json config.my-custom.json

# Use a different template
cp config.freelancer.json config.json

# Or restore your backup
cp config.my-custom.json config.json
```

---

## ✅ Config Checklist

Before running the tool:

- [ ] `brand.name` - Your actual name/business
- [ ] `brand.url` - Full URL with https://
- [ ] `niche.industry` - Specific industry
- [ ] `niche.targetAudience` - Who you serve
- [ ] `niche.painPoints` - 3-5 specific problems
- [ ] `brandVoice.tone` - 3-4 adjectives
- [ ] `brandVoice.style` - Comparison phrase
- [ ] `product.features` - 5-7 features
- [ ] `content.topics` - 5-10 topics

---

## 📚 Related Documentation

- **Setup:** [`QUICKSTART.md`](QUICKSTART.md)
- **Commands:** [`COMMANDS.md`](COMMANDS.md)
- **Workflows:** [`WORKFLOWS.md`](WORKFLOWS.md)
- **Examples:** [`EXAMPLES.md`](EXAMPLES.md)

---

**Your config is the foundation for great content. Invest time here!** 🎯
