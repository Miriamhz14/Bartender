$(document).ready(function() {
  $('#submit').click(function(){
    var info = $('#search').val();
    $.ajax({
      'url': '/test',
      'method': 'POST',
      'data': {data: info}
    });
  });

  $('.find').click(function(){

    var name = $(this).attr('nam');
    var img = $(this).attr('find_img');
    var ing1 = $(this).attr('ing1');
    var ing2 = $(this).attr('ing2');
    var ing3 = $(this).attr('ing3');
    var mes1 = $(this).attr('mes1');
    var mes2 = $(this).attr('mes2');
    var mes3 = $(this).attr('mes3');
    var ins = $(this).attr('ins');
    $.ajax({
      'url': '/testi',
      'method': 'POST',
      'data': {
        data: img,
        name: name,
        ing1: ing1,
        ing2: ing2,
        ing3: ing3,
        mes1: mes1,
        mes2: mes2,
        mes3: mes3,
        ins: ins
      }
    });
  });

  $('.delete').click(function(){

    var img_url = $(this).attr('img_url');
    $.ajax({
      'url': '/testip',
      'method': 'POST',
      'data': {data: img_url}
    })

    $(this).prevUntil('#stopper').remove();
    $(this).remove();

  });

  $('.fav_img').click(function(){

    var name = $(this).attr('nam');
    var ing1 = $(this).attr('ing1');
    var ing2 = $(this).attr('ing2');
    var ing3 = $(this).attr('ing3');
    var mes1 = $(this).attr('mes1');
    var mes2 = $(this).attr('mes2');
    var mes3 = $(this).attr('mes3');
    var ins = $(this).attr('ins');
    var image = $(this).attr('drink_img');
    var id = $(this).attr('drink_id');

    $.ajax({
      'url':'/testips',
      'method':'POST',
      'data': {
        image: image,
        name: name,
        ing1: ing1,
        ing2: ing2,
        ing3: ing3,
        mes1: mes1,
        mes2: mes2,
        mes3: mes3,
        ins: ins,
        img:image,
        id:id
      }
    })
  })


 $('#signIn').on('#submit',function(event){
    event.preventDefault()

    name = $(this).children('#name').val();
    email = $(this).children('#email').val();
    password = $(this).children('#password').val();

    user = {name:name,email:email,password:password};

    $.ajax({
      "url": "http://localhost:3000/signIn",
      "method": "POST",
      "data": users,
      "success": function(data){
        console.log('ajax call was good.')
        window.location.alert("Signed In");
      }
    });
  });
































});


