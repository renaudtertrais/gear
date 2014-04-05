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
			ghPages_min: {                          
				options: {                      
					style: 'compressed',
					compass : true
				},
			    files: {
			        'gh-pages/css/demo.min.css' : 'gh-pages/scss/demo.scss',       // 'destination': 'source'
			    }
			},
			ghPages_exp: {                          
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
			dist : {
				src: ['gear/js/gear.js','gear/js/gear.plugin.*.js','gear/js/init.js'],
				dest: 'dist/js/gear.js',
			},
			ghPages : {
				src: ['gh-pages/js/app.js','gh-pages/js/controller/*.js','gh-pages/js/directive/*.js'],
				dest: 'gh-pages/js/app.min.js',
			}
		},
		watch: {
			livereload: {
				files: ['*.html,gh-pages/*.html','gh-pages/**/*.html'],
				options: {
					spawn: false,
					livereload: true
				},
			},
			dist_sass: {
				files: ['gear/scss/**','themes/**'],
				tasks: ['dist-css'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			ghPages_sass: {
				files: ['gh-pages/scss/**'],
				tasks: ['ghPages-css'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			dist_js: {
				files: ['gear/js/*.js','gear/js/**/*.js'],
				tasks: ['dist-js'],
				options: {
					spawn: false,
					livereload: true
				}
			},
			ghPages_js: {
				files: ['gh-pages/js/*.js','gh-pages/js/**/*.js'],
				tasks: ['ghPages-js'],
				options: {
					spawn: false,
					livereload: true
				}
			}
		}
	});

	// * * * Custom tasks * * *
	// dist-css (sass->css)
	grunt.task.registerTask("dist-css", ["sass:dist_min","sass:dist_exp"]);
	// dist-js
	grunt.task.registerTask("dist-js", ["concat:dist"]);
	// ghPages-css (sass->css)
	grunt.task.registerTask("ghPages-css", ["sass:ghPages_min","sass:ghPages_exp"]);
	// ghPages-js
	grunt.task.registerTask("ghPages-js", ["concat:ghPages"]);

	// * * * Grunt Plugins * * *
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
}