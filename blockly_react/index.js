import { defineCustomBlocks } from './custom.js';

const Blockly = window.Blockly;
const javascriptGenerator = window.Blockly.JavaScript;
console.log(javascriptGenerator, "generator")
defineCustomBlocks();
// Blockly.setLocale(Blockly.Msg.en);
// Blockly.setLocale(Blockly.Msg.en);

const toolbox = {
  kind: 'categoryToolbox',
  contents: [
    {
      kind: 'category',
      name: 'Logic',
      color: '#5C81A6',
      contents: [{ kind: 'block', type: 'controls_if' }]
    },
    {
      kind: 'category',
      name: 'Loops',
      color: '#5CA65C',
      contents: [
        { kind: 'block', type: 'controls_repeat_ext' },
        { kind: 'block', type: 'controls_whileUntil' },
        { kind: 'block', type: 'controls_for' },
        { kind: 'block', type: 'controls_forEach' }
      ]
    },
    {
      kind: 'category',
      name: 'Custom',
      color: '#A65C81',
      contents: [{ kind: 'block', type: 'my_custom_block' }]
    }
  ]
};

const myWorkspace = Blockly.inject('blocklyDiv', {
  toolbox: toolbox,
  trashcan: true
});
javascriptGenerator.forBlock['my_custom_block'] = function (block, generator) {
  const steps = block.getFieldValue('FIELD_NAME')
  return `moveForward(${steps});\n`
}
const code = Blockly.JavaScript.workspaceToCode(myWorkspace)
console.log(code)

document.getElementById('generateBtn').addEventListener('click', () => {
  const code = Blockly.JavaScript.workspaceToCode(myWorkspace);
  console.log("code generator called...")
  console.log(code);
  document.getElementById('output').textContent = code;
});