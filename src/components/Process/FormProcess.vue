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
                        <span class="text-h6" > Información principal </span>
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

                                <v-text-field
                                    label="Modulo donde aplica el proceso "
                                    counter="50"
                                    name = "description"
                                    v-model="dataProcess.object_process.id"
                                    required>
                                </v-text-field>
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
                        <span class="text-h6" > Definición de Actividades</span>
                    </v-alert>

                    <template>
                        <v-row align-content="stretch">
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
                                                    </v-list-item-content>
                                                        <v-chip @click="upsertActivity( item, 'edit' )" color="headerTable" text-color="primary">
                                                            <v-icon  left>
                                                                edit
                                                            </v-icon>
                                                            Editar Actividad
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
                                            <v-list-item-title> Nueva Actividad </v-list-item-title>
                                            <v-list-item-subtitle > Presionar para agregar una nueva actividad </v-list-item-subtitle>
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
                        > Close
                    </v-btn>
                    <v-btn
                        color="primary darken-1"
                        :disabled ="disabledButtonSave"
                        text
                        @click="validate()"
                        > Save
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card>
        </v-dialog>
    </v-row>
</template>


<script>

    import {Drag,Drop,DropList} from "vue-easy-dnd";
    import {mapMutations} from "vuex";

    //import mixins
    import {apiMixins} from '@/mixins/apiMixins.js'

    export default {
        
        props: ['openModal', 'operationModel','dataProcess'],
        data: () => ({
            valid : false,
            //Disabled button Save in form
            disabledButtonSave : false,
        }),

        components: {
            Drag,
            Drop,
            DropList
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
        mixins: [apiMixins]

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

</style>