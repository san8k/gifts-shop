<template>
  <section class="gift-store-header is-hidden-touch">
    <div class="container">
      <div class="container-inner">
        <div class="columns is-marginless">
          <div class="column is-6 is-paddingless">
            <h1>
              {{ title }}
              <span v-if="titleCounter && titleCounter !== null">{{ titleCounter }}</span>
            </h1>
          </div>
          <div class="column is-6" style="padding-right: 0">
            <div class="gift-store-header__search-block">
              <a
                  @click.prevent="openTerms"
                  class="gift-store-header__search-block-link">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="7.5" stroke="#000"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5017 4.06196C6.94143 3.85395
                  7.40863 3.75 7.9005 3.75C8.41682 3.75
                  8.89158 3.85768 9.31975 4.07741C9.75817 4.29812 10.1077 4.61821 10.3641
                  5.03445C10.624 5.4486 10.75 5.85564 10.75
                  6.38878C10.75 6.8296 10.6284 7.24739 10.3907 7.6382C10.1613 8.02118 9.84193
                  8.33724 9.43862 8.5871C9.10389 8.79881
                  8.74014 8.93643 8.3495 9V9.49389C8.3495 9.66486 8.28223 9.8155 8.15767
                  9.93116C8.03652 10.0437 7.88449 10.0904 7.72637
                  10.0904C7.56754 10.0904 7.41817 10.0436 7.2936 9.94077L7.28229 9.93144L7.27215
                  9.92084C7.15644 9.79997 7.10502 9.64803
                  7.11567 9.48477V8.54843C7.11567 8.38701 7.17161 8.23948 7.28458 8.12147L7.28967
                  8.11615L7.29506 8.11115C7.41695 7.99797
                  7.56735 7.94211 7.73126 7.94045C8.25299 7.91131 8.66732 7.74762 8.9908 7.46061L8.99283
                  7.4588C9.31917 7.17555 9.47886 6.825
                  9.47886 6.38878C9.47886 6.08403 9.4065 5.89341 9.26719 5.66703L9.26491 5.66333L9.26276
                  5.65954C9.12897 5.42417 8.94465 5.24668
                  8.70575 5.12272L8.70199 5.12077L8.69829 5.11869C8.46515 4.98749 8.20117 4.91984
                  7.9005 4.91984C7.60705 4.91984 7.32958 4.98422
                  7.06524 5.11376L7.06052 5.11607C6.7944 5.23962 6.57106 5.40988 6.38781 5.62767L6.3779
                  5.63944L6.36663 5.64991C6.23339 5.77363 6.07168
                  5.8553 5.88557 5.8553C5.77108 5.8553 5.65213 5.82989 5.54997 5.75742C5.37579 5.65544
                  5.25 5.49266 5.25 5.27038C5.25 5.11714 5.31685
                  4.98487 5.40905 4.87745C5.69973 4.53197 6.06558 4.26058 6.5017 4.06196ZM7.22347
                  11.0638C7.3612 10.9217 7.549 10.8723 7.73881
                  10.8723H7.81343C7.99984 10.8723 8.18112 10.9243 8.31633 11.0638C8.44826 11.1999
                  8.49876 11.3773 8.49876 11.5611C8.49876 11.7449
                  8.44826 11.9224 8.31633 12.0585C8.18112 12.198 7.99984 12.25 7.81343 12.25H7.73881C7.549
                  12.25 7.3612 12.2006 7.22347 12.0585C7.09154
                  11.9224 7.04104 11.7449 7.04104 11.5611C7.04104 11.3773 7.09154 11.1999 7.22347 11.0638Z"
                  fill="#000"/>
                </svg>
                <span>О магазине</span>
              </a>
            </div>
          </div>
        </div>

        <template v-if="isPageLoading">
          <div>
            Loading...
          </div>
        </template>

        <template v-if="!isPageLoading">
          <div class="gift-store-header__info"
           :class="{ 'gift-store-header__info--no-sort-block': !showSorts }">
            <div class="gift-store-header__info-points">
              <p class="gift-store-header__info-points--title">
                Остаток баллов:
                <span v-if="points && points !== null" class="gift-store-header__info-points--count">
                  {{ points.toLocaleString() }}
                </span>
              </p>
            </div>
            <div class="gift-store-header__info-buttons">
              <router-link :to="{ name: 'index' }"
                class="gift-store-header__info-buttons-link"
              >
                <svg width="20" height="26" viewBox="0 0 20 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.9116 22.2926L18.4928 5.85061C18.4624 5.48558 18.1634 5.2092 17.8138
                  5.2092H14.895C14.8545 2.46626
                  12.6755 0.25 10 0.25C7.32449 0.25 5.14556 2.46626 5.10502 5.2092H2.18626C1.83156
                  5.2092 1.53765 5.48558 1.50725
                  5.85061L0.0884109 22.2926C0.0884109 22.3135 0.0833435 22.3344 0.0833435
                  22.3552C0.0833435 24.2273 1.75048
                  25.75 3.80273 25.75H16.1973C18.2495 25.75 19.9167 24.2273 19.9167 22.3552C19.9167
                  22.3344 19.9167 22.3135
                  19.9116 22.2926ZM10 1.65798C11.9205 1.65798 13.4863 3.24325 13.5268 5.2092H6.47318C6.51372
                  3.24325 8.07951
                  1.65798 10 1.65798ZM16.1973 24.342H3.80273C2.51564 24.342 1.47178 23.466 1.45151
                  22.3865L2.80954 6.62239H5.09995V8.76043C5.09995
                  9.15153 5.40399 9.46442 5.78403 9.46442C6.16408 9.46442 6.46812 9.15153 6.46812
                  8.76043V6.62239H13.5268V8.76043C13.5268 9.15153
                  13.8309 9.46442 14.2109 9.46442C14.591 9.46442 14.895 9.15153 14.895 8.76043V6.62239H17.1854L18.5485
                  22.3865C18.5282 23.466 17.4793
                  24.342 16.1973 24.342Z"/>
                </svg>
                <i v-if="ordersCount && ordersCount > 0" v-html="ordersCount"></i>
                Заказы
              </router-link>

              <router-link :to="{ name: 'index' }"
                class="gift-store-header__info-buttons-link"
              >
                <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.36789 10.7483L3.00914
                  1.79167H0.666687V0.375H3.9909L8.06854
                  11.2487C8.17221 11.5252 8.43651 11.7083 8.73177 11.7083H18.1492C18.4326 11.7083 18.6887
                  11.5395 18.8003 11.279L22.6823
                  2.22097L23.9844
                  2.77903L20.1024 11.8371C19.7675 12.6184 18.9993 13.125 18.1492 13.125H8.73177C8.1202 13.125 7.55292
                  12.8631 7.15793 12.4279L6.1806
                  14.785C5.91775 15.5219 6.30206 16.3324 7.03898 16.5953C7.19053 16.6493 7.35017 16.6772 7.51106
                  16.6776H20.5V18.0943H7.5072C7.18541
                  18.0934 6.86612 18.0377 6.56304 17.9296C5.08919 17.4039 4.32057 15.7829 4.84628 14.3091L6.36789
                  10.7483ZM7.43376 19.5C8.21488 19.5
                  8.85398 20.1375 8.85398 20.9167C8.85398 21.6958 8.21488 22.3333 7.43376 22.3333C6.65264 22.3333
                  6.02065 21.6958 6.02065
                  20.9167C6.02065 20.1375 6.65264 19.5 7.43376 19.5ZM17.952 19.5C18.7331 19.5 19.3722 20.1375
                  19.3722 20.9167C19.3722 21.6958
                  18.7331 22.3333 17.952 22.3333C17.1708 22.3333 16.5388 21.6958 16.5388 20.9167C16.5388
                  20.1375 17.1708 19.5 17.952 19.5Z"/>
                </svg>
                <i v-if="cart && cart.items > 0">{{ cart.items }}</i>
                Корзина
              </router-link>
            </div>
          </div>

          <div v-if="showSorts" class="gift-store-header__sort-container" >
            <a class="gift-store-header__sort-link"
              :class="{ 'gift-store-header__sort-link--active': sortMethodsPopupOpened }"
              href=""
              @click="displaySortPopup"
            >
                <svg class="gift-store-header__sort-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M3 17H9V16H3V17ZM3 6V7H21V6H3ZM3 12H15V11H3V12Z"/>
                </svg>

                <span>Сортировка</span>
            </a>
            <span class="gift-store-header__chosen-sort-method">{{ chosenSortMethod.name }}</span>
          </div>
          <div v-if="sortMethodsPopupOpened" class="sort-methods-popup" v-click-outside="closePupup">
            <ul class="sort-methods-popup__methods-list">
              <li
                v-for="(method, key) in sortMethods"
                :key="key"
                class="sort-methods-popup__methods-item"
                :class="{ 'sort-methods-popup__methods-item--active': chosenSortMethod === method }"
              >
                <svg v-if="chosenSortMethod === method" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12.8887 2.38911L9.20677
                  6.07109L5.52479 9.75307C5.13426 10.1436 4.5011 10.1436 4.11057 9.75307L0.746612
                  6.38911C0.356088 5.99859 0.356088 5.36542 0.746612 4.9749C1.13714 4.58438 1.7703
                  4.58438 2.16083 4.9749L4.73524 7.54932C4.76243 7.5471 4.78992 7.54597 4.81768
                  7.54597C4.84544 7.54597 4.87293 7.5471 4.90012 7.54932L11.4745 0.9749C11.8651
                  0.584376 12.4982 0.584376 12.8887 0.9749C13.2793 1.36542 13.2793 1.99859 12.8887
                  2.38911Z"/>
                </svg>
                <a href="" @click="changeSortMethod($event, key)">{{ method.name }}</a>
              </li>
            </ul>
          </div>
        </template>

      </div>
    </div>

    <div v-if="termsPopupOpened" class="terms-popup__background-overlay"></div>
    <article class="terms-modal-popup">
      <terms-popup-component
        v-if="termsPopupOpened && terms"
        v-click-outside="closeTerms"
        :terms="terms"
        @closeTermsPopup="closeTerms"
      />
    </article>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import ClickOutside from 'vue-click-outside';
