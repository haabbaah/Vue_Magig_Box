<template>
  <div class="main-screen">
    <router-link
      tag="div"
      v-for="(magicApp, index) of arrMagicApps"
      :key="index"
      active-class="active"
      :to="`${magicApp.path}`"
      class="wrapper"
      exact
    >
      <div class="item">
        <img :src="require(`@/assets/MainScreen/${magicApp.image}`)" /> <!-- Динамическая вставка картинок -->
        <h3>{{ magicApp.name }}</h3>
      </div>
    </router-link>

    <router-link tag="div" :to="`/menu`" exact>
      <img class="menu-btn" src="@/assets/menu.svg" alt />
    </router-link>
    <div class="version">Версия 1.0</div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      arrMagicApps: [
        {
          name: 'YouTube',
          path: '/youtubevideo',
          image: 'YouTubeVideo.png'
        },
        {
          name: 'Числа',
          path: '/numbers',
          image: 'Numbers.png'
        }
      ]
    };
  }
};
</script>

<style scoped>
.main-screen {
  display: flex;
  flex-direction: column;
	align-items: center;
	padding-top: 6rem;
}

.main-screen .item {
	width: 90vw;
	background-color: rgb(var(--accent-color));
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	padding: .6rem;
	border-radius: .5rem;
	cursor: pointer;
	box-shadow: 0px 0px 14px -4px rgba(0,0,0,0.75);
}

.main-screen .item img{
	max-width: 3rem;
	margin-right: .5rem;
	border-radius: .3rem;
}

.menu-btn {
  position: absolute;
  top: 1%;
  right: 4.5%;
  max-width: 3rem;
}

.version{
	position: absolute;
  top: 1%;
	left: 4.5%;
	font-size: 70%;
}
</style>
