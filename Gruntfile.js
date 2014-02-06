module.exports = function(grunt){
	grunt.initConfig({	
		sass: {                             
		    dist: {                          
				options: {                      
					style: 'expanded',
					compass : true
				},
			    files: {
			        'dist/gear.css' : 'scss/themes/default/theme.scss',       // 'destination': 'source'
			    }
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');

}