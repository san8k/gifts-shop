<template>
  <section class="gift-slider">

    <div class="gift-slider__slide" :style="`background-image: url(${ slideImage })`"></div>

    <template v-if="gift.images.length > 1">
      <a class="gift-slider__arrow gift-slider__arrow--left" @click.prevent="switchSlide('prev')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3285 18.3995C13.7191 18.79 14.3522 18.79
          14.7428 18.3995C15.1333 18.009 15.1333 17.3758 14.7428 16.9853L9.793 12.0355L14.7428 7.08577C15.1333
          6.69524 15.1333 6.06208 14.7428 5.67156C14.3522 5.28103 13.7191 5.28103 13.3285 5.67156L6.96458
          12.0355L13.3285 18.3995Z"/>
        </svg>
      </a>
      <a class="gift-slider__arrow gift-slider__arrow--right" @click.prevent="switchSlide('next')" style="transform: rotate(180deg);">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3285 18.3995C13.7191 18.79 14.3522 18.79
          14.7428 18.3995C15.1333 18.009 15.1333 17.3758 14.7428 16.9853L9.793 12.0355L14.7428 7.08577C15.1333
          6.69524 15.1333 6.06208 14.7428 5.67156C14.3522 5.28103 13.7191 5.28103 13.3285 5.67156L6.96458
          12.0355L13.3285 18.3995Z"/>
        </svg>
      </a>

      <div class="gift-slider__dots-container">
        <a
          v-for="(slide, i) in gift.images"
          :key="i"
          @click.prevent="switchSlide(i)"
          class="gift-slider__dot"
          :class="{ 'gift-slider__dot--active': currentIndex === i }"></a>
      </div>
    </template>

  </section>
</template>

<script>

export default {
  props: [
    'gift',
  ],

  data: () => ({
    currentIndex: 0,
  }),

  computed: {
    slideImage() {
      return this.gift.images[this.currentIndex];
    },
  },

  methods: {
    // Переключение по клику на кнопку стрелки слайда в слайдере
    switchSlide(slide) {
      if (typeof slide === 'number') {
        this.currentIndex = slide;
      } else if (slide === 'prev') {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.gift.images.length - 1;
      } else {
        this.currentIndex = this.currentIndex < this.gift.images.length - 1 ? this.currentIndex + 1 : 0;
      }
    },
  },
};
</script>
