<template>
  <v-row justify="center">
    <v-dialog
      v-model="openModal"
      persistent
      max-width="1200px"
    >
      <v-card >
         <v-form 
          v-model="valid"
          ref="form">
        <v-card-text v-for="(itemGroup, index) in propsGroup" 
        style="padding : 15px;"
        :key="index"  >
         <v-alert
          border="left"
          style=" margin-bottom: 0px; "
          colored-border
          :dense="true"
          color="primary"
          transition = "expand-x-transition"
          elevation="0">
            <span class="text-h6" >{{itemGroup.name}} </span>
         </v-alert>
         
         
            <v-container>
                <v-row>
                    <!-- interaccion de campos de un determinado objecto -->
                    <v-col v-for="(item, index) in itemGroup.fields"
                        :key="index"
                        cols="12"
                        :sm="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '8' :'6' "
                        :md="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '6' :'4' ">

                        <!-- Validate if Type 1 -- text -->
                        <v-text-field
                          v-if = "item.type == '1'"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac 
                          :rules="[rules.required(item.description, item.required)]"
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          v-model ="item.value"
                          required>
                        </v-text-field>

                        <!-- Validate if Type 2 -- Email -->
                        <v-text-field
                          v-else-if = "item.type == '2'"
                          prepend-icon="email"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac 
                          :rules ="[rules.required(item.description, item.required), rules.emailRules() ]"
                          :hint="item.hint == null ? '' : item.hint"
                          :name = item.name
                          v-model ="item.value"
                          required>
                        </v-text-field>

                        <!-- Validate if Type 3 -- text Area -->
                         <v-textarea 
                          v-else-if = "item.type == '3'"
                          :autocomplete= item.description
                          auto-grow
                          :counter= item.number_charac
                          rows="2"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :rules ="[rules.required(item.description, item.required)]"
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          v-model ="item.value"
                          >
                        </v-textarea>

                        <!-- Validate if Type 4 -- Date -->
                        <v-menu
                          v-else-if = "item.type == '4'"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="date"
                              :label="item.description+ (item.required == 1  ?' *' : '')"
                              prepend-icon="insert_invitation"
                              :rules ="[rules.required(item.description,  item.required)] "
                              :hint="item.hint == '' ? false : item.hint"
                              :name = item.name
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>

                         <!-- Validate if Type 5 -- Number -->
                         <v-text-field
                          v-else-if = "item.type == '5'"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac
                          type="number"
                          :rules="[rules.required(item.description, item.required), rules.number()] "
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          v-model ="item.value"
                          required>
                        </v-text-field>

                        <!-- Validate if Type 6 -- Decimal -->
                         <v-text-field
                          v-else-if = "item.type == '6'"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          counter= item.number_charac
                          :rules="[rules.required(item.description, item.required)] "
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          v-model ="item.value"
                          required>
                        </v-text-field>

                    </v-col>
                </v-row>
            </v-container>
          
        </v-card-text>

         <v-divider ></v-divider>
          <v-card-actions>
            <small>* indicates required field</small>
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              text
              @click="close()"
            > Close
            </v-btn>
            <v-btn
              color="primary darken-1"
              text
              :disabled="!valid"
              @click="validate()"
            > Save
            </v-btn>
          </v-card-actions>

        </v-form>
       

      </v-card>
      <v-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  //import mixins
  import {apiMixins} from '@/mixins/apiMixins.js'

  export default {
    //Creacion de propiedad para manipular la visibilidad del modal
    props: ['openModal','operationModel'],
    data: () => ({ 
      propsField :[],
      propsGroup: [],
      dataFieldObject: [],
      open : 0,
      valid : false,
      //Data for Datapicker
      date: null,
      menu2: false,
      
      //rules in the fields
      rules: {
        emailRules(){
          return v => /.+@.+/.test(v) || 'E-mail must be valid';
        },
        required(name, required){
          if(required== 1)
            return v => !!v ||  name+' is required';
          else
           return true
        },
        number(){
          return v => !Number.isInteger(v) || 'Only number'
        }
      },

      //Vars for capture data form
      fieldsData : [],

    }),
    async beforeUpdate() {
         if( this.open == 0 && this.dataFieldObject && this.openModal ){
            await this.getDataForm();
            this.structureDataField();
         }
    },
    methods: {
        close(){
            //Se envia el parametro a la vista por medio del emit para cerrar el modal
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit('listenerModal');    
        },
        //Validate fields
        validate () {
          debugger
          let validForm = this.$refs.form.validate();
          let fieldsDataPost = [];

          if(validForm){
            let propsFieldGroup = this.propsGroup;
            propsFieldGroup.forEach( group => { 
              group.fields.forEach( field => {
                fieldsDataPost.push({
                  value : field.value,
                  type : field.type,
                  name : field.name
                })
              }) 
              })
            console.log(fieldsDataPost);
          }

        },
        async getDataForm(){
            if(this.openModal && this.dataFieldObject ){
                
                //validate action Add or Edit
                if(this.operationModel.action == "edit" && this.operationModel.pk != "" ){
                  
                  let dataPropListValues = await this.getpropertyFieldValuesObject(this.$route.params.idObject, this.operationModel.pk );

                  if(dataPropListValues.code == 'OK'){
                      this.dataFieldObject = dataPropListValues.data.data;
                      this.open++;
                  }

                }else if(this.operationModel.action == "add"){

                  let dataPropertyList = await this.getpropertyFieldObject(this.$route.params.idObject, 'capture' );
      
                  if(dataPropertyList.code == 'OK'){
                      this.dataFieldObject = dataPropertyList.data;
                      this.open++;
                  }
                }
            }
        },
        structureDataField(){
            
            let groupId = [];
            if(this.dataFieldObject ){
                this.propsGroup = [];
                let arrayTemp = [];
                let arrayGroup = [];
                let countData = this.dataFieldObject.length;
                let countInt = 0;
                let prueba=[];

                this.dataFieldObject.forEach(ele => {                 
                  let register = false;
                  if ( ele.object_group.id != groupId.id && groupId.id != undefined  ){
                      
                      arrayGroup = groupId;
                      arrayGroup['fields']= arrayTemp;
                      this.propsGroup.push( arrayGroup );
                      prueba = this.propsGroup;
                      arrayTemp = [];
                      arrayGroup=[];
                      register = true;
                      
                  }
                  arrayTemp.push(ele);
                  groupId = ele.object_group;
                  countInt++;

                  if(countInt == countData ){
                      arrayGroup = groupId;
                      arrayGroup['fields']= arrayTemp;
                      this.propsGroup.push( arrayGroup );
                      prueba = this.propsGroup;
                  }
                });

            }
        }

    },
     mixins: [apiMixins]
    
  }
  
</script>

