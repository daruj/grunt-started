module.exports = function(grunt) {

  // Configuración del proyecto
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // Esta linea lee nuestro archivo package.json y nos permite tomar alguna de sus configuraciones.
    uglify: {
      build: {
        src: 'scripts/*.js', // Esta linea se va a encargar de tomar todos los archivos que se encuentren dentro de scripts/ y que tengan una extension ".js"
        dest: 'build/<%= pkg.name %>.min.js' // Utilizaremos el nombre del proyecto para exportar el resultado de la minificación. Como nuestra carpeta build no existe, grunt la va a crear
      }
    },
    watch: {
        scriptFiles: {
            files: ['scripts/*.js'], // Estos serán los archivos que estaremos escuchando (Todos aquellos que estén dentro de scripts/ y que tengan una extensión ".js")
            tasks: ['uglify'], // Esta será la tarea a ejecutar
            options: {
                spawn: false
            }
        }
    }
  });

  // Mediante este código vamos a cargar el módulo uglify para utilizarlo dentro de nuestro automatizador.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Ahora agreguemos el módulo que vamos a estar utilizando para escuchar todos los cambios en nuestros archivos!
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Aquí le expecificamos a grunt que su tarea por default va a ser ejecturar uglify y LUEGO watch!
  grunt.registerTask('default', ['uglify','watch']);

};