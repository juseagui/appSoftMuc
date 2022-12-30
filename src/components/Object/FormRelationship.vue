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
                    style=" margin-bottom: 0px; "
                    colored-border
                    :dense="true"
                    color="primary"
                    transition = "expand-x-transition"
                    elevation="0">
                        <v-icon x-large  style=" margin: 3px; ">{{titleObject.icon}}</v-icon>
                        <span class="text-h6" >{{titleObject.title}}</span>
                    </v-alert>

                    <v-container>
                        <!-- Header-->
                        <v-row >
                            <v-col v-for="(item, index) in headers "
                            :key="index">
                                <h3>{{item.text}}</h3>
                            </v-col>
                        </v-row>

                        <!-- Data -->
                        <v-row v-for="(item, index) in data "
                         :key="index" >
                            <v-col >
                                {{item.object_parent_descrip}}
                            </v-col>
                                 
                            <v-col>
                                <v-icon dense>{{item.object_parent_icon}}</v-icon>
                                {{item.object_parent_name}}
                            </v-col>

                            <v-col >
                                <v-icon dense>{{item.object_child_icon}}</v-icon>
                                {{item.object_child_name}}
                                
                            </v-col>

                            <v-col>
                                <v-switch
                                    dense
                                    color="success"
                                    true-value="1"
                                    false-value="0"
                                    v-model="item.visible"
                                    :name ="item.object_parent+'_'+item.object_child+'__switch'+index"
                                    @change="changeStateSwitch(item)"
                                    hide-details
                                >
                                </v-switch>
                            </v-col>

                        </v-row>
                    </v-container>

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

  import {mapMutations} from "vuex";

  export default {
    
    props: ['openModal','data','headers','titleObject'],
    data: () => ({
        valid : false,
        
        //object that sends request for relationship association
        dataObjectRelationship : [],

        //Disabled button Save in form
        disabledButtonSave : false
    }),

    async beforeUpdate() {
        this.dataObjectRelationship = this.data;
        //Validate if data is empty
        if(this.data.length > 0 )
            this.disabledButtonSave = false;
        else
            this.disabledButtonSave = true;
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
            this.$emit( 'listenerToolbarRelationship', false );    
        },

        /*---------------------------------------------------
        Name: validate
        Description: Validate the form and send the json
        Alters component:
        ---------------------------------------------------*/
        async validate(){
            let data = this.dataObjectRelationship;
            //Send parameters to parent component
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit( 'listenerSaveRelationship', data );  

        },

        /*---------------------------------------------------
        Name: changeStateSwitch
        Description: detects change of state in the relationship
        Alters component: v-switch
        ---------------------------------------------------*/
        changeStateSwitch( item ){
            return;
        }
        
    }

  }


</script>


<style scoped>

    .v-input--selection-controls{
        margin-top: 0px !important;
        padding-top: 0px !important;
    }

</style>