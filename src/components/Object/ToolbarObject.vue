<template>
    <v-container>
        <v-toolbar
        elevation="1"
        color = "headerTable"
        height = 140>  

            <v-toolbar-title>
                <v-avatar
                color="grey"
                size="100"
                >
                <v-icon dark x-large>
                {{iconObject}}
                </v-icon>
                </v-avatar>
            </v-toolbar-title>

            <v-divider class="mx-4" inset vertical></v-divider>

            <v-col
                align-self="center"
                class="pa-5">
                <v-toolbar-title>
                <v-row    no-gutters>
                    <h1>{{titleObject}}</h1>
                </v-row>
                </v-toolbar-title>
                <v-row    no-gutters>
                    <v-icon class="mr-2 ml-1">description</v-icon>
                <h3>{{descriptionObject}}</h3>
                </v-row>
            </v-col>

        </v-toolbar>
     
        <template >
            <v-toolbar
            class="mb-5"
            elevation="1"
            color = "headerTable"
            flat>
                <v-btn icon @click="$router.go(-1)">
                    <v-icon>keyboard_return</v-icon>
                </v-btn>
                <v-btn icon >
                    <v-icon>search</v-icon>
                </v-btn>

                <v-spacer></v-spacer>

                <v-card
                color = "headerTable"
                max-width="164"
                max-height = "45"
                class=" mb-5"
                flat   
                rounded= false
                :key="index"
                v-for="(item, index) in headersDetail"
                >
                <v-list-item  three-line>
                    <v-list-item-content>
                    <div>
                    {{item.text}}
                    </div>
                    <v-list-item-title class=" mb-3">
                        <v-icon dense>{{item.ico}}</v-icon>
                    <b>{{item.value}}</b>
                    </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-card>

            <v-btn color="primary" dark  @click="toggleModalViewAdd">
                {{ $t("viewGeneral.btnAdd") }}
            </v-btn>

            </v-toolbar>
        </template>
    </v-container>
</template>

<script>

export default {
 name: "toolbarObject",
 props: ['titleObject','descriptionObject','iconObject','headersDetail'],
 data() {
   return {
     param : ""
   }
 },
 methods: {
    /*---------------------------------------------------
    Name: toggleModalViewAdd
    Description: Notifies you add a new item to parent component
    Alters component:
    ---------------------------------------------------*/
    toggleModalViewAdd() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit('listenerToolbar', 'add', null, false); 
    },

    /*---------------------------------------------------
    Name: toggleModalViewEdit
    Description: Notifies you edit an item to parent component
    Alters component:
    ---------------------------------------------------*/
    toggleModalViewEdit() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit('listenerToolbar', 'edit', this.codeTitle, false); 
    }
 }
}

</script>