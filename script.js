const audio = document.getElementById("audioPlayer");
const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const currentSongTitle = document.getElementById("currentSongTitle");
const currentSongArtist = document.getElementById("currentSongArtist");
const songs = document.querySelectorAll(".song");
const progress = document.getElementById("progress");
const progressBar = document.querySelector(".progress-bar");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");
const volumeProgress = document.getElementById("volumeProgress");
const volumeBar = document.querySelector(".volume-bar");

let songIndex = 0;
let isPlaying = false;
let progressInterval;

// Mock song data
const songData = [
  { title: "Blinding Lights", artist: "The Weeknd", duration: "3:20" },
  { title: "Save Your Tears", artist: "The Weeknd", duration: "3:35" },
  { title: "Stay", artist: "The Kid LAROI, Justin Bieber", duration: "2:21" },
  { title: "Levitating", artist: "Dua Lipa", duration: "3:23" },
  { title: "Good 4 U", artist: "Olivia Rodrigo", duration: "2:58" },
  { title: "Montero", artist: "Lil Nas X", duration: "2:17" }
];

// Play selected song
songs.forEach((song, index) => {
  song.addEventListener("click", () => {
    songIndex = index;
    playSong(song);
  });
});

function playSong(song) {
  // Clear any existing progress interval
  if (progressInterval) {
    clearInterval(progressInterval);
  }
  
  // In a real app, we would load the actual song file
  // audio.src = song.getAttribute("data-src");
  
  currentSongTitle.textContent = song.querySelector(".song-title").textContent;
  currentSongArtist.textContent = song.querySelector(".song-artist").textContent;
  duration.textContent = songData[songIndex].duration;
  
  if (isPlaying) {
    audio.pause();
  }
  
  // Mock play functionality
  isPlaying = true;
  playBtn.querySelector("i").className = "fas fa-pause";
  
  // Reset progress
  progress.style.width = "0%";
  currentTime.textContent = "0:00";
  
  // Simulate progress
  simulateProgress();
}

function simulateProgress() {
  let currentSeconds = 0;
  const durationParts = songData[songIndex].duration.split(":");
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  
  progressInterval = setInterval(() => {
    if (!isPlaying) {
      clearInterval(progressInterval);
      return;
    }
    
    currentSeconds++;
    if (currentSeconds >= totalSeconds) {
      clearInterval(progressInterval);
      playNextSong();
      return;
    }
    
    // Update progress bar
    const progressPercent = (currentSeconds / totalSeconds) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Update time display
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    currentTime.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, 1000);
}

function playNextSong() {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songs[songIndex]);
}

function playPrevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songs[songIndex]);
}

playBtn.addEventListener("click", () => {
  if (currentSongTitle.textContent === "No song playing") {
    playSong(songs[0]);
    return;
  }
  
  isPlaying = !isPlaying;
  if (isPlaying) {
    playBtn.querySelector("i").className = "fas fa-pause";
    simulateProgress();
  } else {
    playBtn.querySelector("i").className = "fas fa-play";
    clearInterval(progressInterval);
  }
});

prevBtn.addEventListener("click", playPrevSong);
nextBtn.addEventListener("click", playNextSong);

// Progress bar click
progressBar.addEventListener("click", (e) => {
  const width = progressBar.clientWidth;
  const clickX = e.offsetX;
  const percent = (clickX / width) * 100;
  progress.style.width = `${percent}%`;
  
  // In a real app, we would set the audio currentTime
  // const duration = audio.duration;
  // audio.currentTime = (percent / 100) * duration;
  
  // Update the time display (mock)
  const durationParts = songData[songIndex].duration.split(":");
  const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
  const currentSeconds = Math.floor((percent / 100) * totalSeconds);
  const minutes = Math.floor(currentSeconds / 60);
  const seconds = currentSeconds % 60;
  currentTime.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
});

// Volume control
volumeBar.addEventListener("click", (e) => {
  const width = volumeBar.clientWidth;
  const clickX = e.offsetX;
  const percent = (clickX / width) * 100;
  volumeProgress.style.width = `${percent}%`;
  
  // In a real app, we would set the audio volume
  // audio.volume = percent / 100;
});

// Search filter
document.getElementById("searchInput").addEventListener("keyup", function () {
  let filter = this.value.toLowerCase();
  songs.forEach(song => {
    const title = song.querySelector(".song-title").textContent.toLowerCase();
    const artist = song.querySelector(".song-artist").textContent.toLowerCase();
    song.style.display = title.includes(filter) || artist.includes(filter)
      ? "block"
      : "none";
  });
});