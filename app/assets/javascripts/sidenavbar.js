$(document).ready(function () {

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('rotate');

        console.log(screen.width);

        if($('#sidebar').hasClass('active') && (screen.width <= 978)){
            $('#main_content')[0].style.visibility = 'hidden';
            $('body')[0].style.backgroundColor = '#0e162f !important';
        }
        else{
            $('#main_content')[0].style.visibility = 'visible';
        }
    });

    $("#profilepic").on('click', function () {
      // directly show the model
      $("#profileModal").modal({show: true});
    });


});
