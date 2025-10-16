# Google Search Console Setup Guide

## 🚀 **Complete Setup Process**

### **Step 1: Create Google Search Console Account**

1. **Visit Google Search Console**: https://search.google.com/search-console/
2. **Sign in** with your Google account
3. **Click "Add Property"**
4. **Select "URL prefix"**
5. **Enter your site URL**: `https://graham-space.pages.dev`
6. **Click "Continue"**

### **Step 2: Verify Ownership**

Google will show you several verification methods. Choose **"HTML tag"**:

1. **Copy the verification code** from the HTML tag method
2. **Replace `YOUR_VERIFICATION_CODE_HERE`** in your `hugo.toml` file:
   ```toml
   googleSiteVerification = "your-actual-verification-code-here"
   ```
3. **Build and deploy** your site:
   ```bash
   hugo
   git add .
   git commit -m "Add Google Search Console verification"
   git push
   ```
4. **Click "Verify"** in Google Search Console

### **Step 3: Submit Your Sitemap**

1. **In Google Search Console**, go to **"Sitemaps"** in the left sidebar
2. **Add sitemap URL**: `https://graham-space.pages.dev/sitemap.xml`
3. **Click "Submit"**

### **Step 4: Configure Settings**

#### **URL Inspection**
- Use **"URL Inspection"** tool to check individual pages
- Test your homepage: `https://graham-space.pages.dev/`
- Test a blog post: `https://graham-space.pages.dev/p/your-post-slug/`

#### **Coverage Report**
- Check **"Coverage"** to see which pages are indexed
- Look for any errors or warnings
- Submit pages for indexing if needed

#### **Performance Report**
- Monitor **"Performance"** to see search analytics
- Track clicks, impressions, CTR, and position
- Identify your best-performing content

### **Step 5: Set Up Monitoring**

#### **Email Notifications**
1. Go to **"Settings"** → **"Users and permissions"**
2. Add your email for notifications
3. Enable alerts for:
   - Coverage issues
   - Manual actions
   - Security issues

#### **Search Console API** (Optional)
- Enable API access for advanced monitoring
- Useful for automated reporting

## 📊 **Key Metrics to Monitor**

### **Performance Metrics**
- **Clicks**: How many people clicked from Google to your site
- **Impressions**: How many times your pages appeared in search
- **CTR**: Click-through rate (clicks ÷ impressions)
- **Position**: Average ranking position

### **Coverage Metrics**
- **Valid pages**: Pages successfully indexed
- **Error pages**: Pages with indexing issues
- **Excluded pages**: Pages not indexed (with reasons)

### **Core Web Vitals**
- **LCP**: Largest Contentful Paint (loading performance)
- **FID**: First Input Delay (interactivity)
- **CLS**: Cumulative Layout Shift (visual stability)

## 🔧 **Troubleshooting Common Issues**

### **Verification Failed**
- **Check**: Meta tag is in the `<head>` section
- **Check**: No extra spaces in verification code
- **Check**: Site is deployed and accessible
- **Wait**: Sometimes takes a few minutes

### **Sitemap Not Found**
- **Check**: Sitemap URL is correct: `https://graham-space.pages.dev/sitemap.xml`
- **Check**: Sitemap is accessible in browser
- **Check**: Sitemap contains valid XML

### **Pages Not Indexed**
- **Check**: Pages are not set to `draft: true`
- **Check**: Pages have proper meta tags
- **Check**: Pages are linked from other pages
- **Submit**: Use "URL Inspection" to request indexing

## 📈 **Optimization Tips**

### **Improve Search Visibility**
1. **Create quality content** regularly
2. **Use target keywords** naturally
3. **Build internal links** between posts
4. **Optimize images** with alt text
5. **Write compelling meta descriptions**

### **Monitor Competitors**
1. **Use "Performance"** report to see top queries
2. **Research keywords** your competitors rank for
3. **Create content** around high-opportunity keywords
4. **Track ranking changes** over time

### **Technical SEO**
1. **Fix any crawl errors** immediately
2. **Monitor Core Web Vitals** regularly
3. **Ensure mobile-friendliness**
4. **Keep sitemap updated**

## 🎯 **Expected Timeline**

- **Verification**: Immediate (after deployment)
- **Initial indexing**: 1-7 days
- **Full sitemap processing**: 1-2 weeks
- **Performance data**: 2-3 days delay
- **Core Web Vitals**: 28-day rolling average

## 📱 **Mobile App**

Download the **Google Search Console** mobile app for:
- Quick performance checks
- Real-time notifications
- On-the-go monitoring

## 🔗 **Useful Links**

- [Google Search Console Help](https://support.google.com/webmasters/)
- [Search Console API](https://developers.google.com/webmaster-tools/)
- [Core Web Vitals Guide](https://web.dev/vitals/)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

**Next Steps**: After setup, focus on creating quality content and monitoring your performance metrics to improve your search rankings!
