import axios from 'axios';
import * as fs from 'fs';
import * as FormData from 'form-data';
import * as vscode from 'vscode';

function getRandomFiveDigitNumber(): string {
  return Math.floor(10000 + Math.random() * 90000).toString(); // 生成 10000 到 99999 之间的随机数
}

export async function uploadFile(filePath: string): Promise<void> {

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    vscode.window.showErrorMessage('File does not exist');
    return;
  }
  else { vscode.window.showInformationMessage(filePath) }

  // 生成随机的五位数字
  const targetUrl = 'https://aapi.helioho.st/upload.php'
  const randomFileId = `${getRandomFiveDigitNumber()}_avatar.png`;

  // 读取文件的二进制数据
  const file = fs.createReadStream(filePath);

  // 构造 FormData
  const form = new FormData();
  form.append('image', file, 'avatar.png');
  form.append('fileId', randomFileId);
  form.append('initialPreview', '[]');
  form.append('initialPreviewConfig', '[]');
  form.append('initialPreviewThumbTags', '[]');

  // 设置请求头
  const headers = {
    ...form.getHeaders(), // 获取自动生成的 multipart headers
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7',
    'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'cross-site',
    'host': 'aapi.helioho.st',
    'referer': 'https://695402.xyz/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
    'origin': 'https://695402.xyz',
  };


  try {
    await vscode.window.withProgress({
      location: vscode.ProgressLocation.Notification,
      title: "Uploading file...",
      cancellable: false,
    }, async (progress) => {
      progress.report({ increment: 0 });

      // 发起 POST 请求
      const response = await axios.post(targetUrl, form, { headers });

      // 模拟进度
      for (let i = 0; i <= 100; i++) {
        progress.report({ increment: 1 });
        await new Promise(resolve => setTimeout(resolve, 20)); // 延迟以显示进度条
      }

      // 获取响应中的 URL
      console.log(response.data)
      const uploadedUrl = response.data['data']['url']

      if (uploadedUrl) {
        // 复制 URL 到剪贴板
        await vscode.env.clipboard.writeText(uploadedUrl);
        vscode.window.showInformationMessage('File uploaded successfully! URL copied to clipboard.');
      } else {
        vscode.window.showWarningMessage('File uploaded, but no URL found in response.Check msg');
      }
    });
  } catch (error) {
    vscode.window.showErrorMessage('Error uploading file.');
    console.error('Error uploading file:', error);
  }
}


