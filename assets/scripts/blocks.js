$(document).ready(function () {
  $("#runBtn").click(function () {
    runcode();
  });
  $("#resetBtn").click(function () {
    reset();
  });
});

//Create a Block with Name Bot 
Blockly.Blocks['example_bot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Bot");
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//Create dropdown menu with questions and pre-define answers.
Blockly.Blocks['example_dropdown'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Ask me anything:')
        .appendField(new Blockly.FieldDropdown([
            ['What is the date today?', '30 August 2021'],
            ['What is the time now?', '05:15 PM'],
            ['How are you?', 'I am good'],
            ['What is JavaScript?', 'JavaScript is a text-based programming language used both on the client-side and server-side that allows you to make web pages interactive.'],
            ['What is your name?', 'Omkar Suresh Chaskar'],
        ]), 'question');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//Assign value of question field which value is null to make Bot block functional.
Blockly.JavaScript["example_bot"] = function (block) {
  var text_input = block.getFieldValue("question");

  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
};

//On Run example_dropdown function get's selected questions answer and then print it over Bot Function
Blockly.JavaScript["example_dropdown"] = function (block) {
  var text_input = block.getFieldValue("question");

  var code = `
	var inputTextValue = "${text_input}";
  `;
  return code;
}



var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox"),
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {
    $("#inputBox").text(inputTextValue);
  } else {
    $("#inputBox").text("");
  }
}

function runcode() {
  // Generate JavaScript code and run it.
  var geval = eval;
  try {
    geval(Blockly.JavaScript.workspaceToCode(workspace));
  } catch (e) {
    console.error(e);
  }
  redrawUi();
}

function reset() {
  delete inputTextValue;
  redrawUi();
  //To delete draged blocks from workspace 
  workspace.clear();
}
