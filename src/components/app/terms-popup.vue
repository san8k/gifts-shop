<template>
  <section class="terms-popup">
    <svg class="terms-popup__icon-close"
      viewBox="0 0 24 24"
      width="32px" height="32px" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      @click="closeModal"
    >
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.3 17.7c.4.4 1 .4 1.4 0 .3-.5.3-1.1 0-1.5L13.3
      12l4.3-4.3c.4-.4.4-1 0-1.4a1 1 0 0 0-1.5 0L12 10.7 7.7 6.3a1 1 0 0 0-1.4 0 1 1 0 0 0 0 1.5l4.3
      4.2-4.3 4.3a1 1 0 0 0 0 1.4c.5.3 1.1.3 1.5 0l4.2-4.3 4.3 4.3z" fill="#000"/>
    </svg>

    <div class="terms-popup__wrapper" @scroll="checkScroll($event)">
      <p class="terms-popup__title">Условия</p>
      <p class="terms-popup__text" :class="{ 'terms-popup__text--with-transparent': noTrident,
        'terms-popup__text--scrolled': scrolledDown }" v-html="terms">
      </p>
    </div>

  </section>
</template>

<script>
export default {
  components: {
  },

  props: [
    'terms',
  ],

  data: () => ({
    scrolledDown: false,
  }),

  computed: {
    // не показываем эффект полупрозрачности
    noTrident() {
      return navigator.userAgent.toLowerCase().indexOf('trident') === -1
        && navigator.userAgent.toLowerCase().indexOf('edge') === -1;
    },
  },

  methods: {
    // метод генерит в родителя событие "закрыть попап". подключен к клику по иконке закрытия
    closeModal() {
      this.$emit('closeTermsPopup');
    },

    //  метод меняет флажок если поле прокручено дальше 50px
    checkScroll(evt) {
      this.scrolledDown = evt.target.scrollTop > 50;
    },
  },
};
</script>
