# grunt-started
Grunt: El automatizador de tareas de JavaScript<br />

Por que usar un automatizador?: El trabajo se vuelve más facil cuando tareas tales como: minificar, ofuscar, concatenar , compilar, testiar, etc... se hacen de manera automática. <br />
Por que usar Grunt? : Existe una comunidad gigantesca creando miles de módulos todos los días. Esto hace que hoy en día podamos automatizar casi todo lo que necesitemos!<br />

LINK AL VIDEO: https://www.youtube.com/watch?v=PMpeQxxybcE <br />
LINK AL SITIO: http://video-programazion.blogspot.com.ar/2016/02/grunt-el-automatizador-de-tareas-de.html <br />

Lo primero que haremos será crear un nuevo proyecto de node y lo llamaremos testingGrunt. Si tienen dudas sobre como crear un nuevo proyecto de node les recomiendo ver el siguiente video tutorial: http://video-programazion.blogspot.com.ar/2016/02/npm-el-gestor-de-paquetes-de-nodek.html<br />

Como Instalar Grunt: <br />

 Lo primero que haremos será instalar la interface de comandos para grunt de manera global: ```sudo npm install -g grunt grunt-cli```<br />
 Una vez hecho esto descargaremos dentro de nuestro proyecto el modulo de grunt: ```npm install grunt --save-dev```<br />
 Con estos dos pasos ya estamos listos para comenzar a usar grunt!<br />


Veamos como funciona con un ejemplo!<br />

 Entremos dentro de nuestro proyecto testingGrunt y creemos una carpeta llamada scripts y dentro de ella un archivo llamado hello.js:<br />
```
  mkdir scripts
  touch hello.js (este comando crea un archivo vacio)
  ```

 Ahora entremos dentro de nuestro archivo y escribamos y escribamos las siguientes lineas:<br />
```
(function(msg){
    alert(msg);
})("Hola mundo!")
```

 Guardemos nuestro archivo y volvamos a la raiz de nuestro proyecto: ```cd ../```<br />
 Una vez aquí lo que vamos a hacer es descargar un módulo de grunt para minificar nuestro código Js! Para ello ejecutaremos el siguiente comando:<br />
```
  npm install grunt-contrib-uglify --save-dev
```
 Ahora creemos nuestro archivo de configuración de grunt: touch Gruntfile.js (Este archivo es el que va a ejecutar todas nuestras teras automatizadas)
 Dentro del archivo pegaremos el siguiente código:<br />

```
 module.exports = function(grunt) {

   // Configuración del proyecto

   grunt.initConfig({

     pkg: grunt.file.readJSON('package.json'), // Esta linea lee nuestro archivo package.json y nos permite tomar alguna de sus configuraciones.

     uglify: {

       build: {

         src: 'scripts/*.js', // Esta linea se va a encargar de tomar todos los archivos que se encuentren dentro de scripts/ y que tengan una extension ".js"

         dest: 'build/<%= pkg.name %>.min.js' // Utilizaremos el nombre del proyecto para exportar el resultado de la minificación. Como nuestra carpeta build no existe, grunt la va a crear

       }

     }

   });

   // Mediante este código vamos a cargar el módulo uglify para utilizarlo dentro de nuestro automatizador.

   grunt.loadNpmTasks('grunt-contrib-uglify');

   // Aquí le expecificamos a grunt que su tarea por default va a ser ejecturar uglify!

   grunt.registerTask('default', ['uglify']);

 };
```



Probemos nuestro automatizador!<br />
Ejecutemos el comando : ```grunt```<br />


Como podrán ver en la raiz de nuestro proyecto ahroa hay una carpeta llamada build y un archivo con el nombre de nuestro proyecto ".min.js"<br />

Quieren un poco más????
 Si cada vez que hacemos un cambio en nuestro archivo hello.js tenemos que volver a ejecutar el comando: grunt , esto se volvería un poco tedioso, no ?<br />
 Por ello les voy a enseñar como automatizar también esa tarea. Para ello utilizaremos el módulo: grunt-contrib-watch<br />

 Para descargarlo ejecutaremos el siguiente código: ```npm install grunt-contrib-watch --save-dev```<br />
 Una vez hecho esto volveremos a abrir nuestro archivo Gruntfile.js y lo dejaremos de la siguiente forma:<br />


```
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
```



 Ahora probemos correr el comando grunt nuevamente.<br />
 Cambiemos una linea en nuestro código hello.js:<br />

```
  (function(msg){

   alert("Simón dice: " + msg);

  })("Hola mundo!")
```


 Abramos nuestro archivo ejecutado dentro de buil/<nombre del proyecto>.min.js y verifiquemos que el cambio ha impactado!
