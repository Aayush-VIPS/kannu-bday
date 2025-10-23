# Happy Birthday Varshaa - Integrated Site 🎂❤️

This is the **integrated version** combining:
- ✨ Draggable/rotatable paper cards (original impressingCrush feature)
- 🎵 Audio player with synchronized lyric highlighting
- 💖 Photos, quotes, and birthday messages

## Features

### Card Swiping & Dragging
- **Drag cards**: Click and drag any card to move it around
- **Rotate cards**: Right-click (or two-finger gesture on mobile) and drag to rotate
- Each card has a random initial rotation for a natural scattered look

### Lyric Sync
- The **audio player card** plays your special song
- The **lyric card** displays lyrics that highlight in sync with the music
- Click any lyric line to jump to that part of the song
- Press **Space** to play/pause

## Quick Start

1. **Add your song file**:
   - Place your audio file at: `assets/song.mp3`
   - This is the song that will play with synced lyrics

2. **Run locally**:
   ```powershell
   cd impressingCrush
   python -m http.server 8080
   # Open http://localhost:8080 in your browser
   ```

3. **Interact with the site**:
   - Drag the cards around to arrange them
   - Right-click to rotate cards
   - Play the song and watch lyrics highlight automatically
   - Click lyric lines to skip to that part

## Files Structure

- `index.html` - Main page with all the draggable cards
- `style.css` - Styling for cards, audio player, and lyrics
- `script.js` - Draggable/rotatable card functionality
- `lyrics.js` - Audio sync and lyric highlighting
- `lyrics.json` - Lyric lines with timing data
- `images/` - Your photos (1.jpeg, 2.jpeg, etc.)
- `assets/song.mp3` - The song file (you need to add this)

## Customization

### Add More Photos
- Place your images in the `images/` folder
- Update the `<img src="images/yourfile.jpeg" />` tags in `index.html`

### Adjust Lyric Timing
- Edit `lyrics.json` to change when each line highlights
- The `start` value is in seconds from the beginning of the song

### Add More Cards
- Copy any `.paper` div in `index.html`
- Add your own text, images, or quotes
- The drag/rotate will automatically work on new cards

## Tips

- The cards naturally overlap - drag them to reveal what's underneath
- For mobile: use one finger to drag, two fingers to rotate
- The lyric card auto-scrolls to keep the current line visible

## Credits

- Original card dragging concept from impressingCrush
- Lyric sync feature integrated from the birthday site
- Made with love for Varshaa's birthday! 💕

---

**Server is running on**: http://localhost:8080
