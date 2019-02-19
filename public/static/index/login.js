$(function () {


    //获取省市区列表
    function getPosition(id) {
        $.get("/market/linkac/index?parent_id=" + id, function (data) {
            data = JSON.parse(data);
            // console.log(data);
            var html = template('position-list', data);
            $('.select')[0].innerHTML = html;
            $('.select').animate({scrollTop: 0});
        });
    }

    //获取市场列表
    function getMarket(id) {
        $.get("/market/linkac/market?area=" + id, function (data) {
            data = JSON.parse(data);
            // console.log(data);
            var html = template('market-list', data);
            $('.select')[0].innerHTML = html;
        });
    }

    //打开layer
    function openLayer() {
        $('.layer').fadeIn(function () {
            $('.select-wrapper .title').text('所在省份');
            $('.info .province').text('请选择');
            $('.info .province').addClass('active');
            getPosition(1);
            $('.info .province').attr('data-id', '1');
        });
    }

    //关闭layer
    function closeLayer() {
        $('.layer').fadeOut(function () {
            $('.select-wrapper .title').text('');
            $('.info li').each(function () {
                $(this).text('');
                $(this).removeClass('active');
            });
            $('.select')[0].innerHTML = '';
        });
    }

    //打开农贸市场选择框
    $('input[name="market_name"]').on('click', function (ev) {
        openLayer();
    });

    //关闭农贸市场选择框
    $('.close-btn').on('click', function (ev) {
        closeLayer();
    });
    $('.info').delegate('li', 'click', function () {
        var _this = $(this);
        if (!_this.hasClass('active')) {
            var id = _this.attr('data-id');
            var currentType = _this.attr('data-type');
            // console.log(id, currentType);
            switch (currentType) {
                case 'province':
                    _this.text('请选择');
                    _this.addClass('active');
                    getPosition(id);
                    _this.nextAll().text('').removeClass('active');
                    break;
                case 'city':
                    _this.text('请选择');
                    _this.addClass('active');
                    getPosition(id);
                    _this.nextAll().text('').removeClass('active');
                    break;
                case 'area':
                    _this.text('请选择');
                    _this.addClass('active');
                    getPosition(id);
                    _this.nextAll().text('').removeClass('active');
                    break;
            }
        }
    });
    //列表区域代理事件
    $('.select').delegate('li', 'click', function () {
        var id = $(this).attr('data-id');
        var name = $(this).text();
        var currentType = '';
        $('.info li').each(function () {
            if ($(this).hasClass('active')) {
                currentType = $(this).attr('data-type');
            }
        });
        if (currentType !== 'market') {
            $('.' + currentType).text(name);
        }
        $('.' + currentType).removeClass('active');
        switch (currentType) {
            case 'province':
                $('.select-wrapper .title').text('所在城市');
                $('.city').text('请选择');
                $('.city').addClass('active');
                $('.city').attr('data-id', id);
                getPosition(id);
                break;

            case 'city':
                $('.select-wrapper .title').text('所在区县');
                $('.area').text('请选择');
                $('.area').addClass('active');
                $('.area').attr('data-id', id);
                getPosition(id);
                break;

            case 'area':
                $('.select-wrapper .title').text('农贸市场');
                $('.market').text('请选择');
                $('.market').addClass('active');
                $('.market').attr('data-id', id);
                getMarket(id);
                break;

            case 'market':
                $('input[name="market_id"]').val(id);
                $('input[name="market_name"]').val(name);
                localStorage.setItem('market_id', id);
                localStorage.setItem('market_name', name);
                closeLayer();
                break;
        }
    });

    //ajax登录
    $('.login-form').submit(function (ev) {
        ev.preventDefault();
        var formData = $(this).serialize();

        $.post('/index/login/do', formData, function (data) {
            data = JSON.parse(data);
            if (data.status) {
                location.href = data.msg;
            } else {
                $('.error').fadeIn();
            }
        });
    });

    //点击提示关闭
    $('.login-wrapper').on('click', function () {
        $('.error').fadeOut();
    })
});