gear.plugin.toggle = {
    name : "tog",
    slug : "tog",
    plugin : function( o , arg ){
        // * * * plugin toggle * * *
        var self = gear.plugin.toggle.plugin ;

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
                tog             : false,
                target        : false,
                event         : "click",
                transitionIn  : false,
                transitionOut : false,
                transition    : "toggle",
                time          : 300,
                init          : true
            },o, o.grToggleOptions);

            if(!o.target) o.target = o.tog ;

            $this.data("togOptions",o);
            $this.on(o.event,function(){
                self.transition.call(this);
            });

            console.log(o.target);

            return $this;

        });

        self.transition = function(){

            var $this = $(this);
            var o = $this.data("togOptions");
            $(o.target)[o.transition]();
            
            return $this; 
        }
    }
};