<template>
  <article class="pagination">
    <a class="pagination__arrow pagination__arrow--left"
      :class="{ 'pagination__arrow--disabled': !isActiveLeft }"
      @click="changePage(activePage - 1)"
    >
      <svg v-if="isActiveLeft" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#fff"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3285
        18.3995C13.7191 18.79 14.3522 18.79 14.7428 18.3995C15.1333
        18.009 15.1333 17.3758 14.7428 16.9853L9.793 12.0355L14.7428
        7.08577C15.1333 6.69524 15.1333 6.06208 14.7428 5.67156C14.3522
        5.28103 13.7191 5.28103 13.3285 5.67156L6.96458 12.0355L13.3285
        18.3995Z" fill="#000"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.3285 18.3995C13.7191 18.79 14.3522 18.79 14.7428
              18.3995C15.1333 18.009 15.1333 17.3758 14.7428 16.9853L9.793
              12.0355L14.7428 7.08577C15.1333 6.69524 15.1333 6.06208 14.7428
              5.67156C14.3522 5.28103 13.7191 5.28103 13.3285 5.67156L6.96458
              12.0355L13.3285 18.3995Z" fill="#ccc"/>
      </svg>
    </a>

    <a class="pagination__page"
      :class="{ 'pagination__page--active': activePage === 1 }"
      @click="changePage(1)"
    >
      1
    </a>

    <p v-if="isDotsPrev" class="pagination__dots">...</p>

    <a v-for="(page, i) in shownPages"
      :key="i"
      class="pagination__page"
      :class="{ 'pagination__page--active': activePage === page }"
      @click="changePage(page)"
    >
      {{ page }}
    </a>

    <p v-if="isDotsNext" class="pagination__dots">...</p>

    <a class="pagination__page"
      :class="{ 'pagination__page--active': activePage === pagesCount }"
      @click="changePage(pagesCount)"
    >
      {{ pagesCount }}
    </a>

    <a class="pagination__arrow pagination__arrow--right"
      :class="{ 'pagination__arrow--disabled': !isActiveRight }"
      @click="changePage(activePage + 1)"
    >
      <svg v-if="isActiveRight" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="12" fill="#fff"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.3285
        18.3995C13.7191 18.79 14.3522 18.79 14.7428 18.3995C15.1333
        18.009 15.1333 17.3758 14.7428 16.9853L9.793 12.0355L14.7428
        7.08577C15.1333 6.69524 15.1333 6.06208 14.7428 5.67156C14.3522
        5.28103 13.7191 5.28103 13.3285 5.67156L6.96458 12.0355L13.3285
        18.3995Z" fill="rgba(0, 0, 0, 0.87)"/>
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd"
              d="M13.3285 18.3995C13.7191 18.79 14.3522 18.79 14.7428
              18.3995C15.1333 18.009 15.1333 17.3758 14.7428 16.9853L9.793
              12.0355L14.7428 7.08577C15.1333 6.69524 15.1333 6.06208 14.7428
              5.67156C14.3522 5.28103 13.7191 5.28103 13.3285 5.67156L6.96458
              12.0355L13.3285 18.3995Z" fill="rgba(0, 0, 0, 0.3)"/>
      </svg>
    </a>
  </article>
</template>

<script>
export default {
  name: 'pagination',

  props: {
    pagesCount: Number,
    activePage: Number,
  },

  data: () => ({
  }),

  computed: {
    isActiveLeft() {
      return this.activePage > 1;
    },

    isActiveRight() {
      return this.activePage < this.pagesCount;
    },

    isDotsNext() {
      return this.pagesCount > 7 && this.activePage < this.pagesCount - 4;
    },

    isDotsPrev() {
      return this.pagesCount > 7 && this.activePage >= 6;
    },

    // создаем массив страниц по их количеству и выбираем, какие показать
    shownPages() {
      const sliceFrom = this.activePage - 4 > 1 ? this.activePage - 3 : 1;
      const sliceTo = this.activePage < this.pagesCount - 4 ? this.activePage + 2 : this.pagesCount - 1;
      const pages = new Array(this.pagesCount).fill().map((e, i) => i + 1).slice(sliceFrom, sliceTo);
      return pages;
    },
  },

  methods: {
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.pagesCount) {
        this.$emit('changePage', pageNumber);
      }
    },
  },
};
</script>
