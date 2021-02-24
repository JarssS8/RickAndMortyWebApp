$(document).ready(function () {
    $("#loadMoreBtn").on('click', function () {
        let _currentCharacters = $(".character-box").length
        $.ajax({
            url: "load-more-characters",
            type: 'get',
            data: {
                'offset': _currentCharacters,
                'order': ($('input[type=radio][name=sortCharacters]')[0].checked ? 'api_id' : 'name'),
                'filter_name': ($('#searchCharacter')[0].value)
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
                        '                            <a class="card-footer-item" href="/detail/' + data.pk + '">\n' +
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
                    $("#loadMoreBtn").addClass('is-hidden');
                } else {
                    $("#loadMoreBtn").removeClass('is-static is-loading');
                }
            }
        });
    });

    $('input[type=radio][name=sortCharacters]').on('click', function () {
        if (this.value === 'byId') {
            $.ajax({
                url: "change-characters-sort",
                type: 'get',
                data: {
                    'order': 'api_id',
                    'filter_name': ($('#searchCharacter')[0].value)
                },
                dataType: 'json',
                success: function (response) {
                    let _html = '';
                    let json_data = $.parseJSON(response.characters);
                    $(".characters-wrapper").empty();
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
                            '                            <a class="card-footer-item" href="/detail/' + data.pk + '">\n' +
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
                }
            });

        } else if (this.value === 'byName') {
            $.ajax({
                url: "change-characters-sort",
                type: 'get',
                data: {
                    'order': 'name',
                    'filter_name': ($('#searchCharacter')[0].value)
                },
                dataType: 'json',
                success: function (response) {
                    let _html = '';
                    let json_data = $.parseJSON(response.characters);
                    $(".characters-wrapper").empty();
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
                            '                            <a class="card-footer-item" href="/detail/' + data.pk + '">\n' +
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
                }
            });

        }
        document.querySelector('.dropdown').classList.toggle('is-active');
    });

    $('#searchCharacter').on('keyup', function () {
        let _searchBox = $('#searchCharacter');
        let upperSearch = _searchBox[0].value.toUpperCase();
        if (upperSearch.trim().length == 0) {
            $("#loadMoreBtn").removeClass('is-hidden is-static is-loading');
            $.ajax({
                url: "change-characters-sort",
                type: 'get',
                data: {
                    'order': ($('input[type=radio][name=sortCharacters]')[0].checked ? 'api_id' : 'name')
                },
                dataType: 'json',
                success: function (response) {
                    let _html = '';
                    let json_data = $.parseJSON(response.characters);
                    $(".characters-wrapper").empty();
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
                            '                            <a class="card-footer-item" href="/detail/' + data.pk + '">\n' +
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
                }
            });
        }
        else {
            $.ajax({
                url: "get-filter-characters",
                type: 'get',
                data: {
                    'filter_name': _searchBox[0].value,
                    'order': ($('input[type=radio][name=sortCharacters]')[0].checked ? 'api_id' : 'name')
                },
                dataType: 'json',
                success: function (response) {
                    let _html = '';
                    let json_data = $.parseJSON(response.characters);
                    $(".characters-wrapper").empty();
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
                            '                            <a class="card-footer-item" href="/detail/' + data.pk + '">\n' +
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
                }
            });

        }

    });
});