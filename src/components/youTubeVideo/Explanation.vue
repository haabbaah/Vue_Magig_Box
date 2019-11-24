<template>
  <div class="container">
    <div class="grid">
      <Header backPath="/youtubevideo" :isNext="false" nextName="далее"></Header>
      <h3 class="description">Описание</h3>
      <p
        class="description-text"
      >Фокусник включает видео и в нем он просит зрителя показать любое количество пальцев на одной руке и видео ставится на паузу. После этого видео запускается снова и на нем фокусник показывает то же число пальцев, что и у зрителя.</p>
      <h3 class="explanation">Объяснение</h3>
      <ol class="explanation-ol">
        <li>
          <p>Сначала зайдите в "НАСТРОЙКИ" и добавте новую сцену.</p>
          <img class="explanation-img small" src="@/assets/YouTubeVideo/Explanation/01.jpg" />
        </li>
        <li>
          <p>После этого запишите 6 видео и загрузите их в соответствующие поля.</p>
          <p>Первое поле отвечает за вопрос, который вы задаете зрителю до паузы (например: покажи любое количество пальцев на одной руке).</p>
          <p>Оставльные поля заполняются в любом порядке. Черная точка указыват, куда нажать для запуска нужного видео.</p>
          <img class="explanation-img small" src="@/assets/YouTubeVideo/Explanation/02.jpg" />
        </li>
        <li>
          <p>Можно добавлять любое количество сцен. Все они будут запускаться по очереди сверху вниз. Стрелки позволяют передвигать сцены в очереди.</p>
        </li>
        <li>
          <p>После завершения настроек, запустите трюк. Далее нажмите красную кнопку плей для запуска видео с вопросом. По завершении видео остановиться и на экране появится снова красная кнопка плей, но уже с невидимыми полями (сверху слева, сверху с права, снизу слева, снизу справа и по середине). В зависимости от ответа зрителя, нажмите нужное поле.</p>
          <img class="explanation-img small" src="@/assets/YouTubeVideo/Explanation/03.jpg" />
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/Header.vue';
export default {
  name: 'Options',
  components: {
    Header
  }
};
</script>

<style scoped>
</style>
