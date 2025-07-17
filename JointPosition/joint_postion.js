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

Blockly.Blocks["string_length"] = {
    init: function () {
        this.appendValueInput('Value')
            .setCheck('String')
            .appendField('Length of')
        this.setOutput(true, 'Number');
        // this.setColor(160);
        this.setTooltip('Return the no of letters in a string')
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
                // {
                //     kind: 'block',
                //     type: 'Joint_position'
                // },
                {
                    kind: "block",
                    type: 'math_number'
                },
                {
                    kind: "block",
                    type: "custom_block_with_button"
                },
                {
                    kind: "block",
                    type: "string_length"
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
const divEl = document.getElementById('blocklyDiv2')
const listener = function (event) {
    if (event.type === Blockly.Events.BLOCK_CREATE) {
        event.ids.forEach(id => {
            const block = workspace.getBlockById(id);
            if (block) {
                console.log('Block created:', block.type, block.id);
                divEl.innerHTML = `This is the id ${block.id}`
            }
        });
    }
};
workspace.addChangeListener(listener);


console.log(divEl)