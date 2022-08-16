<template>

    <v-card-text>

         <v-row class="mt-50">
            <v-col>
                <v-alert
                icon="account_tree"
                type="info"
                text
                >
                Gestión de la oportunidad
                </v-alert>
            </v-col>
        </v-row>

        <v-stepper :value="(activityCurrent.sort == undefined ? 0 : activityCurrent.sort ) + 1" alt-labels>
            <v-stepper-header>
                <template v-for="(activity, index) in activities">
                    <v-stepper-step :step="activity.sort" 
                    :complete="activityCurrent.sort >= activity.sort ? true : false"
                    :color=" (activityCurrent.sort == undefined ? 0 : activityCurrent.sort ) ==  (activityCurrent.sort == undefined ? 0 : activity.sort) 
                        ? 'chipColorPrimary' : 'primary' " 
                    >
                        {{activity.description}}
                    </v-stepper-step>
                    <v-divider v-if="index !== activities.length - 1" :key="index"></v-divider>
                </template>

            </v-stepper-header>
        </v-stepper>
        
        <br/>

        <v-divider></v-divider>

        <v-container>
            <v-row >
                <v-col>
                    <v-subheader>Progreso Actual</v-subheader>
                    <v-row >
                        <v-col class="d-flex justify-center">
                            <v-progress-circular
                            :rotate="360"
                            :size="110"
                            :width="15"
                            :value="calculateProgess"
                            :color="calculatecolorProgess"
                            >
                            {{calculateProgess}}
                            </v-progress-circular>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col>
                    <v-subheader>Responsable</v-subheader>
                    <v-row>
                        <v-col>
                            <v-avatar class = "avatar-container" size="45" >
                                    <span class="text-avatar text-h6">{{initialName}}</span>
                            </v-avatar>
                            {{username}}
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-avatar class = "avatar-container" size="45" >
                                <v-icon>
                                    email
                                </v-icon>
                            </v-avatar>
                            {{emailUser}}
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row>
                <v-textarea 
                    auto-grow
                    :counter= 1500
                    rows="2"
                    label='Registro de actividad *'
                    :rules ="[rules.required('Registro de actividad',1),rules.validateMax(1500)]"
                    name = 'activityLog'
                    v-model="activityLog"
                />
            </v-row>

        </v-container>
    </v-card-text>
    

    </template>
<script>
    export default {
        props: ['activities','historical'],
        data: () => ({
            activityLog : "",
            initialName : "",
            username : "",
            emailUser : "",
            activityCurrent : {},
            rules: {
                required(name, required){
                    if(required== 1)
                        return v => !!v ||  name+'  es requerido';
                    else
                        return true
                },

                validateMax(max){
                    return v => (v || '').toString().length <= max || `Un maximo de ${max} caracteres son permitidos`
                },
            }
        }),

        computed : {
            calculateProgess(){
                let lengthActivities =  this.activities.length;
                debugger
                let progress = (100 / lengthActivities ) * ( this.activityCurrent.sort == undefined ? 0 : this.activityCurrent.sort ) ?? 0 ;
                return progress+'%';
            },
            calculatecolorProgess(){
                let lengthActivities =  this.activities.length;
                let progress = (100 / lengthActivities ) * ( this.activityCurrent.sort == undefined ? 0 : this.activityCurrent.sort ) ?? 0 ;

                let color = ""

                if(progress <= 25)
                    color = "red"
                else if (progress <= 40)
                    color = "red accent-1"
                else if (progress <= 60)
                    color = "lime"
                else if (progress <= 80)
                    color = "light-green"
                else if (progress <= 100)
                    color = "teal"

                return color;
            },
         },

        mounted(){
            this.initialName = this.$store.state.dataLoginUser.initialName;
            this.username = this.$store.state.dataLoginUser.username;
            this.emailUser = this.$store.state.dataLoginUser.email;

            if(this.historical.length > 0)
                this.activityCurrent = this.activities.find( element => element.id === this.historical[0].activity_historical );
           
        },

        methods: {

        }

    }

</script>

<style>

.avatar-container{
  background-color: var(--v-colorAvatar-base) !important;
  margin-right: 8px;
}

.text-avatar{
  color: var(--v-colorTextAvatar-base) !important;
}

.v-stepper__label{
    text-align: center !important;
}

</style>