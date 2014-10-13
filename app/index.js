'use strict';

var http=require('http')
  , Tail=require('tail').Tail
  , tails=new Array()
  , express=require('express')
  , favicon=require('serve-favicon')
  , bodyparser=require('body-parser')
  , join=require('path').join
  , app=express()
  , server=require('http').Server(app)
  , io=require('socket.io')(server)
  , base='/var/log'

// async methods
app.set('port',process.env.PORT||3000);
app.set('views',join(__dirname,'views'));
app.set('view engine','jade');
app.disable('x-powered-by');
//app.use(favicon(join(__dirname,'..','public','img','favicon.ico')));
app.use(bodyparser.json());

app.use(require('stylus').middleware({
    src:join(__dirname,'stylus'),
    dest:join(__dirname,'..','public','css'),
    compress:true
}));

app.use(express.static(join(__dirname,'..','public')));
app.use(express.static(join(__dirname,'..','bower_components')));
app.locals.pretty=true;

app.get('/',function(request,response){
    response.render('index');
});
app.put('/tail/:file',function(request,response){
    console.log('add the log file: '+base+request.params.file);
    tails.push(base+request.params.file);
    response.send('OK');
});

app.use(function(req,res){
    res.status(404).render('404.jade',{
        title:'404',
        message:'I\'m so sorry, but file not found!!'
    });
});

var tail=new Tail(base+'/messages');
tail.on('line',function(data){
    io.emit('follow',data);
});

server.listen(app.get('port'),function(){
    console.log('Express server listening on port '+app.get('port'));
});

module.exports=app;

