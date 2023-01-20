const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'kietsocool';

const playlist = $('.playlist');
const player = $('.player');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const cd = $('.cd');
const playBtn = $('.btn-toggle-play');
const progress = $('#progress');
const currentTime = $('.current-time');
const duration = ('all-time');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
const valueProgress = $('.progress::-webkit-slider-thumb');
console.log(valueProgress)
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    songs: [{
            name: "Để tôi ôm em bằng giai điệu này",
            singer: "Kai Đinh, MIN, GREY D",
            path: "./asset/musics/DeToiOmEmBangGiaiDieuNay.mp3",
            image: "./asset/imgs/DeToiOmEmBangGiaiDieuNay.jpg"
        },
        {
            name: "Rồi ta sẽ ngắm pháo hoa cùng nhau",
            singer: "O.lew",
            path: "./asset/musics/RoiTaSeNgamPhaoHoaCungNhau.mp3",
            image: "./asset/imgs/RoiTaSeNgamPhaoHoaCungNhau.jpg"
        },
        {
            name: "Tình nào không như tình đầu",
            singer: "Trung Quân Idol",
            path: "./asset/musics/TinhNaoKhongNhuTinhDau.mp3",
            image: "./asset/imgs/TinhNaoKhongNhuTinhDau_TrungQuan.jpg"
        },
        {
            name: "Anh tự do nhưng cô đơn",
            singer: "Trung Quân Idol",
            path: "./asset/musics/AnhTuDoNhungCoDon.mp3",
            image: "./asset/imgs/AnhTuDoNhungCoDon_TrungQuan.jpg"
        },
        {
            name: "Nắm tay em khi mưa đến",
            singer: "Ái Phương",
            path: "./asset/musics/NamTayEmKhiMuaDen.mp3",
            image: "./asset/imgs/NamTayEmKhiMuaDen.jpg"
        },
        {
            name: "Không yêu cũng chẳng cô đơn",
            singer: "Đỗ Hoàng Dương",
            path: "./asset/musics/KhongYeuCungChangCoDon.mp3",
            image: "./asset/imgs/KhongYeuCungChangCoDon.jpg"
        },
        {
            name: "Cho em gần anh thêm chút nữa",
            singer: "Hương Tràm",
            path: "./asset/musics/ChoEmGanAnhThemChutNua.mp3",
            image: "./asset/imgs/ChoEmGanAnhThemChutNua.jpg"
        },

        {
            name: "Rời bỏ",
            singer: "Hòa Minzy",
            path: "./asset/musics/RoiBo.mp3",
            image: "./asset/imgs/RoiBo.jpg"
        },
        {
            name: "Chấp nhận",
            singer: "Hòa Minzy",
            path: "./asset/musics/ChapNhan.mp3",
            image: "./asset/imgs/ChapNhan.jpg"
        },

        {
            name: "Một Ngàn Nỗi Đau",
            singer: "Văn Mai Hương",
            path: "./asset/musics/MotNganNoiDau.mp3",
            image: "./asset/imgs/VanMaiHuong.jpg"
        },
        {
            name: "Ta còn thuộc về nhau",
            singer: "Hương Tràm",
            path: "./asset/musics/TaConThuocVeNhau.mp3",
            image: "./asset/imgs/TaConThuocVeNhau.jpg"
        },
        {
            name: "Ngày Tận Thế",
            singer: "Tóc Tiên",
            path: "./asset/musics/NgayTanThe.mp3",
            image: "./asset/imgs/TocTien.jpg"
        },
        {
            name: "Hoa dại",
            singer: "Hòa Minzy",
            path: "./asset/musics/HoaDai.mp3",
            image: "./asset/imgs/HoaDai.jpg"
        },
        {
            name: "Em Đã Thương Người Ta Hơn Anh",
            singer: " Noo Phước Thịnh",
            path: "./asset/musics/EmDaThuongNguoiTaHonAnhmp3.mp3",
            image: "./asset/imgs/NooPhuocThinh.jpg"
        },
        {
            name: "Thuận Theo Ý Trời",
            singer: "Thuận Theo Ý Trời",
            path: "./asset/musics/ThuanTheoYTroi.mp3",
            image: "./asset/imgs/BuiAnhTuan.jpg"
        },
    ],


    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
        audio.src = this.currentSong.path;
    },

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `<div class="song ${index === this.currentIndex ? 'active':''}" data-index="${index}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
        });

        playlist.innerHTML = htmls.join('');
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: () => {
                return this.songs[this.currentIndex];
            }
        })
    },


    handleEvents: function() {
        const _this = this;
        const cdWidth = cd.offsetWidth;

        // Process CD run or stop
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })

        cdThumbAnimate.pause();

        // Zoom
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Click play
        playBtn.onclick = () => {
                if (_this.isPlaying) {
                    audio.pause();
                } else {
                    audio.play();
                }
            }
            // When song is played
        audio.onplay = () => {
                _this.isPlaying = true;
                player.classList.add('playing');
                cdThumbAnimate.play();
            }
            // When song is paused
        audio.onpause = () => {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // When time of song change
        audio.ontimeupdate = () => {
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
            progress.value = progressPercent;
            // progress.style.width = progressPercent;
        }

        // Skip in the song
        progress.ondrag = (e) => {
            const seekTime = e.target.value / 100 * audio.duration;
            audio.currentTime = seekTime;
        }

        progress.onclick = (e) => {
            const seekTime = e.target.value / 100 * audio.duration;
            audio.currentTime = seekTime;
        }

        // When next song 
        nextBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // When prev song 
        prevBtn.onclick = () => {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // When random button active
        randomBtn.onclick = () => {
            _this.isRandom = !_this.isRandom;
            _this.setConfig('isRandom', _this.isRandom);
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // When song end, next song
        audio.onended = () => {
            nextBtn.click();
        }

        // When repeat active
        repeatBtn.onclick = () => {
            _this.isRepeat = !_this.isRepeat;
            _this.setConfig('isRepeat', _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // When song end, repeat song
        audio.onended = () => {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        }

        // When click song to play
        playlist.onclick = (e) => {
            const songNode = e.target.closest('.song:not(.active)');
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index);
                    _this.loadCurrentSong();
                    audio.play();
                    _this.render();

                }
                if (e.target.closest('.option')) {}

            }
        }
    },

    nextSong: function() {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },


    playRandomSong: function() {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);

        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: smooth,
                block: center,
            })
        }, 200);
    },

    loadConfig: function() {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    start: function() {
        this.loadConfig();
        this.defineProperties();
        this.render();
        this.loadCurrentSong();
        this.handleEvents();

        randomBtn.classList.toggle('active', _this.isRandom);

        repeatBtn.classList.toggle('active', _this.isRepeat);

    },
};

app.start();