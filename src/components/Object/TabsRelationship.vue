<template>
        <v-card class="container-tabs" elevation="1" >
             <v-toolbar 
                flat>
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>Relations</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon class="mr-3">
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn color="secondary" dark class="mb-2" @click="listenerActionNewItemTabs()" >
                    <v-icon small :left="true"> add</v-icon> {{ $t("viewGeneral.btnAdd") }}
                </v-btn>

            </v-toolbar>

            <v-divider></v-divider>

            <v-tabs
            v-model="tabRelationship"
            centered 
            slider-color="colorTabBorder"
            color="colorTabBorder"
            >
                <v-tab 
                v-for="(itemTab, index) in dataTabs" :key="itemTab.object_child"
                @click="listenerActionChangeTabs(itemTab.object_child, index)"
                >

                <v-icon class="mr-1" dense>
                    {{itemTab.object_child_icon}}
                </v-icon>

                {{itemTab.description}}
                </v-tab>
            </v-tabs>

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



        </v-card>

      
  
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
            Name: listenerActionPaginatorTabs
            Description: 
            Alters component: PaginatorGeneral
            ---------------------------------------------------*/
            listenerActionPaginatorTabs( page ){
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerActionPaginatorTabs', page );  
            },

            /*---------------------------------------------------
            Name: listenerActionNewItemTabs
            Description: Creation of a new item in the relation object or child object
            Alters component: 
            ---------------------------------------------------*/
            listenerActionNewItemTabs(){
                Object.assign(this.$data, this.$options.data.call(this));
                this.$emit( 'listenerActionTableTabs', 'addItem', null );  
            }

        }

    }
</script>


<style scoped>
.container-tabs {
  margin-bottom: 10px;
}

</style>