<template>
  <div class="video">
    <img class="back-main-btn" src="../assets/back.svg" @click="backMainScreen" />
  </div>
</template>

<script>
export default {
  name: 'Video',
  methods: {
    backMainScreen() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.video {
  position: relative;
  width: 100vw;
  height: 100vh;
}

.back-main-btn {
  position: absolute;
  top: 1%;
  left: 2%;
  width: 15vw;
}
</style>
