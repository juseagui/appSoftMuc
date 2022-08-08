<template>

  <v-container>
    <v-data-table
      :headers="headers"
      :items="data"
      :items-per-page="itemsPerPage"
      :page.sync="dataPaginator.pageIni"
      hide-default-header
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:header="{ props: { headers } }">
        <thead class="my-header-style">
          <tr>
            <th v-for="h in headers" :key="h.value">
              <span>{{ h.text }}</span>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:item.action="{ item }">
        <v-row class="row-action-tablegeneral"  dense >
            <v-icon  v-for="action in actions" :key="action.value" small class="mr-2" @click="listenerActionTable(action.value, item)"> {{action.icon}} </v-icon>
        </v-row>
      </template>

      <template v-if="sourceParent == 'ListObjects'" v-slot:item.name="{ item }">
        <v-row no-gutters>
          <v-icon>{{item.icon}}</v-icon>
          <span class="mt-2 ml-2">
            <b> {{item.name}} </b>
          </span>
        </v-row>
      </template>
    
    </v-data-table>
  </v-container>

</template>

<script>
  
  export default {

    props: ['headers','data','actions','itemsPerPage','dataPaginator','sourceParent'],
    data: () => ({ 
      source : "TableGeneral",

    }),
    methods: {

      /*---------------------------------------------------
      Name: listenerActionTable
      Description: Listen when pressing a button on the table to execute an action
      Alters component: 
      ---------------------------------------------------*/
      listenerActionTable( sendFunction, item ){
        Object.assign(this.$data, this.$options.data.call(this));
        this.$emit( 'listenerActionTable', sendFunction, item );  
      },

    }
  }
  
</script>



<style scoped>
.my-header-style {
  background-color: var(--v-headerTable-base);
}

.row-action-tablegeneral{
  flex-wrap: nowrap;
}


</style>

