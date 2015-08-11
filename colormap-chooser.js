/*
 * A widget for choosing colorbrewer colormaps
 * https://github.com/auxiliary/colormap-chooser
 */
;(function ($, window){
    /*
     * Starting the plugin itself
     */
    $.fn.cmchooser = function(options)
    {
        if (options === undefined || typeof options === 'object')
        {
            return this.each(function(){
                if (!$.data(this, "cmchooser"))
                {
                    $.data(this, "cmchooser", new CMChooser(this, options));
                }
            });
        }
        else if (typeof options === 'string')
        {
            var args = arguments;
            var returns;
            this.each(function(){
                var instance = $.data(this, "cmchooser");
                if (instance instanceof CMChooser && typeof instance[options] === 'function')
                {
                    returns = instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                }
                if (options === 'destroy')
                {
                    // Unbind all events and empty the plugin data from instance
                    $(instance.element).off();
                    $.data(this, 'rate', null);
                }
            });

            return returns !== undefined ? returns : this;
        }
    };

    function CMChooser(element, options)
    {
        this.element = element;
        this.settings = $.extend({}, $.fn.cmchooser.settings, options);
        this.build();
    }

    CMChooser.prototype.build = function()
    {
        
    }

    $.fn.cmchooser.settings = {

    };

}(jQuery, window));
