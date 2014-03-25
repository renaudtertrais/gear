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
            
        }
    }
};
