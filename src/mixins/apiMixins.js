export const apiMixins = {
    methods: {

        async getObjects(){
            
            let responseApi = []
            await this.axios.get('/objects/objects/')
            .then( response => {
                responseApi.data = response.data.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch(error=>{
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
                //console.log(data);
            });

            return responseApi;            
            
        },

        async getDataObjectList(idObject, offset = 0, limit = 15){
            debugger
            let responseApi = [];
            await this.axios
            .get( "/objects/getDataObject/" + idObject +"?offset="+ offset +"&limit=" +limit )
            .then((response) => {
                console.log(response)
                responseApi.data = response.data.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch((error) => {
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
                //console.log(data);
            });
            
            return responseApi;    
            
        },

        async getpropertyFieldObject(idObject, option = 'visible' ,action = 'add', pk = ""){

            let responseApi = [];
            let params = "?";
            //Defined action
            switch (option){
                case 'visible':
                    params += "visible=1"
                    break;
                case 'capture':
                    params += "capture=1&action="+action+"&pk="+pk
                    break;
            }

            await this.axios.get("/objects/FieldObject/" + idObject + params)
            .then((response) => {
                responseApi.data = response.data.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch((error) => {
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data.data;
                console.log(data);
            });
            
            return responseApi;    
            
        },

        async getpropertyFieldValuesObject(idObject, pk ){

            let responseApi = [];
          
            await this.axios
            .get( "/objects/getDetailItemObject/" + pk + "?object="+ idObject )
            .then((response) => {
                responseApi.data = response.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch((error) => {
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
                //console.log(data);
            });
            
            return responseApi;    
            
        },


        async postDataObject(idObject, data){
            
            let responseApi = [];
            await this.axios.post('objects/FieldObject/?object='+idObject, data )
            .then( response =>{
                responseApi.data = [];
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch(error=>{
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
            })
            
            return responseApi;
        },

        async patchDataObject(idObject, data, pk){
            
            let responseApi = [];
            await this.axios.patch('objects/FieldObject/'+pk+'/?object='+idObject, data )
            .then( response =>{
                responseApi.data = [];
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch(error=>{
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
            })
            
            return responseApi;
        },

        async getpropertyFieldValuesObject(idObject, pk ){

            let responseApi = [];
          
            await this.axios
            .get( "/objects/getDetailItemObject/" + pk + "?object="+ idObject )
            .then((response) => {
                responseApi.data = response.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch((error) => {
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
            });
            
            return responseApi;    
            
        },

        async getObjectsPermissions(){
            
            let responseApi = [];
            await this.axios
            .get( "/objects/objectsPermissions/" )
            .then((response) => {
                responseApi.data = response.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch((error) => {
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
                //console.log(data);
            });
            
            return responseApi;  
        },

        async AuthenticateUser(payload){
            
            let responseApi = []
            await this.axios.post('/login/', payload )
            .then( response => {

                localStorage.setItem('token', response.data.token );
                localStorage.setItem('refresh_token', response.data.refresh_token );
                localStorage.setItem('username', response.data.user.username );
                localStorage.setItem('last_name', response.data.user.last_name );
                localStorage.setItem('email', response.data.user.email );
                localStorage.setItem('id', response.data.user.id );
                
                responseApi.data = response.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch(error=>{
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
            });

            return responseApi;            
            
        }

    }
};

