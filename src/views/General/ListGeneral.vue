<template>
  <v-app>
    <!-- Componente Navbar nagacion entre objectos y modulos -->
    <Navbar />
    <v-container>

      <!-- Componente Toolbar para header de visualizacion de objectos -->
      <ToolbarGeneral :titleObject="titleObject" :source="source" :headersDetail="headersDetail"
       @listenerToolbar="toggleModal" 
       class = "mb-4"/>

     <!-- Component that lists the data -->
      <TableGeneral :headers="dataTableObject.headersTableRelationship" :data="dataTableObject.dataTable" :dataPaginator="dataTableObject.dataPaginator" :sourceParent="source"
                    :actions="dataTableObject.actionsTableRelationship" :itemsPerPage="dataTableObject.itemsPerPage" @listenerActionTable="listenerActionTable" />

      <!-- Component manages the pager -->
      <PaginatorGeneral :dataPaginator="dataTableObject.dataPaginator" @listenerActionPaginator="listenerActionPaginator" />

      <!-- Modal component for creating and editing records -->
      <FormGeneral :openModal="visibilityModal"  :operationModel="operationModel" :idObject="actualObjectForm"
      @listenerModal="toggleModal"/>
    </v-container>
  </v-app>
</template>


<script>
import Navbar from "@/components/General/Navbar";
import FormGeneral from "@/components/General/FormGeneral";
import ToolbarGeneral from "@/components/General/ToolbarGeneral";
import TableGeneral from "@/components/General/TableGeneral";
import PaginatorGeneral from "@/components/General/PaginatorGeneral";

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'
import {processData} from '@/mixins/processData.js'

export default {
  name: "LisGeneral",
  data() {
    return {
      
      source : "ListGeneral",
      
      //parameters for the modal of edition and creation of objects
      visibilityModal: false,
      operationModel : { action: "", pk: "" },
      actualObjectForm : this.$route.params.idObject,

      //params for Toolbar
      headersDetail: [
          { text: "Cant. registros", value: "", ico : "equalizer"}],
      titleObject: "",

      //data for tables
      dataTableObject : {
        idObject : 0,
        headersTableRelationship: [],
        headersDefaultRelationship: [{ text: "Actions", value: "action", sortable: false }],
        actionsTableRelationship: [{ icon: "visibility", value: "detailItem"},
                                { icon: "edit", value: "editItem"},
                                { icon: "delete", value: "deleteItem"},],
        dataTable : [],
        dataTableCount : 0,
        dataPaginator : { pageCount: 0 , pageIni: 1 },
        itemsPerPage: 15
      },
    }
  },
  async mounted() {
    //get item detail for object
    await this.getListItemObject();
  },
  components: {
    Navbar,
    FormGeneral,
    ToolbarGeneral,
    TableGeneral,
    PaginatorGeneral
  },
  methods: {
    /*---------------------------------------------------
    Name: getListItemObject
    Description: Render the list of data returned by the API
    Alters component: TableGeneral
    ---------------------------------------------------*/
    async getListItemObject(){

      let dataValueList = await this.getDataObjectList(this.$route.params.idObject, 0,this.dataTableObject.itemsPerPage );

      if(dataValueList.code == 'OK'){
        this.dataTableObject.dataTable = dataValueList.data.data;
        this.dataTableObject.dataTableCount = dataValueList.data.count;
        let nextCountRegis = dataValueList.data.data.length;
        this.headersDetail[0].value = " 1-"+ nextCountRegis + " of " + this.dataTableObject.dataTableCount;
        this.dataTableObject.dataPaginator.pageCount = this.generateCounPaginator( this.dataTableObject.dataTableCount, this.dataTableObject.itemsPerPage );
        
        //Get field for list
        let dataPropertyList = await this.getpropertyFieldObject(this.$route.params.idObject, 'visible' );

        if(dataPropertyList.code == 'OK'){
          this.titleObject = dataPropertyList.data.data[0].object_field.name;
          var arrTempHeader = [];
          var jsonDataHeader = {};

          dataPropertyList.data.data.forEach((element) => {
            jsonDataHeader = {
              text: element.description,
              value: element.name,
            };
            arrTempHeader.push(jsonDataHeader);
          });

          this.dataTableObject.headersTableRelationship = arrTempHeader.concat(this.dataTableObject.headersDefaultRelationship);

        }
      }
    },

    /*---------------------------------------------------
    Name: listenerActionTable
    Description: Listen when pressing a button on the table to execute an action
    Alters component: TableGeneral
    ---------------------------------------------------*/
    listenerActionTable( sendFunction, item ){
      
      switch (sendFunction) {
        case 'detailItem':
          this.$router.push('/general/'+this.$route.params.idObject+'/detail/'+item.pk);
          break;
        case 'editItem':
          this.toggleModal('edit',item.pk );
          break;
      }

    },

    /*---------------------------------------------------
    Name: listenerActionPaginator
    Description: Listen when pressing a button on the table to execute an action
    Alters component: TableGeneral
    ---------------------------------------------------*/
    async listenerActionPaginator( page ){
      let resultCountPage = this.calculateCountPage( page, this.dataTableObject.itemsPerPage );

      let dataValueList = await this.getDataObjectList( this.$route.params.idObject, resultCountPage.ini, resultCountPage.limit );

      if(dataValueList.code == 'OK'){
        this.dataTableObject.dataPaginator.pageIni = page
        this.dataTableObject.dataTable = dataValueList.data.data;
        this.dataTableObject.dataPaginator.pageCount  = this.generateCounPaginator( this.dataTableObject.dataTableCount, this.dataTableObject.itemsPerPage );
      }
    },

    /*---------------------------------------------------
    Name: toggleModal
    Description: Activate Modal the creation new item
    Alters component: ToolbarObject
    ---------------------------------------------------*/
    toggleModal(action = "",pk="", save = false) {
      //Defined parms for model
      this.operationModel.action = action;
      this.operationModel.pk = pk;
      this.visibilityModal = !this.visibilityModal;

      if(save)
        this.listenerActionPaginator( this.dataTableObject.dataPaginator.pageIni );
    },

  },
  mixins: [apiMixins,processData]
};
</script>


<style scoped>
.my-header-style {
  background-color: var(--v-headerTable-base);
}

</style>