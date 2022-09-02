<template>
  <v-row justify="center">
    <v-dialog
      v-model="openModal"
      persistent
      max-width="1200px"
    >
      <v-card>
        <v-form 
          v-model="valid"
          ref="form">
          <v-card-text v-for="(itemGroup, index) in propsGroup" 
          style="padding : 15px;"
          :key="index"   >
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
                    <v-col v-for="(item, index) in itemGroup.fields "
                        :key="index"
                        cols="12"
                        :sm="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '8' :'6' "
                        :md="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '6' :'4' ">

                        <!-- Validate if Type 1 -- text -->
                        <v-text-field
                          v-if = "item.type == '1'"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac 
                          :rules="[rules.required(item.description, item.required), rules.validateMax(item.number_charac )]"
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          v-model="item.value"
                          :readonly="validateIsEdit( item.edit, item.name, item.type )"
                          :disabled="validateIsEdit( item.edit, item.name, item.type )"
                          required>
                        </v-text-field>

                        <!-- Validate if Type 2 -- Email -->
                        <v-text-field
                          v-else-if = "item.type == '2'"
                          prepend-icon="email"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter= item.number_charac 
                          :rules ="[rules.required(item.description, item.required), rules.emailRules(),
                                    rules.validateMax(item.number_charac)]"
                          :hint="item.hint == null ? '' : item.hint"
                          :name = item.name
                          v-model="item.value"
                          :readonly="validateIsEdit( item.edit, item.name, item.type )"
                          :disabled="validateIsEdit( item.edit, item.name, item.type )"
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
                          :rules ="[rules.required(item.description, item.required),rules.validateMax(item.number_charac)]"
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          :readonly="validateIsEdit( item.edit, item.name, item.type )"
                          :disabled="validateIsEdit( item.edit, item.name, item.type )"
                          v-model="item.value"
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
                              v-model="item.value"
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
                            v-model ="item.value"
                            @input="menu2 = false"
                          ></v-date-picker>
                        </v-menu>

                         <!-- Validate if Type 5 -- Number -->
                         <v-text-field
                          v-else-if = "item.type == '5' && item.type_relation != 2"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :counter=item.number_charac
                          :rules="[ rules.number(), rules.required(item.description, item.required), rules.validateMax(item.number_charac) ] "
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          :readonly="validateIsEdit( item.edit, item.name, item.type )"
                          :disabled="validateIsEdit( item.edit, item.name, item.type )"
                          v-model="item.value">
                        </v-text-field>

                        <!-- Validate if Type 5 -- Number and relational -->
                        <v-select
                          v-else-if = "item.type == '5' && item.type_relation == 2  "
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :rules ="[rules.required(item.description,  item.required)] "
                          :hint="item.hint == '' ? false : item.hint"
                          :name = item.name
                          :readonly="true"
                          :disabled="validateIsEdit( item.edit, item.name, item.type )"
                          append-outer-icon="content_paste_search"
                          @click:append-outer="searchObjectRecord( item, item.name )"
                          :items="[ (item.value ? ( item.value.description ? item.value : {} ) : {} ) ]"
                          item-text="description"
                          item-value="code"
                          class="container-relational-select"
                          v-model="item.value"
                          return-object>
                      </v-select>

                        <!-- Validate if Type 7 -- list -->
                         <v-select
                          v-else-if = "item.type == '7'"
                          :label="item.description+ (item.required == 1  ?' *' : '')"
                          :rules ="[rules.required(item.description,  item.required)] "
                          v-model=item.value
                          :hint="item.hint == '' ? false : item.hint"
                          :items="item.object_list.ListValues"
                          item-text="description"
                          item-value="code"
                          :readonly="validateIsEdit( item.edit, item.name, item.type )"
                          :disabled="validateIsEdit( item.edit, item.name, item.type )"
                          return-object
                        ></v-select>
                      
                    </v-col>
                </v-row>
            </v-container>

          </v-card-text>
          
          <v-divider v-if="existProcess"></v-divider>

          <GroupActivity v-if="existProcess" :activities="activities" :historical="historical" :historicalSend="objeHistoricalSend"></GroupActivity>

          <FormSearchRecord :dataTableSearch="dataTableSearch" 
          :title="titleFormSearch" 
          :openModalSearch="openModalSearch"
          :codeInput = "codeInput"
          @listenerModalFormSearchRecord="listenerModalFormSearchRecord" 
          @listenerChangePageFormSearchRecord ="listenerChangePageFormSearchRecord"
          ></FormSearchRecord>

          <v-divider class="mt-4" ></v-divider>
          <v-card-actions>
            <small>{{$t("FormGeneral.msgRequiredModal")}}</small>
            <v-spacer></v-spacer>
            <v-btn
              color="primary darken-1"
              text
              @click="close()"
            > {{$t("FormGeneral.btnClose")}}
            </v-btn>
            <v-btn
              color="primary darken-1"
              text
              :disabled="!valid"
              @click="validate()"
            > {{$t("FormGeneral.btnSave")}}
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
  
  import {mapMutations} from "vuex";
  import GroupActivity from "@/components/Process/GroupActivity";
  import FormSearchRecord from "@/components/General/FormSearchRecord";
  
  //import mixins
  import {apiMixins} from '@/mixins/apiMixins.js'
  import {processData} from '@/mixins/processData.js'

  
  export default {
    //Creation of property to manipulate the visibility of the modal
    props: ['openModal','operationModel','idObject','source','isRelationship'],
    data: () => ({ 
      propsGroup: [],
      dataFieldObject: [],
      cloneDataObject: [],
      open : 0,
      valid : false,
      pk : null,
      //Data for Datapicker
      menu2: false,
      
      //rules in the fields
      rules: {
        number() {
          return v=> /^[0-9]+$/.test(v) || (  (v == '' || v== undefined ) ? true : 'Solo numeros' );
        },

        emailRules(){
          return v => /.+@.+/.test(v) || 'E-mail debe ser valido';
        },

        required(name, required){
          if(required== 1)
            return v => !!v ||  name+' es requerido';
          else
            return true
        },

        validateMax(max){
          return v => (v || '').toString().length <= max || `Un maximo de ${max} caracteres son permitidos`
        },

      },

      //Vars for capture data form
      fieldsData : [],
      operationLocal : [],

      //attributes for the component GroupActivity
      activities : [],
      historical : [],
      objeHistoricalSend : {
        description : "",
        id_record : null,
        object_historical : null,
        process_historical : null,
        activity_historical : null
      },
      existProcess : false,

      //data for modal select item relation in object
      dataTableSearch : {
        idObject : 0,
        headersTable: [],
        dataTable : [],
        dataTableCount : 0,
        dataPaginator : { pageCount: 0 , pageIni: 1 },
        itemsPerPage: 10
      },
      openModalSearch : false,
      titleFormSearch : "",
      codeInput : "",

    }),
    async beforeUpdate() {
         if( this.open == 0 && this.dataFieldObject && this.openModal ){
            await this.getDataForm();
            //Clone non-reactive object
            this.cloneDataObject = JSON.parse(JSON.stringify(this.dataFieldObject));
            this.propsGroup = this.structureDataField( this.dataFieldObject );
            this.operationLocal = this.operationModel;
         }
    },
    components: {
    GroupActivity,
    FormSearchRecord,
    FormSearchRecord
},
    methods: {
        ...mapMutations(['mostrarLoading','ocultarLoading',]),

        /*---------------------------------------------------
        Name: close
        Description:
        Alters component:
        ---------------------------------------------------*/
        close(save=false){
            //Se envia el parametro a la vista por medio del emit para cerrar el modal
            Object.assign(this.$data, this.$options.data.call(this));
            this.$emit('listenerModal', null, null, save, null , this.isRelationship );    
        },

        /*---------------------------------------------------
        Name: validate
        Description: Validate fields and request post and historical record
        Alters component:
        ---------------------------------------------------*/
        async validate (){
          
          let validForm = this.$refs.form.validate();
          let fieldsDataPost = {};
          if(validForm){
            let propsFieldGroup = this.propsGroup;
            propsFieldGroup.forEach( group => { 
              group.fields.forEach( field => {
                if( (field.type == '7') || (field.type == '5' && field.type_relation == '2' ) )
                  fieldsDataPost[field.name] = ( field.value?.description ? field.value?.code : null );
                else
                  fieldsDataPost[field.name] = field.value == '' ? null : field.value;
              }) 
              })
            
            let responsePost = [];
            this.mostrarLoading({ titulo : 'Guardando Registro'});
            await new Promise(resolve => setTimeout(resolve, 1000))
            
            //send data capture in the form - api
            if(this.operationLocal.action == "add"){

              if( this.source == "ListObjects" )
                responsePost = await this.postObject( fieldsDataPost );
              else if( this.idObject == '3' )                
                responsePost = await this.postFieldObject( fieldsDataPost );
              else
                responsePost = await this.postDataObject(this.idObject, fieldsDataPost );
              
            }else{

              if( this.idObject == '3' )
                responsePost = await this.patchFieldObject( fieldsDataPost, this.operationLocal.pk );
              else
                responsePost = await this.patchDataObject(this.idObject, fieldsDataPost, this.operationLocal.pk  );
            }

            if( responsePost.code == 'OK' ){
              //validate if exist process

              if(this.existProcess && this.source != "ListObjects" ){
                this.objeHistoricalSend.id_record =  this.operationLocal.action == 'add' ? responsePost.data.id  : this.operationLocal.pk;
                this.objeHistoricalSend.object_historical = this.idObject;
                this.objeHistoricalSend.process_historical = this.activities[0].process_activity;

                //Send Historial
                await this.postHistorical( this.objeHistoricalSend );
              
              }

              this.close(true);
            }
            this.ocultarLoading()
          }

        },

        /*---------------------------------------------------
        Name: getDataForm
        Description:
        Alters component:
        ---------------------------------------------------*/
        async getDataForm(){
            if(this.openModal && this.dataFieldObject ){
                  this.pk =  this.operationModel.pk;
                  let dataPropertyList = await this.getpropertyFieldObject(this.idObject, 'capture', this.operationModel.action  , this.pk );
                  if(dataPropertyList.code == 'OK'){
                      this.dataFieldObject = dataPropertyList.data.data;

                      //validate if object exist process 
                      if( dataPropertyList.data.process.activities.length > 0 ){
                        this.existProcess = true;
                        this.activities = dataPropertyList.data.process.activities;
                        this.historical = dataPropertyList.data.process.historical;
                      }
                      this.open++;
                  }
            }
        },
        
        /*---------------------------------------------------
        Name: validateIsEdit
        Description: function that allows to validate if the field is editable according to its properties
        Alters component:
        ---------------------------------------------------*/
        validateIsEdit( edit, propertyName, type ){

          if( this.operationModel.action == 'edit' ){
            //find the initial value
            let foundFieldProperty = this.cloneDataObject.find( fieldProperty => fieldProperty.name === propertyName );

            let oldValueField = null;
            if( type == '7' )
              oldValueField = foundFieldProperty.value.description;
            else
              oldValueField = foundFieldProperty.value;

            if( oldValueField == null ){
              return false; 
            }else{
              return edit == '1' ? false : true;
            }
        
          }
        },

        /*---------------------------------------------------
        Name: searchObjectRecord
        Description:
        Alters component: FormSearchRecord
        ---------------------------------------------------*/
        async searchObjectRecord( item , codeInput ){
        
          let dataObject = await this.getDataObjectList( item.object_relationship?.id , 0, this.dataTableSearch.itemsPerPage );

          //reset object
          this.dataTableSearch = {
            idObject : 0,
            headersTable: [],
            dataTable : [],
            dataTableCount : 0,
            dataPaginator : { pageCount: 0 , pageIni: 1 },
            itemsPerPage: 10
          };

          if(dataObject.code == 'OK'){

            this.dataTableSearch.dataTable = dataObject.data.data;
            this.dataTableSearch.dataTableCount = dataObject.data.count;
            this.dataTableSearch.idObject = item.object_relationship?.id;
            this.dataTableSearch.dataPaginator.pageCount = this.generateCounPaginator( this.dataTableSearch.dataTableCount, this.dataTableSearch.itemsPerPage );

             //Get field for list
            let dataPropertyList = await this.getpropertyFieldObject( item.object_relationship?.id , 'visible' );
            
            if(dataPropertyList.code == 'OK'){
              this.titleFormSearch = dataPropertyList.data.data[0].object_field.name;
              var arrTempHeader = [];
              var jsonDataHeader = {};

              dataPropertyList.data.data.forEach((element) => {
                jsonDataHeader = {
                  text: element.description,
                  value: element.name,
                };
                arrTempHeader.push(jsonDataHeader);
              });

              this.dataTableSearch.headersTable = arrTempHeader.concat(this.dataTableSearch.headersTable);

              this.codeInput = codeInput;
              this.openModalSearch = true;
            }
          }
        },

        /*---------------------------------------------------
        Name: listenerModalFormSearchRecord
        Description:
        Alters component: FormSearchRecord
        ---------------------------------------------------*/
        listenerModalFormSearchRecord( save = false, data, codeInput  ){

          let itemNew = {};

          if(save){
            this.propsGroup.some( function(group) {           
            itemNew = group.fields.find( ele => ele.name === codeInput );
            if(itemNew)
              return true;
            });

            itemNew.value = {
              'code' : data.id.toString(),
              'description' : data[ itemNew.object_relationship.representation ]
            };

          }

          this.openModalSearch = false;
        },

        /*---------------------------------------------------
          Name: listenerChangePageFormSearchRecord
          Description:
          Alters component: FormSearchRecord
          ---------------------------------------------------*/
        async listenerChangePageFormSearchRecord( page ){

          let resultCountPage = this.calculateCountPage( page, this.dataTableSearch.itemsPerPage );
          let dataObject = await this.getDataObjectList( this.dataTableSearch.idObject, resultCountPage.ini, resultCountPage.limit );

          if( dataObject.code == 'OK' ){
            this.dataTableSearch.dataPaginator.pageIni = page
            this.dataTableSearch.dataTable = dataObject.data.data;
            this.dataTableSearch.dataPaginator.pageCount  = this.generateCounPaginator( this.dataTableSearch.dataTableCount, this.dataTableSearch.itemsPerPage );
          }
        }
    },
    mixins: [apiMixins, processData]
    
  }
  
</script>


<style>
.v-application--is-ltr .container-relational-select .v-input__append-inner{
  display: none !important;
}

</style>
