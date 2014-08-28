define(function(require, exports, module){
    'use strict';
    
    function ListManager($obj)
    {
        var m_children = new Array(), m_totals = 0;
        var m_$obj = $obj;

        this.GetLength = function()
        {
            return m_children.length;
        };
        
        this.Add = function(children)
        {
            var m_$child = $("<li class=''></li>");
            m_$child.appendTo(children);
            m_totals += 1;
            
            return m_$child;
        };
        
        
        this.Delete = function(children, index)
        {
            m_$obj.remove(children);
            m_totals -= 1;
            return true;
        };
    
    };
    
    module.exports.ListManager = ListManager;
});