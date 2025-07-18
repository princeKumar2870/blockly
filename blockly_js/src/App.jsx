// import React, { useRef, useEffect, useState } from 'react';
// import * as Blockly from 'blockly/core';
// import 'blockly/blocks';
// import 'blockly/javascript';
// import * as en from 'blockly/msg/en';

// Blockly.utils.idGenerator.genUid = function () {
//   console.log("new id generator called");
//   return toString(Math.floor(Math.random() * 1e11))
// }
// console.log(typeof (Blockly))

// function App() {
//   class CustomGenerator {
//     nextId() {
//       const id = 'custom_' + Math.random().toString(36).substring(2, 10);
//       console.log("Custom ID generated:", id);
//       return id;
//     }
//   }
//   const customIdGenerator = new CustomGenerator();
//   const [id, setId] = useState('')
//   const blocklyDiv = useRef(null);
//   const workspaceRef = useRef(null)
//   function defineCustomBlocks() {
//     const definitions = Blockly.common.createBlockDefinitionsFromJsonArray([{
//       type: 'my_custom_block',
//       message0: 'move forward %1',
//       args0: [
//         {
//           type: 'field_number',
//           name: 'FIELD_NAME'
//         },
//       ],
//       previousStatement: null,
//       nextStatement: null,
//     }]);
//     Blockly.common.defineBlocks(definitions)
//   }
//   defineCustomBlocks()
//   useEffect(() => {

//     Blockly.setLocale(en)
//     const toolbox = {
//       kind: 'categoryToolbox',
//       contents: [
//         {
//           kind: 'category',
//           name: 'Logic',
//           colour: '#5C81A6',
//           contents: [
//             { kind: 'block', type: 'controls_if' }
//           ]
//         },
//         {
//           kind: 'category',
//           name: 'Loops',
//           colour: '#5CA65C',
//           contents: [
//             { kind: 'block', type: 'controls_repeat_ext' },
//             { kind: 'block', type: 'controls_whileUntil' }
//           ]
//         },
//         {
//           kind: 'category',
//           name: 'Custom',
//           colour: '#A65C81',
//           contents: [
//             { kind: 'block', type: 'my_custom_block' }
//           ]
//         }
//       ]
//     };
//     workspaceRef.current = Blockly.inject(blocklyDiv.current, {
//       toolbox: toolbox,
//       trashcan: true,
//       // genUid:customIdGenerator,
//     });
//     const workspace = workspaceRef.current;
//     const listener = function (event) {
//       if (event.type === Blockly.Events.BLOCK_CREATE) {
//         function toTrack(){
//           console.log(block.id)
//         }
//         event.ids.forEach(id => {
//           console.log(event.ids, "event id")
//           const block = workspace.getBlockById(id);
//           if (block) {
//             setId(block.id)
//             console.log('Block created:', block.type, block.id);
//             toTrack();
//           }
//         });
//       }
//     };
//     workspaceRef.current.addChangeListener(listener);
//     console.log(workspace.getBlockById())
//     const block = workspace.newBlock('controls_if');
//     block.initSvg();
//     block.render();
//     console.log("Created block id:", block.id);

//   }, [])
//   return (
//     <>
//       <div ref={blocklyDiv} style={{ height: '480px', width: '600px', border: '1px solid #ccc' }}>
//       </div>
//       <div>the id is as follows {id}</div>
//     </>

//   )
// }
// export default App;


import React, { useRef, useEffect, useState } from 'react';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import 'blockly/javascript';
import * as en from 'blockly/msg/en';

// Patch the global generator just for logging (won’t be used in modern Blockly)
if (Blockly.utils && Blockly.utils.idGenerator) {
  const originalGlobalGenUid = Blockly.utils.idGenerator.genUid;
  Blockly.utils.idGenerator.genUid = function () {
    const id = originalGlobalGenUid.call(this);
    console.log('%c[GLOBAL] ID generated:', 'color: orange', id);
    console.trace();
    return id;
  };
}

// Custom ID generator class for workspace
class DebugIdGenerator {
  constructor() {
    this.counter = 0;
  }

  genUid() {
    const id = `debug_custom_${this.counter++}`;
    console.log('%c[WORKSPACE] Custom ID generated:', 'color: green', id);
    console.trace(); // Show where the ID was generated
    return id;
  }
}

function App() {
  const [blockId, setBlockId] = useState('');
  const blocklyDiv = useRef(null);
  const workspaceRef = useRef(null);

  const defineCustomBlocks = () => {
    const definitions = Blockly.common.createBlockDefinitionsFromJsonArray([
      {
        type: 'my_custom_block',
        message0: 'move forward %1',
        args0: [
          {
            type: 'field_number',
            name: 'FIELD_NAME',
          },
        ],
        previousStatement: null,
        nextStatement: null,
      },
    ]);
    Blockly.common.defineBlocks(definitions);
  };

  defineCustomBlocks();

  useEffect(() => {
    Blockly.setLocale(en);

    const toolbox = {
      kind: 'categoryToolbox',
      contents: [
        {
          kind: 'category',
          name: 'Logic',
          colour: '#5C81A6',
          contents: [{ kind: 'block', type: 'controls_if' }],
        },
        {
          kind: 'category',
          name: 'Loops',
          colour: '#5CA65C',
          contents: [
            { kind: 'block', type: 'controls_repeat_ext' },
            { kind: 'block', type: 'controls_whileUntil' },
          ],
        },
        {
          kind: 'category',
          name: 'Custom',
          colour: '#A65C81',
          contents: [{ kind: 'block', type: 'my_custom_block' }],
        },
      ],
    };

    // Create the custom ID generator
    const customIdGenerator = new DebugIdGenerator();

    // Inject workspace with custom ID generator
    const workspace = Blockly.inject(blocklyDiv.current, {
      toolbox: toolbox,
      trashcan: true,
      idGenerator: customIdGenerator, // <-- THIS is the important override
    });

    workspaceRef.current = workspace;

    // Listener to catch block creation events
    const listener = (event) => {
      if (event.type === Blockly.Events.BLOCK_CREATE) {
        console.log('%c[EVENT] BLOCK_CREATE:', 'color: blue', event.ids);
        event.ids.forEach((id) => {
          const block = workspace.getBlockById(id);
          if (block) {
            console.log('Block created:', block.type, block.id);
            setBlockId(block.id);
          } else {
            console.warn('Block not found by ID:', id);
          }
        });
      }
    };

    workspace.addChangeListener(listener);

    // Programmatically create a block to test generation
    const testBlock = workspace.newBlock('controls_if');
    testBlock.initSvg();
    testBlock.render();
    console.log('%c[Test] Programmatically created block ID:', 'color: purple', testBlock.id);
  }, []);

  return (
    <>
      <div
        ref={blocklyDiv}
        style={{ height: '480px', width: '600px', border: '1px solid #ccc' }}
      ></div>
      <div>Last created block ID: <strong>{blockId}</strong></div>
    </>
  );
}

export default App;
