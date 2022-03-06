export const processData = {
    methods: {

        structureDataField( data ){
            debugger
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
          }
    }

};