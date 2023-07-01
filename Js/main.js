const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document)

const header = $('h2')
const cdThumb = $('.music-thumb__img')
const audio = $('#audio')
const playBtn = $('.control__play-pause')
const pauseBtn = $('.control__pause')
const player = $('.music')
const range = $('.range')
const currentTimer = $('.timer-current')
const durationTime = $('.timer-duration')
const nextBtn = $('.control__skip-forward-outline')
const preBtn = $('.control__play-skip-back')

const app = {

    currentIndex : 0,
    isPlaying: false,

    songs: [
        {
            name: 'Until I Found You',
            singer: 'Rosé',
            path:'./assets/Music/song (1).mp3',
            image:'./assets/img/anhnen (1).jpg',
        },
        {
            name: 'Hard to love',
            singer: 'Rosé',
            path:'./assets/Music/song (2).mp3',
            image:'./assets/img/anhnen (2).jpg',
        },
        {
            name: 'OTG',
            singer: 'Rosé',
            path:'./assets/Music/song (3).mp3',
            image:'./assets/img/anhnen (3).jpg',
        },

    ],
    defineproperties: function(){
        Object.defineProperty(this, 'currentSong', {
            get: function(){
                return this.songs[this.currentIndex]
            }
        })
    },

    handleEvents: function(){
        const _this = this;
        // _this này dang chỉ app
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause()
            } else {
                audio.play()
            }
        }

        audio.onplay= function(){
            _this.isPlaying = true;
            player.classList.add('playing');
        }
        audio.onpause= function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
        }
        // tiến độ bài hát
        audio.ontimeupdate = function(){
            if (audio.duration){
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                range.value = progressPercent;
            }
        }
        range.onchange = function(e){
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        }
        //thời gian bài hát
        audio.addEventListener("loadeddata", () =>{
            let audioDuration = audio.duration;
            
            let totalMin = Math.floor(audioDuration / 60);
            let totalSec = Math.floor(audioDuration % 60);
            if(totalSec < 10 ){
                totalSec = `0${totalSec}`
            }
            durationTime.innerText = `${totalMin}:${totalSec}`;
        })
        //hiện thời gian hiện tại
        audio.addEventListener("timeupdate", () =>{
            let currentTime = audio.currentTime;
            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if(currentSec < 10 ){
                currentSec = `0${currentSec}`
            }
            currentTimer.innerText = `${currentMin}:${currentSec}`;
        })
        nextBtn.onclick  = function(){
            _this.nextSong();
            audio.play();
        }
        preBtn.onclick  = function(){
            _this.preSong();
            audio.play();
        }

    },
    nextSong: function(){
        this.currentIndex++
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    preSong: function(){
        this.currentIndex--
        if(this.currentIndex < 0){
            this.currentIndex = this.songs.length -1;
        }
        this.loadCurrentSong()
    },
    loadCurrentSong: function(){
        header.textContent = this.currentSong.name;
        cdThumb.src = this.currentSong.image;
        audio.src = this.currentSong.path;
    },
    start: function(){
        this.defineproperties()
        this.handleEvents()
        this.loadCurrentSong()
    }
}

app.start()