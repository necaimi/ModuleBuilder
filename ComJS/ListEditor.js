define(function(require, exports, module){
   'use strict';
    
    function ListEditor(parent)
    {
     
      
        var list_info = {'title':null, 'ids':null, 'gids':null};  /*json*/
        var m_index = 0, m_$obj = null;
        var m_$title = null, m_$ids = null, m_$gids = null, m_$add = null, m_$delete = null;
        var m_thisobj = this;
        
        this.Add = function()
        {
            if(parent == null)
            return null;
            
            m_$obj = parent.Add(m_$obj);
            
            if(m_$obj == null)
            return null;
            
            m_$title = m_$obj.find("[type='title']"),
            m_$ids   = m_$obj.find("[type='ids']"),
            m_$gids  = m_$obj.find("[type='gids']"),
            m_$add   = m_$obj.find("[type='add_button']");
            m_$delete= m_$obj.find("[type='del_button']");
            
            m_$add.bind("click", function(e){
                m_thisobj.Add();
                  });
            m_$delete.bind("click", function(e){
                m_thisobj.Delete();
                  });
            return m_$obj;
            
        };
        
        this.Delete = function()
        {
             if(parent == null)
            return null;
            
            return parent.Delete(m_$obj);
        };
        
        this.GetInfos = function()
        {
            InputInfos(list_info);
            return list_info;
        };
        
        this.Index = function()
        {
            return m_index;
        };
        
        this.SetIndex = function(midx)
        {
            m_index = midx;
        };
        
        function InputInfos(m_info)
        {
            m_info.title = m_$title.val();
            m_info.ids = m_$ids.val();
            m_info.gids = m_$gids.val();
        };
        
        
    };
    
    module.exports.ListEditor = ListEditor;
    
});