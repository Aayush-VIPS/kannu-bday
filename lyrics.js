// Enhanced lyric sync with bottom bar controls
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentLyricDisplay = document.getElementById('currentLyric');
const progressFill = document.getElementById('progress');
const seekSlider = document.getElementById('seek');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');

let lyrics = [];
let activeIndex = -1;

// Load lyrics from JSON
fetch('lyrics.json')
  .then(r => r.json())
  .then(data => {
    lyrics = data.lines;
    console.log('Loaded', lyrics.length, 'lyrics');
  })
  .catch(err => {
    console.error('Failed to load lyrics:', err);
    if (currentLyricDisplay) {
      currentLyricDisplay.textContent = '♪ ♪ ♪';
    }
  });

// Format time helper
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause toggle
if (playPauseBtn && audio) {
  playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playPauseBtn.textContent = '⏸';
    } else {
      audio.pause();
      playPauseBtn.textContent = '▶';
    }
  });
}

// Update play button icon based on audio state
if (audio) {
  audio.addEventListener('play', () => {
    if (playPauseBtn) playPauseBtn.textContent = '⏸';
  });
  
  audio.addEventListener('pause', () => {
    if (playPauseBtn) playPauseBtn.textContent = '▶';
  });
}

// Previous button - go back 10 seconds
if (prevBtn && audio) {
  prevBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  });
}

// Next button - go forward 10 seconds
if (nextBtn && audio) {
  nextBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  });
}

// Seek slider
if (seekSlider && audio) {
  seekSlider.addEventListener('input', (e) => {
    const seekTime = (audio.duration / 100) * e.target.value;
    audio.currentTime = seekTime;
  });
}

// Update progress bar and time
if (audio) {
  audio.addEventListener('timeupdate', () => {
    const percent = (audio.currentTime / audio.duration) * 100;
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (seekSlider) seekSlider.value = percent;
    if (currentTimeDisplay) currentTimeDisplay.textContent = formatTime(audio.currentTime);
    
    // Update lyrics
    const idx = findIndexForTime(audio.currentTime);
    setActive(idx);
  });
  
  audio.addEventListener('loadedmetadata', () => {
    if (durationDisplay) durationDisplay.textContent = formatTime(audio.duration);
  });
}

function setActive(i) {
  if (i === activeIndex || i < 0 || i >= lyrics.length) return;
  
  // Update the display with current lyric
  if (currentLyricDisplay && lyrics[i]) {
    currentLyricDisplay.textContent = lyrics[i].text;
    // Add glow animation
    currentLyricDisplay.classList.remove('pulse');
    void currentLyricDisplay.offsetWidth; // Trigger reflow
    currentLyricDisplay.classList.add('pulse');
  }
  
  activeIndex = i;
}

function findIndexForTime(t) {
  // Find last line whose start <= t
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (t >= lyrics[i].start) return i;
  }
  return -1;
}

// Space toggles play/pause
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    if (audio && audio.paused) audio.play();
    else if (audio) audio.pause();
  }
});
