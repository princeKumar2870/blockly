
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
const addNum = () => {
    console.log()
}
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
class CircularButtonField extends Blockly.Field {
    constructor(text, callback) {
        super(text);
        this.clickHandler_ = callback;
    }

    initView() {
        super.initView();
        this.getClickTarget_().style.cursor = 'pointer';

        this.fieldGroup_.setAttribute("style", "user-select: none;");

        this.mouseDownWrapper_ = Blockly.browserEvents.bind(
            this.getClickTarget_(),
            'mousedown',
            this,
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (this.clickHandler_) this.clickHandler_();
            }
        );
    }

    getClickTarget_() {
        return this.fieldGroup_;
    }

    dispose() {
        if (this.mouseDownWrapper_) {
            Blockly.browserEvents.unbind(this.mouseDownWrapper_);
            this.mouseDownWrapper_ = null;
        }
        super.dispose();
    }
}

Blockly.Blocks['custom_block_with_button'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("Click this")
            .appendField(new Blockly.FieldLabel("Button", "blocklyTextClickable"), "BUTTON");
        this.setColour(230);
        this.setTooltip("This block has a button.");
        this.setHelpUrl("");
    }
};
Blockly.Blocks["Joint_position"] = {
    createBlocks: function (dataString) {
        let topBlock;
        topBlock = this.workspace.newBlock("math_num");
        if (topBlock.render) {
            topBlock.initSvg();
            topBlock.render();
        }
        topBlock.setShadow(true);
        topBlock.setFieldValue(this.getLowPrecisionValue(dataString), "NUM");
        topBlock.num_value = dataString
        return topBlock;
    },

    getLowPrecisionValue: function (value) {
        const number = parseFloat(value);
        return number.toFixed(4);
    },
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
            const velocityValue = this.vel || "60";
            const accelerationValue = this.acc || "60";

            this.getInput("joint_motion_params")
                .appendField("Velocity:", "Velocity:")
                .appendField(new CustomFieldNumber(velocityValue, this.validateNumberInput), "vel_param_joint_input")
                .appendField("°/sec", "°/sec");

            this.getInput("joint_motion_params")
                .appendField("Acceleration:", "Acceleration:")
                .appendField(new CustomFieldNumber(accelerationValue, this.validateNumberInput), "acc_param_joint_input")
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
    clearInputs: function () {
        if (this.getInput("J1_INPUT"))
            this.removeInput("J1_INPUT", true)
        if (this.getInput("J2_INPUT"))
            this.removeInput("J2_INPUT", true)
        if (this.getInput("J3_INPUT"))
            this.removeInput("J3_INPUT", true)
        if (this.getInput("J4_INPUT"))
            this.removeInput("J4_INPUT", true)
        if (this.getInput("J5_INPUT"))
            this.removeInput("J5_INPUT", true)
        if (this.getInput("J6_INPUT"))
            this.removeInput("J6_INPUT", true)
        if (this.getInput("new_line2"))
            this.removeInput("new_line2", true)

    },
    validateNumberInput: function (value) {
        const number = parseFloat(value);

        if (!/^\d+(\.\d+)?$/.test(value) || number < -180 || number > 180) {
            return null;
        }
        return value;
    },
    setVal: function (position) {
        // console.log("need to complete the jog part", position)

        // if (position === "joint_position") {
        //     let jointPosData = window.jog_joint
        //     for (let i = 0; i < jointPosData.length; i++) {
        //         if (this.getInputTargetBlock(`J${i + 1}_INPUT`).type === "math_num") {
        //             this.getInputTargetBlock(`J${i + 1}_INPUT`)
        //                 .getField("NUM")
        //                 .setValue(parseFloat(jointPosData[i]).toFixed(4));
        //             this.data[i] = jointPosData[i]
        //             this.getInputTargetBlock(`J${i + 1}_INPUT`).num_value = jointPosData[i];
        //         } else {
        //             this.getInputTargetBlock(`J${i + 1}_INPUT`).dispose(false);
        //             let valueBlock = this.workspace.newBlock("math_num");
        //             valueBlock.initSvg();
        //             valueBlock.render();
        //             valueBlock.setShadow(true);
        //             valueBlock.outputConnection.connect(
        //                 this.getInput(`J${i}_INPUT`).connection
        //             );
        //             this.getInputTargetBlock(`J${i + 1}_INPUT`)
        //                 .getField("NUM")
        //                 .setValue(parseFloat(jointPosData[i]).toFixed(4));
        //             this.data[i] = jointPosData[i]
        //             valueBlock.num_value = jointPosData[i]
        //         }
        //     }
        // }
        instance_jointjog = null;
        window.jointjog = false
    },
    setUpdateData: function () {
        if (typeof (this.data) === "string") {
            this.data = this.data.split(",")

            for (let i = 0; i < 6; i++) {
                this.getInputTargetBlock(`J${i + 1}_INPUT`).num_value = this.data[i]
            }
        }
    },
    handleButton: function () {
        const joints = []
        console.log("handle Button called")
        for (let i = 0; i < 6; i++) {
            const connectedBlock = this.getInput(`J${i + 1}_INPUT`).connection.targetBlock();
            if (connectedBlock) {
                const numStr = connectedBlock.getFieldValue('NUM');
                const num = parseFloat(numStr);
                console.log(`J${i + 1}_INPUT:`, num);
            } else {
                console.log('No block connected');
            }
        }
    },
    imageOnClick: function () {
        // let time
        // let accel
        // let vel
        // let joints = []
        // let motion_method_id = 0
        // if (this.sourceBlock_.getFieldValue("traj_param_joint") === "traj_param_joint_speed") {
        //     time = 0;
        //     vel = (Number(this.sourceBlock_.getFieldValue("vel_param_joint_input")) * Math.PI) / 180;
        //     accel = (Number(this.sourceBlock_.getFieldValue("acc_param_joint_input")) * Math.PI) / 180;
        //     motion_method_id = 1
        // }
        // else if (this.sourceBlock_.getFieldValue("traj_param_joint") === "traj_param_joint_time") {
        //     time = Number(this.sourceBlock_.getFieldValue("time_num"))
        //     vel = 0;
        //     accel = 0
        //     motion_method_id = 0
        // }
        // for (let i = 1; i <= 6; i++) {
        //     joints.push((Number(this.getSourceBlock().getInputTargetBlock(`J${i}_INPUT`).num_value) * Math.PI) / 180)
        // }
        // let obj = {
        //     header: {
        //         stamp: {
        //             sec: 0,
        //             nanosec: 0
        //         },
        //         frame_id: ""
        //     },
        //     part_info: {
        //         id: 0,
        //         num_joints: 6
        //     },
        //     motion_space: {
        //         id: 0
        //     },
        //     params: 0,
        //     motion_method: {
        //         id: motion_method_id
        //     },
        //     time_to_reach: time,
        //     amax: accel,
        //     vmax: vel,
        //     is_jogging_mode: false,
        //     is_reduced_mode: false,
        //     is_online_mode: false,
        //     waypoints: [{ target_pos: joints }]
        // }
        // const event = new CustomEvent("publishEvent", { detail: obj });
        // document.dispatchEvent(event);
    },


    init: function () {
        const block = this
        this.appendDummyInput("name_input")
            .appendField("Joint Position:")
            .appendField(" ")
            .appendField(
                new Blockly.FieldImage(
                    "./BlockIcon/play.png",
                    30,
                    30,
                    { alt: "Go To Pose", flipRtl: "FALSE" },
                    function () {
                        block.handleButton(); // call with correct context
                    }
                )
            );
        // this.appendDummyInput('button_input')
        //     .appendField("⭘", () => {
        //         this.handleButton()
        //     });

        this.appendDummyInput("title_input")
            .appendField("Joint Position")
            .appendField("");
        this.appendEndRowInput()
        this.appendDummyInput("name_text_input")
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
        this.data = [0, 0, 0, 0, 0, 0]
    },
    onchange: function (changeEvent) {

        if (changeEvent.type == Blockly.Events.BLOCK_MOVE) {
            if (!this.isInFlyout) {
                this.setCollapsed(false);
            }
        }


        if (changeEvent.type === Blockly.Events.CHANGE &&
            changeEvent.element === 'field' &&
            (changeEvent.name === 'traj_param_joint' || changeEvent.name === "time_num" || changeEvent.name === "vel_param_joint_input" || changeEvent.name === "acc_param_joint_input") &&
            changeEvent.blockId === this.id) {
            return;
        }

        if (changeEvent.blockId == this.id) {

            if (changeEvent.type == "click") {
                instance_jointjog = this;
                window.jointjog = true
                joglink.clickType = "joint_blockly"
                joglink.current.click();
            }

            if (changeEvent.type === "change") {
                if (this.getField("NAME").value_ === "Joint_Pos_") {

                    let data = window.jog_joint
                    // let data = [0,0,0,0,0,0]
                    let arr = data.map(Number);
                    for (let i = 0; i < arr.length; i++) {
                        let valueBlock = this.createBlocks(arr[i]);
                        valueBlock.outputConnection.connect(
                            this.getInput(`J${i + 1}_INPUT`).connection
                        );
                        valueBlock.num_id = i
                        this.data[i] = valueBlock.num_value
                    }
                }
            }
        }

        if (typeof (this.data) === "string") {
            this.data = this.data.split(",")
            for (let i = 0; i < 6; i++) {
                this.getInputTargetBlock(`J${i + 1}_INPUT`).num_value = this.data[i]
            }
        }
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
                },
                {
                    kind: "block",
                    type: 'math_number'
                },
                {
                    kind: "block",
                    type: "custom_block_with_button"
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