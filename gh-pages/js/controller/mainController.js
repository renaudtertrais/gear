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


    $scope.loadJS = function(){
    	if($("demo").length > 0){
    		$scope.timeout = $timeout( $scope.loadJS , 10 );
    	}else{
    		$timeout.cancel($scope.timeout);
    		console.log("Loaded " + $scope.theTime());
    		init();
    	}
    }

    $scope.theTime = function(){
		var d = new Date() - $scope.time;
		d = new Date(d);
		return d.getSeconds()+":"+d.getMilliseconds();
	}

    $scope.time = new Date();
}]);