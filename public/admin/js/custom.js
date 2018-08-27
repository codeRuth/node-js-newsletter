$(document).ready(function() {
  $('[data-toggle="dropdown"]').on('click', function() {
    var parent = $(this).parent();
    var siblings = $(this).siblings('.dropdown-menu');

    if(!parent.hasClass('show')) {
      $('[data-toggle="dropdown"]').siblings().removeClass('show');
      $('[data-toggle="dropdown"]').parent().removeClass('show');
    }
    
    parent.toggleClass('show');
    siblings.toggleClass('show');
  });

  if ($('.editable').length !== 0) {
    var editor = new MediumEditor('.editable', {
      buttonLabels: 'fontawesome'
    });
  }

  $('#selectCategory').on('change', function(event) {
    var id = $(this).val();
    var data = {
      id
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/admin/categories/tags'
    }).done(function(data) {
      $('#tags').html('');
      for (var i = 0; i < data.tags.length; i++) {
        $('#tags').append(
          '<label class="selectgroup-item">' +
            '<input class="selectgroup-input"type="checkbox" name="tags" value="' +
            data.tags[i]._id +
            '" />' +
            '<span class="selectgroup-button">' +
            data.tags[i].title +
            '</span>' +
            '</label>'
        );
      }
    });
  });

  $('#addPost').on('submit', function(event) {
    event.preventDefault();
    var tags = [];
    $('[name="tags"]:checked').each(function() {
      tags.push($(this).val());
    });
    var data = {
      title: $('[name="title"]').val(),
      content: $('.editable#content').html(),
      category: $('[name="category"]').val(),
      tags: tags
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/admin/posts/add'
    }).done(function(data) {
      console.log(data);
      if (!data.ok) {
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('[name=' + item + ']').addClass('is-invalid');
            $('[name=' + item + ']')
              .siblings('.invalid-feedback')
              .text(data.error);
          });
        } else {
          swal({
            type: 'error',
            title: 'Попробуйте позже',
            timer: 3000
          });
        }
      } else {
        swal({
          type: 'success',
          title: 'Пост добавлен',
          timer: 3000
        });

        setTimeout(function() {
          $(location).attr('href', '/admin/posts');
        }, 3000);
      }
    });
  });

  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  ///////////// Category ///////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////

  $('#addCategory').on('submit', function(event) {
    event.preventDefault();
    var data = {
      title: $('[name="title"]').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/admin/categories/add'
    }).done(function(data) {
      if (!data.ok) {
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('[name=' + item + ']').addClass('is-invalid');
            $('[name=' + item + ']')
              .siblings('.invalid-feedback')
              .text(data.error);
          });
        } else {
          swal({
            type: 'error',
            title: 'Попробуйте позже',
            timer: 2000
          });
        }
      } else {
        swal({
          type: 'success',
          title: 'Категория добавлен',
          timer: 2000
        });

        setTimeout(function() {
          $(location).attr('href', '/admin/categories');
        }, 2000);
      }
    });
  });

  $('#editCategory').on('submit', function(event) {
    event.preventDefault();
    var data = {
      title: $('[name="title"]').val(),
      id: $('[name="id"]').val()
    };

    $.ajax({
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/admin/categories/edit'
    }).done(function(data) {
      if (!data.ok) {
        swal({
          type: 'error',
          title: 'Попробуйте позже',
          timer: 2000
        });
      } else {
        swal({
          type: 'success',
          title: 'Категория изменён',
          timer: 2000
        });

        setTimeout(function() {
          $(location).attr('href', '/admin/categories');
        }, 2000);
      }
    });
  });

  $('.deleteCategory').on('click', function(e) {
    e.preventDefault();
    var curr = $(this);
    var id = curr.attr('data-id');
    var data = {
      id
    };
    swal({
      title: 'Вы точно хотите удалить !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Отмена'
    }).then(result => {
      if (result.value) {
        $.ajax({
          type: 'DELETE',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: '/admin/categories/delete'
        }).done(function(data) {
          if (!data.ok) {
            swal({
              type: 'error',
              title: 'Попробуйте позже',
              timer: 1000
            });
          } else {
            swal({
              type: 'success',
              title: 'Категория удалено',
              timer: 1000
            });

            setTimeout(function() {
              $(location).attr('href', '/admin/categories');
            }, 1000);
          }
        });
      }
    });
  });
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  ///////////////// Tags ///////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  //////////////////////////////////////////////////
  $('#addTag').on('submit', function(event) {
    event.preventDefault();
    var data = {
      title: $('[name="title"]').val(),
      category: $('[name="category"]').val()
    };

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/admin/tags/add'
    }).done(function(data) {
      if (!data.ok) {
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('[name=' + item + ']').addClass('is-invalid');
            $('[name=' + item + ']')
              .siblings('.invalid-feedback')
              .text(data.error);
          });
        } else {
          swal({
            type: 'error',
            title: 'Попробуйте позже',
            timer: 2000
          });
        }
      } else {
        swal({
          type: 'success',
          title: 'Тег добавлен',
          timer: 2000
        });

        setTimeout(function() {
          $(location).attr('href', '/admin/tags');
        }, 2000);
      }
    });
  });

  $('#editTag').on('submit', function(event) {
    event.preventDefault();
    var data = {
      title: $('[name="title"]').val(),
      category: $('[name="category"]').val(),
      id: $('[name="id"]').val()
    };

    $.ajax({
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/admin/tags/edit'
    }).done(function(data) {
      if (!data.ok) {
        swal({
          type: 'error',
          title: 'Попробуйте позже',
          timer: 2000
        });
      } else {
        swal({
          type: 'success',
          title: 'Тег изменён',
          timer: 2000
        });

        setTimeout(function() {
          $(location).attr('href', '/admin/tags');
        }, 2000);
      }
    });
  });

  $('.deleteTag').on('click', function(e) {
    e.preventDefault();
    var curr = $(this);
    var id = curr.attr('data-id');
    var data = {
      id
    };
    swal({
      title: 'Вы точно хотите удалить !',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Удалить',
      cancelButtonText: 'Отмена'
    }).then(result => {
      if (result.value) {
        $.ajax({
          type: 'DELETE',
          data: JSON.stringify(data),
          contentType: 'application/json',
          url: '/admin/tags/delete'
        }).done(function(data) {
          if (!data.ok) {
            swal({
              type: 'error',
              title: 'Попробуйте позже',
              timer: 1000
            });
          } else {
            swal({
              type: 'success',
              title: 'Тег удалено',
              timer: 1000
            });

            setTimeout(function() {
              $(location).attr('href', '/admin/tags');
            }, 1000);
          }
        });
      }
    });
  });
});
