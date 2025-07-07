
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
class CustomFieldNumber extends Blockly.FieldNumber {
    showEditor_ = (() => {

        let event = new CustomEvent("linkKeyPad", {
            detail: {
                "type": "numpad",
                "numpad_top": 250,
                "numpad_right": 700,
                "ref": this
            },
            bubbles: true,
            cancelable: true
        })
        document.dispatchEvent(event);
    });
}
Blockly.Blocks["Joint_position"] = {
    validate: function (newValue) {
        console.log("Validate is called");

        const block = this;
        block.updateShape_(newValue);
    },
    updateShape_: function (newValue) {

        if (newValue === "traj_param_joint_time") {

            if (this.getField("vel_param_joint_input")) {
                this.getInput("joint_motion_params").removeField("vel_param_joint_input")
                this.getInput("joint_motion_params").removeField("°/sec")
                this.getInput("joint_motion_params").removeField("Velocity:")
            }

            if (this.getField("acc_param_joint_input")) {
                this.getInput("joint_motion_params").removeField("acc_param_joint_input")
                this.getInput("joint_motion_params").removeField("°/sec²")
                this.getInput("joint_motion_params").removeField("Acceleration:")
            }

            if (this.getField("time_num")) {
                this.getInput("joint_motion_params").removeField("time_num")
                this.getInput("joint_motion_params").removeField("Time")
                this.getInput("joint_motion_params").removeField("sec")
            }


            this.getInput("joint_motion_params")
                .appendField("Time", "Time")
                .appendField(
                    new CustomFieldNumber("0", null),
                    "time_num"
                )
                .appendField("sec", "sec")
        } else if (newValue === "traj_param_joint_speed") {

            if (this.getField("vel_param_joint_input")) {
                this.getInput("joint_motion_params").removeField("vel_param_joint_input")
                this.getInput("joint_motion_params").removeField("°/sec")
                this.getInput("joint_motion_params").removeField("Velocity:")
            }

            if (this.getField("acc_param_joint_input")) {
                this.getInput("joint_motion_params").removeField("acc_param_joint_input")
                this.getInput("joint_motion_params").removeField("°/sec²")
                this.getInput("joint_motion_params").removeField("Acceleration:")
            }


            if (this.getField("time_num")) {
                this.getInput("joint_motion_params").removeField("time_num")
                this.getInput("joint_motion_params").removeField("Time")
                this.getInput("joint_motion_params").removeField("sec")
            }

            this.getInput("joint_motion_params")
                .appendField("Velocity:", "Velocity:")
                .appendField(new CustomFieldNumber("60", this.validateNumberInput), "vel_param_joint_input")
                .appendField("°/sec", "°/sec");

            this.getInput("joint_motion_params")
                .appendField("Acceleration:", "Acceleration:")
                .appendField(new CustomFieldNumber("60", this.validateNumberInput), "acc_param_joint_input")
                .appendField("°/sec²", "°/sec²");
        } else if (newValue === "default_param") {

            if (this.getField("vel_param_joint_input")) {
                this.getInput("joint_motion_params").removeField("vel_param_joint_input")
                this.getInput("joint_motion_params").removeField("°/sec")
                this.getInput("joint_motion_params").removeField("Velocity:")
            }

            if (this.getField("acc_param_joint_input")) {
                this.getInput("joint_motion_params").removeField("acc_param_joint_input")
                this.getInput("joint_motion_params").removeField("°/sec²")
                this.getInput("joint_motion_params").removeField("Acceleration:")
            }


            if (this.getField("time_num")) {
                this.getInput("joint_motion_params").removeField("time_num")
                this.getInput("joint_motion_params").removeField("Time")
                this.getInput("joint_motion_params").removeField("sec")
            }
        }
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
                        ["Speed", "traj_param_joint_speed"],
                        ["Time", "traj_param_joint_time"],
                    ],
                    (newValue) => this.validate(newValue)
                ),
                "traj_param_joint"
            )
        this.appendEndRowInput()
        this.appendDummyInput("joint_motion_params")
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