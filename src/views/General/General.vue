<template>
  <v-app>
    <!-- Componente Navbar nagacion entre objectos y modulos -->
    <Navbar />
    <v-container>

      <!-- Componente Toolbar para header de visualizacion de objectos -->
      <ToolbarGeneral :titleObject="titleObject" @listenerToolbar="toggleModal" 
      :source="source" :headersDetail="headersDetail" class = "mb-4"/>

      <v-data-table
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
              <th v-for="h in headers" :key="h.value">
                <span>{{ h.text }}</span>
              </th>
            </tr>
          </thead>
        </template>

        <template v-slot:item.action="{ item }">
          <v-row no-gutters>
            <v-col lg="3">
              <v-icon small @click="detailItem(item)"> visibility </v-icon>
            </v-col>
            <v-col lg="3">
              <v-icon small @click="editItem(item)"> edit </v-icon>
            </v-col>
            <v-col lg="3">
              <v-icon small @click="deleteItem(item)"> delete </v-icon>
            </v-col>
          </v-row>
        </template>
      </v-data-table>
      
      <div class = "mt-1">
        <v-card class="d-flex justify-space-between mb-6" style = " box-shadow: none;"  >
          <span class="pa-1"  >
      
          </span>
          <span class="pa-1"  >
            <v-pagination
              v-model="page"
              :length="pageCount"
              @input="next"
            ></v-pagination>
          </span>
        </v-card>
      </div>

      <!-- Componente modal para creación y edicion de registros -->
      <FormGeneral :openModal="visibilityModal" @listenerModal="toggleModal" :operationModel="operationModel" />
    </v-container>
  </v-app>
</template>


<script>
import Navbar from "@/components/General/Navbar";
import FormGeneral from "@/components/General/FormGeneral";
import ToolbarGeneral from "@/components/General/ToolbarGeneral";

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'

export default {
  name: "general",
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 15,
      headers: [{ text: "Actions", value: "action", sortable: false }],
      dataCount: 0,
      dataList: [],
      titleObject: "",
      source : "general",
      //params for modal
      visibilityModal: false,
      operationModel : { action: "", pk: "" },

      //params for Toolbar
      headersDetail: [
          { text: "Cant. registros", value: "", ico : "equalizer"}]

    };
  },
  async mounted() {

    let dataValueList = await this.getDataObjectList(this.$route.params.idObject, 0,this.itemsPerPage );

    if(dataValueList.code == 'OK'){
      debugger
      this.dataList = dataValueList.data.data;
      this.dataCount = dataValueList.data.count;
      let nextCountRegis = dataValueList.data.data.length;
      this.headersDetail[0].value = " 1-"+ nextCountRegis + " of " + this.dataCount;
      this.generateCounPag();
      
      //Get field for list
      let dataPropertyList = await this.getpropertyFieldObject(this.$route.params.idObject, 'visible' );
      
      if(dataPropertyList.code == 'OK'){
        this.titleObject = dataPropertyList.data[0].object_field.name;

        var arrTempHeader = [];
        var jsonDataHeader = {};

        dataPropertyList.data.forEach((element) => {
          jsonDataHeader = {
            text: element.description,
            value: element.name,
          };
          arrTempHeader.push(jsonDataHeader);
        });

        this.headers = arrTempHeader.concat(this.headers);

      }
    }

  },
  components: {
    Navbar,
    FormGeneral,
    ToolbarGeneral
  },
  methods: {
    //Event listener data-table CRUD
    editItem(item) {
      this.toggleModal('edit',item.pk );
    },

    deleteItem(item) {
      console.log(item, "eliminar");
    },

    detailItem(item) {
      this.$router.push('/general/'+this.$route.params.idObject+'/detail/'+item.pk);
    },

    //Activate Modal the creation new item
    toggleModal(action = "",pk="") {
    
      //Defined parms for model
      this.operationModel.action = action;
      this.operationModel.pk = pk;
      this.visibilityModal = !this.visibilityModal;
    },

    //Event listener pagination
    async next(page) {
    
      let ini = 0;
      let limit = 0;

      if (page == 1 || page == 0) {
        limit = this.itemsPerPage;
      } else {
        ini = this.itemsPerPage * (page - 1);
        limit = this.itemsPerPage * page;
      }

      let dataValueList = await this.getDataObjectList(this.$route.params.idObject, ini,limit );
      debugger
      if(dataValueList.code == 'OK'){
        this.dataList = dataValueList.data.data;
        this.dataCount = dataValueList.data.count;
        let nextCountRegis = ini+dataValueList.data.data.length;
        this.headersDetail[0].value = ini+1 +"-"+ nextCountRegis + " of " + this.dataCount;
        this.generateCounPag();
      }

    },

    generateCounPag() {
      let intCount = Math.round(this.dataCount / this.itemsPerPage);
      this.pageCount = intCount <= 0 ? 1 : intCount;
      

    }

  },
  mixins: [apiMixins]
};
</script>


<style scoped>
.my-header-style {
  background-color: var(--v-headerTable-base);
}

</style>