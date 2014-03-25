module.exports = function(grunt){
	grunt.initConfig({	
		sass: {                             
		    dist_min: {                          
				options: {                      
					style: 'compressed',
					compass : true
				},
			    files: {
			        'dist/css/gear.min.css' : 'themes/default/default.scss',       // 'destination': 'source'
			    }
			},
			dist_exp: {                          
				options: {                      
					style: 'expanded',
					compass : true
				},
			    files: {
			        'dist/css/gear.css' : 'themes/default/default.scss',    
			    }
			},
			demo_min: {                          
				options: {                      
					style: 'compressed',
					compass : true
				},
			    files: {
			        'gh-pages/css/demo.min.css' : 'gh-pages/scss/demo.scss',       // 'destination': 'source'
			    }
			},
			demo_exp: {                          
				options: {                      
					style: 'expanded',
					compass : true
				},
			    files: {
			        'gh-pages/css/demo.css' : 'gh-pages/scss/demo.scss',    
			    }
			}
		},
		concat: {
			dist_exp : {
				src: ['gear/js/gear.js','gear/js/gear.plugin.*.js','gear/js/init.js'],
				dest: 'dist/js/gear.js',
			}
		},
		watch: {
			livereload: {
				files: ['*.html,gh-pages/**'],
				options: {
					spawn: false,
					livereload: true
				},
			},
			scss: {
				files: ['gear/scss/**','themes/**','gh-pages/scss/**'],
				tasks: ['dist-css'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			js: {
				files: ['gear/js/**'],
				tasks: ['dist-js'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}
	});

	// * * * Custom tasks * * *
	// dist-css (sass->css)
	grunt.task.registerTask("dist-css", ["sass"]);
	// dist-js
	grunt.task.registerTask("dist-js", ["concat"]);

	// * * * Grunt Plugins * * *
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
}