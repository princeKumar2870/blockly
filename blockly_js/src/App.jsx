import React, { useRef, useEffect, useState } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import * as en from 'blockly/msg/en';

function App() {
  const [id, setId] = useState('')
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);
  function defineCustomBlocks() {
    const definitions = Blockly.common.createBlockDefinitionsFromJsonArray([{
      type: 'my_custom_block',
      message0: 'move forward %1',
      args0: [
        {
          type: 'field_number',
          name: 'FIELD_NAME'
        },
      ],
      previousStatement: null,
      nextStatement: null,
    }]);
    Blockly.common.defineBlocks(definitions)
  }
  defineCustomBlocks()
  useEffect(() => {
    if (Blockly.utils.idGenerator) {
    if (Blockly.utils.idGenerator.genUid()) {
      console.log("we are inside!")
      let originalGenUid = Blockly.utils.idGenerator.genUid;
     originalGenUid = function () {
        console.log("we are inside this genUid function")
        const id = originalGenUid.call(this)
        console.log("🔧 Overridden genUid called:", id);
        return id.replace(/\./g, '_custom_');
      };
    }

    if (Blockly.utils.idGenerator.generateNextId) {
      const originalGenerateNextId = Blockly.utils.idGenerator.generateNextId;
      Blockly.utils.idGenerator.generateNextId = function () {
        const id = originalGenerateNextId.call(this);
        console.log("🔧 Overridden generateNextId called:", id);
        return id.replace(/\./g, '_custom_');
      };
    }
  } else {
    console.warn("Blockly.utils.idGenerator is not defined yet.");
  }
    // const originalGetNextUniqueId = Blockly.utils.idGenerator.genUid;
    // Blockly.utils.idGenerator.genUid= function () {
    //   const id = originalGetNextUniqueId.call(this);
    //    console.log("this function is called")
    //   return id.replace(/\./g, 'over_riding_successful');
    // };
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
    workspaceRef.current = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox,
      trashcan: true,
    });
    const workspace = workspaceRef.current;
    const listener = function (event) {
      if (event.type === Blockly.Events.BLOCK_CREATE) {
        event.ids.forEach(id => {
          const block = workspace.getBlockById(id);
          if (block) {
            setId(block.id)
            console.log('Block created:', block.type, block.id);
          }
        });
      }
    };
    workspaceRef.current.addChangeListener(listener);
  }, [])
  return (
    <>
      <div ref={blocklyDiv} style={{ height: '480px', width: '600px', border: '1px solid #ccc' }}>
      </div>
      <div>the id is as follows {id}</div>
    </>

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