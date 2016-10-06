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

        // Task configuration
        browserSync: {
            bsFiles: {
                src : [
                    '_site/index.html'
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
                src: '_site/js/main.js',
                dest: '_site/js/**/*'
            }
        },
        concurrent: {
            serve: [
                'shell:jekyllBuild',
                'browserSync',
                'postcss',
                'watch'
            ],
            build: [
                'shell:jekyllBuild'
            ],
            options: {
                logConcurrentOutput: true
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        browsers: 'last 4 versions'
                    })
                ]
            },
            dist: {
                src: '_site/css/*.css'
            }
        },
        shell: {
            jekyllBuild: {
                command: 'jekyll build'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            output: {
                files: {
                    '_site/js/**/*': '_site/js/**/*'
                }
            }
        },
        watch: {
            grunt: {files: ['Gruntfile.js']},
            sass: {
                files: ['_sass/*.scss','css/styles.scss'],
                tasks: ['shell:jekyllBuild', 'postcss']
            },
            scripts: {
                files: 'js/**/*',
                tasks: 'shell:jekyllBuild'
            },
            jekyll: {
                files: [
                    '_drafts/**/*',
                    '_includes/**/*',
                    '_layouts/**/*',
                    '_posts/**/*',
                    '*.html'
                ],
                tasks: ['shell:jekyllBuild']
            }
        }


    });

    grunt.registerTask('build', [
        'shell:jekyllBuild'
    ]);

    grunt.registerTask('serve', [
        'concurrent:serve'
    ]);

    grunt.registerTask('default', 'serve');

};