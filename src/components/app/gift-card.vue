<template>
  <div class="gift-card"
    @click="openGift"
    >
    <div class="gift-card__image"
      :style="imageUrl ? 'background-image: url(' + imageUrl + ')' : ''">
      <img v-if="!gift.image" src="@/assets/images/gift-no-image.svg" alt="">
      <div class="gift-card__labels">
        <span v-show="gift.isHit" class="app-tag app-tag--orange">Хит!</span>
      </div>
    </div>
    <div class="gift-card__title-block">
      <p class="gift-card__title" v-html="gift.name"></p>
    </div>
    <div class="gift-card__info-block">
      <p class="gift-card__price">
        Цена {{ gift.price.toLocaleString() }} ⍟
      </p>
      <p v-if="!gift.isUnlimited" class="gift-card__count">
        Остаток {{ gift.availableCount.toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },

  props: [
    'gift',
  ],

  computed: {
    imageUrl() {
      return this.gift && this.gift.image ? this.gift.image : null;
    },
  },

  methods: {
    // метод генерит событие "открыть попап" и передает параметром текущий подарок
    openGift() {
      this.$emit('openGift', this.gift);
    },
  },
};
</script>
