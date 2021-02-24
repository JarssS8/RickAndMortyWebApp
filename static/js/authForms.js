$(document).ready(function () {
    console.log('Ready')
    $("#id_username").on('focusout', function () {
        let _usernameValue = $('#id_username').val();
        if (_usernameValue.length > 0) {
            $.ajax({
                url: 'check-user',
                type: 'GET',
                data: {
                    'username': _usernameValue
                },
                dataType: 'json',
                beforeSend: function () {
                    $("#id_username").removeClass('is-success is-danger');
                },
                success: function (response) {
                    if (!response.exists) {
                        $('#id_username').addClass('input is-success');
                    } else {
                        $('#id_username').addClass('input is-danger');
                    }
                }
            })
        }
    });
});