# Jw Mt 

一直想写好好的认真的写博客，可是github图床实在是太慢了，借妖火论坛大神给的api思路。  
再摸索了一天 python 模拟 requesttools中 MultipartEncoder 后，可算是成功模拟了表单。  
终于有把他集成到vscode的这个小拓展里面了（我和chatgpt太厉害了🤣）

# Use

非常简单的拓展就两个命令  
* `Upload Image`  
通过对话框手动输入图片绝对路径，获得直链后会复制到剪贴板。

* `Upload Image From Explorer`  
我用这个，从左侧资源管理器中右键图片文件，弹出的菜单选择此命令，获得直链后会复制到剪贴板，或者图片文件处于选择状态时，快捷键`Alt + u`。

# Warn

因为是大神的服务器后端，所以  
* 不要传重要、隐私的图片  
* 有效日期看mt心情  
* 如果右下角弹`check msg`，请自行查看调试中报错，大概率是上传文件格式不符合要求(only .jpg|png|webp，够用了吧)，如果弹出error，听天由命吧❤