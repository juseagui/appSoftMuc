<template>
  <v-app>
     <v-main>
      <router-view :key="$route.fullPath" />
    <v-main>
      <v-dialog
            v-model="loading.estado"
            hide-overlay
            persistent
            width="300"
          >
            <v-card
              color="primary"
              dark
            >
              <v-card-text>
                {{loading.titulo}}
                <v-progress-linear
                  indeterminate
                  color="white"
                  class="mb-0"
                ></v-progress-linear>
              </v-card-text>
            </v-card>
          </v-dialog>
</v-main>
   </v-main>
  </v-app>
</template>

<script>

import {mapState} from "vuex"

export default {
  name: 'App',
  component: {
  },
  data: () => ({
    //
  }),
   computed:{
    ...mapState(['loading'])
  }
};
</script>
