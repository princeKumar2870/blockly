import React, { useRef, useEffect } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import * as en from 'blockly/msg/en';      // Optional: import JavaScript generator

function App() {
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  function defineCustomBlocks(){
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
defineCustomBlocks()
  useEffect(()=>{
    Blockly.setLocale(en)
   const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      colour: '#5C81A6',
      contents: [
        { kind: 'block', type: 'controls_if' }
      ]
    },
    {
      kind: 'category',
      name: 'Loops',
      colour: '#5CA65C',
      contents: [
        { kind: 'block', type: 'controls_repeat_ext' },
        { kind: 'block', type: 'controls_whileUntil' }
      ]
    },
    {
      kind: 'category',
      name: 'Custom',
      colour: '#A65C81',
      contents: [
        { kind: 'block', type: 'my_custom_block' }   
      ]
    }
  ]
};
    workspaceRef.current = Blockly.inject(blocklyDiv.current,{
      toolbox:toolbox,
      transhan:true
    });
  },[])
  return(
    <div ref={blocklyDiv} style={{ height: '480px', width: '600px', border: '1px solid #ccc' }}>
    </div>
  )
}
export default App;


// import React, { useRef, useEffect } from 'react';
// import * as Blockly from 'blockly/core';
// import 'blockly/blocks';
//  // after blocks
// import 'blockly/javascript';
// import * as en from 'blockly/msg/en';
// function App() {
//   const blocklyDiv = useRef(null);
//   const workspaceRef = useRef(null);

//   useEffect(() => {
//     Blockly.setLocale(en)
//     Blockly.setLocale(Blockly.Msg);

//     const toolbox = {
//       kind: 'flyoutToolbox',
//       contents: [
//         { kind: 'block', type: 'controls_if' },
//         { kind: 'block', type: 'controls_whileUntil' }
//       ]
//     };

//     workspaceRef.current = Blockly.inject(blocklyDiv.current, {
//       toolbox,
//       trashcan: true,
//     });

//     return () => workspaceRef.current.dispose();
//   }, []);

//   return <div ref={blocklyDiv} style={{ height: 480, width: 600, border: '1px solid #ccc' }} />;
// }

// export default App;