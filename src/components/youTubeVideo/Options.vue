<template>
  <div class="container">
    <div class="grid">
      <Header backPath="/youtubevideo" :isNext="false" nextName></Header>

      <div class="video-scenes">
        <div
          class="scene"
          v-for="(scene, sceneIndex) of arrScene"
          :key="sceneIndex"
          :data-scene-counter="sceneIndex"
        >
          <img class="del-scene" @click="delScene(sceneIndex)" :src="require(`@/assets/close.svg`)" />
          <img
            class="move-scene up-scene"
            @click="upScene(sceneIndex)"
            :src="require(`@/assets/up.svg`)"
          />
          <div class="item" v-for="(num, index) of 6" :key="num" :data-item="index">
            <img :src="require(`@/assets/YouTubeVideo/menu/0${--num}.png`)" />
            <input
              type="file"
              name="file"
              :id="`${sceneIndex}${index}`"
              class="inputfile"
              accept="video/*"
            />
            <label :for="`${sceneIndex}${index}`">{{ getLabelName(sceneIndex, index) }}</label>
          </div>
          <img
            class="move-scene down-scene"
            @click="downScene(sceneIndex)"
            :src="require(`@/assets/down.svg`)"
          />
        </div>
        <div class="add-scene btn" @click="addScene">добавить новую сцену</div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
import { on, off, fire } from 'delegated-events';
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
  },
  async set(key, val) {
    return (await dbPromise).put('keyval', val, key);
  },
  async delete(key) {
    return (await dbPromise).delete('keyval', key);
  },
  async clear() {
    return (await dbPromise).clear('keyval');
  },
  async keys() {
    return (await dbPromise).getAllKeys('keyval');
  }
};

export default {
  name: 'Options',
  data() {
    return {
      arrScene: [],
      options: {}
    };
  },
  computed: {
    /*   arrScene: {
      get: () => this.$store.state.youTubeVideo.arrScene,
      set: value => this.$state.commit('setArrScene', value)
    } */
  },
  methods: {
    getLabelName(sceneIndex, index) {
      switch (index) {
        case 0:
          return this.checkEmptyLabelName(this.arrScene[sceneIndex].startName);
          break;
        case 1:
          return this.checkEmptyLabelName(
            this.arrScene[sceneIndex].topLeftName
          );
          break;
        case 2:
          return this.checkEmptyLabelName(
            this.arrScene[sceneIndex].topRightName
          );
          break;
        case 3:
          return this.checkEmptyLabelName(
            this.arrScene[sceneIndex].bottomLeftName
          );
          break;
        case 4:
          return this.checkEmptyLabelName(
            this.arrScene[sceneIndex].bottomRightName
          );
          break;
        case 5:
          return this.checkEmptyLabelName(this.arrScene[sceneIndex].centerName);
          break;
        default:
          break;
      }
    },
    checkEmptyLabelName(name) {
      if (name) {
        return name;
      } else {
        return 'Загрузить видео';
      }
    },
    addScene() {
      this.arrScene.push({
        startUrl: '',
        startName: '',
        topLeftUrl: '',
        topLeftName: '',
        topRightUrl: '',
        topRightName: '',
        bottomLeftUrl: '',
        bottomLeftName: '',
        bottomRightUrl: '',
        bottomRightName: '',
        centerUrl: '',
        centerName: ''
      });
      this.saveOptions();
    },
    delScene(sceneIndex) {
      this.arrScene.splice(sceneIndex, 1);
      this.saveOptions();
    },
    upScene(sceneIndex) {
      if (sceneIndex === 0) return;
      let currentScene = sceneIndex;
      let upScene = sceneIndex - 1;
      [this.arrScene[currentScene], this.arrScene[upScene]] = [
        this.arrScene[upScene],
        this.arrScene[currentScene]
      ];
      this.arrScene.push('0');
			this.arrScene.pop();
			this.saveOptions();
    },
    downScene(sceneIndex) {
      let currentScene = sceneIndex;
      let downScene = sceneIndex + 1;
      if (!this.arrScene[downScene]) return;
      [this.arrScene[downScene], this.arrScene[currentScene]] = [
        this.arrScene[currentScene],
        this.arrScene[downScene]
      ];
      this.arrScene.push('0');
			this.arrScene.pop();
			this.saveOptions();
    },
    async saveOptions() {
      this.options.arrScene = this.arrScene;
      let serialParams = JSON.stringify(this.options);
      await idbKeyval.set('youTubeVideoOptions', serialParams);
    },
    async getSaveOptions() {
      let val = await idbKeyval.get('youTubeVideoOptions');
      if (!val) {
        return;
      }
      let optionsFromStorage = JSON.parse(val);
      this.arrScene = [];
      this.arrScene = optionsFromStorage.arrScene;
    },
    startFileReader() {
      // this в делегировании не работает
      let arrScene = this.arrScene;
      let options = this.options;

      on('change', '.inputfile', function(event) {
        //Делегируем события
        let label = event.currentTarget.nextElementSibling;
        let parent = event.currentTarget.closest('.scene');
        let i = +parent.dataset.sceneCounter;
        console.log(arrScene);
        let scene = arrScene[i];

        let item = event.currentTarget.closest('.item');
        let itemData = item.dataset.item;
        let src = '';

        let file = event.currentTarget.files[0];
        label.innerHTML = file.name;

        let reader = new FileReader();

        reader.onloadend = async event => {
          src = reader.result;
          switch (itemData) {
            case '0':
              scene.startUrl = src;
              scene.startName = file.name;
              break;
            case '1':
              scene.topLeftUrl = src;
              scene.topLeftName = file.name;
              break;
            case '2':
              scene.topRightUrl = src;
              scene.topRightName = file.name;
              break;
            case '3':
              scene.bottomLeftUrl = src;
              scene.bottomLeftName = file.name;
              break;
            case '4':
              scene.bottomRightUrl = src;
              scene.bottomRightName = file.name;
              break;
            case '5':
              scene.centerUrl = src;
              scene.centerName = file.name;
              break;
            default:
              break;
          }
          options.arrScene = arrScene;
          let serialParams = JSON.stringify(options);
          await idbKeyval.set('youTubeVideoOptions', serialParams);
        };

        if (file) {
          reader.readAsDataURL(file);
        } else {
          throw new Error('Src не установлен');
        }
      });
    }
  },
  components: {
    Header
  },
  mounted: async function() {
    await this.getSaveOptions();
    await this.startFileReader();
  }
};
</script>

<style scoped>
.video-scenes {
  display: flex;
  flex-direction: column;
}

.scene {
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  border: 1px solid rgb(var(--accent-color));
  border-radius: 0.5rem;
  padding: 0.3rem;
  background-color: rgb(var(--accent-color));
}

.scene .item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.scene .item:first-of-type {
  margin-top: 1rem;
}

.scene .item img {
  max-width: 3rem;
}

.scene .item .inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.scene .item .inputfile + label {
  width: 100%;
  text-align: center;
  font-size: 1em;
  font-weight: 400;
  color: rgb(var(--text-color));
  display: inline-block;
  padding: 0.5rem;
  border: 1px solid rgb(var(--main-color));
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 1rem;
}

.move-scene {
  max-width: 2rem;
  align-self: center;
  cursor: pointer;
}

.del-scene {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  max-width: 2rem;
  cursor: pointer;
}

.add-scene {
  text-align: center;
  margin-bottom: 3rem;
}
</style>
