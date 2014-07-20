/*
 * component.list-view-scroll
 * http://github.amexpub.com/modules/component.list-view-scroll
 *
 * Copyright (c) 2013 Amex Pub. All rights reserved.
 */

'use strict';
var exec = require('child_process').exec;

module.exports = function(grunt) {
  grunt.initConfig({
    jsbeautifier: {
      files: ["src/**/*.js"],
      options: {
        jshintrc: '.jsbeautify'
      },
    },
    simplemocha: {
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: {
        src: 'test/**/*.js'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'index.js',
        'src/**/*.js',
        'test/**/*.js'
      ]
    },
    browserify: {
      dist: {
        files: {
          'dist/assets/js/main.js': ['src/assets/js/main.js'],
        }
      }
    },
    less: {
      development: {
        options: {
          paths: ["src/assets/css"],
          yuicompress: true
        },
        files: {
          "dist/assets/css/main.css": "src/assets/less/main.less"
        }
      }
    },
    template: {
      all: {
        files: [{
          expand: true,
          cwd:'src/views',
          src: [ '**/*.ejs','!shared/**/*.ejs' ],
          dest: 'dist',
          ext: '.html'
        }],
        variables: {
          env: "environment"
        }
      }
    },
    imagemin: {                          // Task
      dynamic: {                         // Another target
        options: {                       // Target options
          optimizationLevel: 7
        },
        files: [{
          expand: true,                  // Enable dynamic expansion
          cwd: 'src/',                   // Src matches are relative to this path
          src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
          dest: 'dist/'                  // Destination path prefix
        }]
      }
    },
    watch: {
      scripts: {
        // files: '**/*.js',
        files: [
          'Gruntfile.js',
          'src/**/*.js',
          'src/**/*.png',
          'src/**/*.svg',
          'src/**/*.gif',
          'src/**/*.jpg',
          'test/**/*.js',
          'src/**/*.ejs',
          'src/**/*.less'
        ],
        tasks: ['lint', 'less', 'template', 'browserify','minimg'],
        options: {
          interrupt: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jsbeautifier');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-templater');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // grunt.registerTask('default', ['imagemin']);
  grunt.registerTask('default', ['jshint', 'simplemocha', 'template', 'less']);
  grunt.registerTask('lint', ['jshint', 'jsbeautifier']);
  grunt.registerTask('test', 'simplemocha');
  // grunt.registerTask('minimg', ['imagemin:dynamic']);
  grunt.registerTask('minimg', ['newer:imagemin:dynamic']);
};