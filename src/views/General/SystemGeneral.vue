<template>
  <v-app>
    <!-- Componente Navbar navegacion entre objectos y modulos -->
    <Navbar />
    <v-container>
        <ToolbarSystem/>
    
        <v-sheet 
          class="mt-3 mx-auto"
          elevation="0"
          max-width="100%"
        >
          <v-slide-group 
            mobile-breakpoint="1000" 
            show-arrows 
            center-active
            align="center"
          >
        
          <template v-slot:next>
            <v-icon large>keyboard_double_arrow_right</v-icon>
          </template>
          <template v-slot:prev>
            <v-icon  large>keyboard_double_arrow_left</v-icon>
          </template>
          
          <v-slide-item 
          v-for="category in categorys" 
          :key="category.id"
          >
            <CardGroupObjects 
              :Id="category.id"
              :Title="category.name"
              :Description="category.description"  
              :Icon="category.icon"
              :Objects="category.category_object"  
              @listenerCardGroupObjects="toggleCard"
            />
          </v-slide-item>
          </v-slide-group>
        </v-sheet>


      <v-data-table
        v-show="showObjects"
        :headers="headers"
        :items="dataList"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        hide-default-header
        hide-default-footer
        class="elevation-1"
      >
        <template v-slot:header="{ props: { headers } }">
          <thead class="my-header-style">
            <tr>
              <th  v-for="h in headers" :key="h.value" >                
                <span>{{ h.text }}</span>
              </th>
            </tr>
          </thead>
        </template>

        <template v-slot:item.action="{ item }">
          <v-row no-gutters>
            <v-col lg="3">
              <v-icon dense @click="detailItem(item)" > visibility </v-icon>
            </v-col>
          </v-row>
        </template>

        <template v-slot:item.name="{ item }">
          <v-row no-gutters>
            <v-col lg="6">
              <v-icon > {{item.icon}} </v-icon>
              <span class="ml-3">{{ item.name }}</span>
            </v-col>
          </v-row>
        </template>

      </v-data-table>

      

    </v-container>
  </v-app>
</template>


<script>
    import Navbar from "@/components/General/Navbar";
    import CardGroupObjects from "@/components/General/CardGroupObjects";
    import ToolbarSystem from "@/components/General/ToolbarSystem";

    //import mixins
    import {apiMixins} from '@/mixins/apiMixins.js'

    export default {
      name: "SystemGeneral",
      data: () => ({
          source : "detailGeneral",
          categorys : [],
          model : null,
          objeRedirectId : ['general','process','object'],

          headers: [
            { text: "name", value: "name", sortable: false },
            { text: "description", value: "description", sortable: false },
            { text: "Actions", value: "action", sortable: false },
            ],
          
          dataList: [],
          page: 1,
          itemsPerPage: 10,

          showObjects : false,

      }),
      mounted(){
        debugger
        this.categorys = this.$store.state.objectsPermissions;
      },
      components: {
          Navbar,
          CardGroupObjects,
          ToolbarSystem
      },
      methods: {
        toggleCard(Id){
          let categoryListObj = this.categorys;
          this.dataList = categoryListObj.find( obj => obj.id == Id ).category_object;
          this.showObjects = true;
        },

        detailItem(item){
          let url = '';

          if(this.objeRedirectId.indexOf(item.view) > -1) 
            url += item.view+'/'+item.id;
          else
            url += item.view;
            
          this.$router.push(url);
        }
      }
    }

</script>


<style scoped>
.my-header-style {
  background-color: var(--v-headerTable-base) !important;
}

</style>
