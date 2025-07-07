import { defineCustomBlocks } from './custom.js';


window.addEventListener('DOMContentLoaded', () => {
  const Blockly = window.Blockly;

  defineCustomBlocks();

  const toolbox = {
    kind: 'categoryToolbox',
    contents: [
      {
        kind: 'category',
        name: 'Logic',
        colour: '#5C81A6',
        contents: [{ kind: 'block', type: 'controls_if' }]
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
        contents: [{ kind: 'block', type: 'my_custom_block' }]
      }
    ]
  };

  const myWorkspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    trashcan: true
  });

  Blockly.JavaScript['my_custom_block'] = function (block) {
    const steps = block.getFieldValue('FIELD_NAME');
    return `moveForward(${steps});\n`;
  };

  // Define a dummy function so eval works
  function moveForward(steps) {
    console.log(`Moving forward ${steps} steps`);
  }

  document.getElementById('runButton').addEventListener('click', () => {
    const code = Blockly.JavaScript.workspaceToCode(myWorkspace);
    document.getElementById('output').textContent = code;
    try {
      eval(code); // For demo purposes only
    } catch (e) {
      console.error(e);
    }
  });
});
