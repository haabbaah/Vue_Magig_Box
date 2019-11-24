<template>
  <div class="container">
    <div class="grid">
      <Header backPath="/youtubevideo" :isNext="false"></Header>
    </div>
    <div class="wrapper-video">
      <video ref="video">
        <source :src="videoSrc" type="video/mp4" />
      </video>
      <div class="play-video">
        <img
          class="play-btn"
          v-show="isPlayBtn"
          @click="playVideo()"
          src="@/assets/YouTubeVideo/play.png"
        />
        <div class="wrapper-hidden-ntn" v-if="isHiddenBtn">
          <div class="hidden-btn top-left" @click="clickOnHiddenButton($event)"></div>
          <div class="hidden-btn top-right" @click="clickOnHiddenButton($event)"></div>
          <div class="hidden-btn bottom-left" @click="clickOnHiddenButton($event)"></div>
          <div class="hidden-btn bottom-right" @click="clickOnHiddenButton($event)"></div>
          <div class="hidden-btn center" @click="clickOnHiddenButton($event)"></div>
        </div>
      </div>
      <img class="restart" v-if="isRestart" @click="restartVideo" src="@/assets/reload.svg" />
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import { openDB, deleteDB, wrap, unwrap } from 'idb';
import { async } from 'q';

const dbPromise = openDB('optionsMagic', 1, {
  upgrade(db) {
    db.createObjectStore('keyval');
  }
});

const idbKeyval = {
  async get(key) {
    return (await dbPromise).get('keyval', key);
  }
};

export default {
  name: 'Trick',
  data() {
    return {
      videoSrc: '',
      videoCounter: 0,
      arrScene: [],
      isPlayBtn: true,
      isHiddenBtn: false,
      isRestart: false,
      isNextScene: false
    };
  },
  methods: {
    clickOnHiddenButton(event) {
      let hiddenBtn = event.currentTarget;
      if (hiddenBtn.classList.contains('top-left')) {
        this.videoSrc = this.arrScene[this.videoCounter].topLeftUrl;
        this.playVideo();
      } else if (hiddenBtn.classList.contains('top-right')) {
        this.videoSrc = this.arrScene[this.videoCounter].topRightUrl;
        this.playVideo();
      } else if (hiddenBtn.classList.contains('bottom-left')) {
        this.videoSrc = this.arrScene[this.videoCounter].bottomLeftUrl;
        this.playVideo();
      } else if (hiddenBtn.classList.contains('bottom-right')) {
        this.videoSrc = this.arrScene[this.videoCounter].bottomRightUrl;
        this.playVideo();
      } else if (hiddenBtn.classList.contains('center')) {
        this.videoSrc = this.arrScene[this.videoCounter].centerUrl;
        this.playVideo();
      }
      this.videoCounter++;
      this.isNextScene = true;
    },
    playVideo() {
      this.isPlayBtn = false;
      this.$refs.video.load();
      this.$refs.video.play();
      this.$refs.video.addEventListener('ended', this.endedVideo);
    },
    endedVideo() {
      if (this.videoCounter >= this.arrScene.length) {
        this.isHiddenBtn = false;
        this.isPlayBtn = false;
        this.isRestart = true;
        return;
      }
      if (this.isNextScene) {
        this.isHiddenBtn = false;
        this.isPlayBtn = true;
        this.isNextScene = false;
        this.videoSrc = this.arrScene[this.videoCounter].startUrl;
        this.$refs.video.removeEventListener('ended', this.endedVideo);
      } else {
        this.isHiddenBtn = true;
        this.isPlayBtn = true;
      }
    },
    restartVideo() {
      this.videoCounter = 0;
      this.isNextScene = false;
      this.videoSrc = this.arrScene[this.videoCounter].startUrl;
      this.isPlayBtn = true;
      this.isRestart = false;
    },
    async getSaveOptions() {
      let val = await idbKeyval.get('youTubeVideoOptions');
      if (!val) {
        return;
      }
      let optionsFromStorage = JSON.parse(val);
      this.arrScene = [];
      this.arrScene = optionsFromStorage.arrScene;
    }
  },
  mounted: async function() {
    await this.getSaveOptions();
    this.videoSrc = this.arrScene[0].startUrl;
  },
  components: {
    Header
  }
};
</script>

<style scoped>

.wrapper-video {
	position: relative;
	margin-top: 35vw;
}

.wrapper-video video {
  width: 100%;
  height: auto;
}

.wrapper-video .play-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
}

.wrapper-video .play-video .wrapper-hidden-ntn {
  width: 100%;
  height: 100%;
}

.wrapper-video .play-video .hidden-btn {
  position: absolute;
  width: 40%;
  height: 40%;
  /*  background-color: rgb(230, 136, 136); */
  opacity: 0;
}

.wrapper-video .play-video .top-left {
  position: absolute;
  top: -10%;
  left: -10%;
}

.wrapper-video .play-video .top-right {
  position: absolute;
  top: -10%;
  right: -10%;
}

.wrapper-video .play-video .bottom-left {
  position: absolute;
  bottom: -10%;
  left: -10%;
}

.wrapper-video .play-video .bottom-right {
  position: absolute;
  bottom: -10%;
  right: -10%;
}

.wrapper-video .play-video .center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.restart {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  padding: 1rem;
  background-color: rgb(var(--accent-color));
  clip-path: circle(50% at 50% 50%);
}
</style>
