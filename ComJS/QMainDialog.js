define(function(require, exports, module){
    'use strict';
    
    var DialogTemplate      =       require("text!MainDialog/MainDialog.html"),
        Dialogs             =       brackets.getModule("widgets/Dialogs");
      
    
    function QMainDialog(vars)
    {
       var m_vars = vars;
        this.ShowDialog = function()
        {
            
            var template = Mustache.render(DialogTemplate, m_vars);
        
            var newDialog = Dialogs.showModalDialogUsingTemplate(template).done(function(id){
                
            if(id === Dialogs.DIALOG_BTN_OK)
            {
               console.debug("click ok!");
            }
                
            });
          
            //init ui list;
        
        };
        
    };

    module.exports.QMainDialog = QMainDialog;
    
});