/**
 * Contai Features - CSV Export for Content Schedulers
 * Exports content to CSV format for Buffer, Hypefury, Taplio, etc.
 */

import fs from 'fs';

/**
 * Export content to CSV format for schedulers
 * @param {Object} content - Content object with thread, tweets, caseStudy
 * @param {string} filename - Output filename (default: content-schedule.csv)
 * @returns {string|null} Output filename or null on error
 */
export const exportToCSV = (content, filename = 'content-schedule.csv') => {
  console.log('📊 Exporting to CSV for Buffer/Hypefury/Taplio...\n');

  // CSV header for most schedulers
  let csv = 'Date,Time,Content,Image_Prompt,Platform\n';

  // Parse content and create rows
  const rows = [];
  const today = new Date();

  if (content.thread) {
    const threadDate = new Date(today);
    threadDate.setDate(today.getDate() + 1);
    const formattedDate = threadDate.toISOString().split('T')[0];
    const escapedThread = content.thread.replace(/"/g, '""');
    rows.push(`"${formattedDate}","09:00","${escapedThread}","","Twitter"`);
  }

  if (content.tweets && Array.isArray(content.tweets)) {
    content.tweets.forEach((tweet, index) => {
      const tweetDate = new Date(today);
      tweetDate.setDate(today.getDate() + 2 + Math.floor(index / 3));
      const tweetTime = `${14 + (index % 3)}:00`;
      const formattedDate = tweetDate.toISOString().split('T')[0];
      const escapedTweet = tweet.replace(/"/g, '""');
      rows.push(`"${formattedDate}","${tweetTime}","${escapedTweet}","","Twitter"`);
    });
  }

  if (content.caseStudy) {
    const caseDate = new Date(today);
    caseDate.setDate(today.getDate() + 5);
    const formattedDate = caseDate.toISOString().split('T')[0];
    const escapedCase = content.caseStudy.replace(/"/g, '""');
    rows.push(`"${formattedDate}","10:00","${escapedCase}","","LinkedIn"`);
  }

  csv += rows.join('\n');

  try {
    fs.writeFileSync(filename, csv);
    console.log(`✅ CSV exported to ${filename}`);
    console.log(`   Total rows: ${rows.length}`);
    console.log('\n📌 Import instructions:');
    console.log('   - Buffer: Settings → Content → Import CSV');
    console.log('   - Hypefury: Uploads → CSV Import');
    console.log('   - Taplio: Settings → Import Content');
    return filename;
  } catch (e) {
    console.error('❌ Error exporting CSV:', e.message);
    return null;
  }
};
