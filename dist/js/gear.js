var gear = {
	// vars
    prefix : "",
    plugin : {},
    dataAPI : true,
    // methods
    camelCaseObj : function(obj){
        $.each(obj,function(key,val){
            obj[gear.camelCase(key)] = val ;
        });
        return obj;
    },
    camelCase : function(str){
        return str.replace(/(-| )([a-zA-Z0-9])/g,function(match) {
            return match.toUpperCase();
        });
    },
    unPrefix : function(pre,obj){

    },
    setPlugin : function(){
    	$.each( gear.plugin , function( i , plugin ){

    		console.log(plugin.slug)

    		if( gear.prefix != "")
    			plugin.slug = gear.prefix+'-'+plugin.slug;

    		plugin.name = gear.camelCase( plugin.slug );

    		$.fn[ plugin.name ] = plugin;
    	});
    }
};

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






$(function(){

	gear.setPlugin();



	// * * * dataAPI * * *
	if( gear.dataAPI ){
		console.log(gear)
		$.each( gear.plugin , function(i,plugin){
			console.log(plugin.slug)
			$('[data-'+plugin.slug+']').each(function(){

				var $this = $(this);
				$this[plugin.name]($this.data());
			});
		});
	}
});