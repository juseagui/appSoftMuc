<template>
  <div class="text-center">
    <v-bottom-sheet v-model="openModalFilter" persistent >
      <v-sheet class="text-center">
        <v-btn
          class="mt-6"
          text
           color="primary darken-1"
          @click="close()"
        >
					{{ $t("FilterFormGeneral.msgBtnClose") }}
        </v-btn>

				<v-btn
          class="mt-6"
          text
           color="primary darken-1"
          @click="restartFilter()"
        >
          {{ $t("FilterFormGeneral.msgBtnRestart") }}
        </v-btn>

				<v-btn
          class="mt-6"
          text
           color="primary darken-1"
          @click="close()"
        >
          {{ $t("FilterFormGeneral.msgBtnFilter") }}
        </v-btn>

				<v-container>
							<v-subheader> {{ $t("FilterFormGeneral.titleSubHeader") }} </v-subheader>
							<v-row>
								
								<v-col v-for=" (item, index) in dataFilterField "
								:key="index"
								cols="4">

									<v-row>
										<v-col>
											<v-text-field
											:label="item.description"
											:name="item.name"
											v-model="item.filter.value"
											>
											</v-text-field>
										</v-col>

										<v-col cols="5">
											<v-select
												:items="itemsFiltering"
												label="Operación"
												v-model="item.filter.operation"
												item-text="description"
                        item-value="code"
												solo
											></v-select>
										</v-col>
									</v-row>
								</v-col>

							</v-row>
			 	</v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>

export default {
	name: "FilterFormGeneral",
	props: ['openModalFilter','dataFilterField'],
	data() {
		return {
			source : "FilterFormGeneral",

			itemsFiltering : [ 
				{ 'description' : 'Igual' , 'code' : 'equal' },
				{ 'description' : 'Diferente' , 'code' : 'different' },
				{ 'description' : 'Contenga' , 'code' : 'contain' }
			]
		}   
	},
	methods : {
		/*---------------------------------------------------
		Name: close
		Description: Notify modal closes
		Alters component:
		---------------------------------------------------*/
		close(){
				//The parameter is sent to the view through the emit to close the modal
				Object.assign(this.$data, this.$options.data.call(this));
				this.$emit( 'listenerModalFilter' );    
		},

		/*---------------------------------------------------
		Name: restartFilter
		Description: reset the filters
		Alters component:
		---------------------------------------------------*/
		restartFilter(){
				this.dataFilterField.map( function(item) {
						item.filter.value = null;
						item.filter.operation = null;
						return item;
				});
		},

	}
}

</script>