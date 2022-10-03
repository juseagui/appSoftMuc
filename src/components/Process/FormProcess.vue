<template>
    <v-row justify="center">
        <v-dialog
            v-model="openModal"
            persistent
            max-width="1200px"
        >

        <v-card>
            <v-form  v-model="valid" ref="form">

                <v-card-text style="padding : 15px;" >

                    <v-alert
                    border="left"
                    style=" margin-bottom: 0px; "
                    colored-border
                    :dense="true"
                    color="primary"
                    transition = "expand-x-transition"
                    elevation="0">
                        <span class="text-h6" > {{ $t("FormProcess.titleActivities") }} </span>
                    </v-alert>

                    <v-container>
                        <v-row>
                            <v-col  cols="12" sm="8" md="6" >
                                <v-text-field
                                    label="Descripción *"
                                    counter="50"
                                    name = "description"
                                    v-model="dataProcess.description"
                                    required>
                                </v-text-field>

                            </v-col>

                            <v-col  cols="12" sm="8" md="6" >

                                <v-select
                                label="Modulo donde aplica el proceso "
                                name = "idObject"
                                :readonly="true"
                                append-outer-icon="content_paste_search"
                                @click:append-outer="searchObjectRecord( dataProcess.object_process, 'idObject' )"
                                :items="[ dataProcess.object_process ? dataProcess.object_process : {} ]"
                                item-text="name"
                                item-value="id"
                                class="container-relational-select"
                                v-model="dataProcess.object_process.id"
                                return-object>
                            </v-select>


                            </v-col>
                        </v-row>

                    </v-container>
                
                </v-card-text>

                <v-card-text style="padding : 15px;" >

                    <v-alert
                    border="left"
                    style=" margin-bottom: 0px; "
                    colored-border
                    :dense="true"
                    color="primary"
                    transition = "expand-x-transition"
                    elevation="0">
                        <span class="text-h6" > {{ $t("FormProcess.titleActivities") }} </span>
                    </v-alert>

                    <template>
                        <v-row >
                            <v-col>
                                <v-list three-line class="list-drag">
                                    <drop-list :items="dataProcess.processActivity" @reorder="$event.apply(dataProcess.processActivity)"  mode="cut">
                                        <template v-slot:item="{item, reorder}">
                                            <drag :key="item.sort" :data="item" @cut="remove(dataProcess.processActivity, item)">
                                                <v-list-item style="background-color: white"
                                                            :style="reorder ? {borderLeft: '2px solid #1976D2', marginLeft:'-2px'} : {}">
                                                    <v-list-item-avatar>
                                                       <v-avatar color="secondary" size="41">
                                                            <span class="text-h6 number-order-avatar">{{item.sort}}</span>
                                                        </v-avatar>
                                                    </v-list-item-avatar>
                                                    <v-list-item-content>
                                                        <v-list-item-title v-html="item.description"/>
                                                        <v-list-item-subtitle v-html="item.code"/>
                                                        <v-list-item-subtitle v-html="
                                                            (stateActivity.find(element => element.code == item.process_state ) == undefined ) ? '' : stateActivity.find(element => element.code == item.process_state).description
                                                            "/>
                                                    </v-list-item-content>
                                                        <v-chip @click="upsertActivity( item, 'edit' )" color="headerTable" text-color="primary">
                                                            <v-icon  left>
                                                                edit
                                                            </v-icon>
                                                            {{ $t("FormProcess.btnEditActivity") }}
                                                        </v-chip>
                                                </v-list-item>
                                                <v-divider/>
                                            </drag>
                                        </template>
                                      
                                        <template v-slot:reordering-drag-image/>
                                        <template v-slot:feedback="{data}">
                                            <v-skeleton-loader
                                                type="list-item-avatar-three-line"
                                                :key="data.title"
                                                style="border-left: 2px solid #1976D2; margin-left: -2px;"
                                            />
                                        </template>
                                    </drop-list>

                                    <v-list-item @click="upsertActivity( null , 'add' )" style="background-color: white" >

                                        <v-list-item-avatar>
                                            <v-avatar color="success" size="41">
                                                <v-btn icon x-large>
                                                    <span class="text-h5 number-order-avatar">
                                                        <b>+</b>
                                                    </span>
                                                </v-btn>
                                            </v-avatar>
                                            
                                            
                                        </v-list-item-avatar>

                                        <v-list-item-content >
                                            <v-list-item-title> {{ $t("FormProcess.btnNewActivity") }} </v-list-item-title>
                                            <v-list-item-subtitle > {{ $t("FormProcess.subtitleBtnNewActivity") }} </v-list-item-subtitle>
                                        </v-list-item-content>
                                        
                                    </v-list-item>
                                </v-list>
                            </v-col>
                        </v-row>
                    </template>
                </v-card-text>

                <v-divider ></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="primary darken-1"
                        text
                        @click="close()"
                        > {{$t("FormGeneral.btnClose")}}
                    </v-btn>
                    <v-btn
                        color="primary darken-1"
                        :disabled ="disabledButtonSave"
                        text
                        @click="validate()"
                        > {{$t("FormGeneral.btnSave")}}
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>

         <FormSearchRecord :dataTableSearch="dataTableSearch" 
        :title="titleFormSearch" 
        :openModalSearch="openModalSearch"
        :codeInput = "codeInput"
        @listenerModalFormSearchRecord="listenerModalFormSearchRecord" 
        @listenerChangePageFormSearchRecord ="listenerChangePageFormSearchRecord"
        ></FormSearchRecord>

        </v-dialog>
    </v-row>
</template>


