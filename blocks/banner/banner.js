import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];

  // Row 0: image
  // Row 1: title text
  // Row 2: (optional) background color

  const imageRow = rows[0];
  const titleRow = rows[1];
  const bgColorRow = rows[2];

  // Extract background color (default to blue)
  let bgColor = '#0057a8';
  if (bgColorRow) {
    const colorText = bgColorRow.textContent.trim();
    if (colorText) bgColor = colorText;
    bgColorRow.remove();
  }

  // Apply background color
  block.style.backgroundColor = bgColor;

  // Handle image
  if (imageRow) {
    const picture = imageRow.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      if (img) {
        picture.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }]));
      }
      imageRow.className = 'banner-image';
    } else {
      imageRow.remove();
    }
  }

  // Handle title
  if (titleRow) {
    titleRow.className = 'banner-content';
  }
}
