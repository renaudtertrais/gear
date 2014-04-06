var app = angular.module( 'gear-gh-pages' , ['ngRoute','ngSanitize','hljs'] );

/* ROUTING */
app.config( function( $routeProvider ){
	$routeProvider.when( '/' , { templateUrl : 'gh-pages/home.html' });
	$routeProvider.otherwise( { redirectTo : '/' });

	var routes = [ 'home' , 'getting-started' , 'css' , 'js' , 'doc' ];
	for (var i = 0; i < routes.length; i++) 
		$routeProvider.when( '/'+routes[i] , { templateUrl : 'gh-pages/'+routes[i]+'.html' });

});
/* HLJS */
app.config(function (hljsServiceProvider) {
  hljsServiceProvider.setOptions({
  	tabReplace: '    '
  });
});

/* JQUERY */
function init(){
	gear.setDataAPI();

	var myAlert = new gear.Alert('Attention',"Are you <strong>sure</strong> ? <br><em>(Don't worry, it's just an example)</em>",{
		destroy : false,
		panel : {
			class : "panel panel-alert",
		},
		alert : {
			show : false
		},
		buttons : [
			{
				text 	: "Cancel",
				class 	: "btn",
				onClick : function(){ myAlert.close(); } 
			},{
				text 	: "Do it !",
				class 	: "btn btn-alert ml10",
				onClick : function(){ myAlert.close(); gear.Alert("Message","Done !"); } 
			}
		]
	});
	$("#btn-alert-1").on("click",function(){
		myAlert.open();
	})
}
