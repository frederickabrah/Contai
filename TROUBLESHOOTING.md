# 🛠️ Troubleshooting Guide

> **Common issues and how to fix them** - Quick solutions to get you back on track

---

## 🔍 Quick Diagnostic

**What's not working?**

- [Installation Issues](#installation-issues)
- [API Key Problems](#api-key-problems)
- [Content Quality Issues](#content-quality-issues)
- [Configuration Errors](#configuration-errors)
- [Platform-Specific Issues](#platform-specific-issues)
- [Performance Problems](#performance-problems)

---

## Installation Issues

### "Node.js not found"

**Error:**
```
bash: node: command not found
```

**Solution:**

1. **Install Node.js:**
   - **Windows/Mac:** Download from https://nodejs.org
   - **Linux (Ubuntu/Debian):**
     ```bash
     curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
     sudo apt-get install -y nodejs
     ```
   - **Termux (Android):**
     ```bash
     pkg install nodejs
     ```

2. **Verify installation:**
   ```bash
   node --version
   # Should show v18.x.x or higher
   ```

3. **Restart terminal** and try again

---

### "npm install fails"

**Error:**
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /path/to/package.json
```

**Solution:**

1. **Make sure you're in the right directory:**
   ```bash
   cd contai
   ls
   # Should see package.json
   ```

2. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

3. **Delete node_modules and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Try with sudo (if permission errors):**
   ```bash
   sudo npm install
   ```

---

### "Module not found" Error

**Error:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'dotenv'
```

**Solution:**

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Verify installation:**
   ```bash
   ls node_modules
   # Should see @google and dotenv folders
   ```

3. **If still failing, reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### "Module type" Warning

**Warning:**
```
Warning: Module type of file:///... is not specified
```

**Solution:**

This is just a warning, not an error. Tool still works.

To fix it, ensure `package.json` has:
```json
{
  "type": "module"
}
```

---

## API Key Problems

### "Invalid API Key"

**Error:**
```
Error: Invalid API key
```

**Solution:**

1. **Check .env file exists:**
   ```bash
   cat .env
   ```

2. **Verify format (NO quotes):**
   ```
   ✅ Correct: GEMINI_API_KEY=AIzaSy...
   ❌ Wrong: GEMINI_API_KEY="AIzaSy..."
   ```

3. **Get new key if needed:**
   - Go to https://makersuite.google.com/app/apikey
   - Create new API key
   - Update .env file

4. **Restart the tool** after changing .env

---

### "Quota Exceeded"

**Error:**
```
Error: Quota exceeded
```

**Solution:**

**Free Tier Limits:**
- gemini-2.5-flash-lite: 1,000 requests/day
- gemini-2.5-flash: 250 requests/day
- gemini-2.5-pro: 100 requests/day

**Options:**

1. **Wait 24 hours** (resets at midnight PT)

2. **Tool auto-rotates models** - it will try next available model

3. **Upgrade to paid tier:**
   - https://ai.google.dev/pricing
   - $0.000125/1K characters (flash-lite)

4. **Use multiple API keys** (advanced):
   - Create multiple Google accounts
   - Get API key for each
   - Rotate when one hits limit

---

### "Rate Limit" Error

**Error:**
```
Error: Rate limit exceeded (15 RPM)
```

**Solution:**

**Rate Limits:**
- gemini-2.5-flash-lite: 15 requests/minute
- gemini-2.5-flash: 10 requests/minute
- gemini-2.5-pro: 5 requests/minute

**Fixes:**

1. **Wait 1 minute** between batch requests

2. **Tool auto-rotates** to next model when hit

3. **Space out requests:**
   ```bash
   # Don't run multiple commands at once
   # Wait for each to complete
   ```

---

## Content Quality Issues

### "Content Sounds Too AI-like"

**Problem:**
- Generic language
- Corporate speak
- Doesn't sound like you

**Solution:**

1. **Update config.json brandVoice:**
   ```json
   "brandVoice": {
     "tone": "More specific adjectives",
     "style": "Like a [specific comparison]"
   }
   ```

2. **Add examples to config:**
   ```json
   "content": {
     "examples": [
       "Post you liked",
       "Your writing style"
     ]
   }
   ```

3. **Edit output before posting:**
   - Add personal stories
   - Use your slang/terms
   - Make it more specific

4. **Regenerate with more specific topic:**
   ```bash
   # Instead of "tips"
   node contai.js thread "5 logo mistakes that cost clients customers" twitter
   ```

---

### "Content Too Generic"

**Problem:**
- Could apply to anyone
- No unique perspective
- Boring/forgettable

**Solution:**

1. **Be more specific in config:**
   ```json
   // ❌ Vague
   "niche": {
     "industry": "Business"
   }
   
   // ✅ Specific
   "niche": {
     "industry": "B2B SaaS for HR Tech"
   }
   ```

2. **Add specific pain points:**
   ```json
   "painPoints": [
     "Can't find product-market fit after 2 years",
     "Running out of runway in 3 months"
   ]
   ```

3. **Include your unique features:**
   ```json
   "product": {
     "features": [
       "Specific feature 1",
       "Unique approach 2"
     ]
   }
   ```

4. **Use real-time news:**
   ```bash
   # Create TODAYnews.md with industry news
   # Tool makes content timely and specific
   ```

---

### "Wrong Terminology Used"

**Problem:**
- Calls customers "users" but you say "clients"
- Uses wrong industry terms

**Solution:**

Update `nicheSpecific.terminology` in config:
```json
"nicheSpecific": {
  "terminology": {
    "customer": "Your actual term (e.g., Clients, Students, Readers)",
    "product": "Your actual term (e.g., Projects, Courses, Books)",
    "problem": "Your actual term (e.g., Challenges, Mistakes)",
    "event": "Your actual term (e.g., Launches, Releases)"
  }
}
```

---

## Configuration Errors

### "Config Not Loading"

**Problem:**
- Tool says "Running in generic mode"
- Your config changes not reflecting

**Solution:**

1. **Check file exists:**
   ```bash
   ls config.json
   ```

2. **Check file name:**
   - Must be exactly `config.json`
   - Not `config.json.txt` or `Config.json`

3. **Check JSON syntax:**
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('config.json')))"
   ```

4. **Use example as template:**
   ```bash
   cp config.example.json config.json
   ```

---

### "JSON Syntax Error"

**Error:**
```
SyntaxError: Unexpected token in JSON
```

**Solution:**

1. **Common mistakes:**
   ```json
   // ❌ Trailing comma
   {
     "field": "value",
   }
   
   // ✅ No trailing comma
   {
     "field": "value"
   }
   
   // ❌ Single quotes
   {
     'field': 'value'
   }
   
   // ✅ Double quotes
   {
     "field": "value"
   }
   
   // ❌ Unquoted keys
   {
     field: "value"
   }
   
   // ✅ Quoted keys
   {
     "field": "value"
   }
   ```

2. **Use JSON validator:**
   - https://jsonlint.com/
   - Paste your config, find errors

3. **Start fresh:**
   ```bash
   cp config.example.json config.json
   # Edit carefully
   ```

---

### "Changes Not Reflecting"

**Problem:**
- Edited config but output same

**Solution:**

1. **Save the file** (Ctrl+S or Cmd+S)

2. **Check you edited the right file:**
   ```bash
   pwd
   ls config.json
   cat config.json
   ```

3. **Restart the tool** (it caches config)

4. **Verify JSON is valid** (see above)

---

## Platform-Specific Issues

### "Wrong Format for Platform"

**Problem:**
- Twitter content too long
- LinkedIn content too short
- Instagram missing emojis

**Solution:**

1. **Specify platform in command:**
   ```bash
   # For LinkedIn (longer, professional)
   node contai.js thread "topic" linkedin
   
   # For Instagram (visual, emoji-heavy)
   node contai.js thread "topic" instagram
   
   # For Twitter (short, punchy)
   node contai.js thread "topic" twitter
   ```

2. **Check platform specs:**
   - Twitter: 280 characters, 2-3 hashtags max
   - LinkedIn: 1,300 characters, 3-5 hashtags
   - Instagram: 2,200 characters, 10-15 hashtags
   - Facebook: 250-400 characters, 1-3 hashtags

---

### "Character Limit Exceeded"

**Problem:**
- Thread posts too long for Twitter

**Solution:**

1. **Tool should auto-adjust** but if not:

2. **Edit output manually** to fit limits

3. **Regenerate with "short" in topic:**
   ```bash
   node contai.js tweets "short tips" twitter
   ```

4. **Specify platform** (it adjusts length):
   ```bash
   node contai.js thread "topic" twitter
   ```

---

### "Hashtags Not Working"

**Problem:**
- Too many hashtags
- Wrong hashtags for platform

**Solution:**

**Platform Best Practices:**

| Platform | Hashtags | Example |
|----------|----------|---------|
| Twitter | 0-2 | `#crypto #security` |
| LinkedIn | 3-5 | `#SaaS #B2B #Tech` |
| Instagram | 10-15 | `#design #branding #logo` |
| Facebook | 1-3 | `#business #tips` |

Edit config to match your platform:
```json
"content": {
  "hashtags": ["relevant", "to", "your", "niche"]
}
```

---

## Performance Problems

### "Slow Generation"

**Problem:**
- Taking 30+ seconds per request

**Solution:**

1. **Check internet connection:**
   ```bash
   ping google.com
   ```

2. **Model rotation** - tool may be on slower model:
   - gemini-2.5-pro is slowest but best quality
   - gemini-2.5-flash-lite is fastest

3. **Close other API requests** - don't run multiple commands

4. **Try off-peak hours** (US night = Asia day)

---

### "Timeout Errors"

**Error:**
```
Error: Request timeout
```

**Solution:**

1. **Check internet connection**

2. **Retry the command:**
   ```bash
   node contai.js thread "topic" twitter
   ```

3. **Try simpler topic** (shorter output)

4. **Use faster model** (edit code if advanced user)

---

### "Model Rotation Too Often"

**Problem:**
```
⚠️ Model gemini-2.5-flash failed 3 times, rotating...
```

**Solution:**

1. **Check API key is valid**

2. **Check rate limits** (see above)

3. **Check internet connection**

4. **Wait 5 minutes** and try again

5. **If persistent, get new API key**

---

## 🆘 Still Having Issues?

### Debug Checklist

- [ ] Node.js installed (v18+)
- [ ] In correct directory
- [ ] Dependencies installed (`npm install`)
- [ ] .env file exists with valid API key
- [ ] config.json exists and is valid JSON
- [ ] Internet connection working
- [ ] API quota not exceeded
- [ ] Using correct command syntax

### Get Help

1. **Check other docs:**
   - [`README.md`](README.md) - Overview
   - [`QUICKSTART.md`](QUICKSTART.md) - Setup
   - [`CONFIG_GUIDE.md`](CONFIG_GUIDE.md) - Configuration

2. **Search for your error** in this file

3. **Try the basics:**
   ```bash
   # Reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Test
   node contai.js help
   ```

---

## 📞 Support Resources

| Resource | For |
|----------|-----|
| [`README.md`](README.md) | General overview |
| [`QUICKSTART.md`](QUICKSTART.md) | First-time setup |
| [`CONFIG_GUIDE.md`](CONFIG_GUIDE.md) | Configuration help |
| [`COMMANDS.md`](COMMANDS.md) | Command reference |
| [`EXAMPLES.md`](EXAMPLES.md) | Output samples |

---

**Most issues are solvable in 5 minutes. Check this guide first!** 🔧
