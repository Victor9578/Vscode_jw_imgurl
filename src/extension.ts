import * as vscode from 'vscode';
import * as fs from 'fs';
import { uploadFile } from "./mt";


export function activate(context: vscode.ExtensionContext) {

	// 注册命令：通过输入路径上传图片
	let uploadByPathCommand = vscode.commands.registerCommand('jw-imgurl.uploadimage', async () => {
		const filePath = await vscode.window.showInputBox({
			prompt: 'Enter the absolute path of the image to upload',
			ignoreFocusOut: true
		});

		if (filePath) {
			await uploadFile(filePath);
		} else {
			vscode.window.showErrorMessage('No image path provided');
		}
	});

	// 注册命令：通过文件资源管理器上传图片
	let uploadFromExplorerCommand = vscode.commands.registerCommand('jw-imgurl.uploadimagefromexplorer', async (uri: vscode.Uri) => {
		let filePath: string | undefined;

		if (!uri) {
			const originalClipboard = await vscode.env.clipboard.readText();
			await vscode.commands.executeCommand('copyFilePath');
			const copiedPath = await vscode.env.clipboard.readText();  // returns a string
			await vscode.env.clipboard.writeText(originalClipboard);

			// 使用剪贴板中的路径
			filePath = fs.existsSync(copiedPath) ? copiedPath : undefined;
		} else {
			filePath = uri.fsPath;
		}

		// 确保 filePath 已定义，然后调用 uploadImage
		if (filePath) {
			await uploadFile(filePath);
		} else {
			vscode.window.showErrorMessage('Unable to determine file path.');
		}
	});

	context.subscriptions.push(uploadByPathCommand);
	context.subscriptions.push(uploadFromExplorerCommand);
}

export function deactivate() { }
