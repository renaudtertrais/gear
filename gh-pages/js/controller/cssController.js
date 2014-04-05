app.controller( 'cssController' , function( $scope ){
	$scope.optionsListIcon = [
		"list-check" 		,
		"list-check-circle"	,
		"list-arrow-circle"	,
		"list-caret"			,
		"list-circle"		,
		"list-chevron"		,
		"list-star"			,
		"list-plus"			,
		"list-check-square-o",
		"list-chevron-circle",
		"list-check-square"	
	];
	$scope.changeListIcon = function(){
		$("#listIcon ul").attr("class",$("#selectListIcon").val());
		$("#listIcon .hljs > .hljs-tag:first-child .hljs-value").html($("#selectListIcon").val());
	}
});