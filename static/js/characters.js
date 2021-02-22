$(document).ready(function () {
    $("#loadMoreBtn").on('click', function () {
        let _currentCharacters = $(".character-box").length
        $.ajax({
            url: "load-more-characters",
            type: 'get',
            data: {
                'offset': _currentCharacters,
            },
            dataType: 'json',
            beforeSend: function () {
                $("#loadMoreBtn").addClass('is-static is-loading');
            },
            success: function (response) {
                let _html = '';
                let json_data = $.parseJSON(response.characters);
                $.each(json_data, function (index, data) {
                    let _character = '<div class="column is-one-quarter-desktop is-half-tablet character-box">\n' +
                        '                    <div class="card is-fluid">\n' +
                        '                        <div class="card-image">\n' +
                        '                            <figure class="image is-fluid">\n' +
                        '                                <img src=' + data.fields.image + ' alt="">\n' +
                        '                            </figure>\n' +
                        '                            <div class="card-content is-overlay is-clipped">\n' +
                        '                          <span class="tag is-info">\n' +
                        '                           # ' + data.pk +
                        '                          </span>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                        <footer class="card-footer">\n' +
                        '                            <a class="card-footer-item" href="/characters/detail/' + data.pk + '">\n' +
                        '                            ' + data.fields.name +
                        '                            </a>\n' +
                        '                            <a class="card-footer-item">\n' +
                        '                                <i class="fas fa-heart"></i>\n' +
                        '                            </a>\n' +
                        '                        </footer>\n' +
                        '                    </div>\n' +
                        '                </div>'
                    _html += _character;
                });
                $(".characters-wrapper").append(_html);
                let _countTotal = $(".character-box").length;
                if (_countTotal == response.countCharacters) {
                    $("#loadMoreBtn").remove();
                } else {
                    $("#loadMoreBtn").removeClass('is-static is-loading');
                }
            }
        });
    });
});