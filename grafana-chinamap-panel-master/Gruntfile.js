module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.loadNpmTasks('grunt-execute');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.initConfig({

    copy: {
      src_to_dist: {
        cwd: 'src',
        expand: true,
        src: ['**/*', '!**/*.js', 'lib/*.js'],
        dest: 'dist'
      },
      pluginDef: {
        expand: true,
        src: [ 'plugin.json', 'README.md' ],
        dest: 'dist',
      }
    },

    watch: {
      rebuild_all: {
        files: ['src/**/*', 'plugin.json'],
        tasks: ['default'],
        options: {spawn: false}
      },
    },

    babel: {
      options: {
        sourceMap: true,
        presets:  ["es2015"],
        plugins: ['transform-es2015-modules-systemjs', "transform-es2015-for-of"],
      },
      dist: {
        files: [{
          cwd: 'src',
          expand: true,
          src: ['*.js', 'lib/map/*.js', 'lib/map/province/*.js'],
          dest: 'dist',
          ext:'.js'
        }]
      },
    },

  });

  grunt.registerTask('default', ['copy:src_to_dist', 'copy:pluginDef', 'babel']);
};
