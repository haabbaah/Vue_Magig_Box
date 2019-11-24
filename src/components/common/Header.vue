<template>
  <header>
    <img class="back-btn" src="@/assets/back.svg" @click="back" />
    <div v-if="isNext" class="btn next-btn" @click="next">{{ nextName }}</div>
  </header>
</template>

<script>
export default {
	name: 'Menu',
	props: {
		backPath: String,
		nextName: String,
		nextPath: String,
		isNext: Boolean
	},
  methods: {
    back() {
      this.$router.push(this.backPath);
    },
    next() {
      this.$router.push(this.nextPath);
    }
  }
};
</script>

<style scoped>
header{
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 1rem 0;
}

.next-btn{

}
</style>
