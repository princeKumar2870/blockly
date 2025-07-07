
Blockly.Blocks['math_add'] = {
    init: function () {
        this.appendValueInput("A")
            .setCheck("Number")
            .appendField("add");
        this.appendValueInput("B")
            .setCheck("Number")
            .appendField("and");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Adds two numbers");
        this.setHelpUrl("");
    }
};
Blockly.Blocks["Joint_position"] = {
    validate: function (newValue) {
        console.log("Validate is called");

        // const block = this;
        // block.updateShape_(newValue);
    },
    init: function () {
        this.appendDummyInput("name_input")
            .appendField("Joint Position")
            .appendField(" ");
        this.appendEndRowInput()
        this.appendDummyInput("name_input")
            .appendField("Name")
            .appendField(new Blockly.FieldTextInput("Joint_Pos_"), "NAME")
        this.appendEndRowInput()
        this.appendDummyInput("motion_profile_joint_pos")
            .appendField("Motion Profile:", "motion_profile_field")
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        ["Speed", "backend_param_for_speed"],
                        ["Time", "backend_param_for_time"],
                    ],
                    (newValue) => this.validate(newValue)
                ),
                "backend_parameter_for_joint"
            )
        this.appendEndRowInput()
        this.appendDummyInput("joint_motion_params")
        this.appendValueInput("Velocity")
            .appendField("velocity")
        this.appendValueInput("Acceleration")
            .appendField("Acceleration")
        this.appendEndRowInput("new_line1")
        this.appendValueInput("J1_INPUT")
            .appendField("J1")
        this.appendValueInput("J2_INPUT")
            .appendField("J2")
        this.appendValueInput("J3_INPUT")
            .appendField("J3")
        this.appendEndRowInput("new_line2");
        this.appendValueInput("J4_INPUT")
            .appendField("J4")
        this.appendValueInput("J5_INPUT")
            .appendField("J5")
        this.appendValueInput("J6_INPUT")
            .appendField("J6")
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.data = [0,0,0,0,0,0]
    }
}
const toolbox = {
    kind: 'categoryToolbox',
    contents: [
        {
            kind: 'category',
            name: 'Custom',
            colour: '#5C81A6',
            contents: [
                {
                    kind: 'block',
                    type: 'math_add'
                }
            ]
        },
        {
            kind: 'category',
            name: 'Joint Postion',
            colour: '#5C81A6',
            contents: [
                {
                    kind: 'block',
                    type: 'Joint_position'
                }
            ]
        }
    ]
};
const workspace = Blockly.inject('blocklyDiv', {
    toolbox: toolbox,
    trashcan: true,
    scrollbars: true
});