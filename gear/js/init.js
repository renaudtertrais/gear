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