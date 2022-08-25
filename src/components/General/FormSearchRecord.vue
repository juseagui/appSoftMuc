<template>
 <v-row justify="center">

    <v-dialog
    v-model="openModalSearch"
    persistent
    max-width="1000px">

    <v-card>
        <v-card-title>
            {{title}}
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="search"
                label="Buscar"
                single-line
                hide-details
                @click:append="searchRecord(search)"
            ></v-text-field>
        </v-card-title>   
        
        <v-card-text style="padding : 15px;">
            <template>

                <TableGeneral :headers="dataTableSearch.headersTable" 
                :data="dataTableSearch.dataTable" 
                :dataPaginator="dataTableSearch.dataPaginator" 
                :sourceParent="source"
                :actions="[]" :itemsPerPage="dataTableSearch.itemsPerPage"
                @listenerActionTable="listenerActionTable" />
            
             <PaginatorGeneral :dataPaginator="dataTableSearch.dataPaginator" @listenerActionPaginator="listenerActionPaginator" /> 
            </template>
        </v-card-text>
        

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="primary darken-1"
            text
            @click="selectRecord()"
            :disabled="Object.keys(recordSelected).length === 0"
            > Seleccionar
            </v-btn>
            <v-btn
            color="primary darken-1"
            text
            @click="close()"
        > {{$t("FormGeneral.btnClose")}}
        </v-btn>

        </v-card-actions>

    </v-card>

     </v-dialog>

 </v-row>
</template>

<script>

import PaginatorGeneral from "@/components/General/PaginatorGeneral";
import TableGeneral from "@/components/General/TableGeneral";

export default {
    props: ['dataTableSearch','title', 'codeInput' ,'openModalSearch'],
    data: () => ({ 
        recordSelected : {},  
        search : "",
        source : "FormSearchRecord",
    }),
    async Mounted() {

    },
    components: {
        PaginatorGeneral,
        TableGeneral
    },
    
    methods: {

        /*---------------------------------------------------
        Name: close
        Description:
        Alters component:
        ---------------------------------------------------*/
        close(){
            //The parameter is sent to the view through the emit to close the modal
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit('listenerModalFormSearchRecord', false, null, null );    
        },

        /*---------------------------------------------------
        Name: searchRecord
        Description:
        Alters component:
        ---------------------------------------------------*/
        searchRecord( item ){
          console.log("🚀 ~ file: FormSearchRecord.vue ~ line 204 ~ searchRecord ~ item", item)
        },

        /*---------------------------------------------------
        Name: listenerActionTable
        Description: 
        Alters component:
        ---------------------------------------------------*/
        listenerActionTable( sendFunction, item ){
            if( sendFunction == 'selected')
                this.recordSelected = item ?? {};
        },

        /*---------------------------------------------------
        Name: selectRecord
        Description: 
        Alters component:
        ---------------------------------------------------*/
        selectRecord( ){
            console.log("🚀 ~ file: FormSearchRecord.vue ~ line 128 ~ listenerActionTable ~ item", this.codeInput);
            //The parameter is sent to the view through the emit to close the modal
            this.$emit('listenerModalFormSearchRecord', true,  this.recordSelected, this.codeInput );    
        },

        /*---------------------------------------------------
        Name: selectRecord
        Description: 
        Alters component:
        ---------------------------------------------------*/
        listenerActionPaginator( page ){
            this.$emit('listenerChangePageFormSearchRecord', page );  
        }

    },

}
</script>

<style>

</style>