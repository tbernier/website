module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');

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
					"src": "styles.scss",
					"dest": "dist/styles/",
					"ext": ".css"
				}]
			},
			dev: {}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9'],
				map: true
			},
            dist: {
                src: 'dist/styles/styles.css'
            }
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
		imagemin: {
			dynamic: {
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'src/img/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'dist/img/'                  // Destination path prefix
				}]
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
			},
			imagemin: {
				files: ['**/*.{png,jpg,gif}'],
				tasks: ['imagemin']
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
	grunt.registerTask('dev', ['styles:dev', 'scripts:dev', 'newer:imagemin']);
	grunt.registerTask('dist', ['styles:dist', 'scripts:dist', 'newer:imagemin']);

	grunt.registerTask('scripts:dev', ['concat:compile']);
	grunt.registerTask('scripts:dist', ['uglify:compile']);

	grunt.registerTask('styles:dev', ['sass:dist', 'autoprefixer:dist']);
	grunt.registerTask('styles:dist', ['sass:dist', 'autoprefixer:dist']);

	grunt.registerTask('prefix', ['autoprefixer:dist']);

}