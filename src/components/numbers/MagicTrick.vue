<template>
  <div class="container">
    <div class="grid">
      <Header backPath="/numbers" :isNext="false"></Header>
    </div>
    <div class="first-screen" v-show="isFirstScreen">
      <h4 :style="{ opacity: opacity}">Выбери любое число</h4>
      <swiper :options="swiperOption" ref="numberSwiper">
        <swiper-slide>
          <div class="slide start-slide">
            <div class="item" v-for="(n, i) of 31" :key="i">{{ n }}</div>
          </div>
        </swiper-slide>
        <swiper-slide v-for="(numbers, index) of arrNumbers" :key="index">
          <div class="slide">
            <div class="item" v-for="(n, i) of numbers" :key="i">{{ n }}</div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="wrapper-next">
        <div class="next-slide">
          <button class="btn next" @click="next">Далее</button>
          <div
            class="swiper-next next-true"
            @click="nextTrue"
            v-if="isNextHiddenBtn"
            slot="button-next"
          ></div>
          <div
            class="swiper-next next-false"
            @click="nextFalse"
            v-if="isNextHiddenBtn"
            slot="button-next"
          ></div>
        </div>
      </div>
    </div>
    <div class="final-screen" v-show="!isFirstScreen">
      <h4>Твоё число</h4>
      <div class="final-number" :class="{blur: isBlur}">{{ finalNumber }}</div>
      <div>
        <button class="btn restart" @click="restart">Попробовать снова</button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
/* import { openDB, deleteDB, wrap, unwrap } from 'idb';
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
}; */

export default {
  name: 'Trick',
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-next'
        },
        shortSwipes: false,
        longSwipes: false
      },
      arrNumbers: [
        [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31],
        [2, 3, 6, 7, 10, 11, 14, 15, 18, 19, 22, 23, 26, 27, 30, 31],
        [4, 5, 6, 7, 12, 13, 14, 15, 20, 21, 22, 23, 28, 29, 30, 31],
        [8, 9, 10, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28, 29, 30, 31],
        [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
      ],
      currentSlide: 0,
      finalNumber: 0,
      isNextHiddenBtn: true,
      isFirstScreen: true,
      isBlur: true,
      trueClick: false //нажималась ли кнопка true хоть один раз
    };
  },
  computed: {
    opacity: function() {
      if (this.currentSlide === 0) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  methods: {
    toSlide(i) {
      this.$refs.numberSwiper.swiper.slideTo(i, 0);
    },
    next() {},
    restart() {
      this.toSlide(0);
			this.currentSlide = 0;
			this.finalNumber = 0,
      this.isBlur = true;
      this.isFirstScreen = true;
    },
    nextTrue() {
      this.trueClick = true;
      switch (this.currentSlide) {
        case 0:
          this.currentSlide++;
          break;
        case 1:
          this.finalNumber++;
          this.currentSlide++;
          break;
        case 2:
          this.finalNumber += 2;
          this.currentSlide++;
          break;
        case 3:
          this.finalNumber += 4;
          this.currentSlide++;
          break;
        case 4:
          this.finalNumber += 8;
          this.currentSlide++;
          break;
        case 5:
          this.finalNumber += 16;
          this.showFinalNumber();
          break;
        default:
          break;
      }
    },
    nextFalse() {
      this.currentSlide++;
      if (this.currentSlide === 6) {
        this.showFinalNumber();
      }
    },
    showFinalNumber() {
     /*  if (!this.trueClick) {
        this.currentSlide = 0;
        this.toSlide(0);
        return;
			}
			console.log('eee'); */
      this.isFirstScreen = false;
      setTimeout(() => {
        this.isBlur = false;
      }, 1000);
    }
  },
  mounted: function() {},
  components: {
    Header
  }
};
</script>

<style scoped>
.first-screen h4 {
  margin-bottom: 2rem;
  text-align: center;
}

.slide {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
}
.slide .item {
  text-align: center;
  font-size: 150%;
  font-weight: 400;
}

.wrapper-next {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.next-slide {
  position: relative;
}

.next-slide .next {
  padding: 0.7rem 0.9rem;
}

.next-slide .swiper-next {
  position: absolute;
  top: -2%;
  width: 52%;
  height: 102%;
}

.next-slide .swiper-next.next-true {
  right: -2%;
  /* background-color: rgba(255, 151, 151, 0.5); */
}

.next-slide .swiper-next.next-false {
  left: -2%;
  /* background-color: rgba(101, 232, 255, 0.5); */
}

.final-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.final-screen h4 {
  margin-bottom: 2rem;
  text-align: center;
}

.final-screen .final-number {
  text-align: center;
  font-size: 700%;
  margin-bottom: 2rem;
  transition: all 2s ease-in-out;
}

.blur {
  filter: blur(30px);
}
</style>
