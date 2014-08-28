/*Copyright (c) 2012 Adobe Systems Incorporated. All rights reserved.
 
Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:
 
The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.*/


define(function(require, exports, module){
    'use strict';
    
   var  CommandManager      = brackets.getModule("command/CommandManager"),
        Menus               = brackets.getModule("command/Menus"),
        Commands            = brackets.getModule("command/Commands"),
        Strings             = brackets.getModule("strings"),
      ExtensionUtils      = brackets.getModule("utils/ExtensionUtils"),
        UITEXT              = JSON.parse(require("text!MainDialog/uitext.json")),
        MainDialog          = require("ComJS/QMainDialog").QMainDialog;
        
    var MENU_NAME           = "Module Builder",
        COMMAND_ID          = "Module.runTool",
        m_dialog            = new MainDialog({UiInfo:UITEXT});
    
    var keyboardrefs        = JSON.parse(require("text!keyboard.json"));

       ExtensionUtils.loadStyleSheet(module, "MainDialog/Maindialog.css");
    
    
    function OpenDialogHandle()
    {
        m_dialog.ShowDialog();
    };
    
    CommandManager.register(MENU_NAME, COMMAND_ID, OpenDialogHandle);
    var menu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID, keyboardrefs.OpenDialog);
    
    
});