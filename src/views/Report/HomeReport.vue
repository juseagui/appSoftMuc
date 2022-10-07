<template>
  <v-app >
    <Navbar/>
      <v-container>
        <v-layout row class="ma-4" >
            
              <v-row>
                <v-col cols="12" md="12" class="ligne">
                <v-container>
                  <v-row>
                    <!-- graficos dinamicos -->
                    <v-col cols="12" md="12" >
                      <h1 class="headline mb-2 grey--text"> Estado de proceso comercial </h1>
                      <v-row>
                        <v-col lg="3" cols="sm" class="pa-2" v-for="(state, index) in dataProcessCount" :key="index">
                          <v-card>
                            <v-row class="no-gutters">
                                <div class="col-auto">
                                    <div :class="listStateGlobal.find(element => element.code == state.process_state ) == undefined ? 'cyan' 
                                        : listStateGlobal.find(element => element.code == state.process_state ).color + ' fill-height'">&nbsp;</div>
                                </div>
                                <div class="col pa-3 primary--text">
                                    <h4 class="text-truncate text-uppercase"> {{ listStateGlobal.find(element => element.code == state.process_state ) == undefined ? '' 
                                    : listStateGlobal.find(element => element.code == state.process_state ).description  }} </h4>
                                    <h1> {{ state.count_act }}
                                    </h1>
                                </div>
                            </v-row>
                          </v-card>
                        </v-col>
                        
                      </v-row>
                      
                    </v-col>
                    <!-- graficos dinamicos -->

                      <!-- Listas dinamicas -->
                    
                    <v-col cols="6" md="6">
                      <v-card >
                        <v-list >  
                            <div v-for="(state, index) in dataValuesProcess" :key="index">
                            <v-list-item>
                              <v-list-item-avatar :color="listStateGlobal.find(element => element.code == state.process_state ) == undefined ? 'white' 
                                        : listStateGlobal.find(element => element.code == state.process_state ).color ">
                                <v-icon dark> {{ listStateGlobal.find(element => element.code == state.process_state ) == undefined ? '' 
                                        : listStateGlobal.find(element => element.code == state.process_state ).icon  }}</v-icon>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title >{{ listStateGlobal.find(element => element.code == state.process_state ) == undefined ? '' 
                                        : listStateGlobal.find(element => element.code == state.process_state ).description  }}</v-list-item-title>
                              </v-list-item-content>
                                <v-list-item-content align="right">
                                <v-list-item-title class="primary--text">${{state.value_total}}</v-list-item-title>
                                <v-list-item-subtitle>Cantidad : {{state.count_act}}</v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-divider inset></v-divider>
                            </div>
                        </v-list>
                      </v-card>
                    </v-col>
                    <!-- Listas dinamicas -->
              
                    <v-col cols="6" md="6">
                      <v-card class="dark" min-height="252">
                          <v-card-title class="primary--text">
                              Programas
                            </v-card-title>
                        <v-card-text>
                            <v-carousel
                                cycle
                                height="180"
                                interval="4000"
                                show-arrows-on-hover
                            >
                              <v-carousel-item v-for="(program, index) in dataProgramValue" :key="index" >
                                <div class="row no-gutters">
                                    <div class="col">
                                        <div>
                                            <h2 class="cyan--text"> {{ program.description_program }} </h2>
                                            <p class="mt-1"></p>
                                            <h3 class="mb-0">$ {{ program.value_total }}  <i class="mdi mdi-36px mdi-credit-card-outline float-right"></i></h3>
                                            <p>Cantidad : {{ program.count_program }}</p>
                                        </div>
                                    </div>
                                </div>
                              </v-carousel-item>
                            </v-carousel>
                        </v-card-text>
                      </v-card>
                    </v-col>
               
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-card class="dark" min-height="252">
                          <v-card-title class="primary--text">
                              Numero de oportunidades por mes
                          </v-card-title>
                        <v-card-text>
                          <LinearReports></LinearReports>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" md="12">
                      <v-card class="dark" min-height="252">
                          <v-card-title class="primary--text">
                              Cantidad y aporte ventas por actividades
                          </v-card-title>
                        <v-card-text>
                          <ColumnReports></ColumnReports>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>

                </v-container>
                </v-col>
              </v-row>

             
       
          </v-layout>
      </v-container>   
  </v-app>
</template>

<script>

import Navbar from '@/components/General/Navbar'
import ChartReports from '@/components/Reports/ChartReports'
import LinearReports from '@/components/Reports/LinearReports'
import ColumnReports from '@/components/Reports/ColumnReports'


export default {
  
  data: () => ({
      dataProcessCount : [
        {
            "count_act": 1,
            "process_state": "1"
        },
        {
            "count_act": 4,
            "process_state": "2"
        },
        {
            "count_act": 1,
            "process_state": "3"
        },
        {
            "count_act": 4,
            "process_state": "4"
        }
      ],

      dataValuesProcess : [
        {
            "count_act": 1,
            "process_state": "1",
            "value_total": 4000000.0
        },
        {
            "count_act": 1,
            "process_state": "2",
            "value_total": 4000000.0
        },
        {
            "count_act": 1,
            "process_state": "3",
            "value_total": 4000000.0
        },
        {
            "count_act": 4,
            "process_state": "4",
            "value_total": 13550000.0
        }
      ],

      dataProgramValue : [
        {
            "description_program": "Ingenieria en sistemas",
            "id_program": 1,
            "count_program": 2,
            "value_total": 8000000.0
        },
        {
            "description_program": "Derecho",
            "id_program": 4,
            "count_program": 1,
            "value_total": 5000000.0
        }
      ],
  
      listStateGlobal : [],
    

  }),
  name : 'home',
  components : {
    ChartReports,
    LinearReports,
    ColumnReports,
    Navbar,
  },
  mounted() {
    this.listStateGlobal = this.$store.state.process.listState;
  },
  computed :{
    theme(){
      return 'light'
    }
  }
}
</script>

<style scoped>
  .rounded{
      border-radius:30px;
  }


</style>