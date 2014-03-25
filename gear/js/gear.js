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
