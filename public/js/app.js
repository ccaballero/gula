var follows=new Array()
  , index=0
  , socket=io()

$(function(){
    var create_follow=function(name,index){
        var anchor=$('<a>'+name+'</a>')
            .click(button_follow)
            .dblclick(dbl_follow)
          , item=$('<li>');
        item.append(anchor).data('i',index);
        return item;
    }
      , menu_follow=function(){
        $('ul.follows').append(create_follow('New follow',index));
        follows.push('#'+(index++)+' ------- ------- --------\n');
    }
      , button_follow=function(){
            var i=$(this).parent().data('i');
            $('#content>pre').html(follows[i]);
    }
      , dbl_follow=function(){
        var text=$(this).text()
          , input=$('<form><input type="text" value="'+text+'" /></form>')
                .submit(change_file);
        $(this).parent().empty().append(input);
    }
      , change_file=function(event){
        event.preventDefault();
        var file=$(this).children().first().val();
        var item=$(this).parent();
        item.empty().append(create_follow(file,item.data('id')));
        socket.send(JSON.stringify({file:file}));
    }

    $('.follow').click(menu_follow);

    //socket.on('follow',function(msg){
    //    $('#content>pre').append('\n'+msg);
    //});
});

