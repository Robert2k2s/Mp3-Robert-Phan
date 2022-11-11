const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const play = $(".fa-play");
const pause = $(".fa-pause");
const playPause = $(".play-pause");
const imgSmall = $(".img-rotate img");
const imgBig = $(".bg-mp3 .bg-img");
const titleNames = $(".titleName-singer h2");
const titleSinger = $(".titleName-singer span");
const audio = $(".audio");
const prev = $(".fa-backward");
const next = $(".fa-forward");
const loads = $(".fa-rotate-right");
const process = $(".process");
const range = $(".range");
const random = $(".fa-repeat");
const OpenSongs = $(".listSSongs h3");
const OpenSongIcon = $(".listSSongs h3 i");
const listSong = $(".list-song");
const listSongsItem = $(".listSong-item");
const closeListSongs = $(".fa-angles-down");
const max = $(".CurentTimes .max");
const min = $(".CurentTimes .min");

const app = {
  curentIndex: 0,
  isPlaying: false,
  songs: [
    {
      name: "Lost Control",
      singer: "Sorana",
      path: "./audio/LostControl.mp3",
      img: "./img/LostControls.jpg",
    },
    {
      name: "Monody",
      singer: "feat. Laura Brehm",
      path: "./audio/Monody.mp3",
      img: "./img/Monodys.jpg",
    },
    {
      name: "End Of Time",
      singer: "Alan Walker & Ahrix",
      path: "./audio/EndOfTimes.mp3",
      img: "./img/EndOfTime2.jpg",
    },
    {
      name: "Nevada",
      singer: "ft. Cozi Zuehlsdorff",
      path: "./audio/Nevada.mp3",
      img: "./img/nevada.jpg",
    },
    {
      name: "On My Way",
      singer: "Sabrina Carpenter",
      path: "./audio/OnMyWay.mp3",
      img: "./img/OnMyWay2.jpg",
    },
    {
      name: "lily",
      singer: "K-391 & Emelie Hollow",
      path: "./audio/lily.mp3",
      img: "./img/lilys.jpg",
    },
    {
      name: "Falls Down",
      singer: " Alan Walker; Noah Cyrus",
      path: "./audio/FallsDown.mp3",
      img: "./img/FallsDown.jpg",
    },
    {
      name: "Alan Walker",
      singer: "K-391 & Emelie Hollow",
      path: "./audio/Faded.mp3",
      img: "./img/fededs.jpg",
    },
    {
      name: "Unstoppable",
      singer: "Sia",
      path: "./audio/Unstop.mp3",
      img: "./img/unstop.jpg",
    },
    {
      name: "la La La",
      singer: "SaKiRa",
      path: "./audio/lalala.mp3",
      img: "./img/lalala.jpg",
    },
    {
      name: "Close To You",
      singer: "Elektronomia",
      path: "./audio/close.mp3",
      img: "./img/close.jpg",
    },
    {
      name: "Wavin' Flag",
      singer: "K'naan",
      path: "./audio/Wavin.mp3",
      img: "./img/wavin.jpeg",
    },
    {
      name: "The Difference",
      singer: " Daya",
      path: "./audio/TheDifference.mp3",
      img: "./img/Unstop.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((item, index) => {
      return `
      <div class="listSong-item ${
        index === this.curentIndex ? "active" : ""
      }" data-index="${index}">
            <div class="listSong-item-left">
              <img src="${item.img}" alt="" />
              <div class="listSong-item-mid">
                <h3>${item.name}</h3>
                <span>${item.singer}</span>
              </div>
            </div>
          </div>
        `;
    });
    $(".list-song").innerHTML = htmls.join("");
  },

  definePro: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.curentIndex];
      },
    });
  },
  handleEvent: function () {
    const rotateImg = imgSmall.animate([{ transform: "rotate(360deg)" }], {
      duration: 12000,
      iterations: Infinity,
    });

    rotateImg.pause();
    play.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    pause.onclick = function () {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    audio.onplay = function () {
      app.isPlaying = true;
      play.classList.add("hide");
      pause.classList.remove("hide");
      rotateImg.play();
    };
    audio.onpause = function () {
      app.isPlaying = false;
      play.classList.remove("hide");
      pause.classList.add("hide");

      rotateImg.pause();
    };

    next.onclick = function () {
      app.nextSongs();
      audio.play();
    };
    prev.onclick = function () {
      app.prevSongs();
      audio.play();
    };
    audio.ontimeupdate = function () {
      if (audio.duration) {
        currentPercent = Math.floor((audio.currentTime / audio.duration) * 100);
        process.style.width = currentPercent + "%";
        if (currentPercent === 100) {
          app.nextSongs();
          app.render();
          audio.play();
        }
      }
      let durations = audio.duration;
      let currentTimes = audio.currentTime;
      let max_1 = Math.floor(durations / 60);
      let max_2 = Math.floor(durations % 60);
      let min_1 = Math.floor(currentTimes / 60);
      let min_2 = Math.floor(currentTimes % 60);
      max.textContent = `${min_1}:${min_2}`;
      min.textContent = `${min_1}:${min_2}`;
      if (max_1 || max_2) {
        max.textContent = `${max_1}:${max_2}`;
      }
      if (max_2 < 10) {
        max.textContent = `${max_1}:0${max_2}`;
      }
      if (!max_1 || !max_2) {
        max.textContent = "0:00";
      }
      if (min_2 < 10) {
        min.textContent = `${min_1}:0${min_2}`;
      }
      console.log(
        Math.floor(audio.currentTime / 60),
        Math.floor(audio.currentTime % 60)
      );
    };
    range.onclick = function (e) {
      let processWidth = range.clientWidth;
      let clickOffSetX = e.offsetX;
      let songDuration = audio.duration;
      audio.currentTime = (clickOffSetX / processWidth) * songDuration;
      audio.play();
    };

    loads.onclick = function () {
      audio.currentTime = 0;
    };

    // closeListSongs.onclick = function () {
    //   alert("hello");
    // };

    OpenSongs.onclick = function () {
      listSong.classList.toggle("bottomAnimation");
      OpenSongs.classList.toggle("red");
      OpenSongs.classList.toggle("bg-white");
      OpenSongIcon.classList.toggle("rotate-180");
    };

    random.onclick = function () {
      app.randomSongs();
      audio.play();
    };

    listSong.onclick = function (e) {
      const ItemSongs = e.target.closest(".listSong-item");
      if (ItemSongs) {
        app.curentIndex = Number(ItemSongs.dataset.index);
        app.loadSongs();
        app.render();
        audio.play();
      }
    };
  },

  loadSongs: function () {
    titleNames.textContent = this.currentSong.name;
    titleSinger.textContent = this.currentSong.singer;
    imgSmall.setAttribute("src", `${this.currentSong.img}`);
    imgBig.style.backgroundImage = `url('${this.currentSong.img}')`;
    audio.src = this.currentSong.path;

    app.render();
  },
  nextSongs: function () {
    this.curentIndex++;
    if (this.curentIndex >= this.songs.length) {
      this.curentIndex = 0;
    }
    this.loadSongs();
  },
  prevSongs: function () {
    this.curentIndex--;
    if (this.curentIndex < 0) {
      this.curentIndex = this.songs.length - 1;
    }
    this.loadSongs();
  },

  randomSongs: function () {
    let ran;
    do {
      ran = Math.floor(Math.random() * this.songs.length);
    } while (ran === this.curentIndex);
    this.curentIndex = ran;
    this.loadSongs();
  },

  start: function () {
    this.render();
    this.definePro();
    this.handleEvent();
    this.loadSongs();
  },
};

app.start();
