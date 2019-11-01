"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const WebSocket = require("ws");
const vscode_1 = require("vscode");
function replaceAll(value, search, replace) {
    return value.replace(new RegExp('[' + search + ']', 'g'), replace);
}
class LintingProvider {
    activate(subscriptions) {
        subscriptions.push(this);
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection();
        let disp = [];
        // vscode.workspace.onDidChangeTextDocument((event: vscode.TextDocumentChangeEvent) => this.doZSLint(event.document), this, disp);
        vscode.workspace.onDidSaveTextDocument(this.doZSLint, this, disp);
        this._disposable = vscode_1.Disposable.from(...disp);
        this.socket = new WebSocket("ws://127.0.0.1:24532", "zslint");
        console.log("ZsLintingPlugin now activated");
    }
    dispose() {
        this._disposable.dispose();
        this.socket.close();
    }
    doZSLint(textDocument) {
        if (textDocument.languageId !== 'zenscript') {
            return;
        }
        if (this.socket.OPEN !== this.socket.readyState) {
            console.log("Socket is closed, trying to open new one.");
            this.socket = new WebSocket("ws://127.0.0.1:24532", "zslint");
            this.socket.onopen = (event) => { this.startSocketCom(event.target); };
        }
        else {
            this.startSocketCom(this.socket);
        }
    }
    startSocketCom(s) {
        let m = {
            messageType: "LintRequest"
        };
        let rootDir = vscode.workspace.workspaceFolders !== undefined ? vscode.workspace.workspaceFolders[0].uri.path : "";
        rootDir = rootDir.substr(1) + "/";
        console.log("root: " + rootDir);
        this.socket.send(JSON.stringify(m));
        this.socket.onmessage = (event) => {
            console.log("Received message: " + event.data + " of type: " + event.type);
            let diagnostics = [];
            let obj = JSON.parse(event.data);
            if (obj.messageType === "LintResponse") {
                let lintRes = obj;
                lintRes.errors.forEach(element => {
                    let range = new vscode.Range(element.line - 1, element.offset - 1, element.line - 1, element.offset + 3);
                    let severity = (element.level === "ERROR") ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning;
                    let diagnostic = new vscode.Diagnostic(range, element.explanation, severity);
                    let fileName = element.fileName;
                    diagnostics.push({ diagnostic, fileName });
                });
                vscode.workspace.textDocuments.forEach(element => {
                    let ds = [];
                    diagnostics.forEach(diag => {
                        const fileName1 = replaceAll(element.fileName, "\\\\", "/");
                        const fileName2 = rootDir + replaceAll(replaceAll(diag.fileName, "\\\\", "/"), "\/\/", "/");
                        console.log("filename1: " + fileName1);
                        console.log("filename2: " + fileName2);
                        if (fileName1 === fileName2) {
                            ds.push(diag.diagnostic);
                        }
                    });
                    this.diagnosticCollection.set(element.uri, ds);
                });
            }
        };
    }
}
exports.default = LintingProvider;
//# sourceMappingURL=LintingProvider.js.map