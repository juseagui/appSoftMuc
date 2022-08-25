<template>
  <v-app>
    <!-- Navbar component navigation between objects and modules -->
    <Navbar />
    <v-container>
         <!-- Toolbar component for object display header -->
      <ToolbarGeneral 
          :titleObject="titleObject" 
          :codeTitle="codeTitle" 
          :source="source" 
          :headersDetail="headersDetail"
          @listenerToolbar="toggleModal"  />  

      <TableDetail :dataField="propsGroup"  />

      <!-- Modal component for creating and editing records -->
      <FormGeneral :openModal="visibilityModal" :operationModel="operationModel" :idObject="actualObjectForm" :source="source" :isRelationship="isSaveRelationship"
        @listenerModal="toggleModal" />

      <!-- Modal component for object relationship management -->
      <TabsRelationship  v-if="responseRelationshipTabs.length > 0"
      :dataTable="dataTableRelationship" 
      :dataTabs="responseRelationshipTabs"
      @listenerActionPaginatorTabs="listenerChangePage"
      @listenerActionChangeTabs="listenerChangeTabs"
      @listenerActionTableTabs="listenerActionTable" />

      <TabsProcess v-if="existProcess" :activities="activities" :historical="historical" :title="titleTabsProcess" ></TabsProcess>

    </v-container>
</v-app>
</template>

<script>
import Navbar from "@/components/General/Navbar";
import ToolbarGeneral from "@/components/General/ToolbarGeneral";
import FormGeneral from "@/components/General/FormGeneral";
import TableDetail from "@/components/General/TableDetail";
import TabsRelationship from "@/components/Object/TabsRelationship";
import TabsProcess from "@/components/Process/TabsProcess";

import i18n from '../../i18n';

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'
import {processData} from '@/mixins/processData.js'

