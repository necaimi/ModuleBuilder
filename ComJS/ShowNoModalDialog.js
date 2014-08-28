define(function(require, exports, module){
     
    
    function NomalDialog(template, autoMiss)
    {
         if (autoDismiss === undefined) {
            autoDismiss = true;
        }
        
        $("body").append("<div class='modal-wrapper'><div class='modal-inner-wrapper'></div></div>");

        var result  = new $.Deferred(),
            promise = result.promise(),
            $dlg    = $(template)
                .addClass("instance")
                .appendTo(".modal-inner-wrapper:last");

        // Don't allow dialog to exceed viewport size
        setDialogMaxSize();
        
        // Save the dialog promise for unit tests
        $dlg.data("promise", promise);

        var keydownHook = function (e) {
            return _keydownHook.call($dlg, e, autoDismiss);
        };

        // Pipe dialog-closing notification back to client code
        $dlg.one("hidden", function () {
            var buttonId = $dlg.data("buttonId");
            if (!buttonId) {    // buttonId will be undefined if closed via Bootstrap's "x" button
                buttonId = DIALOG_BTN_CANCEL;
            }
            
            // Let call stack return before notifying that dialog has closed; this avoids issue #191
            // if the handler we're triggering might show another dialog (as long as there's no
            // fade-out animation)
            window.setTimeout(function () {
                result.resolve(buttonId);
            }, 0);
            
            // Remove the dialog instance from the DOM.
            $dlg.remove();

            // Remove our global keydown handler.
            KeyBindingManager.removeGlobalKeydownHook(keydownHook);
            
            //Remove wrapper
            $(".modal-wrapper:last").remove();
        }).one("shown", function () {
            var $primaryBtn = $dlg.find(".primary:enabled"),
                $otherBtn   = $dlg.find(".modal-footer .dialog-button:enabled:eq(0)");
            
            // Set focus to the primary button, to any other button, or to the dialog depending
            // if there are buttons
            if ($primaryBtn.length) {
                $primaryBtn.focus();
            } else if ($otherBtn.length) {
                $otherBtn.focus();
            } else {
                document.activeElement.blur();
            }

            // Push our global keydown handler onto the global stack of handlers.
            KeyBindingManager.addGlobalKeydownHook(keydownHook);
        });
        
        // Click handler for buttons
        $dlg.one("click", ".dialog-button", function (e) {
            _processButton($dlg, $(this).attr("data-button-id"), autoDismiss);
        });
                
        // Run the dialog
        $dlg
            .modal({
                backdrop: "static",
                show:     true,
                selector: ".modal-inner-wrapper:last",
                keyboard: false // handle the ESC key ourselves so we can deal with nested dialogs
            })
            // Updates the z-index of the modal dialog and the backdrop
            .css("z-index", zIndex + 1)
            .next()
            .css("z-index", zIndex);
        
        zIndex += 2;
        
        return (new Dialog($dlg, promise));
    };
    
    });