<template>
  <div class="container">
      <div class="grid">
      <Header backPath="/" isNext nextName="далее" nextPath="/numbers/trick"></Header>

      <div class="extra-list">
        <router-link
          tag="div"
          v-for="(extraList, index) of arrExtraList"
          :key="index"
          active-class="active"
          :to="`${extraList.path}`"
          class="item"
          exact
        >
          <p>{{ extraList.name }}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
export default {
	name: 'Numbers',
		data() {
    return {
      arrExtraList: [
      /*   {
          name: 'настройки',
          path: '/numbers/options',
        }, */
        {
          name: 'обучение',
          path: 'numbers/explanation',
        }
      ]
    };
  },
  methods: {},
  components: {
    Header
  }
};
</script>

<style scoped>
</style>