<script>
    
    import FormSearchRecord from "@/components/General/FormSearchRecord";
    import {Drag,Drop,DropList} from "vue-easy-dnd";
    import {mapMutations} from "vuex";

    //import mixins
    import {apiMixins} from '@/mixins/apiMixins.js';
    import {processData} from '@/mixins/processData.js';

    export default {
        
        props: ['openModal', 'operationModel','dataProcess'],
        data: () => ({
            valid : false,
            //Disabled button Save in form
            disabledButtonSave : false,

            //data for modal select item relation in object
            dataTableSearch : {
                idObject : 0,
                headersTable: [],
                dataTable : [],
                dataTableCount : 0,
                dataPaginator : { pageCount: 0 , pageIni: 1 },
                itemsPerPage: 10
            },
            openModalSearch : false,
            titleFormSearch : "",
            codeInput : "",

            stateActivity : [
                { code : 1, description : 'Iniciado' },
                { code : 2, description : 'En proceso' },
                { code : 3, description : 'Ganada' },
                { code : 4, description : 'Perdida' }
            ]

        }),

        components: {
            Drag,
            Drop,
            DropList,
            FormSearchRecord
        },

        watch: {
            dataProcess: {
                deep: true,
                handler(newVal, oldVal) {
                    //Update sort in array
                    newVal.processActivity.forEach(function(item, index) {
                        item.sort = index+1;
                    });
                }
            },
        },
            
        methods: {
            ...mapMutations(['mostrarLoading','ocultarLoading',]),

            /*---------------------------------------------------
            Name: searchObjectRecord
            Description:
            Alters component: FormSearchRecord
            ---------------------------------------------------*/
            async searchObjectRecord( item , codeInput ){
            
                let dataObject = await this.getDataObjectList( 1, 0, this.dataTableSearch.itemsPerPage );

                //reset object
                this.dataTableSearch = {
                    idObject : 0,
                    headersTable: [],
                    dataTable : [],
                    dataTableCount : 0,
                    dataPaginator : { pageCount: 0 , pageIni: 1 },
                    itemsPerPage: 10
                };

                if(dataObject.code == 'OK'){

                    this.dataTableSearch.dataTable = dataObject.data.data;
                    this.dataTableSearch.dataTableCount = dataObject.data.count;
                    this.dataTableSearch.idObject = 1;
                    this.dataTableSearch.dataPaginator.pageCount = this.generateCounPaginator( this.dataTableSearch.dataTableCount, this.dataTableSearch.itemsPerPage );

                    //Get field for list
                    let dataPropertyList = await this.getpropertyFieldObject( 1 , 'visible' );
                    
                    if(dataPropertyList.code == 'OK'){
                        this.titleFormSearch = dataPropertyList.data.data[0].object_field.name;
                        var arrTempHeader = [];
                        var jsonDataHeader = {};

                        dataPropertyList.data.data.forEach((element) => {
                            jsonDataHeader = {
                            text: element.description,
                            value: element.name,
                            };
                            arrTempHeader.push(jsonDataHeader);
                        });

                        this.dataTableSearch.headersTable = arrTempHeader.concat(this.dataTableSearch.headersTable);

                        this.codeInput = codeInput;
                        this.openModalSearch = true;
                    }
                }
            },

            /*---------------------------------------------------
            Name: listenerModalFormSearchRecord
            Description:
            Alters component: FormSearchRecord
            ---------------------------------------------------*/
            listenerModalFormSearchRecord( save = false, data, codeInput  ){
                
                if(save){
                    this.dataProcess.object_process.id = data.id;
                    this.dataProcess.object_process.model = data.model;
                    this.dataProcess.object_process.name = data.name;
                    this.dataProcess.object_process.description = null;
                    this.dataProcess.object_process.representation = null;
                }

                this.openModalSearch = false;
            },

            /*---------------------------------------------------
            Name: listenerChangePageFormSearchRecord
            Description:
            Alters component: FormSearchRecord
            ---------------------------------------------------*/
            async listenerChangePageFormSearchRecord( page ){

                let resultCountPage = this.calculateCountPage( page, this.dataTableSearch.itemsPerPage );
                let dataObject = await this.getDataObjectList( this.dataTableSearch.idObject, resultCountPage.ini, resultCountPage.limit );

                if( dataObject.code == 'OK' ){
                    this.dataTableSearch.dataPaginator.pageIni = page
                    this.dataTableSearch.dataTable = dataObject.data.data;
                    this.dataTableSearch.dataPaginator.pageCount  = this.generateCounPaginator( this.dataTableSearch.dataTableCount, this.dataTableSearch.itemsPerPage );
                }
            },

            /*---------------------------------------------------
            Name: close
            Description: Notify modal closes
            Alters component:
            ---------------------------------------------------*/
            close(){
                //The parameter is sent to the view through the emit to close the modal
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerModal', false );    
            },

            /*---------------------------------------------------
            Name: validate
            Description: Validate the form and send the json
            Alters component:
            ---------------------------------------------------*/
            async validate(){

                let validForm = this.$refs.form.validate();

                if(validForm){
                    Object.assign(this.$data, this.$options.data.call(this));
                    this.$emit( 'listenerSaveProcess', this.dataProcess ); 
                }
                
            },

            /*---------------------------------------------------
            Name: upsertActivity
            Description: listen for an activity update and insert
            Alters component:
            ---------------------------------------------------*/
            upsertActivity( item = {} , action ){
                
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerUpsertActivity', item, action ); 

            },

        },
        mixins: [apiMixins, processData]

    }


</script>


<style scoped>

    .v-input--selection-controls{
        margin-top: 0px !important;
        padding-top: 0px !important;
    }
    .list-drag {
        height: 100%;
    }
    .chip {
        margin: 10px;
    }
    .drop-allowed.drop-in * {
        cursor: inherit !important;
    }
    .number-order-avatar{
        color : white;
    }

   .v-input__icon--append{
        display: none !important;
    }

</style>