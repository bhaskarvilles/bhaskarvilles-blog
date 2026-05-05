/**
 * Dynamic OG Image Generator
 * This script can be used to generate OG images dynamically using Canvas API
 * Can be deployed as a serverless function or used with Hugo's image processing
 */

// Example function to generate OG image URL with parameters
function generateOGImageUrl(title, description, options = {}) {
  const defaults = {
    width: 1200,
    height: 630,
    bgColor: '1a1a2e',
    textColor: 'ffffff',
    fontSize: 64,
    fontFamily: 'Inter',
    logo: '/images/logo.png'
  };
  
  const config = { ...defaults, ...options };
  
  // Encode parameters for URL
  const params = new URLSearchParams({
    title: title,
    description: description || '',
    width: config.width,
    height: config.height,
    bgColor: config.bgColor,
    textColor: config.textColor,
    fontSize: config.fontSize,
    fontFamily: config.fontFamily,
    logo: config.logo
  });
  
  // Return URL to your OG image generation endpoint
  // This could be a serverless function, Cloudinary, or other service
  return `/api/og-image?${params.toString()}`;
}

// Example: Generate OG image for current page
if (typeof window !== 'undefined') {
  const pageTitle = document.querySelector('meta[property="og:title"]')?.content;
  const pageDesc = document.querySelector('meta[property="og:description"]')?.content;
  
  if (pageTitle) {
    const ogImageUrl = generateOGImageUrl(pageTitle, pageDesc);
    console.log('Generated OG Image URL:', ogImageUrl);
  }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { generateOGImageUrl };
}
