'use strict';

var request=require('request');

module.exports=function(grunt){
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var reloadPort=35729
      , filescontrol

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json')

      , watch:{
            server:{
                files:[
                    '{,*/}*.js'
                ]
              , tasks:[
                    'develop:server'
                ]
              , options:{livereload:reloadPort}
            }
          , js:{
                files:['public/js/{,*/}*.js']
              , options:{livereload:reloadPort}
            }
          , styl:{
                files:['stylus/{,*/}*.styl']
              , options:{livereload:reloadPort}
            }
          , jade:{
                files:['views/{,*/}*.jade']
              , options:{livereload:reloadPort}
            }
          , test:{
                files:['test/{,*/}*.js']
              , tasks:['mochacli']
            }
        }

      , develop:{
            server:{file:'app.js'}
        }

      , mochacli:{
            options:{
                reporter:'spec'
              , bail:true
            }
          , all:['test/{,*/}*.js']
        }
    });

    grunt.registerTask('test',['mochacli']);

    grunt.config.requires('watch.files');
    filescontrol=grunt.config('watch.files');
    filescontrol=grunt.file.expand(filescontrol);

    grunt.registerTask('delayed-livereload',
        'Live reload after the node server has restarted.',function(){
        var done=this.async()
          , url='http://localhost:'+reloadPort+'/changed?files='
               +filescontrol.join(',')

        setTimeout(function(){
            request.get(url,function(err,res){
                var reloaded=!err&&res.statusCode===200

                if(reloaded){
                    grunt.log.ok('Delayed live reload successful.')
                }else{
                    grunt.log.error('Unable to make a delayed live reload.')
                }
                done(reloaded)
            })
        },500)
    });

    grunt.registerTask('serve',[
        'develop'
      , 'watch'
    ]);
};

