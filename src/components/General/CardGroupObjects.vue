<template>
    
    <v-hover
        v-slot="{ hover }"
    >
        <v-card 
        min-width="250"
        max-width="250"
        min-height="150"
        max-height="250"
        outlined
        class="ma-4"
        color="#F9FAFC"
        align="center"  
        :elevation="hover ? 10 : 2"
        @click="detailItem(Id)"
        >


     <v-list-item three-line>
      <v-list-item-content>
        <div class=" mb-3 font-weight-bold " style = "line-height : 1rem  ">
          {{Title}}
        </div>
      <v-card-text class="pa-1">
        <div>{{Description}}</div>
      </v-card-text>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="60"
      >
      <v-icon size="50" color="primary">
             {{Icon}}
            </v-icon>
      </v-list-item-avatar>
    </v-list-item>

        </v-card>
    </v-hover>
</template>


<script>

import axios from "axios";
import {mapMutations} from "vuex";
import i18n from '../../i18n';

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'

export default {
   props: ['Id','Title','Description','Objects','Icon'], 
   data: () => ({
       active : false

   }),
   methods: {

        detailItem(IdCategory){
            //Send parameters emit component father
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit('listenerCardGroupObjects', IdCategory );
        }
      }
}

</script>

