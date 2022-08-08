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
            <FormProcess :openModal="visibilityModal"  @listenerModal="toggleModal" />

        </v-container>
    </v-app>
</template>

<script>

import Navbar from "@/components/General/Navbar";
import ToolbarObject from "@/components/Object/ToolbarObject";
import TableGeneral from "@/components/General/TableGeneral";
import PaginatorGeneral from "@/components/General/PaginatorGeneral";
import FormProcess from "@/components/Process/FormProcess";

//import mixins
import {apiMixins} from '@/mixins/apiMixins.js'
import {processData} from '@/mixins/processData.js'

export default {
    name: "ListProcess",
    data(){
        return {
            
            source : "ListProcess",

            //parameters for the modal of edition and creation of objects
            visibilityModal: false,
            operationModel : { action: "", pk: "" },

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
                itemsPerPage: 3
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
        FormProcess
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
        toggleModal(action = "",pk="", save = false) {
            console.log("🚀 ~ file: ListProcess.vue ~ line 109 ~ toggleModal ~ action", action)
            this.visibilityModal = !this.visibilityModal;
        },

        /*---------------------------------------------------
        Name: listenerActionTable
        Description: Listen when pressing a button on the table to execute an action
        Alters component: TableGeneral
        ---------------------------------------------------*/
        listenerActionTable( sendFunction, item ){
            console.log("🚀 ~ file: ListProcess.vue ~ line 126 ~ listenerActionTable ~ sendFunction", sendFunction)
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
    },
    mixins: [apiMixins, processData]
}
</script>

<style>

</style>