export default {
  name:"detailGeneral",
  data() {
      return {
          titleObject : "",
          codeTitle : "",
          source : "detailGeneral",
          //Data object field -> value
          dataDetail : [],
          propsGroup : [],

          //parameters for the modal of edition and creation of objects
          visibilityModal: false,
          operationModel : { action: "", pk: "" },
          actualObjectForm : this.$route.params.idObject,
          headersDetail: [
            { text: "Fecha de Creación", value: "", ico : "event_available", chip : false},
            {text: "Fecha de Modificación", value: "", ico : "restore", chip : false},
            {text: "creador", value: "", ico : "person", chip : true}
          ],
          isSaveRelationship : false,

          //tabs relationship the objects
          responseRelationshipTabs : [],

          //data for tables of relationship
          dataTableRelationship : {
            idObjectRelationship : 0,
            headersTableRelationship: [],
            headersDefaultRelationship: [{ text: "Actions", value: "action", sortable: false }],
            actionsTableRelationship: [{ icon: "visibility", value: "detailItem"},
                                    { icon: "edit", value: "editItem"},
                                    { icon: "delete", value: "deleteItem"},],
            dataTable : [],
            dataTableCount : 0,
            dataPaginator : { pageCount: 0 , pageIni: 1 },
            itemsPerPage: 8
          },

          //data TabsProcess
          activities : [],
          historical : [],
          titleTabsProcess : "",
          existProcess : false,

      }
  }, 
  async mounted() {
      //get item detail for object
      await this.getDetailItem();
      //Structure data for the TableDetail component
      this.propsGroup = this.structureDataField(this.dataDetail);
      //Get related objects of detail
      await this.createTableRelationship();
  },
   components: {
    ToolbarGeneral,
    FormGeneral,
    Navbar,
    TableDetail,
    TabsRelationship,
    TabsProcess
  },
  methods: {

    /*---------------------------------------------------
    Name: getDetailItem
    Description: get item detail of item general object
    Alters component: TableDetail
    ---------------------------------------------------*/
    async getDetailItem(){

        let dataPropListValues = await this.getpropertyFieldValuesObject( this.$route.params.idObject, this.$route.params.idDetail );
        
        if(dataPropListValues.code == 'OK'){
          this.dataDetail = dataPropListValues.data.data;
          this.titleObject = this.dataDetail[0]['representation'];
          this.codeTitle = this.$route.params.idDetail;

          //set values for component ToolbarGeneral
          this.headersDetail[0].value = dataPropListValues.data['created_date'];
          this.headersDetail[1].value = dataPropListValues.data['modified_date'];
          this.headersDetail[2].value = "sergio Aguilera";

          //validate if object exist process 
          if( dataPropListValues.data.process.activities.length > 0 ){
            this.existProcess = true;
            this.titleTabsProcess = i18n.t('detailGeneral.titleTabsProcess');
            this.activities = dataPropListValues.data.process.activities;
            this.historical = dataPropListValues.data.process.historical;
          }

        }
    },

    /*---------------------------------------------------
    Name: createTableRelationship
    Description: Create the tabs and tables for the functioning of the relationships
    Alters component: 
    ---------------------------------------------------*/
    async createTableRelationship (){
      
      //Get related objects of detail
      await this.getRelationshipObjectItem();
      //Validate if there is a relationship to request data
      if(this.responseRelationshipTabs.length > 0){
        await this.getDataObjectRelationship( this.responseRelationshipTabs[0].object_child );
      }

    },

    /*---------------------------------------------------
    Name: getRelationshipObjectItem
    Description: Get related objects
    Alters component: 
    ---------------------------------------------------*/
    async getRelationshipObjectItem (){
      
      //get list of object relationship visibles witch parent object
      let dataListReleationship = await this.getRelationshipObjects( this.$route.params.idObject,'1');

      if(dataListReleationship.code == 'OK'){
        this.responseRelationshipTabs = dataListReleationship.data.data;
      }

    },

    /*---------------------------------------------------
      Name: getRelationshipObjectItem
      Description: Gets the data information of the child object
      Alters component: TableGeneral
      ---------------------------------------------------*/
      async getDataObjectRelationship ( objChild ){

        //Get Data API of object
        let dataValueList = await this.getDataObjectList( 
          objChild, 
          0, 
          this.dataTableRelationship.itemsPerPage, 
          {
            parentRelationship : this.$route.params.idObject,
            pkParentRelationship : this.$route.params.idDetail
          }
        );

        if(dataValueList.code == 'OK'){
        
          this.dataTableRelationship.dataTable = dataValueList.data.data;
          this.dataTableRelationship.dataTableCount = dataValueList.data.count;
          this.dataTableRelationship.dataPaginator.pageCount = this.generateCounPaginator( this.dataTableRelationship.dataTableCount, this.dataTableRelationship.itemsPerPage );
          this.dataTableRelationship.dataPaginator.pageIni = 1;

          //Get field for list
          let dataPropertyList = await this.getpropertyFieldObject( objChild, 'visible' );

          if(dataPropertyList.code == 'OK'){

            var arrTempHeader = [];
            var jsonDataHeader = {};

            dataPropertyList.data.data.forEach((element) => {
              jsonDataHeader = {
                text: element.description,
                value: element.name,
              };
              arrTempHeader.push(jsonDataHeader);
            });

            this.dataTableRelationship.headersTableRelationship = arrTempHeader.concat( this.dataTableRelationship.headersDefaultRelationship );
            this.dataTableRelationship.idObjectRelationship = objChild;
          }
        }
      },

    /*---------------------------------------------------
    Name: toggleModal
    Description: Activate Modal the creation new item
    Alters component: ToolbarGeneral
    ---------------------------------------------------*/
    async toggleModal(action = "",pk="", save = false,  idObject = null, relationship = false) {
      
      //Defined parms for model
      if( idObject == null )
          this.actualObjectForm = this.$route.params.idDetail;
      else
          this.actualObjectForm = idObject;

      this.isSaveRelationship =  relationship;
      this.operationModel.action = action;
      this.operationModel.pk = pk;
      this.visibilityModal = !this.visibilityModal;

      if(save){
        if(!relationship){
          await this.getDetailItem();
          this.propsGroup = this.structureDataField(this.dataDetail);
        }else{
          await this.listenerChangePage( this.dataTableRelationship.dataPaginator.pageIni );
        }
      }  
    },

    /*---------------------------------------------------
    Name: listenerChangePage
    Description: Listen and update the information according to the pager
    Alters component: TabsRelationship
    ---------------------------------------------------*/
    async listenerChangePage( page ){
      let resultCountPage = this.calculateCountPage( page, this.dataTableRelationship.itemsPerPage );

      let dataValueList = await this.getDataObjectList( 
        this.dataTableRelationship.idObjectRelationship, 
        resultCountPage.ini, 
        resultCountPage.limit,
        {
          parentRelationship : this.$route.params.idObject,
          pkParentRelationship : this.$route.params.idDetail
        } 
      );

      if(dataValueList.code == 'OK'){
        this.dataTableRelationship.dataPaginator.pageIni = page
        this.dataTableRelationship.dataTable = dataValueList.data.data;
        this.dataTableRelationship.dataPaginator.pageCount  = this.generateCounPaginator( this.dataTableRelationship.dataTableCount, this.dataTableRelationship.itemsPerPage );
      }
    },

    /*---------------------------------------------------
    Name: listenerChangeTabs
    Description: listen to the change of tabs and brings the corresponding information
    Alters component: TabsRelationship
    ---------------------------------------------------*/
    async listenerChangeTabs( objeIdChild ){
      //Update data in table of relationship
      await this.getDataObjectRelationship( objeIdChild );
    },

    /*---------------------------------------------------
    Name: listenerActionTable
    Description:  Listen when pressing a button on the table to execute an action
    Alters component: TabsRelationship
    ---------------------------------------------------*/
    async listenerActionTable( sendFunction, item ){
      switch (sendFunction) {
        case 'detailItem':
          this.$router.push('/general/'+this.dataTableRelationship.idObjectRelationship+'/detail/'+item.pk);
          break;
        case 'editItem':
          this.toggleModal('edit',item.pk, false, this.dataTableRelationship.idObjectRelationship, true );
          break;
         case 'addItem':
          this.toggleModal('add',null, false, this.dataTableRelationship.idObjectRelationship, true );
          break;
      }
    },

  },
  mixins: [apiMixins, processData]
  
}
</script>
