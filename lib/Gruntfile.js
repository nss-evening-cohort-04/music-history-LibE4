module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      js: {
          src: ['../javascripts/main.js'],
          dest: '../dist/bundle.js'
      },
      options: {
          transform: ['hbsfy']
      }
    },
    jshint: {
      options: {
        predef: [ "document", "console", "$", "firebase" ],
        esnext: true,
        globalstrict: true,
        globals: {},
        browserify: true
      },
      files: ['../javascripts/**/*.js']
    },
     sass: {
      dist: {
        files: {
          '../styles/main.css': '../sass/main.scss'
        }
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sassy: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']        
      },
      hbs: {
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
};
