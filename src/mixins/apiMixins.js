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

        async postObject( data ){
           
            //transform information important for the service
            data.category_object = data.category_object_id;
            delete data.category_object_id;

            let responseApi = [];
            await this.axios.post('objects/objects/', data )
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

        async getDataObjectList(idObject, offset = 0, limit = 15, filterRelationship = {} ){
            
            let responseApi = [];
            let params = "";

            //validate if filter relationship
            if( Object.keys(filterRelationship).length > 0 )
                params += "&parentRelationship="+filterRelationship.parentRelationship+"&pkParentRelationship="+filterRelationship.pkParentRelationship;

            await this.axios
            .get( "/objects/data/" + idObject +"?offset="+ offset +"&limit="+ limit + params)
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

        async getDataObjectListFilter(idObject, offset = 0, limit = 15, filterData = [] ){
            let responseApi = [];

            await this.axios
            .put( "/objects/data/" + idObject +"/?offset="+ offset +"&limit="+ limit, filterData )
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
            });
            
            return responseApi;    
            
        },

        async getpropertyFieldValuesObject(idObject, pk ){

            let responseApi = [];
          
            await this.axios
            .get( "/objects/field/" + pk + "?object="+ idObject )
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
                responseApi.data = response.data.data;
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

        //field
        async postFieldObject( data ){
            
            //transform information important for the service
            data.object_field = data.object_field_id;
            data.object_group = data.object_group_id;
            data.object_relationship = data.object_relationship_id;
            data.object_list = data.object_list_id;
            delete data.object_field_id;
            delete data.object_group_id;
            delete data.object_relationship_id;
            delete data.object_list_id;

            let responseApi = [];
            await this.axios.post('objects/field/', data )
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

        async patchFieldObject(data, pk){

            //transform information important for the service
            data.object_field = data.object_field_id;
            data.object_group = data.object_group_id;
            data.object_relationship = data.object_relationship_id;
            data.object_list = data.object_list_id;
            delete data.object_field_id;
            delete data.object_group_id;
            delete data.object_relationship_id;
            delete data.object_list_id;
            
            let responseApi = [];
            await this.axios.patch('objects/field/'+pk+'/', data )
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

        async getProcess( idProcess ){
            
            let responseApi = [];
            await this.axios
            .get( "/objects/procesess/"+idProcess )
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

        async patchProcess(idProcess, data ){
            
            let responseApi = [];
            await this.axios.patch('objects/procesess/'+idProcess+'/', data )
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

        async postProcess( data ){
            
            let responseApi = [];
            await this.axios.post('objects/procesess/', data )
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

        async postHistorical( data ){
            
            let responseApi = [];
            await this.axios.post('objects/historical/', data )
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
            
        },

        // Reports
        async getReportProcess( idReport, resource = 'process' ){
            
            let responseApi = {};
            await this.axios
            .get( "/objects/reports/" + resource + "/"+idReport )
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


    }
};

