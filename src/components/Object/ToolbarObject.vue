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

            <v-btn v-if="activeBtnAdd" color="secondary" dark class="mb-2"  @click="toggleModalViewAdd">
               <v-icon small :left="true"> add</v-icon> {{ $t("viewGeneral.btnAdd") }}
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
      param : "",
      activeBtnAdd : false,
    }
 },
  mounted() {
    this.validatePermissionObject();
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
    },

    /*---------------------------------------------------
    Name: validatePermissionObject
    Description: 
    Alters component: 
    ---------------------------------------------------*/
    validatePermissionObject() {
      
      let routeActual = this.$route.params.idObject;
      let foundValueFull = null
      this.$store.state.objectsPermissions.filter(
        function (category) {
           let foundValue = category.category_object.find( object => object.id == routeActual );
           if(foundValue != 'undefined' &&  foundValue != null )
            foundValueFull = foundValue;
            return  true;
        });
        
        //Validate permision ADD
        if(foundValueFull)
          if(foundValueFull.object_rol[0].add_data == "1")
            this.activeBtnAdd = true;
    },

 }
}

</script>