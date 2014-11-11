module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Metadata
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.business %>; */\n',

    // Directories
    dir: {
      js: {
        src: {
          foundation: 'bower_components/foundation/js/foundation.js',
          plugins: 'plugins'
        }
      },
      sass: {
        src: {
          foundation: 'bower_components/foundation/scss'
        }
      }
    },
    
    // Task configuration
    sass: {
      options: {
        loadPath: ['<%= dir.sass.src.foundation %>'],
        banner: '<%= banner %>',
        quiet: true
      },
      dist: {
        options: {
          style: 'compressed', //nested, compact, compressed, expanded
        },
        files: {
          'css/style.css': 'scss/style.scss'
        }        
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['<%= dir.js.src.foundation %>', '<%= dir.js.src.plugins %>/*.js'],
        dest: 'js/script.js',
      },
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

  grunt.registerTask('build', ['sass']);
  grunt.registerTask('default', ['concat','build','watch']);
}