module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	var jsSrc = 'src/js/script.js',
		jsDist = 'dist/js/built.js';

	// Configuration de Grunt
	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					"expand": true,
					"cwd": "src/styles/",
					"src": ["*.scss"],
					"dest": "dist/styles/",
					"ext": ".css"
				}]
			},
			dev: {}
		},
		concat: {
			options: {
				separator: ';'
			},
			compile: {
				src: jsSrc,
				dest: jsDist
			}
		},
		uglify: {
			options: {
				separator: ';'
			},
			compile: {
				src: jsSrc,
				dest: jsDist
			}
		},
		watch: {
			options: {
				livereload: '<%= connect.options.livereload %>'
			},
			livereload: {
				files: [
					'index.html',
					'dist/{,*/}'
				]
			},
			scripts: {
				files: jsSrc,
				tasks: ['scripts:dev']
			},
			styles: {
				files: '**/*.scss',
				tasks: ['styles:dist']
			}
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true
				}
			}
		}
	});

	grunt.registerTask('default', ['connect', 'dev', 'watch']);
	grunt.registerTask('dev', ['styles:dev', 'scripts:dev']);
	grunt.registerTask('dist', ['styles:dist', 'scripts:dist']);

	grunt.registerTask('scripts:dev', ['concat:compile']);
	grunt.registerTask('scripts:dist', ['uglify:compile']);

	grunt.registerTask('styles:dev', ['sass:dist']);
	grunt.registerTask('styles:dist', ['sass:dist']);
}