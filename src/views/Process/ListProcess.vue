<template>
    <v-app>
        <!-- Navbar component navigation between objects and modules -->
        <Navbar />
        <v-container>
            <ToolbarObject :titleObject="titleObject" :descriptionObject="propertyObject.descriptionObject"
            :iconObject="propertyObject.icon" :headersDetail="headersDetail" @listenerToolbar="toggleModal"   />

             <!-- Component that lists the data -->
            <TableGeneral :headers="dataTableObject.headersTableRelationship" :data="dataTableObject.dataTable" :dataPaginator="dataTableObject.dataPaginator" :sourceParent="source"
                :actions="dataTableObject.actionsTableRelationship" :itemsPerPage="dataTableObject.itemsPerPage" @listenerActionTable="listenerActionTable" />

            <!-- Component manages the pager -->
            <PaginatorGeneral :dataPaginator="dataTableObject.dataPaginator" @listenerActionPaginator="listenerActionPaginator" />

            <!-- Create and update process flow -->
            <FormProcess v-if="visibilityModal" :openModal="visibilityModal" :operationModel="operationModel" :dataProcess="dataProcess"  
                @listenerModal="toggleModal" @listenerSaveProcess="saveModalProcess" @listenerUpsertActivity="UpsertActivity" />

            <FormActivity :openModal="visibilityModalActivity" :data="ActivityData" :action="actionModalActivity"
             @listenerModal="toggleModalActivity" @listenerSaveActivity="saveModalActivity" ></FormActivity>

        </v-container>
    </v-app>
</template>

<script>

import Navbar from "@/components/General/Navbar";
import ToolbarObject from "@/components/Object/ToolbarObject";
import TableGeneral from "@/components/General/TableGeneral";
import PaginatorGeneral from "@/components/General/PaginatorGeneral";
import FormProcess from "@/components/Process/FormProcess";
import FormActivity from "@/components/Process/FormActivity";

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'
import {processData} from '@/mixins/processData.js'

export default {
    name: "ListProcess",
    data(){
        return {
            
            source : "ListProcess",

            //parameters for the modal of edition and creation of process
            visibilityModal: false,
            operationModel : { action: "", pk: "" },
            dataProcess : {},

            //parameters for the modal of edition and creation of Activity
            visibilityModalActivity : false,
            actionModalActivity : null,
            ActivityData : {},

            //params for ToolbarObject
            propertyObject : { descriptionObject : "" , icon : "" },
            headersDetail: [
                { text: "Cant. registros", value: "", ico : "equalizer"}],
            titleObject: "",

            //data for tables of relationship
            dataTableObject : {
                idObject : 0,
                headersTableRelationship: [],
                headersDefaultRelationship: [{ text: "Actions", value: "action", sortable: false }],
                actionsTableRelationship: [{ icon: "visibility", value: "detailItem"}],
                dataTable : [],
                dataTableCount : 0,
                dataPaginator : { pageCount: 0 , pageIni: 1 },
                itemsPerPage: 10
            },

        };
    },
    async mounted() {
        //get item detail for object
        await this.getListItemProcess();
    },
    components: {
        Navbar,
        ToolbarObject,
        TableGeneral,
        PaginatorGeneral,
        FormProcess,
        FormActivity
    },
    methods : {

        /*---------------------------------------------------
        Name: getListItemProcess
        Description: Render the list of data returned by the API
        Alters component: TableGeneral
        ---------------------------------------------------*/
        async getListItemProcess(){

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
                    this.propertyObject.descriptionObject = dataPropertyList.data.data[0].object_field.description;
                    this.propertyObject.icon = dataPropertyList.data.data[0].object_field.icon;

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
        Name: toggleModal
        Description: Activate Modal the creation new item
        Alters component: ToolbarObject
        ---------------------------------------------------*/
        async toggleModal(action = "",pk="", save = false) {
            
            this.operationModel.action = action;

            if( action == 'edit' ){
                this.operationModel.pk = pk;
                await this.getProcessForm();
            }else{
                let processNew = {
                    description : "",
                    object_process: {
                        id: ""
                    },
                    processActivity : [],

                }
                this.dataProcess = processNew;
            }
                
            this.visibilityModal = !this.visibilityModal;
        },

        /*---------------------------------------------------
        Name: listenerActionTable
        Description: Listen when pressing a button on the table to execute an action
        Alters component: TableGeneral
        ---------------------------------------------------*/
        listenerActionTable( sendFunction, item ){
            switch (sendFunction) {
                case 'detailItem':
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
        Name: saveModalProcess
        Description: save process information
        Alters component: FormProcess
        ---------------------------------------------------*/
        async saveModalProcess( data ) {
            
            let responsePatchProcess = {};
            data.object_process = data.object_process.id;

            if( this.operationModel.action == 'edit' ){
                responsePatchProcess = await this.patchProcess( data.id  , data);
            }else{
                 responsePatchProcess = await this.postProcess( data );
            }
            

            if( responsePatchProcess.code == 'OK' ){
              this.visibilityModal = !this.visibilityModal;
              this.listenerActionPaginator( this.dataTableObject.dataPaginator.pageIni );
            }

        },

        /*---------------------------------------------------
        Name: getProcessForm
        Description:
        Alters component: FormProcess
        ---------------------------------------------------*/
        async getProcessForm(){
                
            let dataPropertyProcess = await this.getProcess( this.operationModel.pk );
            
            if(dataPropertyProcess.code == 'OK'){
                this.dataProcess = dataPropertyProcess.data.data;
            }
            
        },

         /*---------------------------------------------------
        Name: UpsertActivity
        Description: listen for an activity update and insert, open the modal
        Alters component: FormProcess
        ---------------------------------------------------*/
        async UpsertActivity( activity, action ){
           
            this.actionModalActivity = action;

            if( action == 'edit' )
                this.ActivityData = activity;
            else 
                this.ActivityData = {}
            
            this.visibilityModalActivity = !this.visibilityModalActivity;
                
        },


        /*---------------------------------------------------
        Name: toggleModalActivity
        Description: Activate Modal the creation and update new Activity
        Alters component: FormActivity
        ---------------------------------------------------*/
        async toggleModalActivity() {

            this.visibilityModalActivity = !this.visibilityModalActivity;
        },

        /*---------------------------------------------------
        Name: saveModalActivity
        Description: save Activity information
        Alters component: FormProcess
        ---------------------------------------------------*/
        async saveModalActivity( data,  action ) {
            
            if(action == 'add'){
                data.sort = this.dataProcess.processActivity.length + 1;
                data.state = true;
                data.process_activity = this.dataProcess.id;
                this.dataProcess.processActivity.push( data );
            }

            this.visibilityModalActivity = !this.visibilityModalActivity;

        },

    },
    mixins: [apiMixins, processData]
}
</script>

<style>

</style>