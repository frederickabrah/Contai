# ⚡ Quick Start Guide

> **Get Contai running in 5 minutes** - Even if you've never used Node.js before

---

## 🎯 What You'll Have in 5 Minutes

- ✅ Tool installed and running
- ✅ Your first viral thread generated
- ✅ Ready to create unlimited content

---

## 📋 Prerequisites (1 minute)

### Check Node.js is Installed
```bash
node --version
```

**Should show:** `v18.x.x` or higher

If not installed:
- **Windows/Mac:** Download from https://nodejs.org
- **Linux:** `curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - && sudo apt-get install -y nodejs`

---

## Step 1: Install Dependencies (1 minute)

```bash
cd contai
npm install
```

**Wait for:** `added 2 packages in Xs`

---

## Step 2: Get Your API Key (1 minute)

### Option A: Google Gemini (Recommended - Free)

1. **Go to:** https://makersuite.google.com/app/apikey

2. **Sign in** with your Google account

3. **Click:** "Create API Key"

4. **Copy** the key (looks like: `AIzaSy...`)

5. **Create `.env` file:**
```bash
cat > .env << EOF
GEMINI_API_KEY=AIzaSy-your-actual-key-here
EOF
```

**Free Tier Limits:**
- 1,000 requests/day (enough for 50-100 content pieces)
- 15 requests/minute
- No credit card required

---

## Step 3: Setup Your Config (1 minute)

### Quick Method: Use a Pre-made Template

**Pick one based on who you are:**

```bash
# Freelancer (designer, developer, writer, etc.)
cp config.freelancer.json config.json

# Job Seeker (tech professional)
cp config.jobseeker.json config.json

# Author (writer launching books)
cp config.author.json config.json

# Educator (teacher, coach, course creator)
cp config.educator.json config.json

# Creator (YouTuber, influencer)
cp config.creator.json config.json

# Business (SaaS, E-commerce, Crypto)
cp config.saas.json config.json
cp config.ecommerce.json config.json
cp config.crypto.json config.json
```

### Edit Your Config (30 seconds)

Open `config.json` and change just 3 things:

```json
{
  "brand": {
    "name": "YOUR NAME OR BUSINESS",
    "url": "https://your-website.com"
  },
  "niche": {
    "targetAudience": "WHO YOU SERVE"
  }
}
```

**That's it for now!** You can customize more later.

---

## Step 4: Unlock Your Voice (Optional but Recommended)

### Setup Style Mirroring (1 minute)

1. **Create:** `my-style.txt`
2. **Paste:** 3-5 examples of your best writing (tweets, posts, or articles)
3. **Save:** The tool now mirrors your specific writing DNA.

---

## Step 5: Test It Works (30 seconds)

```bash
node contai.js help
```

**Should show:** All available commands

---

## Step 5: Generate Your First Content (30 seconds)

```bash
# Generate a viral thread
node contai.js thread "your main topic" twitter

# Example for freelancer:
node contai.js thread "design mistakes" twitter

# Example for job seeker:
node contai.js thread "my latest project" linkedin

# Example for educator:
node contai.js thread "common student mistakes" twitter
```

**Wait 10-30 seconds** while AI generates content.

**Output:** A viral thread saved to your terminal and JSON file.

---

## 🎉 You're Done!

**You now have:**
- ✅ Working AI content generator
- ✅ Your first piece of content
- ✅ Unlimited content potential

---

## 🚀 What's Next?

### Option 1: Generate More Content
```bash
# Daily content package (1 thread + 3 posts + replies)
node contai.js daily

# 2 weeks of content (6 threads + 25+ posts)
node contai.js batch
```

### Option 2: Customize Your Config
Edit `config.json` with:
- More specific topics
- Your actual pricing
- Your unique features
- Your brand voice

### Option 3: Post Your Content
1. Copy the generated content from terminal
2. Paste into Twitter/LinkedIn/Instagram
3. Schedule or post immediately

---

## 📁 What Got Created

```
contai/
├── .env                      ← Your API key
├── config.json               ← Your configuration
├── brain.json               ← Memory (learns over time)
├── daily-content-YYYY-MM-DD.json  ← Daily content output
└── content-batch-YYYY-MM-DD.json  ← Batch content output
```

---

## ⏱️ Time Breakdown

| Step | Time |
|------|------|
| Install dependencies | 1 min |
| Get API key | 1 min |
| Setup config | 1 min |
| Test & generate | 1 min |
| **Total** | **4 minutes** |

**You have 1 minute to spare!** 🎉

---

## 🆘 Quick Troubleshooting

### "Module not found"
```bash
npm install
```

### "Invalid API key"
1. Check `.env` file: `cat .env`
2. Make sure no quotes around key
3. Should be: `GEMINI_API_KEY=AIzaSy...`

### "Config not found"
```bash
cp config.example.json config.json
```

### Content sounds generic
Edit `config.json` with more specific details about your niche.

---

## 📚 Next Steps

### Beginner Path:
1. ✅ Complete this Quick Start (you did!)
2. 📖 Read [`COMMANDS.md`](COMMANDS.md) - Learn all commands
3. 🎯 Read [`WORKFLOWS.md`](WORKFLOWS.md) - Find your use case
4. 📅 Read [`CONTENT_STRATEGY.md`](CONTENT_STRATEGY.md) - Plan posting

### Advanced Path:
1. 📖 Read [`CONFIG_GUIDE.md`](CONFIG_GUIDE.md) - Deep customization
2. 🔄 Try different config templates
3. 📊 Track analytics and iterate
4. 🎨 Experiment with platforms

---

## 💡 Pro Tips for Day 1

### 1. Start Small
```bash
# Just generate one thread today
node contai.js thread "your expertise" twitter

# Post it
# See how it performs
```

### 2. Don't Overthink Config
- Start with template
- Change just name and URL
- Customize more as you go

### 3. Save Everything
All output is saved to JSON files. Review later, don't feel pressured to post everything.

### 4. Edit Before Posting
AI gets you 90% there. Add your personal touch before posting.

---

## 🎯 Success Checklist

**By end of Day 1, you should have:**
- [ ] Tool installed and running
- [ ] API key configured
- [ ] Config customized (at least name/URL)
- [ ] Generated 1+ pieces of content
- [ ] Posted 1 piece of content

**Tomorrow:**
- [ ] Generate daily content
- [ ] Post consistently
- [ ] Track engagement
- [ ] Iterate based on results

---

## 📞 Need Help?

1. Check [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md)
2. Review your config in [`CONFIG_GUIDE.md`](CONFIG_GUIDE.md)
3. Read examples in [`EXAMPLES.md`](EXAMPLES.md)

---

**You're all set! Now go create some amazing content!** 🚀

---

**Next:** [`COMMANDS.md`](COMMANDS.md) - Learn all available commands
