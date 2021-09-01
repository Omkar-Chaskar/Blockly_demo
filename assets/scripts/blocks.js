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
  init: function () {
    this.appendDummyInput()
      .appendField("Bot");
    this.appendStatementInput("question")
      .setCheck(null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//Create dropdown menu with questions and pre-define answers.
Blockly.Blocks['example_dropdown'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Ask me anything:')
      .appendField(new Blockly.FieldDropdown([
        ['What is the date today?', '1'],
        ['What is the time now?', '2'],
        ['How are you?', 'I am good'],
        ['What is JavaScript?', 'JavaScript is a text-based programming language used both on the client-side and server-side that allows you to make web pages interactive.'],
        ['What is your name?', 'Omkar Suresh Chaskar'],
      ]), "question");
    this.setPreviousStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  },
};

//Assign value of question field which value pass from example_dropdown with statementToCode function with of argument and FILDNAME which store Field Value;
Blockly.JavaScript["example_bot"] = function (block) {
  var text_input = Blockly.JavaScript.statementToCode(block, 'question');
  var code = `
    var inputTextValue = "${text_input}";
    `;
  return code;
}

//On Run example_dropdown function will return field value not gives back error
Blockly.JavaScript["example_dropdown"] = function (block) {
  return block.getFieldValue('question');
}


var workspace = Blockly.inject("blocklyDiv", {
  media: "assets/media/",
  toolbox: document.getElementById("toolbox")
});

function redrawUi() {
  if (typeof inputTextValue !== "undefined") {

    //check for date and time option to givr current time and date
    if (inputTextValue == 2) {
      let today = new Date();
      let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      $("#inputBox").text(time);
    } else if (inputTextValue == 1) {
      let today = new Date();
      let date = today.getFullYear() + ":" + today.getMonth() + ":" + today.getDate();
      $("#inputBox").text(date);
    } else {
      $("#inputBox").text(inputTextValue);
      console.log(typeof inputTextValue);
    }
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
  //To devare draged blocks from workspace 
  workspace.clear();
}