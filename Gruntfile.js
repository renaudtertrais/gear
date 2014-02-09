module.exports = function(grunt){
	grunt.initConfig({	
		sass: {                             
		    min: {                          
				options: {                      
					style: 'compressed',
					compass : true
				},
			    files: {
			        'dist/css/gear.min.css' : 'sass/themes/default/default.scss',       // 'destination': 'source'
			    }
			},
			exp: {                          
				options: {                      
					style: 'expanded',
					compass : true
				},
			    files: {
			        'dist/css/gear.css' : 'sass/themes/default/default.scss',    
			    }
			}
		},
		watch: {
			scss: {
				files: ['*.html,gh-pages/**'],
				options: {
					spawn: false,
					livereload: true
				},
			},
			scss: {
				files: ['sass/**'],
				tasks: ['dist-css'],
				options: {
					spawn: false,
					livereload: true
				},
			}
		}
	});

	// * * * Custom tasks * * *
	// dist-css (sass->css)
	grunt.task.registerTask("dist-css", ["sass"]);

	// * * * Grunt Plugins * * *
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
}