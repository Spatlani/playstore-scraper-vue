<template>
  <div class="about">
    <v-container v-if="!loading">
      <v-layout row wrap align-center>
        <v-flex xs12 mb-3>
          <v-btn color="blue" text icon @click="goBack">
            <v-icon>fas fa-arrow-left</v-icon>
          </v-btn>
        </v-flex>
        <v-flex md4>
          <img :src="details.icon" alt="">
        </v-flex>
        <v-flex md8>
          <h2>{{details.name}}</h2>
            <v-layout row wrap>
              <v-rating
                :value="details.rating"
                readonly
                background-color="yellow"
                v-model="details.rating"
              ></v-rating>
            </v-layout>
          <v-btn color="green" dark class="mt-4">Download for PC</v-btn>
        </v-flex>

      </v-layout>

      <v-layout row wrap my-5>
        <v-flex md12 my-5>
          <!-- Swiper -->
          <swiper :options="swiperOption">
            <swiper-slide
              v-for="(m, mi) in details.screenshots"
              :key="mi"
            >
              <img :src="m" alt="">
            </swiper-slide>
          </swiper>
        </v-flex>
        <v-flex md12>
          <p class="headline" v-html="details.description">
          </p>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container v-else style="height: 90vh">
      <v-layout row wrap fill-height align-center justify-center>
        <v-flex text-center>
          <v-progress-circular indeterminate color="info"></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>


<script>
import 'swiper/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

export default {
  components: {
    swiper,
    swiperSlide,
  },
  name: 'AppDetails',
  data: () => ({
    details: {},
    loading: false,
    swiperOption: {
      slidesPerView: 5,
      spaceBetween: 40,
      autoplay: {
        delay: 3000,
        disableOnInteraction: true,
      },
      breakpoints: {
        1800: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1264: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 'auto',
          spaceBetween: 20,
          centeredSlides: true,
        },
      },
    },
  }),
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getApp() {
      this.loading = true;
      this.$axios.get(`${process.env.VUE_APP_API_URL}get-app-by-pkg`, {
        params: {
          package: this.$route.query.pkg,
        },
      }).then((response) => {
        this.loading = false;
        if (response.data) {
          if (response.data.icon) {
            response.data.icon = response.data.icon.replace('=s128-rw', '=s256-rw');
          }
          response.data.rating = response.data.rating || 0;
          this.details = response.data;
        }
      }, () => {
        this.loading = false;
      });
    },
  },
  beforeMount() {
    if (this.$route.query && this.$route.query.pkg) {
      this.getApp();
    } else {
      this.$router.push('/');
    }
  },
};
</script>
