module.exports = function (grunt) {
  grunt.initConfig({
     connect: {
      options: {
          port: 9000,
          open: true,
          livereload: 35726,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: '0.0.0.0',
          keepalive: true
      },
      server: {
        options: {
          port: 9008,
          base: './'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.registerTask('start', ['connect']);

  //grunt.loadNpmTasks('grunt-css');
  //grunt.registerTask('default', ['cssmin']);

}