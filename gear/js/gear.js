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
            return match[1].toUpperCase();
        });
    },
    unCamelCase : function(str){
        return str.replace(/[a-z]([A-Z])/g,function(match) {
            return "-"+match[0].toUpperCase();
        });
    },
    unPrefix : function(pre,obj){

    },
    setPlugin : function(){
    	$.each( gear.plugin , function( name , plugin ){

    		if( gear.prefix != ""){
    			plugin.slug = gear.prefix+'-'+plugin.slug;
                plugin.name = gear.camelCase( plugin.slug );
            }

    		$.fn[ plugin.name ] = plugin.plugin;
    
    	});
    },
    setDataAPI : function(){
        if( gear.dataAPI ){
            $.each( gear.plugin , function(name,plugin){
                $('[data-'+plugin.slug+']').each(function(){
                    var $this = $(this);
                    $this[plugin.name]($this.data());
                });
            });
        }
    },
    factory : function( name ){
        name = gear.camelCase(name);
        gear.plugin[name] = {
            name : name,
            slug : camelCase,
            plugin : function(){
                var self = gear.plugin[name].plugin ;
                
                var returnValue;

                var params = arguments;

                $this.each(function(){

                    var $this = $(this);

                    var options = $this.data(name+"Options");

                    // options ?
                    if(options){
                        // already init ?
                        if(options.init){
                            // is there a list one params ?
                            if(params){
                                return self.transition.call(this);

                            // no params
                            }else{
                                // is there a main methods
                                if( self.main ){
                                    // ok so lunch the main methods with params
                                    returnValue = self.main.apply(this);
                                    return false;
                                }
                            }
                        // options but no init so init()
                        }else{
                            o = $.extend()
                        }
                    // no options so init()
                    }else{
                        o = $.extend({
                            tog           : false,
                            target        : false,
                            event         : "click",
                            transitionIn  : false,
                            transitionOut : false,
                            transition    : "toggle",
                            time          : 300,
                            init          : true
                        },o, o.grToggleOptions);
                    }

                    
                    return $this;
                });
            }
        }
        return gear.plugin[name].plugin; ;
    }
};
