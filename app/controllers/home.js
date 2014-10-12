'use strict';

module.exports=function(app){
    app.get('/',function(request,response){
        response.render('index');
    });
};

