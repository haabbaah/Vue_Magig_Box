<template>
  <div class="container">
    <div class="grid">
      <Header backPath="/numbers" :isNext="false" nextName></Header>
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
  }
};

export default {
  name: 'Options',
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    Header
  },
  mounted: function() {}
};
</script>

<style scoped>
</style>
