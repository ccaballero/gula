
var follows=new Array()
  , socket=io()

$(function(){
    var create_follow=function(name){
        var anchor=$('<a>'+name+'</a>')
            .click(button_follow)
            .dblclick(dbl_follow)
          , item=$('<li>')
        item.append(anchor);
        return item
    }
      , menu_follow=function(){
        $('ul.follows').append(create_follow('New follow'));
    }
      , button_follow=function(){
        console.log('button follow');
    }
      , dbl_follow=function(){
        var text=$(this).text()
          , input=$('<form><input type="text" value="'+text+'" /></form>')
            .submit(change_file)
        $(this).parent().empty().append(input);
    }
      , change_file=function(event){
        event.preventDefault();
        var file=$(this).children().first().val();
        $(this).parent().empty().append(create_follow(file));
        // ajax petition - socket io listener
    }

    $('.follow').click(menu_follow);

    socket.on('follow', function(msg){
        $('#content>pre').append(msg+'\n');
    });
});

