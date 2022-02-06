export const apiMixins = {
    methods: {

        async getObjects(){
            
            let responseApi = []
            await this.axios.get('/objects/objects/')
            .then( response => {
                //console.log( response.data );
                responseApi.data = response.data;
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

        async getpropertyFieldObject(idObject, action = 'visible'){

            let responseApi = [];
            let params = "?";
            //Defined action
            switch (action){
                case 'visible':
                    params += "visible=1"
                    break;
                case 'capture':
                    params += "capture=1"
                    break;
            }

            await this.axios.get("/objects/getFieldObject/" + idObject + params)
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
            
        }

    }
};