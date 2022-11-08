// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */

const folderPath = vscode.workspace.workspaceFolders[0].uri._fsPath + path.sep;

function activate(context) {
  const paths = [
    "src",
    "index.js",
    `src${path.sep}controllers`,
    `src${path.sep}models`,
    `src${path.sep}routes`,
    "base.json",
  ];
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "mvc-js" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "mvc-js.helloWorld",
    function () {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
    //   vscode.window.showInformationMessage(JSON.stringify(folderPath.macarrao));
	fs.mkdir(folderPath + "abobrinha", { recursive: true }, (err) => {
		if (err) vscode.window.showInformationMessage(err);
	  });
    }
  );

  context.subscriptions.push(disposable);

  disposable = vscode.commands.registerCommand(
    "mvc-js.jsInit",
    function () {
		if (!folderPath) {
			vscode.window.showErrorMessage('Selecione um workspace!');
			return;
		}

		let content = "";

		for(let i = 0; i < paths.length; i++){
			if(!fs.existsSync(folderPath + paths[i])) {
				if(!paths[i].includes(".")) {
					fs.mkdir(path.join(folderPath, paths[i]), (err) => {
						if(err){
							vscode.window.showErrorMessage(err.message);
							return;
						}
					});
					if(paths[i].includes("controll")) {
						let controllFolders = ["routes", "process"];
						controllFolders.forEach((folder) => {
							folder = paths[i] + path.sep + folder;
							fs.mkdir(path.join(folderPath, folder), (err) => {
								if(err){
									vscode.window.showErrorMessage(err.message);
									return;
								}
							});
						})
					}
				}else{
					if(paths[i].includes("index")) content = generateIndex();
					else if(paths[i].includes("home")) content = generateHome();
					else if(paths[i].includes("json")) content = generateBasejson();
					fs.writeFile(path.join(folderPath, paths[i]), content, err => {
						if (err) {
							return vscode.window.showErrorMessage(
								"Falha na criação do arquivo HTML\r\n" + err.message
							);
						}
					});
				}
			}
		}

      vscode.window.showInformationMessage("Hello World from MVC JS!");
    }
  );
}

// This method is called when your extension is deactivated
function deactivate() {}

function generateBasejson() {
  return `{
		"Connection" : {
			"Headers" : {
				"Content-type" : "application/json; charset=UTF-8",
				"Access-Control-Allow-Origin" : "http://localhost/",
				"Access-Control-Allow-Methods" : "GET, PUT, POST, DELETE"
			}
		},
		"Database" : {
			"host" : "localhost",
			"port" : "3306",
			"dbname" : "database_name",
			"user" : "root",
			"password" : ""
		},
		"Class" : [
			{+
				"name" : "className1",
				"attributes" : [
					"attr1",
					"attr2"
				]
			},
			{
				"name" : "className2",
				"attributes" : [
					"attr1",
					"attr2"
				]
			}
		]
	}`;
}

module.exports = {
  activate,
  deactivate,
};
