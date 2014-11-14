module.exports = function(grunt) {
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
        js_dev: 'js/dev/*.js',
        js_concat: 'js/concat/script.js',
      },
      dest: {
        js_concat: 'js/concat/script.js',
        js_output: 'js/output/script.min.js'
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
          style: 'compressed', //nested, compact, compressed, expanded
        },
        files: {
          '<%= css.dest.css %>': '<%= css.src.sass %>'
        }        
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= js.src.foundation %>', '<%= js.src.js_dev %>'],
        dest: '<%= js.dest.js_concat %>',
      },
    },

    uglify: {
      options: {
        mangle: false
      },
      output: {
        files: {
          '<%= js.dest.js_output %>': ['<%= js.src.js_concat %>']
        }
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },

      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['concat','uglify','build','watch']);
}