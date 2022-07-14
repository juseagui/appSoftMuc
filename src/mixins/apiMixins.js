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

        async getDataObjectList(idObject, offset = 0, limit = 15, filterRelationship = {} ){
            
            let responseApi = [];
            let params = "";

            //validate if filter relationship
            if( Object.keys(filterRelationship).length > 0 )
                params += "&parentRelationship="+filterRelationship.parentRelationship+"&pkParentRelationship="+filterRelationship.pkParentRelationship;

            await this.axios
            .get( "/objects/data/" + idObject +"?offset="+ offset +"&limit="+ limit + params )
            .then((response) => {
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
            let params = "?object="+idObject+"&";
            //Defined action
            switch (option){
                case 'visible':
                    params += "visible=1"
                    break;
                case 'capture':
                    params += "capture=1&action="+action+"&pk="+pk
                    break;
            }

            await this.axios.get("/objects/field/"+params)
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
            .get( "/objects/field/" + pk + "?object="+ idObject )
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


        async getRelationshipObjects( pk, visible = null ){

            let responseApi = [];
            let params = "";

            if(visible)
                params = "?visible="+visible;
          
            await this.axios
            .get( "/objects/relations/"+pk+params )
            .then((response) => {
                responseApi.data = response.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch((error) => {
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
                console.log(data);
            });
            
            return responseApi;    
            
        },

        async postRelationshipObjects( data ){
            //var data is list

            let responseApi = [];
          
            await this.axios.post('objects/relations/', data )
            .then((response) => {
                responseApi.data = response.data;
                responseApi.code = 'OK';
                responseApi.msg = "";
            })
            .catch((error) => {
                responseApi.data = [];
                responseApi.code = 'ERROR';
                responseApi.msg = error.response.data;
                console.log(data);
            });
            
            return responseApi; 

        },

        async postDataObject(idObject, data){
            
            let responseApi = [];
            await this.axios.post('objects/data/?object='+idObject, data )
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
            await this.axios.patch('objects/data/'+pk+'/?object='+idObject, data )
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

        async getObjectsPermissions(){
            
            let responseApi = [];
            await this.axios
            .get( "/objects/permissions/" )
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

