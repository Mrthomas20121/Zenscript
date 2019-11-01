"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LintingProvider_1 = require("./LintingProvider");
// This method is called when your extension is activated. Activation is
// controlled by the activation events defined in package.json.
function activate(context) {
    console.log('Extension "ZsLint" is now active!');
    let linter = new LintingProvider_1.default();
    linter.activate(context.subscriptions);
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map