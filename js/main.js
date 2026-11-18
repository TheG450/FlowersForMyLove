
onload = () => {
  const curtain = document.querySelector('.page-curtain');
  if (curtain) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => curtain.classList.remove('is-visible'));
    });
  }

  const c = setTimeout(() => {
    document.body.classList.remove("not-loaded");

    const text = 'เค้ารักเธอที่สุดในโลกเลยน้า';
    const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter
      ? new Intl.Segmenter('th', { granularity: 'grapheme' })
      : null;
    const titles = segmenter
      ? Array.from(segmenter.segment(text), (part) => part.segment)
      : Array.from(text);
    const titleElement = document.getElementById('title');
    let index = 0;

    function appendTitle() {
      if (index < titles.length) {
        titleElement.innerHTML += titles[index];
        index++;
        setTimeout(appendTitle, 120); // 1000ms delay
      }
    }

    appendTitle();

    clearTimeout(c);
  }, 1000);
};