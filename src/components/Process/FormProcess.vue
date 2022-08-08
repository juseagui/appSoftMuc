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
                        <span class="text-h6" >Información principal</span>
                    </v-alert>

                    <v-container>
                        <v-row>
                            <v-col  cols="12" sm="8" md="6" >
                                <v-text-field
                                    label="Descripción *"
                                    counter="50"
                                    name = "description"
                                    :v-model="descriptionProcess"
                                    required>
                                </v-text-field>

                            </v-col>

                            <v-col  cols="12" sm="8" md="6" >

                                <v-text-field
                                    label="Modulo donde aplica el proceso "
                                    counter="50"
                                    name = "description"
                                    :v-model="objeProcess"
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
                        <span class="text-h6" >Definición de Actividades</span>
                    </v-alert>
                
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
    
    props: ['openModal'],
    data: () => ({
        valid : false,
        descriptionProcess : null,
        objeProcess : null,
        
        //object that sends request for relationship association
        dataObjectRelationship : [],

        //Disabled button Save in form
        disabledButtonSave : false
    }),

    async beforeUpdate() {
       
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
            let data = this.dataObjectRelationship;
            //Send parameters to parent component
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit( 'listenerSaveRelationship', data );  

        },
        
    }

  }


</script>


<style scoped>

    .v-input--selection-controls{
        margin-top: 0px !important;
        padding-top: 0px !important;
    }

</style>