import termsPopupComponent from './terms-popup.vue';

export default {
  name: 'gift-store-header',

  components: {
    termsPopupComponent,
  },

  props: {
    cart: {
      type: Object,
      default: null,
    },

    ordersCount: Number,
    showSorts: Boolean,
    showBackButton: Boolean,
    title: String,
    titleCounter: {
      type: String,
      default: null,
    },
  },

  data: () => ({
    isPageLoading: true,

    // показываем попап с выбором способа сортировки
    sortMethodsPopupOpened: false,

    // попап с условиями
    termsPopupOpened: false,
  }),

  computed: {
    ...mapGetters('giftStore', [
      'sortMethods',
      'currentSort',
      'chosenSortMethod',
      'terms',
      'points',
    ]),
  },

  created() {
    this.isPageLoading = false;
  },

  methods: {
    displaySortPopup(e) {
      e.preventDefault();
      this.sortMethodsPopupOpened = !this.sortMethodsPopupOpened;
    },

    closePupup(e) {
      if (e.target.nodeName !== 'SPAN' && e.target.nodeName !== 'svg' && e.target.nodeName !== 'path') {
        this.sortMethodsPopupOpened = false;
      }
    },

    changeSortMethod(e, key) {
      e.preventDefault();
      this.sortMethodsPopupOpened = !this.sortMethodsPopupOpened;
      this.$store.commit('giftStore/changeCurrentSort', key);
    },

    openTerms(e) {
      e.preventDefault();
      e.stopPropagation();

      this.$emit('openTerms');

      this.termsPopupOpened = true;
    },

    closeTerms() {
      this.termsPopupOpened = false;
    },
  },

  directives: {
    ClickOutside,
  },
};
</script>
