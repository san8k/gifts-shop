import axios from 'axios';

export default {
  /**
   * Получить условия для подарков
   */
  getTerms() {
    return axios.get('/terms.json');
  },

  getGifts() {
    /**
     * Вернет список подарков
     */
    return axios.get('/gifts.json');
  },

  getPoints() {
    /**
     * Вернет количество баллов
     */
    return axios.get('/user-points.json');
  },
};
