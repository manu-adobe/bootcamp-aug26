/**
 * Breadcrumb block — adapted from https://github.com/hlxsites/wknd/tree/main/blocks/breadcrumb
 * Uses document meta tags directly instead of lib-franklin's getMetadata.
 */

function getMetadata(name) {
  const selector = name.includes(':')
    ? `meta[property="${name}"]`
    : `meta[name="${name}"]`;
  return document.head.querySelector(selector)?.content ?? '';
}

/**
 * @param {HTMLElement} block The breadcrumb block element
 */
export default function decorate(block) {
  const title = getMetadata('og:title');
  const $ul = document.createElement('ul');
  block.append($ul);

  const trail = [
    {
      text: 'Home',
      link: '/',
    },
    {
      text: title,
    },
  ];

  while (trail.length) {
    const step = trail.shift();
    const $li = document.createElement('li');
    $ul.append($li);
    let $wrap = $li;
    if (step.link) {
      $wrap = document.createElement('a');
      $wrap.href = step.link;
      $li.append($wrap);
    }
    const $span = document.createElement('span');
    $wrap.append($span);
    $span.textContent = step.text;
  }
}
