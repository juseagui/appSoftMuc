<template>
  <v-app >
    <Navbar/>
      <v-container>
    <v-layout row class="ma-4" >
        <v-app style="background-color: grey lighten-1;" class="rounded">
          <v-row>
            <v-col cols="12" md="12" class="ligne">
            <v-container>
              <v-row>
                <!-- graficos dinamicos -->
                <v-col cols="12" md="12">
                  <h1 class="headline mb-2 grey--text">Money status </h1>
                  <template>
                    <div id="graf">
                      <GChart
                        type="ColumnChart"
                        :data="chartData"
                        :options="chartOptions"
                      />    
                    </div>
                  </template>
                </v-col>
                 <!-- graficos dinamicos -->

                  <!-- Listas dinamicas -->
                <v-col cols="12" md12><h1 class="headline mb-2 grey--text">Budgets </h1></v-col>
                 <v-col cols="12" md="8">
                <v-card >
                <v-list >  
                    <v-list-item>
                      <v-list-item-avatar color="blue">
                        <v-icon dark>fas fa-car</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title >Auto & transport</v-list-item-title>
                        <v-list-item-subtitle>$700 left</v-list-item-subtitle>
                      </v-list-item-content>
                        <v-list-item-content align="right">
                        <v-list-item-title class="indigo--text">$1,200</v-list-item-title>
                        <v-list-item-subtitle>$500 of 1,200</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                    <v-list-item>
                      <v-list-item-avatar color="red">
                        <v-icon dark>fas fa-utensils</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title >Food & drinks</v-list-item-title>
                        <v-list-item-subtitle>$2,100 left</v-list-item-subtitle>
                      </v-list-item-content>
                        <v-list-item-content align="right">
                        <v-list-item-title class="indigo--text">$3,700</v-list-item-title>
                        <v-list-item-subtitle>$1,600 of 3,700</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider inset></v-divider>
                      <v-list-item>
                      <v-list-item-avatar color="orange">
                        <v-icon dark>fas fa-dumbbell</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title >Sport</v-list-item-title>
                        <v-list-item-subtitle>$350 left</v-list-item-subtitle>
                      </v-list-item-content>
                        <v-list-item-content align="right">
                        <v-list-item-title class="indigo--text">$950</v-list-item-title>
                        <v-list-item-subtitle>$600 of 950</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                      <v-divider inset></v-divider>
                      <v-list-item>
                      <v-list-item-avatar color="green">
                        <v-icon dark>fas fa-gamepad</v-icon>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title >Game</v-list-item-title>
                        <v-list-item-subtitle>$150 left</v-list-item-subtitle>
                      </v-list-item-content>
                        <v-list-item-content align="right">
                        <v-list-item-title class="indigo--text">$350</v-list-item-title>
                        <v-list-item-subtitle>$200 of 150</v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                </v-list>
                </v-card>
                </v-col>
                <!-- Listas dinamicas -->
          
          
          <v-col cols="12" md="4">
            <!-- cards -->
                    <v-card
                      class="mx-auto"
                      max-width="400"
                    >
            <v-img
              class="white--text align-end"
              height="150px"
              src="card.jpg"
            >
            </v-img>
            <v-card-title class="pb-0">Cash loan</v-card-title>

              <v-card-text class="text--primary">
                <div>Up to 2 million dollars</div>
                <div>Money the next date. Rate</div>
              </v-card-text>

            </v-card>
                </v-col>
            <!-- /cards -->
              </v-row>
        </v-container>
            </v-col>
          </v-row>
     </v-app>
      </v-layout>
      </v-container>   
  </v-app>
</template>

<script>

import { GChart } from 'vue-google-charts'
import Navbar from '@/components/General/Navbar'

export default {
  
  data: () => ({
      chartData: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350],
        ["2018", 1025, 530, 302],
        ["2019", 1040, 560, 356],
      ],
      chartOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2016-2019"
        }
      }

  }),
  name : 'home',
  components : {
    GChart,
    Navbar
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