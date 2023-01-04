<template>
    <v-toolbar flat class="toolbar-margin-person">
        
        <v-toolbar-title>
          <b>{{ titleObject }}</b>
          <v-row dense v-show="source == 'detailGeneral' || source == 'detailObject' || source == 'detailUser'" >
            <v-col style = "    font-weight: 500; letter-spacing: 0.0125em !important; font-size: 0.83em;" >
              <v-icon dense>hotel_class</v-icon>
              {{codeTitle}}
            </v-col>
          </v-row>
      
        </v-toolbar-title>
        
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon @click="$router.go(-1)">
          <v-icon>keyboard_return</v-icon>
        </v-btn>
        <v-btn icon @click="toggleModalViewFilter" v-show="source == 'ListGeneral'">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon @click="toggleModalViewEdit"
        v-show=" activeBtnEdit && (source == 'detailGeneral' || source == 'detailObject' || source == 'detailUser' ) ">
          <v-icon>edit_note</v-icon>
        </v-btn>
        <v-btn icon @click="toggleModalRelationship"
        v-show="source == 'detailObject'">
          <v-icon>view_quilt</v-icon>
        </v-btn>
        <v-btn icon @click="toggleModalChangePassword"
        v-show="source == 'detailUser'">
          <v-icon>lock_reset</v-icon>
        </v-btn>
 
        <v-spacer></v-spacer>


    
      <v-card
      class="mx-auto style-card-person"
      max-width="164"
      max-height = "84"
      elevation="0"
      flat   
      rounded= false
      :key="index"
      v-for="(item, index) in headersDetail"
      >
        <v-list-item  three-line>
          <v-list-item-content>
          <div class="text-overline-person">
            {{item.text}}
          </div>

          
            <v-list-item-title v-if="item.chip == false" class=" mb-1">
              <v-icon dense>{{item.ico}}</v-icon>
            <b>{{item.value}}</b>
            </v-list-item-title>

            <v-list-item-title v-else="item.chip == false" class=" mb-1">
              <v-chip
              color="primary"
              pill
              >
              {{item.value}}
                <v-icon>
                  {{item.ico}}
                </v-icon>
            </v-chip>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-card>

        <v-btn v-if="activeBtnAdd" color="secondary" dark class="mb-2" @click="toggleModalViewAdd" v-show="source == 'ListGeneral'">
         <v-icon small :left="true">add</v-icon> {{ $t("viewGeneral.btnAdd")}}
        </v-btn>

      </v-toolbar>
</template>

<script>


export default {
  name: "toolbarGeneral",
  props: ['titleObject','codeTitle','source','headersDetail'],
  data() {
    return {
      param : "",
      activeBtnAdd : true,
      activeBtnEdit : true,
    }
  },
  mounted() {
    this.validatePermissionObject();
  },
  methods: {
    /*---------------------------------------------------
    Name: toggleModalViewAdd
    Description: 
    Alters component: 
    ---------------------------------------------------*/
    toggleModalViewAdd() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit('listenerToolbar', 'add', null, false); 
    },

    /*---------------------------------------------------
    Name: toggleModalViewEdit
    Description:
    Alters component: 
    ---------------------------------------------------*/
    toggleModalViewEdit() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit('listenerToolbar', 'edit', this.codeTitle, false, this.$route.params.idObject); 
    },

     /*---------------------------------------------------
    Name: toggleModalViewEdit
    Description:
    Alters component: 
    ---------------------------------------------------*/
    toggleModalViewFilter() {
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit( 'listenerToolbarFilter' ); 
    },

    /*---------------------------------------------------
    Name: toggleModalRelationship
    Description:
    Alters component: 
    ---------------------------------------------------*/
    toggleModalRelationship() {      
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit( 'listenerToolbarRelationship' ); 
    },

    /*---------------------------------------------------
    Name: toggleModalChangePassword
    Description:
    Alters component: 
    ---------------------------------------------------*/
    toggleModalChangePassword() {   
      console.log("🚀 ~ file: ToolbarGeneral.vue:149 ~ toggleModalChangePassword ~ this.$data")
      Object.assign(this.$data, this.$options.data.call(this));
      this.$emit( 'listenerToolbarChangePassword' ); 
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
          if(foundValueFull.object_rol[0].add_data != "1")
            this.activeBtnAdd = false;
          if(foundValueFull.object_rol[0].edit_data != "1")
            this.activeBtnEdit = false;
    },
        
 }
}
</script>


<style scoped>
    .toolbar-margin-person {
    margin-top: 6px;
    margin-bottom: 10px;
    }

    .text-overline-person {
      font-size: 0.75rem !important;
      font-weight: 500;
      font-family: "Roboto", sans-serif !important;
      text-transform: uppercase !important;
    }

    .style-card-person:after{
        content: "";
      background: rgba(0, 0, 0, 0.12);
      position: absolute;
      bottom: 0;
      left: 10;
      top: 0.6cm;
      height: 50%;
      width: 1px;
    }

</style>
