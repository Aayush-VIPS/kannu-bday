// App initialization and start screen
const startScreen = document.getElementById('startScreen');
const mainApp = document.getElementById('mainApp');
const startBtn = document.getElementById('startBtn');

// Start button click handler
if (startBtn) {
  startBtn.addEventListener('click', () => {
    console.log('Start button clicked!');
    
    // Hide start screen with fade out
    startScreen.style.opacity = '0';
    startScreen.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      startScreen.classList.add('hidden');
      startScreen.style.display = 'none';
      mainApp.classList.remove('hidden');
      mainApp.style.display = 'block';
      
      console.log('Main app shown');
      
      // Trigger fade in for main app
      setTimeout(() => {
        mainApp.style.opacity = '1';
        mainApp.style.transform = 'scale(1)';
        
        // Now get the audio element (it's inside mainApp)
        const audio = document.getElementById('audio');
        console.log('Audio element:', audio);
        
        // Start audio playback (this will work because it's user-initiated)
        if (audio) {
          audio.play().then(() => {
            console.log('Audio started successfully');
          }).catch(err => {
            console.log('Audio play error:', err);
          });
        } else {
          console.log('Audio element not found!');
        }
      }, 50);
    }, 500);
  });
}

// Prevent context menu on long press (mobile)
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Add install prompt for PWA-like experience
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});
