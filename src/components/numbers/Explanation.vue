<template>
  <div class="container">
    <div class="grid">
      <Header backPath="/numbers" :isNext="false" nextName="далее"></Header>
      <h3 class="description">Описание</h3>
      <p class="description-text">
        Фокусник показывает таблицу зрителям, предлагает одному из них задумать любое число из нее и указать, в каких столбиках таблицы находится это число.
        После этого приложение угадывает задуманное число.
      </p>
      <h3 class="explanation">Объяснение</h3>
      <ol class="explanation-ol">
        <li>
          <p>Позвольте зрителю запомнить любое число из таблицы и нажмите кнопку "ДАЛЕЕ".</p>
          <img class="explanation-img small" src="@/assets/Numbers/Explanation/01.jpg" />
        </li>
        <li>
          <p>После этого на кнопке "ДАЛЕЕ" появятся два невидимых поля.</p>
          <img class="explanation-img small" src="@/assets/Numbers/Explanation/02.jpg" />
        </li>
        <li>
          <p>На левое поле нужно нажимать, когда зритель говорит, что в этой таблице его числа нет (красное поле).</p>
          <p>На правое поле нужно нажимать, когда зритель говорит, что в этой таблице его число есть (синее поле).</p>
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
