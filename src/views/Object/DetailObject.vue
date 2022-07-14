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
          @listenerToolbar="toggleModal"
          @listenerToolbarRelationship="toggleModalRelationship"  />  

      <TableDetail :dataField="propsGroup"  />

      <!-- Modal component for creating and editing records -->
      <FormGeneral :openModal="visibilityModal" :operationModel="operationModel" :idObject="actualObjectForm"
        @listenerModal="toggleModal" />

      <!-- Modal component for object relationship management -->
      <FormRelationship :openModal="visibilityModalRelationship" :data="responseRelationship" 
      :headers="headersRelationship" :titleObject="titleObjectRelationship"
      @listenerToolbarRelationship="toggleModalRelationship"
      @listenerSaveRelationship="saveModalRelationship"    />

      <!-- Modal component for object relationship management -->
      <TabsRelationship  v-if="responseRelationshipTabs.length > 0"
      :dataTable="dataTableRelationship" 
      :dataTabs="responseRelationshipTabs"
      @listenerActionPaginatorTabs="listenerChangePage"
      @listenerActionChangeTabs="listenerChangeTabs"
      @listenerActionTableTabs="listenerActionTable" />

    </v-container>
</v-app>
</template>

<script>

  import Navbar from "@/components/General/Navbar";
  import ToolbarGeneral from "@/components/General/ToolbarGeneral";
  import FormGeneral from "@/components/General/FormGeneral";
  import FormRelationship from "@/components/Object/FormRelationship";
  import TableDetail from "@/components/General/TableDetail";
  import TabsRelationship from "@/components/Object/TabsRelationship";

  //import mixins
  import {apiMixins} from '@/mixins/apiMixins.js'
  import {processData} from '@/mixins/processData.js'

  export default {
    name:"detailObject",
    data() {
        return {
            titleObject : "",
            codeTitle : "",
            source : "detailObject",
            
            
            //Data object field -> value
            dataDetail : [],
            propsGroup : [],

            //parameters for the modal of edition and creation of objects
            actualObjectForm : null,
            visibilityModal: false,
            operationModel : { action: "", pk: "" },
            headersDetail: [
              { text: "Fecha de Creación", value: "", ico : "event_available"},
              {text: "Fecha de Modificación", value: "", ico : "restore"},
              {text: "creador", value: "", ico : "person"}
            ],

            //parameters for object relationship management
            visibilityModalRelationship : false,
            responseRelationship : [],
            headersRelationship : [
              {text: "Descripción", value: "" },
              {text: "Modulo padre", value: "" },
              {text: "Modulo Hijo", value: "" },
              {text: "Habilitar", value: "" },
            ],
            titleObjectRelationship : { title : "Relationship" , icon : "lens_blur" },

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
            
        }
    }, 
    async mounted() {
        this.actualObjectForm = this.$route.params.idDetail;
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
      FormRelationship,
      TabsRelationship
    },
    methods: {

      /*---------------------------------------------------
      Name: getDetailItem
      Description: get item detail of object
      Alters component: TableDetail
      ---------------------------------------------------*/
      async getDetailItem(){

          //Obtener lista de campos y sus valores
          let dataPropListValues = await this.getpropertyFieldValuesObject( this.$route.params.idObject, this.$route.params.idDetail );

          if(dataPropListValues.code == 'OK'){
            this.dataDetail = dataPropListValues.data.data;
            this.titleObject = this.dataDetail[0]['representation'];
            this.codeTitle = this.$route.params.idDetail;

            //set d evalores del componente ToolbarGeneral
            this.headersDetail[0].value = dataPropListValues.data['created_date'];
            this.headersDetail[1].value = dataPropListValues.data['modified_date'];
            this.headersDetail[2].value = "sergio Aguilera";

          }
      },

      /*---------------------------------------------------
      Name: getRelationshipObjectItem
      Description: Get related objects
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
      Description: Activate Modal the creation new and edit item for component FormGeneral
      Alters component: FormGeneral
      ---------------------------------------------------*/
      async toggleModal(action = "",pk="", save = false, idObject = null ) {
        //Defined parms for model
        this.operationModel.action = action;
        this.operationModel.pk = pk;
        this.visibilityModal = !this.visibilityModal;

        if( idObject == null )
          this.actualObjectForm = this.$route.params.idDetail;
        else
          this.actualObjectForm = idObject;

        if(save){
          await this.getDetailItem();
          this.structureDataField(this.dataDetail);
        }
      },

      /*---------------------------------------------------
      Name: toggleModalRelationship
      Description: Activate Modal relationship the component FormRelationship
      Alters component: FormRelationship
      ---------------------------------------------------*/
      async toggleModalRelationship() {
        
        this.visibilityModalRelationship = !this.visibilityModalRelationship;

        //only query data if the modal is opened
        if(this.visibilityModalRelationship){
          //Get data relationship objects
          let dataListReleationship = await this.getRelationshipObjects( this.$route.params.idDetail );

          if(dataListReleationship.code == 'OK'){
            //Open modal relationship
            this.responseRelationship = dataListReleationship.data.data;
          }
        }
  
      },
      
      /*---------------------------------------------------
      Name: saveModalRelationship
      Description: Save and submit object relationship form data, 
      Listen to the save button
      Alters component: FormRelationship
      ---------------------------------------------------*/
      async saveModalRelationship( data ) {

        var listSendRelations = [];

        data.forEach(element => {
          
          let descriptionRelation = "";
          if( element.description || element.description  == "" )
            descriptionRelation = element.object_parent_name+" - "+element.object_child_name

          //Create list of object for create or update in API 
          listSendRelations.push({
            description : descriptionRelation,
            object_parent : element.object_parent,
            object_child : element.object_child,
            visible : element.visible,
            id_relationship : element.id_relationship
          });
        });

        //Send data for API - POST Create or Update Relationship the object
        let responsePostRelationship = await this.postRelationshipObjects( listSendRelations );

        if( responsePostRelationship.code == 'OK' ){
          this.visibilityModalRelationship = !this.visibilityModalRelationship;
          await this.createTableRelationship();
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
            this.toggleModal('edit',item.pk, false, this.dataTableRelationship.idObjectRelationship );
            break;
        }
      },

    },

    //instance mixins
    mixins: [apiMixins, processData]
    
  }

</script>
