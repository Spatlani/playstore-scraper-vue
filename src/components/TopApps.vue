<template>
  <v-container>
    <v-layout
      mx-3
      mt-4
      wrap
    >
      <v-flex xs12 v-for="(apps, category) in appList" :key="category" my-3>
        <v-layout row wrap>
          <v-flex xs10>
            <h2 class="text-truncate mb-3">{{category}}</h2>
          </v-flex>
          <v-flex xs2 class="text-right">
            <v-btn color="grey" text @click="viewAll(category)" v-if="limit[category] === 3">
              View All
            </v-btn>
            <v-btn color="grey" text @click="viewLess(category)" v-else>
              View Less
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex v-for="(a, ai) in apps" :key="ai" md4 pa-2 v-if="ai < limit[category]">
            <v-card :to="`/appdetails?pkg=${a.package}`">
              <v-list-item>
                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                >
                  <img :src="a.icon" alt="">
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{a.name}}</v-list-item-title>
                  <v-list-item-subtitle>{{a.developer_name}} </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-flex>

        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TopApps',
  data: () => ({
    appList: {},
    limit: {},
  }),
  computed: {
    ...mapState({
      appData: state => state.appData,
    }),
  },
  watch: {
    appData() {
      this.$lodash.each(this.appData, (v, k) => {
        this.limit[k] = 3;
      });
      this.appList = this.appData;
    },
  },
  methods: {
    getApps() {
      this.$axios.get(`${process.env.VUE_APP_API_URL}get-apps`).then((response) => {
        if (response.data) {
          this.appList = response.data.apps;
          this.$lodash.each(this.appList, (v, k) => {
            this.limit[k] = 3;
          });
        }
      });
    },
    viewAll(c) {
      const limit = JSON.parse(JSON.stringify(this.limit));
      limit[c] = this.appList[c].length;
      this.limit = limit;
    },
    viewLess(c) {
      const limit = JSON.parse(JSON.stringify(this.limit));
      limit[c] = 3;
      this.limit = limit;
    },
  },
  beforeMount() {
    this.getApps();
  },
};
</script>
