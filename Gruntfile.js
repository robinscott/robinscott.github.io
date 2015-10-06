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
        browserSync: {
            bsFiles: {
                src : [
                    '_site/css/*.css',
                    '_site/*.html',
                    '_site/js/*.js'
                ]
            },
            options: {
                server: '_site'
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
        concurrent: {
            serve: [
                'shell:jekyllServe',
                'browserSync',
                'watch'
            ],
            options: {
                logConcurrentOutput: true
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
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            },
            jekyllServe: {
                command: 'jekyll serve'
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
        }


    });

    // Register the grunt serve task
    grunt.registerTask('serve', [
        'sass',
        'concurrent:serve'
    ]);

    // Register build as the default task fallback
    grunt.registerTask('default', 'serve');

};