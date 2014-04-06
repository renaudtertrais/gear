/* MAIN CONTROLLER */
app.controller( 'mainController', ['$scope','$location','$timeout',function($scope , $location , $timeout ){
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
}]);