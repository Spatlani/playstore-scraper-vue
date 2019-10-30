<template>
  <div class="home">
    <v-container>
      <v-layout row wrap>
        <v-flex>
          <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
          <h2 class="text-center display-1 font-weight-bold">Top Charts</h2>
          <TopApps />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import TopApps from '@/components/TopApps';

export default {
  name: 'home',
  components: {
    TopApps,
  },
};
</script>
