<template>
        <v-card class="container-tabs" elevation="1" >
             <v-toolbar 
                flat>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>{{ title }}</v-toolbar-title>
                <v-spacer></v-spacer>

            </v-toolbar>

            <v-stepper  :value="(activityCurrent.sort == undefined ? 0 : activityCurrent.sort )" alt-labels>
                <v-stepper-header>
                    <template v-for="(activity, index) in activities">
                        <v-stepper-step :step="activity.sort" 
                        :color=" (activityCurrent.sort == undefined ? 0 : (activityCurrent.sort) ) ==  (activityCurrent.sort == undefined ? 0 : activity.sort)
                            ? 'chipColorPrimary' : 'primary' "
                        editable
                        @click="listenerStepSelect(activity)"
                        >
                            {{activity.description}}
                            <small v-if="(activityCurrent.sort == undefined ? 0 : (activityCurrent.sort) ) ==  (activityCurrent.sort == undefined ? 0 : activity.sort)
                            ? true : false " > {{ $t("TabsProcess.msgActualActivity") }} </small>
                        </v-stepper-step>
                        <v-divider v-if="index !== activities.length - 1" :key="index"></v-divider>
                    </template>

                </v-stepper-header>
            </v-stepper>

            <v-divider></v-divider>

            <v-timeline v-if="(filterHistorical.length > 0)"
            :reverse="true"
            class = "list-item-timeline">
                <v-timeline-item
                v-for="(activity, index) in filterHistorical"
                :key="index"
                color="colorAvatar"
                large
                >
                <template  v-slot:icon>
                    <span class="span-container-initialName">{{ initialName[activity.user_historical] }}</span>
                </template>
                <template v-slot:opposite>
                    <v-icon class="mr-2" >
                      record_voice_over
                    </v-icon>
                    <span >{{activity.user_lastname}}</span>
                    <br>
                    <v-icon class="mr-2" >
                      email
                    </v-icon>
                    <span>{{activity.user_email}}</span>
                    <br>
                    <v-icon class="mr-2" >
                      event
                    </v-icon>
                    <span>{{activity.start_date}}</span>
                </template>
                <v-card class="elevation-2">
                    <v-card-title class="text-h6">
                        <v-chip
                        class="ma-2"
                        :color=" (activity.finish_date) ? 'success' : 'orange'"
                        text-color="white"
                        >
                            {{ codeActivity[activity.activity_historical] }}
                        </v-chip>
                        {{ fullDescriptionActivity[activity.activity_historical] }}
                    </v-card-title>
                    <v-card-text>
                        {{activity.description}} 
                        <span v-if="activity.finish_date">
                            <br>
                            <b>{{ $t("TabsProcess.msgFinishDate") }} : {{activity.finish_date}} </b>
                            <br>
                            <b>{{ $t("TabsProcess.msgTimeExecute") }} :  {{ calculeRunTimeActivity[activity.id] }} </b>
                        </span>
                    </v-card-text>
                </v-card>
                </v-timeline-item>
                
            </v-timeline>

            <v-container v-if="(filterHistorical.length == 0)">
                <v-alert
                    text
                    prominent
                    type="info"
                    icon="cloud_download"
                    >
                        {{ $t("TabsProcess.msgNotFound") }}
                    </v-alert>
            </v-container>
            
                  
        </v-card>
  
</template>

<script>

    export default {
        name:"TabsProcess",
        props: [ 'activities', 'historical', 'title' ],
        data: () => ({ 
            activityCurrent : {},
            foundData : false,
            filterHistorical : [],
        }),

        mounted(){

            if(this.historical.length > 0){
                this.activityCurrent = this.activities.find( element => element.id === this.historical[0].activity_historical );
                this.filterHistorical =  this.historical.filter( item => item.activity_historical == this.activityCurrent.id );
                this.foundData = true;
            }

        },

        computed: {
            fullDescriptionActivity(){
                 return this.activities.reduce((act, item) => {
                    act[item.id] = `${item.description}`;
                    return act;
                }, {});
            },
            codeActivity(){
                 return this.activities.reduce((act, item) => {
                    act[item.id] = `${item.code}`;
                    return act;
                }, {});
            },
            calculeRunTimeActivity(){
                 return this.filterHistorical.reduce((act, item) => {
                    let difDate = null;
                    if(item.start_date && item.finish_date ){
                        let dateStart = new Date(item.start_date.slice(0, -1));
                        let dateFinish = new Date(item.finish_date.slice(0, -1));
                        difDate = (dateFinish - dateStart);
                        difDate = Math.round((difDate/1000)/60);
                    }
                    
                    act[item.id] = `Minutos ${difDate}`;
                    return act;
                }, {});
            },
            initialName(){

                return this.historical.reduce((act, item) => {

                    let cadena = item.user_lastname
                    let arregloDeSubCadenas = cadena.split(" ");
                    let initialName = "";

                    for (let x=0;x<arregloDeSubCadenas.length;x++){
                        initialName += arregloDeSubCadenas[x].substring(0, 1).toUpperCase();
                    }

                    act[item.user_historical] = initialName;
                    return act;
                }, {});

            }

        },

        methods : {

            /*---------------------------------------------------
            Name: listenerStepSelect
            Description: Filter historical information according to activities
            Alters component: 
            ---------------------------------------------------*/
            listenerStepSelect( activity ){
                this.filterHistorical = this.historical.filter( item => item.activity_historical == activity.id );
            },

        }

    }
</script>


<style scoped>
.container-tabs {
  margin-bottom: 10px;
}
.list-item-timeline{
    max-height:600px;/* or any height you want */
    min-height:300px;
    overflow-y:auto;
    padding: 18px;
    background: linear-gradient(to top, #FFF, #F4F5F7);
}
.span-container-initialName{
    color: var(--v-colorTextAvatar-base) !important;
}


</style>