const title = document.querySelector('.title')
const text = `เค้ามีบางอย่างจะให้`

// Split by grapheme so Thai vowels and tone marks stay with their base letter
const segmenter = typeof Intl !== 'undefined' && Intl.Segmenter
  ? new Intl.Segmenter('th', { granularity: 'grapheme' })
  : null
const characters = segmenter
  ? Array.from(segmenter.segment(text), (part) => part.segment)
  : Array.from(text)

// Layout (display, wrapping, gap) is handled in css/index.css so media queries can adjust it
for (let index = 0; index < characters.length; index++) {
  if (characters[index] !== ' ') {
    title.innerHTML += `<span>${characters[index]}</span>`
  } else {
    title.innerHTML += `<span style='width: 1rem'></span>`
  }
}

const textElements = document.querySelectorAll('.title span');
textElements.forEach((element) => {
  const randomDelay = Math.random() * 3;
  element.style.animationDelay = `${randomDelay}s`;
});

// Smooth page transition
const curtain = document.querySelector('.page-curtain')

if (curtain) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => curtain.classList.remove('is-visible'))
  })
}

const openButton = document.querySelector('.btn')
if (openButton) {
  openButton.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    event.preventDefault()
    if (curtain) curtain.classList.add('is-visible')

    setTimeout(() => {
      window.location.href = openButton.getAttribute('href')
    }, 600)
  })
}