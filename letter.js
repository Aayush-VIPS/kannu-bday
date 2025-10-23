// Final Letter Reveal Functionality
const revealBtn = document.getElementById('revealBtn');
const finalLetter = document.getElementById('finalLetter');
const envelope = document.getElementById('envelope');
const letterContent = document.getElementById('letterContent');
const closeLetter = document.getElementById('closeLetter');

// Reveal button click
if (revealBtn) {
  revealBtn.addEventListener('click', () => {
    finalLetter.classList.remove('hidden');
  });
}

// Envelope click - open letter
if (envelope) {
  envelope.addEventListener('click', () => {
    envelope.style.opacity = '0';
    envelope.style.transform = 'scale(0.8)';
    setTimeout(() => {
      envelope.style.display = 'none';
      letterContent.classList.add('show');
    }, 500);
  });
}

// Close letter
if (closeLetter) {
  closeLetter.addEventListener('click', () => {
    letterContent.classList.remove('show');
    setTimeout(() => {
      envelope.style.display = 'block';
      envelope.style.opacity = '1';
      envelope.style.transform = 'scale(1)';
      finalLetter.classList.add('hidden');
    }, 500);
  });
}

// Close on outside click
if (finalLetter) {
  finalLetter.addEventListener('click', (e) => {
    if (e.target === finalLetter) {
      letterContent.classList.remove('show');
      setTimeout(() => {
        envelope.style.display = 'block';
        envelope.style.opacity = '1';
        envelope.style.transform = 'scale(1)';
        finalLetter.classList.add('hidden');
      }, 500);
    }
  });
}

// ESC key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !finalLetter.classList.contains('hidden')) {
    letterContent.classList.remove('show');
    setTimeout(() => {
      envelope.style.display = 'block';
      envelope.style.opacity = '1';
      envelope.style.transform = 'scale(1)';
      finalLetter.classList.add('hidden');
    }, 500);
  }
});
