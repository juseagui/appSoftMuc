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
                        <v-icon x-large  style=" margin: 3px; ">lock_reset</v-icon>
                        <span class="text-h6" >Cambiar contraseña</span>
                    </v-alert>

                    <v-row>
                        <v-col  cols="12" sm="12" md="12" >
                            <v-text-field
                                label="Contraseña actual *"
                                name = "password_actual"
                                type="password"
                                v-model="validPassword.passwordActual.value"
                                @click:append="validPassword.passwordActual.show = !validPassword.passwordActual.show"
                                :append-icon="validPassword.passwordActual.show ? 'visibility' : 'visibility_off'"
                                :type="validPassword.passwordActual.show ? 'text' : 'password'"
                                required>
                            </v-text-field>

                            <v-text-field
                                label="Confirmar Contraseña actual *"
                                name = "confirm_password_actual"
                                :rules ="[rules.confirmPassword(validPassword.passwordActual.value)] "
                                type="password"
                                v-model="validPassword.passwordActualConfirm.value"
                                @click:append="validPassword.passwordActualConfirm.show = !validPassword.passwordActualConfirm.show"
                                :append-icon="validPassword.passwordActualConfirm.show ? 'visibility' : 'visibility_off'"
                                :type="validPassword.passwordActualConfirm.show ? 'text' : 'password'"
                                required>
                            </v-text-field>

                            <v-text-field
                                label="Nueva Contraseña *"
                                name = "new_password"
                                type="password"
                                v-model="validPassword.newPassword.value"
                                @click:append="validPassword.newPassword.show = !validPassword.newPassword.show"
                                :append-icon="validPassword.newPassword.show ? 'visibility' : 'visibility_off'"
                                :type="validPassword.newPassword.show ? 'text' : 'password'"
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

    props: ['openModal'],
    data: () => ({
        valid : false,
        validPassword : {
            passwordActual : {
                value : "",
                show : false
            },
            passwordActualConfirm : {
                value : "",
                show : false
            },
            newPassword : {
                value : "",
                show : false
            },
        },
        //Disabled button Save in form
        disabledButtonSave : false,
        
        //rules in the fields
        rules: {
            confirmPassword( actual = "" ) {
                return v => v === actual || "No se encuentra coincidencia"
            },
        }
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
            this.$emit( 'listenerSaveChangePassword', this.data );  

        },
    }
}
</script>

<style>

</style>