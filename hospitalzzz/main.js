$('.telegram-form').on('submit', function (event) {

  event.stopPropagation();
  event.preventDefault();

  let form = this,
      submit = $('.submit', form),
      data = new FormData(),
      files = $('input[type=file]')


  $('.submit', form).val('Отправка...');
  $('input, textarea', form).attr('disabled','');

  data.append( "Iм'я", 		$('[name="name"]', form).val() );
  data.append( 'Телефон', 		$('[name="phone"]', form).val() );
  data.append( 'Тип консультації', 		$('[name="city"]', form).val() );

  data.append( '=== UTM-мітки ===','' );
  data.append( 'utm_source', 		$('[name="utm_source"]', form).val() );
  data.append( 'utm_medium', 		$('[name="utm_medium"]', form).val() );
  data.append( 'utm_campaign', 		$('[name="utm_campaign"]', form).val() );
  data.append( 'utm_content', 		$('[name="utm_content"]', form).val() );
  data.append( 'utm_term', 		$('[name="utm_term"]', form).val() );

  files.each(function (key, file) {
    let cont = file.files;
    if ( cont ) {
      $.each( cont, function( key, value ) {
        data.append( key, value );
      });
    }
  });

  $.ajax({
    url: 'ajax.php',
    type: 'POST',
    data: data,
    cache: false,
    dataType: 'json',
    processData: false,
    contentType: false,
    xhr: function() {
      let myXhr = $.ajaxSettings.xhr();

      if ( myXhr.upload ) {
        myXhr.upload.addEventListener( 'progress', function(e) {
          if ( e.lengthComputable ) {
            let percentage = ( e.loaded / e.total ) * 100;
            percentage = percentage.toFixed(0);
            $('.submit', form)
            .html( percentage + '%' );
          }
        }, false );
      }

      return myXhr;
    },
    error: function( jqXHR, textStatus ) {
      // Тут выводим ошибку
    },
    complete: function() {
      // Тут можем что-то делать ПОСЛЕ успешной отправки формы
      window.location.replace("http://stackoverflow.com");
      form.reset()
    }
  });

  return false;
});
