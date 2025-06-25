// Utility function to generate slug from question title
const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')         // Replace spaces with -
      .replace(/[^a-z0-9\-]/g, '')  // Remove special chars
      .replace(/\-\-+/g, '-');      // Replace multiple - with single -
  };

module.exports = slugify;