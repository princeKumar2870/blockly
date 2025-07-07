import { defineCustomBlocks } from './custom.js';

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
