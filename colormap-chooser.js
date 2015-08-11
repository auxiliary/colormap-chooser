/*
 * A widget for choosing colorbrewer colormaps
 * Requires D3, colorbrewer, jQuery and Bootstrap
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
                    $.data(this, 'cmchooser', null);
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
        this.select(this.settings.default_colormap);
    }

    CMChooser.prototype.select = function(key)
    {
        var selected_colormap = {key: colorbrewer[key]};
        var container = d3.select(this.element)
            .select("button");
        container.html("");
        this.build_colormaps(container, selected_colormap);
        this.selected = key;

        /* Call change event */
        $(this.element).trigger("change", this.selected);
    }

    CMChooser.prototype.build = function()
    {
        var that = this;
        d3.select(this.element)
            .attr("class", this.settings.dropup ? "dropup" : "dropdown")
            .append("button")
            .attr("class", "btn btn-default dropdown-toggle")
            .attr("data-toggle", "dropdown");

        var colormaps_container = d3.select(this.element)
            .append("ul")
            .attr("class", "dropdown-menu")
            .style({
                'width': '270px',
                'height': '300px',
                'overflow-y': 'scroll'
            });

        this.build_colormaps(colormaps_container, colorbrewer, function(d){
            that.select(d.key);
        });
    }

    CMChooser.prototype.get_selected = function()
    {
        return this.selected;
    }

    CMChooser.prototype.build_colormaps = function(container, colormaps, onclick)
    {
        container
            .selectAll(".palette")
            .data(d3.entries(colormaps))
            .enter().append("li")
            .attr("class", "palette")
            .style({
                'cursor':           'pointer',
                'display':          'inline-block',
                'vertical-align':   'bottom',
                'background':       '#fff',
                'border':           'solid 1px #aaa'
            })
            .attr("title", function(d){ return d.key; })
            .on("click", onclick)
            .selectAll(".swatch")
            .data(function(d){ return d.value[d3.keys(d.value).map(Number).sort(d3.descending)[0]]; })
            .enter().append("span")
            .attr("class", "swatch")
            .style({
                'background-color': function(d) { return d; },
                'display': 'inline-block',
                'vertical-align': 'middle',
                'width': '20px',
                'height': '22px',
            });
    }

    $.fn.cmchooser.settings = {
        'dropup': true,
        'default_colormap': 'PuBu'
    };

}(jQuery, window));
