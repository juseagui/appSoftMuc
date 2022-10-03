<template>
    <v-toolbar flat class="toolbar-margin-person">
        
      <v-toolbar-title>
        <b>{{ $t("ToolbarSystem.titleToolbar") }}</b>
    
      </v-toolbar-title>
      
      <v-divider class="mx-5" inset vertical></v-divider>
      <v-btn icon @click="$router.go(-1)">
        <v-icon>keyboard_return</v-icon>
      </v-btn>
      <v-btn icon >
        <v-icon>search</v-icon>
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
      </v-toolbar>
</template>

<script>


export default {
 name: "toolbarSystem",
 data() {
   return {
     headersDetail : []
   }
 },
 methods: {
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