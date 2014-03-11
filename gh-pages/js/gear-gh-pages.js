var app = angular.module( 'gear-gh-pages' , ['ngRoute'] );

/* ROUTING */
app.config( function( $routeProvider ){
	$routeProvider.when( '/' , { templateUrl : 'gh-pages/home.html' });
	$routeProvider.otherwise( { redirectTo : '/' });

	var routes = [ 'home' , 'getting-started' , 'css' , 'js' , 'doc' ];
	for (var i = 0; i < routes.length; i++) 
		$routeProvider.when( '/'+routes[i] , { templateUrl : 'gh-pages/'+routes[i]+'.html' });

});

/* MAIN CONTROLLER */
app.controller( 'mainController', function( $scope , $location ){
	$scope.menu = [
		{
			title 	:'Getting started',
			url 	:'getting-started'
		},{
			title 	:'CSS',
			url 	:'css'
		},{
			title 	:'JS',
			url 	:'js'
		},{
			title 	:'Doc',
			url 	:'doc'
		},
	]

	$scope.isCurrentPath = function ( path ){
       return $location.path().slice(0,path.length) == path ? 'active' : '' ;
    }
});