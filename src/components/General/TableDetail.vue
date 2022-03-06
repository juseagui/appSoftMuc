 <template>
    <v-card >
        <v-card-text v-for="itemGroup in dataField" 
        :key="itemGroup.id"
        style="padding : 15px;"  >
            <span class="text-h6" >{{itemGroup.name}} </span>
            <v-divider class="divider-group" ></v-divider>
            <v-container>
                <v-row>
                    
                    <!-- interaccion de campos de un determinado objecto -->
                    <v-col v-for="item in itemGroup.fields"
                        :key="item.id"
                        cols="12"
                        :sm="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '8' :'6' "
                        :md="item.type == 3 ? null : item.columns == 1 ? '12' : item.columns == 2 ? '6' :'4' ">

                        <!-- Validate if Type 1 or 7 -- text -->
                        <v-text-field
                            class="some-style"
                            v-if = "item.type == '1' || item.type == '7'"
                            :label="item.description"
                            :hint="item.hint == '' ? false : item.hint"
                            :value= item.value
                            readonly
                            disabled
                            dense
                            required>
                        </v-text-field>

                        <!-- Validate if Type 2 -- Email -->
                        <v-text-field
                        class="some-style"
                            v-else-if = "item.type == '2'"
                            prepend-icon="email"
                            :label="item.description"
                            :hint="item.hint == null ? '' : item.hint"
                            :value= item.value
                            readonly
                            disabled
                            dense
                            color = "#000000"
                            required>
                        </v-text-field>

                        <!-- Validate if Type 3 -- text Area -->
                            <v-textarea 
                            class="some-style"
                            v-else-if = "item.type == '3'"
                            :autocomplete= item.description
                            :value= item.value
                            readonly
                            auto-grow
                            rows="2"
                            disabled
                            dense
                            :label="item.description+ (item.required == 1  ?' *' : '')"
                            :hint="item.hint == '' ? false : item.hint"
                            >
                        </v-textarea>

                        <!-- Validate if Type 4 -- Date -->
                        <v-menu
                            v-else-if = "item.type == '4'"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                class="some-style"
                                :label="item.description"
                                prepend-icon="insert_invitation"
                                readonly
                                dense
                                disabled
                                :value= item.value
                                :hint="item.hint == '' ? false : item.hint"
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                        </v-menu>

                            <!-- Validate if Type 5 -- Number -->
                            <v-text-field
                            class="some-style"
                            v-else-if = "item.type == '5'"
                            :label="item.description"
                            type="number"
                            :hint="item.hint == '' ? false : item.hint"
                            :value= item.value
                            readonly
                            disabled
                            dense
                            required>
                        </v-text-field>

                        <!-- Validate if Type 6 -- Decimal -->
                            <v-text-field
                            class="some-style"
                            v-else-if = "item.type == '6'"
                            :label="item.description"
                            :hint="item.hint == '' ? false : item.hint"
                            :value= item.value
                            readonly
                            disabled
                            dense
                            required>
                        </v-text-field>

                        <v-divider ></v-divider>
                        
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ['dataField'],
   data: () => ({ 
       count : 0
   }),
}
</script>


<style scoped>

    .some-style >>> .v-input__slot::before {
        border-style: none !important;
    }

    .divider-group{
        margin-bottom: 10px;
    }

</style>

<style  >

    .theme--light.v-label--is-disabled{
    color: rgba(0, 0, 0, 0.87) !important;
    font-size: 18px;
    }

    .theme--light.v-input--is-disabled input, .theme--light.v-input--is-disabled textarea {
    color: rgb(0 0 0) !important;
    }

    .theme--light.v-input--is-disabled .v-input__prepend-outer{
    margin-top: 0px;

    }

</style>