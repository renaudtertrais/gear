gear.plugin.push({
    slug : "toggle",
    plugin : function( o , arg ){
    // * * * plugin toggle * * *
    var self = gear.plugin.toggle ;s

    $(this).each(function(){


        var $this = $(this);
        var options = $this.data("grToggleOptions");


        if(options){
            if(options.init){
                if(!o){
                    return self.transition.call(this);
                }

                return $this;
            }
        }

        o = $.extend({
            grToggle      : false,
            target        : false,
            event         : "click",
            transitionIn  : false,
            transitionOut : false,
            transition    : false,
            time          : 300,
            init          : true
        },o, o.grToggleOptions);

        if(!o.target) o.target = o.grToggle ;

        $this.data("grToggleOptions",o);
        $this.on(o.event,self.transition);

        return $this;

    });

    self.transition = function(){
        var $this = $(this);
        var o = $this.data("grToggleOptions");
        $(o.target)[o.transition]();

        return $this; 
    }
};





