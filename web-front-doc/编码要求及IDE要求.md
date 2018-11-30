## IDE 要求

> 1、前端开发统一使用 visual studio code
>
> 2、vscode 安装后需要引入的插件
>
> > - git history
> > - markdown preview enhandced
> > - markdown all in one
> > - path intellisense
> > - vetur
> > - vue vscode snippets
> > - vue 2 snippets
> > - Vue VSCode Snippets
> > - ESLint
> > - Prettier - Code formatter
>
> 3、vscode 的 user settings.json 配置

```
{
   "npm.enableScriptExplorer":true,
   "terminal.integrated.shell.windows":"C:\\Windows\\System32\\cmd.exe",
   "explorer.confirmDelete":false,
   "window.zoomLevel":0,
   "git.autofetch":true,
   "git.enableSmartCommit":true,
   "git.path":"D:\\software\\environment\\git\\cmd\\git.exe",
   "editor.formatOnSave":true,
   "editor.detectIndentation":false,
   "editor.tabSize":8,
   "eslint.validate":[
       "javascript",
       "javascriptreact",
       "html",
       "vue",  {
           "language":"vue",
           "autoFix":true
       }
   ],
   "eslint.autoFixOnSave":true,
   "vetur.format.options.tabSize":4,
   "vetur.format.defaultFormatter.html":"js-beautify-html",
   "vetur.format.defaultFormatter.js":"prettier-eslint",
   "vetur.format.defaultFormatterOptions": {
       "js-beautify-html": {
           "wrap_line_length":120,
           "wrap_attributes":"auto",
       },
       "prettyhtml": {
           "printWidth":200,
           "singleQuote":true,
           "wrapAttributes":false,
           "sortAttributes":true
       }
    }
}
```

---

## 开发规范

CSS 规范-命名规范

> 1、使用类选择器，尽量避免使用 ID 选择器定义样式
>
> 2、以字母开头，不允许单个字母的类选择器出现
>
> 3、全小写，并使用'-'连字符

CSS 规范-代码风格

> 1、css 属性书写顺序，按布局定位属性>自身属性>文本属性>其他属性>CSS3 属性
>
> 2、不要以没有语义的标签作为选择器，类名全部采用小写方式以中划线分隔,禁止驼峰式命名,类名按组件类型+功能来命名，例：inp-account-form(输入框类型-用户表单即编辑是的用户表单输入框的样式)
>
> 3、css 属性值需要用到引号时，统一使用单引号
>
> 4、样式类整段注释，分别在开始及结束地方加入注释，例
>
> > ```
> > /*=====搜索条=====*/
> > .search {background: #333 url(../img/search.gif) no-repeat;}
> > /*=====搜索条结束=====*/
> > ```

JS 规范

> 1、常量：采用下划线分隔的全大写字符串来定义，例：COOKIR_PREFIX。
>
> 2、变量：首字母小写，驼峰命名法，原则上采用名词及名词短语，描述该变量代表的数据。例如：videoId
>
> 3、文件名：全小写、单词间用中横线连接
>
> 4、完成一部分功能的开发后要使用 IDE 工具完成代码格式化

---
