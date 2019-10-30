<template>
  <v-app>
    <v-snackbar
        top right
        :timeout="6000"
        :color="snackbar.color"
        :multi-line="snackbar.mode === 'multi-line'"
        :vertical="snackbar.mode === 'vertical'"
        v-model="snackbar.show"
      >
      {{ snackbar.text }}
      <v-btn dark text @click.native="snackbar.show = false">Close</v-btn>
    </v-snackbar>

    <v-app-bar app color="#1f2640" dark>
      <v-container>
        <v-layout row wrap pt-2>
          <v-toolbar-title class="headline text-uppercase">
            <img src="https://cdn-www.bluestacks.com/bs-images/new-logo-white.png" height="50" alt="">
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            :disabled="loading"
            v-show="$route.name === 'home'"
            icon
            text
            @click="fetchApps"
          >
            <v-icon>fas fa-sync</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  components: {},
  data: () => ({
    //
    loading: false,
  }),
  computed: {
    ...mapState({
      snackbar: state => state.snackbar,
    }),
  },
  methods: {
    fetchApps() {
      this.loading = true;
      this.$axios.get(`${process.env.VUE_APP_API_URL}fetch-new-apps`).then((response) => {
        this.loading = false;
        if (response.data) {
          this.$store.dispatch('updateTopApps', response.data.apps);
          this.$store.dispatch('updateSnackbar', {
            color: 'info',
            show: true,
            text: 'New apps synced',
          });
        }
      }, () => {
        this.loading = false;
      });
    },
  },
};
</script>
