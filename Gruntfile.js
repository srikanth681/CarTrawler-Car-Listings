/**
 * Created by srikanth681 on 08/12/2016.
 */
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            my_target: {
                files: {
                    'build/js/built.js': ['src/js/displayMethods.js', 'src/js/urlParser.js', 'src/js/utils.js'],
                }
            }
        },
        watch: {
            less: {
                files: 'js/*.js',
                tasks: 'concat'
            }
        },
        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9000,
                    base: 'build',
                    open: true
                }
            }
        },
        // Empties folders to start fresh
        clean: ["build"],
        copy: {
            main: {
                files: [
                    { expand: true, cwd:"src/images/", src: '{,*/}*.*', dest: 'build/images/'},
                    {expand: true, cwd:"src/js/", src: ['{,*/}cars.json'], dest: 'build/js/', filter: 'isFile'},

                ],
            },
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/style.css': ['src/style.css']
                }
            }
        },
        htmlmin: {                                     // Task 
            build: {                                      // Target
                options: {                                 // Target options 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files 
                    'build/index.html': 'src/index.html',
                }
            }
        }
        
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-serve');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['clean','uglify','cssmin','htmlmin','copy:main']);
    grunt.registerTask('default', ['build','connect:server']);
    
}
