export const processData = {
    methods: {

        structureDataField( data ){
            let groupId = [];
            let propsGroup = [];
            if( data ){
              let arrayTemp = [];
              let arrayGroup = [];
              let countData = data.length;
              let countInt = 0;
              
                data.forEach(ele => {                 
                    let register = false;
                    if ( ele.object_group.id != groupId.id && groupId.id != undefined  ){
                        
                        arrayGroup = groupId;
                        arrayGroup['fields']= arrayTemp;
                        propsGroup.push( arrayGroup );
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
                        propsGroup.push( arrayGroup );
                       
                    }
                });
            }
            
            return propsGroup;
          },


        generateCounPaginator( dataCount, itemsPerPage ){
            return Math.ceil(dataCount / itemsPerPage);
        },

        calculateCountPage( page, itemsPerPage ){
            let ini = 0;
            let limit = 0;

            if (page == 1 || page == 0) {
                limit = itemsPerPage;
            } else {
                ini = itemsPerPage * (page - 1);
                limit = itemsPerPage;
            }
            
            return { ini, limit }
        },

        structureDataFiltering( data ){
            let PropertysFilter = []
            data.forEach( item => {
                PropertysFilter.push({
                    name : item.name,
                    description : item.description,
                    type : item.type,
                    filter : {
                        value : null,
                        operation : null
                    }
                })
            })
            return PropertysFilter;
        }   

    }

};