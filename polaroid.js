// Polaroid Gallery Functionality
const polaroidBtn = document.getElementById('polaroidBtn');
const polaroidGallery = document.getElementById('polaroidGallery');
const closePolaroid = document.getElementById('closePolaroid');
let polaroidItems = [];

// Initialize after DOM is loaded
function initPolaroids() {
  polaroidItems = Array.from(document.querySelectorAll('.polaroid-item'));
  console.log('Found', polaroidItems.length, 'polaroid items');
  setupPolaroidShake();
}

let printDelay = 0;

// Open gallery
if (polaroidBtn) {
  polaroidBtn.addEventListener('click', () => {
    initPolaroids(); // Refresh polaroid items
    polaroidGallery.classList.remove('hidden');
    
    // Start printing animation for each polaroid with delay
    polaroidItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add('printing');
      }, index * 400); // Stagger the printing
    });
  });
}

// Close gallery
if (closePolaroid) {
  closePolaroid.addEventListener('click', () => {
    polaroidGallery.classList.add('hidden');
    
    // Reset polaroids
    setTimeout(() => {
      polaroidItems.forEach(item => {
        item.classList.remove('printing', 'shaking', 'developed');
        const photo = item.querySelector('.polaroid-photo');
        if (photo) photo.classList.remove('developed');
      });
    }, 500);
  });
}

// Click outside to close
if (polaroidGallery) {
  polaroidGallery.addEventListener('click', (e) => {
    if (e.target === polaroidGallery) {
      closePolaroid.click();
    }
  });
}

// Initialize polaroid shake functionality
function setupPolaroidShake() {
  polaroidItems.forEach(item => {
    let shakeCount = 0;
    let shakeTimer = null;
    
    // Remove old listeners by cloning
    const newItem = item.cloneNode(true);
    item.parentNode.replaceChild(newItem, item);
    
    newItem.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Don't shake if already developed
      if (newItem.classList.contains('developed')) {
        console.log('Already developed!');
        return;
      }
      
      // Add shake animation
      newItem.classList.add('shaking');
      shakeCount++;
      
      console.log('Shake count:', shakeCount);
      
      // Remove shake class after animation
      setTimeout(() => {
        newItem.classList.remove('shaking');
      }, 500);
      
      // Clear previous timer
      if (shakeTimer) {
        clearTimeout(shakeTimer);
      }
      
      // If shaken 3 times, develop the photo
      if (shakeCount >= 3) {
        console.log('Developing photo...');
        developPhoto(newItem);
        shakeCount = 0;
      } else {
        // Reset shake count after 2 seconds
        shakeTimer = setTimeout(() => {
          shakeCount = 0;
          console.log('Shake count reset');
        }, 2000);
      }
    });
    
    // Double click to develop (alternative)
    newItem.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      if (!newItem.classList.contains('developed')) {
        console.log('Double click - developing photo...');
        developPhoto(newItem);
      }
    });
  });
  
  // Update the array with new items
  polaroidItems = Array.from(document.querySelectorAll('.polaroid-item'));
}

function developPhoto(item) {
  const photo = item.querySelector('.polaroid-photo');
  
  // Mark as developed
  item.classList.add('developed');
  
  console.log('Photo developed!', item);
  
  // Gradually clear the photo
  setTimeout(() => {
    if (photo) {
      photo.classList.add('developed');
      console.log('Photo class added');
    }
  }, 200);
  
  // Add a little celebration effect
  const frame = item.querySelector('.polaroid-frame');
  if (frame) {
    frame.style.animation = 'none';
    setTimeout(() => {
      frame.style.animation = 'printOut 0.5s ease';
    }, 10);
  }
}

// ESC to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && polaroidGallery && !polaroidGallery.classList.contains('hidden')) {
    closePolaroid.click();
  }
});
