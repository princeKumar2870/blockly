export function defineCustomBlocks(){
const definitions = Blockly.common.createBlockDefinitionsFromJsonArray([{
    type:'my_custom_block',
    message0:'move forward %1',
    args0:[
        {
            type:'field_number',
            name:'FIELD_NAME'
        }
    ],
    previousStatement:null,
    nextStatement:null,
}]);
Blockly.common.defineBlocks(definitions)
}