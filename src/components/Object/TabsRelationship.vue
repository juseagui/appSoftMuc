<template>

    <v-container>
        <v-card class="container-tabs" >
            <v-tabs
            v-model="tabRelationship"
            centered 
            slider-color="primary"
            >
                <v-tab 
                v-for="(itemTab, index) in dataTabs" :key="itemTab.object_child"
                @click="listenerActionChangeTabs(itemTab.object_child, index)"
                >
                {{itemTab.description}}
                </v-tab>
            </v-tabs>
        </v-card>

        <template>
            <v-tabs-items 
            v-model="tabRelationship"
            >
            <v-tab-item v-for="itemTab in dataTabs" :key="itemTab.object_child"
                transition= false
            >
                <TableGeneral :headers="dataTable.headersTableRelationship" :data="dataTable.dataTable" :dataPaginator="dataTable.dataPaginator"
                                :actions="dataTable.actionsTableRelationship" :itemsPerPage="dataTable.itemsPerPage" @listenerActionTable="listenerActionTableTabs" />
                
                <PaginatorGeneral :dataPaginator="dataTable.dataPaginator" @listenerActionPaginator="listenerActionPaginatorTabs" />

            </v-tab-item>
            
            </v-tabs-items>
        </template>
    </v-container>
  
</template>

<script>

  import TableGeneral from "@/components/General/TableGeneral";
  import PaginatorGeneral from "@/components/General/PaginatorGeneral";

    export default {
        name:"TabsRelationship",
        props: [ 'dataTable','dataTabs' ],
        data: () => ({ 
            tabRelationship : 0,
            objeId : 0,
        }),
        components: {
            TableGeneral,
            PaginatorGeneral
        },
        watch: {
            dataTable: {
                deep: true,
                handler(newVal, oldVal) {
                    let foundObject = this.dataTabs.findIndex(element => {
                        return element.object_child == newVal.idObjectRelationship
                    });
                    this.tabRelationship = foundObject;
                    this.objeId = newVal.idObjectRelationship;
                }
            },
        },
        methods : {

            /*---------------------------------------------------
            Name: listenerActionChangeTabs
            Description: Listen to the change of tabs
            Alters component:
            ---------------------------------------------------*/
            listenerActionChangeTabs( objeId ){
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerActionChangeTabs', objeId ); 
            },

            /*---------------------------------------------------
            Name: listenerActionTableTabs
            Description: Listen when pressing a button on the table to execute an action
            Alters component: TableGeneral
            ---------------------------------------------------*/
            listenerActionTableTabs( sendFunction, item ){
                let selectTabActual = this.tabRelationship;
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerActionTableTabs', sendFunction, item  ); 
                this.tabRelationship = selectTabActual;
            },

            /*---------------------------------------------------
            Name: listenerActionTableTabs
            Description: Listen when pressing a button on the table to execute an action
            Alters component: PaginatorGeneral
            ---------------------------------------------------*/
            listenerActionPaginatorTabs( page ){
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerActionPaginatorTabs', page );  
            }

        }

    }
</script>


<style scoped>
.container-tabs {
  margin-bottom: 10px;
}

</style>