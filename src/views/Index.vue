<template>
  <section class="gift-store section-background">
    <store-header-component
        :cart="{ items: 0 }"
        :ordersCount="0"
        :showSorts="true"
        :showBackButton="false"
        title="Магазин подарков"
        @openTerms="loadTerms"
    />
    <section class="gift-store__content">
      <div class="container">
        <template v-if="isPageLoading">
          <div>
            Loading...
          </div>
        </template>

        <template v-if="!isPageLoading">
          <div v-if="giftsOnPage && giftsOnPage.length > 0" class="gift-store__materials-container">

            <a v-for="(item, i) in sortedGifts" :key="i"
               class="column is-one-third"
               style="padding-left: 0;">
              <div class="gift-store__card-container">
                <a class="gift-store__card-wrapper">
                  <gift-card-component
                      :gift="item"
                      @openGift="openGiftModal"
                  />
                </a>
              </div>
            </a>

          </div>
          <template v-else>
            <no-material :has-filters="false"/>
          </template>
        </template>

        <div v-if="pagesCount && pagesCount > 1" class="gift-store__pagination-wrapper">
          <pagination-component
            :pagesCount="pagesCount"
            @changePage="changePage"
            :activePage="currentPage"
          />
        </div>
      </div>
    </section>

    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="gift-popup__background-overlay"
      v-if="isGiftPopupOpened"></div>
    </transition>

    <transition leave-active-class="animated fadeOutDown">
      <article id="gift-modal-popup"
               @click="closeGiftModal"
               :class="{'gift-modal-popup__active': isGiftPopupOpened}"
               class="gift-modal-popup">
        <gift-popup-component
          v-click-outside="closeGiftModal"
          v-if="isGiftPopupOpened"
          :gift="openedGift"
          @closeGift="closeGiftModal"
        />
      </article>
    </transition>

  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import sortBy from 'lodash/sortBy';
import ClickOutside from 'vue-click-outside';
import noMaterial from '../components/helpers/no-material.vue';
import storeHeaderComponent from '../components/app/header.vue';
import paginationComponent from '../components/helpers/pagination.vue';
import giftCardComponent from '../components/app/gift-card.vue';
import giftPopupComponent from '../components/app/gift-popup.vue';

export default {
  name: 'gift-store',

  components: {
    storeHeaderComponent,
    paginationComponent,
    giftCardComponent,
    giftPopupComponent,
    noMaterial,
  },

  data() {
    return {
      isPageLoading: true,

      // товары на странице
      giftsOnPage: null,

      // сколько всего подарков
      totalCount: null,

      // открыть/скрыть попап подарка
      isGiftPopupOpened: false,

      // объект открытого подарка
      openedGift: null,

      // всего страниц
      pagesCount: null,
    };
  },

  computed: {
    ...mapGetters('giftStore', [
      'sortMethods',
      'currentSort',
      'chosenSortMethod',

      'points',
      'gifts',

      'terms',

      'currentPage',

      'settings',
    ]),

    sortedGifts() {
      let sortedGiftsArray = [];
      switch (this.chosenSortMethod.type) {
        case 'default':
          sortedGiftsArray = sortBy(this.giftsOnPage, 'order');
          break;
        case 'cheap':
          sortedGiftsArray = sortBy(this.giftsOnPage, 'price');
          break;
        case 'expensive':
          sortedGiftsArray = sortBy(this.giftsOnPage, 'price').reverse();
          break;
        case 'new':
          sortedGiftsArray = sortBy(this.giftsOnPage, 'date');
          break;
        case 'old':
          sortedGiftsArray = sortBy(this.giftsOnPage, 'date').reverse();
          break;

        default:
          sortedGiftsArray = this.giftsOnPage;
          break;
      }

      return sortedGiftsArray;
    },
  },

  created() {
    this.$store.dispatch('giftStore/getGifts')
      .then(() => {
        window.scrollTo(0, 0);
        this.isPageLoading = false;
      });

    this.$store.dispatch('giftStore/getPoints');
  },

  methods: {
    loadTerms() {
      if (!this.canIUseTerms) {
        this.$store.dispatch('giftStore/getTerms');
      }
    },

    // записываем подарки для выбранной страницы
    setGiftsOnPage() {
      this.giftsOnPage = this.gifts.slice((this.currentPage - 1) * this.settings.giftsPerPage,
        (this.currentPage - 1) * this.settings.giftsPerPage + this.settings.giftsPerPage);
    },

    changePage(page) {
      this.$store.commit('giftStore/changeCurrentPage', page);
      this.setGiftsOnPage();
    },

    /**
     * Открытие модалки
     * @param giftItem
     */
    openGiftModal(giftItem) {
      this.openedGift = giftItem;
      this.isGiftPopupOpened = true;
    },

    closeGiftModal(e) {
      if (e === null) {
        this.isGiftPopupOpened = false;
      } else if (e.target.classList.contains('gift-modal-popup__active')
        || e.target.classList.contains('gift-popup__background-overlay')
        || e.target.classList.contains('gift-popup__icon-close')
        || (e.target.closest('span') && e.target.closest('span').classList.contains('gift-popup__icon-close'))
      ) {
        this.isGiftPopupOpened = false;
      }
    },
  },

  watch: {
    gifts() {
      this.pagesCount = Math.ceil(this.gifts.length / this.settings.giftsPerPage);
      this.setGiftsOnPage();
    },
  },

  directives: {
    ClickOutside,
  },
};
</script>
