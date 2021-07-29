
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const intoFind = $('#finding')
const find = $('#finding .input')
const findBtn = $('#finding .search-btn')
const space = $('.input .space-into input')
const cancel = $('#finding .cancel')
const background = $('#overview')
const heading = $('.content .content_name-of-song')
const imgCurent = $('.content .img-song')
const audio = $('#audio')
const playPause = $('.play-pause-btn')
const playPauseBox = $('.box-cover')
const progress = $('#progress')
const previousSong = $('.previous-btn')
const nextSong = $('.next-btn')
const listSong = $('#list-song')
const random = $('.random-btn')
const listenAgain = $('.replay-btn')
const body = $('body')
/**
 * 1. Render song
 * 2. Scroll top
 * 3. CD roll
 * 4. Play / pause / seek
 * 5. Next / previous
 * 6. Random
 * 7. listen again
 * 8. Ative song
 * 9. Scroll list song when listenning
 * 10. Play another song when listenning
 */

const app = {
    songs: [
        {
            id: 1,
            name: 'Anh quen với cô đơn',
            singer:'Soonbin Hoàng Sơn',
            img: './assest/img/anh đã quen với cô đơn1.jpg',
            song: './assest/song/Anh_Đã_Quen_Với_Cô_Đơn_-_Soobin_Hoàng_Sơn_Official_Music_Video_4K[YoutubeMP3.vn].mp3'
        },
        {
            id: 2,
            name: 'Bạc phận',
            singer:'Jack',
            img: './assest/img/bạc phận.jpg',
            song: './assest/song/BẠC_PHẬN_K-ICM_ft_JACK_OFFICIAL_MV[YoutubeMP3.vn].mp3'
        },
        {
            id: 3,
            name: 'Crying over you',
            singer:'Justatee',
            img: './assest/img/crying over you1.jpg',
            song: './assest/song/Official_MV_Crying_Over_You_-_JustaTee_ft_Binz[YoutubeMP3.vn].mp3'
        },
        {
            id: 4,
            name: 'Hồng nhan',
            singer:'Jack',
            img: './assest/img/hồng nhan1.jpg',
            song: './assest/song/JACK_-_HỒNG_NHAN_OFFICIAL_MV_G5R[YoutubeMP3.vn].mp3'
        },
        {
            id: 5,
            name: 'Thiên Đàng',
            singer:'Wowy',
            img: './assest/img/lên thiên đàng1.jpg',
            song: './assest/song/WOWY_-_THIÊN_ĐÀNG_ft_JOLIPOLI_tại_ELLE_SHOW_Full_version[YoutubeMP3.vn].mp3'
        },
        {
            id: 6,
            name: 'Yêu như ngày yêu cuối',
            singer:'Mai Tiến Dũng',
            img: './assest/img/yêu như ngày cuối1.jpg',
            song: './assest/song/YÊU_NHƯ_NGÀY_YÊU_CUỐI_OFFICIAL_LYRIC_MV_MAI_TIẾN_DŨNG[YoutubeMP3.vn].mp3'
        },
        {
            id: 7,
            name: 'Muộn rồi mà sao còn',
            singer:'Sơn Tùng MTP',
            img: './assest/img/muộn rồi mà sao còn1.jpg',
            song: './assest/song/SƠN_TÙNG_M-TP_MUỘN_RỒI_MÀ_SAO_CÒN_OFFICIAL_MUSIC_VIDEO[YoutubeMP3.vn].mp3'
        },
        {
            id: 8,
            name: 'Sóng gió',
            singer:'Jack',
            img: './assest/img/sóng gió.jpg',
            song: './assest/song/SÓNG_GIÓ_K-ICM_x_JACK_OFFICIAL_MUSIC_VIDEO[YoutubeMP3.vn].mp3'
        },
        {
            id: 9,
            name: 'Tháng năm',
            singer:'Soonbin Hoàng Sơn',
            img: './assest/img/tháng năm1.jpg',
            song: './assest/song/Tháng_Năm_Lofi_Ver_-_Soobin_x_Freak_D[YoutubeMP3.vn].mp3'
        },
        {
            id: 10,
            name: 'Trốn tìm',
            singer:'Đen Vâu',
            img: './assest/img/trốn tìm1.jpg',
            song: './assest/song/Đen_-_Trốn_Tìm_ft_MTV_band_MV[YoutubeMP3.vn].mp3'
        }
    ],

    // tìm kiếm
    finding: function() {
        find.onclick = function() {
            space.focus()
            space.select()
        }
        space.onfocus = function() {
            find.style.animation = 'focusinput 0.5s ease forwards';
            setTimeout(function() {
                cancel.innerHTML = `<p>Hủy<p>`;
                cancel.style.animation = 'cancelinput ease 0.5s forwards';
            }, 250)
        }
        space.onblur = function() {
            find.style.removeProperty("animation")
            cancel.innerHTML = '';
        }
    },
    isPlay: false,
    currentSong: 0,
    isRandom: false,
    isAgain: false,
    // tải bài hát
    loadCurrentSong: function() {
        const currentSong = this.songs[this.currentSong];
        heading.innerHTML = `<h3>${currentSong.name}</h3>`
        imgCurent.style.backgroundImage = `url('${currentSong.img}')`
        audio.src = `${currentSong.song}`
        body.style.backgroundImage = `url('${currentSong.img}')`
        $$('.body .song').forEach(function(song) {
            song.classList.remove('red-background')
        })
        $(`.body .song${currentSong.id}`).classList.add('red-background');
    },

    handleEvent: function() {
        const _this = this;
        // CD roll
        const CDRoll = imgCurent.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 25000,
            iterations: Infinity
        })
        CDRoll.pause()

        // play / pause bài hát
        playPauseBox.onclick = function() {
            playPauseBox.style.animation = 'activebtn 0.3s 2 alternate'
            if(_this.isPlay == false) {
                audio.play();
            }else {
                setTimeout(function() {
                    audio.pause();
                }, 500)
                setTimeout(function() {
                    playPause.classList.add('play');
                    playPause.classList.remove('pause');
                    $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(1)`).classList.remove('active')
                    $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(2)`).classList.remove('active')
                }, 500)
                CDRoll.pause()
            }

            setTimeout(function() {
                playPauseBox.style.removeProperty("animation")
            }, 601) 

            // khi play
            audio.onplay = function() {
                _this.isPlay = true;
                setTimeout(function() {
                    playPause.classList.remove('play');
                    playPause.classList.add('pause');
                    $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(1)`).classList.add('active')
                    $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(2)`).classList.add('active')
                }, 500)
                _this.increaseVolume()
                CDRoll.play()
            }

            // khi pause
            audio.onpause = function() {
                _this.isPlay = false;
                _this.decreaseVolume()
            }
        }

        // chạy progress
        const timeUp = function() {
            const timeUpdate = Math.floor(audio.currentTime / audio.duration * 100);
            if(timeUpdate) {
                progress.value = timeUpdate;
            }
        }
        audio.addEventListener('timeupdate', timeUp)

        // Seek - tua
        progress.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value;
            audio.currentTime = seekTime
            CDRoll.currentTime = audio.currentTime % 25 * 1000;
            _this.increaseVolume();
            audio.addEventListener('timeupdate', timeUp)
        }
        progress.oninput = function() {
            audio.removeEventListener('timeupdate', timeUp)
        }

        // auto next
        audio.ontimeupdate = function() {
            if(audio.currentTime === audio.duration) {
                if(_this.isPlay == true) {
                    audio.autoplay = true;
                    $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(1)`).classList.add('active')
                    $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(2)`).classList.add('active')
                }
                _this.decreaseVolume()
                CDRoll.currentTime = 0;
                _this.toolNextSong();
            }
        }

        // next
        nextSong.onclick = function() {
            if(_this.isPlay == true) {
                audio.autoplay = true;
                $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(1)`).classList.add('active')
                $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(2)`).classList.add('active')
            }
            _this.decreaseVolume()
            CDRoll.currentTime = 0;
            _this.toolNextSong();
        }
        // previous
        previousSong.onclick = function() {
            if(_this.isPlay == true) {
                audio.autoplay = true;
                $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(1)`).classList.remove('active')
                $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(2)`).classList.remove('active')
            }
            _this.decreaseVolume()
            CDRoll.currentTime = 0;
            _this.previousCurrentSong();
        }

        // ramdom
        random.onclick = function() {
            _this.isRandom = !_this.isRandom
            setTimeout(function() {
                random.classList.toggle('active', _this.isRandom)
            }, 150)
        }

        // listen again
        listenAgain.onclick = function() {
            _this.isAgain = !_this.isAgain
            setTimeout(function() {
                listenAgain.classList.toggle('active', _this.isAgain)
            }, 150)
        }

        // next song by click
        $$('.body .song > div:nth-child(1)').forEach(function(song, index) {
            song.onclick = function() {
                $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(1)`).classList.remove('active')
                $(`.song${_this.songs[_this.currentSong].id} .cover-animation:nth-child(2)`).classList.remove('active')
                _this.currentSong = index
                if(_this.isPlay == true) {
                    audio.autoplay = true;
                }
                _this.decreaseVolume()
                CDRoll.currentTime = 0;
                _this.loadCurrentSong()
            }
        })
    },

    // next and previous
    // nextCurrentSong
    nextCurrentSong: function() {
        this.currentSong = this.currentSong + 1;
        progress.value = 0
        if(this.currentSong >= this.songs.length){
            this.currentSong = 0
        }
        this.loadCurrentSong();
    },
    // previousCurrentSong
    previousCurrentSong: function() {
        this.currentSong -= 1;
        progress.value = 0
        if(this.currentSong < 0){
            this.currentSong = 9;
        }
        this.loadCurrentSong();
    },

    // randomSong
    randomSong: function() {
        let random;
        do {
            random = Math.floor(Math.random() * this.songs.length)
        } while(random == this.currentSong);
        this.currentSong = random;
        this.loadCurrentSong();
    },

    // Listen again
    listenAgainSong: function() {
        this.loadCurrentSong()
    },

    // tool - khi chạy cả ramdom và replay
    toolNextSong: function() {
        if(this.isRandom) {
            if(this.isAgain) {
                this.listenAgainSong()
            } else {
                this.randomSong()
            }
        } else {
            if(this.isAgain) {
                this.listenAgainSong()
            } else{
                this.nextCurrentSong();
            }
        }
    },

    // tăng giảm âm lượng khi click - tăng trải nghiệm người dùng
    increaseVolume: function() {
        audio.volume = 0;
        const increase = setInterval(function() {
            if(audio.volume == 1) {
                audio.volume += 0;
            }else {
                audio.volume += 0.2;
            }
        }, 150)
        setTimeout(function() {
            clearInterval(increase)
        }, 751)
    },
    decreaseVolume: function() {
        const decrease = setInterval(function() {
            if(audio.volume < 0.25) {
                audio.volume -= 0;
            }else {
                audio.volume -= 0.25;
            }
        }, 125)
        setTimeout(function() {
            clearInterval(decrease)
        }, 501)
    },

    // Render songs
    rederSongs: function() {
        const htmls = this.songs.map(song => 
            `
            <div class="song song${song.id}">
                <div>
                    <div class="song_img">
                        <div>
                            <img src="${song.img}" alt="">
                        </div>
                    </div>
                    <div class="song_content">
                        <h4>${song.name}</h4>
                        <p>${song.singer}</p>
                    </div>
                    <div class="current-song">
                        <div class="cover-animation">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <div class="cover-animation">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
                <div class="song_more">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `)
        $('#list-song .body').innerHTML = htmls.join('')
    },

    // Sroll top
    scrollTop: function() {
        const sizeImg = $('.content_img').offsetWidth;
        const height = listSong.offsetHeight
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const imgWidth = sizeImg - scrollTop;
            $('.content_img').style.width = imgWidth > 0 ? imgWidth +'px' : 0;
            $('.content_img').style.opacity = imgWidth / sizeImg;
            listSong.style.height = height + scrollTop + 'px';
        }
    },


    // 
    start: function() {
        this.finding()
        this.scrollTop();
        this.rederSongs();
        this.loadCurrentSong()
        this.handleEvent()
    }
}

app.start()
