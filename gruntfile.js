module.exports = function(grunt){

  "use strict";
  require("matchdep").filter("grunt-*").forEach(grunt.loadNpmTasks);
  var autoprefixer = require('autoprefixer-core');

  grunt.initConfig({

      pkg: grunt.file.readJSON('package.json'),

      // create bootstrap.scss file for sass compile to work 
      rename: {
        moveThis: {
            src: 'node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss',
            dest: 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap.scss'
        }
    },
      // compile sass during watch process
      sass: {
          build: {
              files: {
                  'css/bootstrap.css': 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap.scss'
              }
          }
      },
      // watch changes to sass and compile - use for dev changes
      watch: {  
          css: {
              files: ['css/style.css'],
              tasks: ['postcss:dist', 'cssc', 'cssmin']
          }
      },
      

      //add prefixes
      postcss: {
          options: {
                map: false,
                processors: [
                    require('autoprefixer')({
                        browsers: ['last 2 versions']
                    })
                ]
            },
          dist: { src: 'css/*.css' }
      },
      // streamline css for prod
      cssc: {
          build: {
              options: {
                debugInfo: false,
                sortSelectors: false,
                lineBreaks: true,
                sortDeclarations:false,
                consolidateViaDeclarations:false,
                consolidateViaSelectors:false,
                consolidateMediaQueries:true,
              },
              files: {
                  'css/style.css' : 'css/style.css'
              }
          }
      },
      // part of post processing. Use to compile into prod css code
      concat_css: {
        options: {
            // Task-specific options go here. 
        },
        all: {
          src: ['css/bootstrap.css','css/style.css'],
          dest: "css/style.css"
        }
      },
      // minimise css for prod
      cssmin: {
          target: {
              files: [
                  {
                    expand: true,    
                    cwd: 'css/',
                    src: 'style.css',
                    dest: 'css/',
                    ext: '.min.css'
                  }
              ]
          }
      },
      // copy everything to dist folder for publication
      copy: {
        main: {
          files: [
            {src: ['node_modules/jquery/dist/jquery.min.js'], dest: 'dist/lib/jquery.min.js'},
            {src: ['css/style.min.css'], dest: 'dist/css/style.min.css'},
            {src: ['scripts/script.js'], dest: 'dist/scripts/script.js'},
            {src: ['index.html'], dest: 'dist/index.html'},
            {src: ['img/lisbon-from-above.jpg'], dest: 'dist/img/lisbon-from-above.jpg'}
            
          ],
        },
      },
  });

  grunt.registerTask('default', ['rename','sass']);
  grunt.registerTask('prefix', ['postcss:dist']);
  grunt.registerTask('minify', ['cssmin']);
  grunt.registerTask('cssStreamline', ['cssc']);
  grunt.registerTask('processCss', ['postcss:dist', 'cssmin']);
  grunt.registerTask('dist', ['sass','postcss:dist', 'concat_css','cssmin','copy']);
  grunt.registerTask('watchcss', ['watch']);
  grunt.registerTask('copyFiles', ['copy']);
};