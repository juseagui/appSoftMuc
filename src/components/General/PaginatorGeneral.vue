<template>
    <v-container>
        <div class = "mt-1">
            <v-card class="d-flex justify-space-between mb-6" style = " box-shadow: none;"  >
                <span class="pa-1"  ></span>
                <span class="pa-1"  >
                    <v-pagination
                    v-model="dataPaginator.pageIni"
                    :length="dataPaginator.pageCount"
                    @input="listenerActionPaginator"
                    ></v-pagination>
                </span>
            </v-card>
        </div>

    </v-container>
  
</template>

<script>

    export default {
        props: ['dataPaginator'],
        data: () => ({ 
            source : "PaginatorGeneral",
        }),
        
        methods: {

            /*---------------------------------------------------
            Name: listenerActionPaginator
            Description: Event listener pagination
            Alters component: 
            ---------------------------------------------------*/
            listenerActionPaginator( page ){
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerActionPaginator', page );  
            } 
        }
    }
</script>

<style>

</style>