<template>
    <v-row justify="center">
        <v-dialog
        v-model="openModal"
        persistent
        max-width="800px"
        min-width="500px"
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
                        <v-icon x-large  style=" margin: 3px; ">interests</v-icon>
                        <span class="text-h6" >Actividad</span>
                    </v-alert>

                    <v-row>
                        <v-col  cols="12" sm="8" md="6" >
                            <v-text-field
                                label="Descripción de Actividad *"
                                counter="50"
                                name = "description"
                                v-model="data.description"
                                required>
                            </v-text-field>

                        </v-col>

                        <v-col  cols="12" sm="8" md="6" >

                            <v-text-field
                                label="Codigo"
                                counter="50"
                                name = "code"
                                v-model="data.code"
                                :disabled="action=='edit'"
                                required>
                            </v-text-field>
                        </v-col>
                    </v-row>

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
export default {

    props: ['openModal', 'data', 'action' ],
    data: () => ({
        valid : false,

        //Disabled button Save in form
        disabledButtonSave : false
    }),

    methods: {

        /*---------------------------------------------------
        Name: close
        Description: Notify modal closes
        Alters component:
        ---------------------------------------------------*/
        close(){
            //The parameter is sent to the view through the emit to close the modal
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit( 'listenerModal' );    
        },

        /*---------------------------------------------------
        Name: validate
        Description: Validate the form and send the json
        Alters component:
        ---------------------------------------------------*/
        async validate(){
          
            //Send parameters to parent component
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit( 'listenerSaveActivity', this.data, this.action );  

        },

        
    }


}
</script>

<style>

</style>