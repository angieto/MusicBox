const prevBtn = document.getElementById("prev")
const playBtn = document.getElementById("play")
const nextBtn = document.getElementById("next")

const progressContainer = document.getElementById("progress-container")
const progress = document.getElementById("progress")
const currentTimeElement = document.getElementById("current-time")
const durationElement = document.getElementById("duration")

const music = document.querySelector("audio")
const img = document.querySelector("img")
const title = document.getElementById("title")
const artist = document.getElementById("artist")

let isPlaying = false
let songIdx = 0

const songs = [
    {
        name: "jacinto-1",
        displayName: "Electric Chill Machine",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-2",
        displayName: "Seven nation Army (Remix)",
        artist: "Jacinto Design",
    },
    {
        name: "jacinto-3",
        displayName: "Goodnight, Disco Queen",
        artist: "Jacinto Design",
    },
    {
        name: "metric-1",
        displayName: "Front Row (Remix)",
        artist: "Metric/Jacinto Design",
    },
]

function playSong() {
    isPlaying = true
    playBtn.classList.replace("fa-play", "fa-pause")
    playBtn.setAttribute("title", "Pause")
    music.play()
}

function pauseSong() {
    isPlaying = false
    playBtn.classList.replace("fa-pause", "fa-play")
    playBtn.setAttribute("title", "Play")
    music.pause()
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `music/${song.name}.mp3`
    img.src = `img/${song.name}.jpg`
}

function prevSong() {
    songIdx = (songIdx - 1) % songs.length
    loadSong(songs[songIdx])
    isPlaying ? playSong() : pauseSong()
}

function nextSong() {
    songIdx = (songIdx + 1) % songs.length
    loadSong(songs[songIdx])
    isPlaying ? playSong() : pauseSong()
}

// Onload, select the first song
loadSong(songs[songIdx])

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        // update time display
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        // delay switching duration time to avoid NaN
        if (durationSeconds) {
            currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`
            durationElement.textContent = `${durationMinutes}:${durationSeconds}`
        }
    }
}

function setProgressBar(e) {
    const width = e.srcElement.clientWidth
    const clickX = e.offsetX
    const { duration } = music
    music.currentTime = (clickX / width) * duration
}

// Event Listeners
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()))
prevBtn.addEventListener("click", () => prevSong())
nextBtn.addEventListener("click", () => nextSong())
music.addEventListener("timeupdate", (e) => updateProgressBar(e))
music.addEventListener("ended", () => nextSong())
progressContainer.addEventListener("click", (e) => setProgressBar(e))
