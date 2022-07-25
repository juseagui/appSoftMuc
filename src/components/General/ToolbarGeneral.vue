<template>
    <v-toolbar flat class="toolbar-margin-person">
        
        <v-toolbar-title>
          <b>{{ titleObject }}</b>
          <v-row dense v-show="source == 'detailGeneral' || source == 'detailObject'" >
            <v-col style = "    font-weight: 500; letter-spacing: 0.0125em !important; font-size: 0.83em;" >
              <v-icon dense>hotel_class</v-icon>
              {{codeTitle}}
            </v-col>
          </v-row>
      
        </v-toolbar-title>
        
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>keyboard_return</v-icon>
        </v-btn>
        <v-btn icon v-show="source == 'ListGeneral'">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon @click="toggleModalViewEdit"
        v-show="source == 'detailGeneral' || source == 'detailObject'">
          <v-icon>edit_note</v-icon>
        </v-btn>
        <v-btn icon @click="toggleModalRelationship"
        v-show="source == 'detailObject'">
          <v-icon>view_quilt</v-icon>
        </v-btn>
 
        <v-spacer></v-spacer>


    
      <v-card
      class="mx-auto style-card-person"
      max-width="164"
      max-height = "84"
      elevation="0"
      flat   
      rounded= false
      :key="index"
      v-for="(item, index) in headersDetail"
      >
        <v-list-item  three-line>
          <v-list-item-content>
          <div class="text-overline-person">
            {{item.text}}
          </div>
            <v-list-item-title class=" mb-1">
              <v-icon dense>{{item.ico}}</v-icon>
            <b>{{item.value}}</b>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-card>

        <v-btn color="primary" dark class="mb-2" @click="toggleModalViewAdd" v-show="source == 'ListGeneral'">
          {{ $t("viewGeneral.btnAdd") }}
        </v-btn>

      </v-toolbar>
</template>

<script>


export default {
 name: "toolbarGeneral",
 props: ['titleObject','codeTitle','source','headersDetail'],
 data() {
   return {
     param : ""
   }
 },
 methods: {
    toggleModalViewAdd() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit('listenerToolbar', 'add', null, false); 
    },
    toggleModalViewEdit() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit('listenerToolbar', 'edit', this.codeTitle, false, this.$route.params.idObject); 
    },
    toggleModalRelationship() {      
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit( 'listenerToolbarRelationship' ); 
    }
 }
}
</script>


<style scoped>
    .toolbar-margin-person {
    margin-top: 6px;
    margin-bottom: 10px;
    }

    .text-overline-person {
      font-size: 0.75rem !important;
      font-weight: 500;
      font-family: "Roboto", sans-serif !important;
      text-transform: uppercase !important;
    }

    .style-card-person:after{
        content: "";
      background: rgba(0, 0, 0, 0.12);
      position: absolute;
      bottom: 0;
      left: 10;
      top: 0.6cm;
      height: 50%;
      width: 1px;
    }

</style>