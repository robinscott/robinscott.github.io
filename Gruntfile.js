module.exports = function (grunt) {

    // Load all Grunt tasks that are listed in package.json automagically
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Metadata
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.business %>; */\n',

        // Paths
        js: {
            src: {
                foundation: 'bower_components/foundation/js/foundation.js',
                js_dev: 'js/dev/*.js'
            },
            dest: {
                js_concat: 'js/script.js',
                js_min: 'js/script.min.js'
            }
        },

        css: {
            src: {
                foundation: 'bower_components/foundation/scss',
                sass: 'scss/style.scss'
            },
            dest: {
                css: 'css/style.css'
            }
        },

        // Task configuration
        sass: {
            options: {
                loadPath: ['<%= css.src.foundation %>'],
                banner: '<%= banner %>',
                quiet: true
            },
            dist: {
                options: {
                    style: 'compressed' //nested, compact, compressed, expanded
                },
                files: {
                    '<%= css.dest.css %>': '<%= css.src.sass %>'
                }
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['<%= js.src.foundation %>', '<%= js.src.js_dev %>'],
                dest: '<%= js.dest.js_concat %>'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            output: {
                files: {
                    '<%= js.dest.js_min %>': ['<%= js.dest.js_concat %>']
                }
            }
        },

        watch: {
            grunt: {files: ['Gruntfile.js']},
            sass: {
                files: 'scss/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: '<%= js.src.js_dev %>',
                tasks: ['concat', 'uglify']
            },
            jekyll: {
                files: [
                    '_layouts/**/*.html',
                    '_includes/**/*.html',
                    'index.md'
                ],
                tasks: ['jekyll:dev']
            }
        },

        jekyll: {
            dev: {
                options: {
                    src: '<%= app %>',
                    dest: '<%= dist %>',
                    config: '_config.yml'
                }
            },
            server: {
                options: {
                    serve: true
                }
            }
        },

        concurrent: {
            target: {
                tasks: ['jekyll:server', 'watch']
            }
        },

        open: {
            dev: {
                path: 'http://localhost:4000',
                app: 'Google Chrome'
            }
        },

        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
            }
        }


    });

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', 'Build and run site locally from _site directory.', ['concat', 'uglify', 'build', 'open:dev', 'concurrent:target']);
};