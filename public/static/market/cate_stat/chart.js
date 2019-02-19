$(function () {
    // 返回
    $(".back-btn").click(function(){
        window.history.go(-1);
    });

    // 基于准备好的dom，初始化echarts实例
    var count_chart = echarts.init(document.getElementById('count_chart'));
    var prod_count_chart = echarts.init(document.getElementById('prod_count_chart'));
    var amount_chart = echarts.init(document.getElementById('amount_chart'));

    // 接收值
    var before_date = $("#before_date").val();
    var after_date = $("#after_date").val();
    var order_rule = $("#order_rule").val();
    var time_flag = $("#time_flag").val();

    count_option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[],
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: false},
                dataView : {show: false, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: 1548
                        }
                    }
                },
                restore : {show: false},
                saveAsImage : {show: false}
            }
        },
        calculable : true,
        series : [
            {
                name:'交易笔数',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                    data:[
                ]
            }
        ]
    };
    
    prod_count_option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[],
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: false},
                dataView : {show: false, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: 1548
                        }
                    }
                },
                restore : {show: false},
                saveAsImage : {show: false}
            }
        },
        calculable : true,
        series : [
            {
                name:'总重量',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                ]
            }
        ]
    };
    amount_option = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:[],
        },
        toolbox: {
            show : false,
            feature : {
                mark : {show: false},
                dataView : {show: false, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: 1548
                        }
                    }
                },
                restore : {show: false},
                saveAsImage : {show: false}
            }
        },
        calculable : true,
        series : [
            {
                name:'总金额',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                },
                data:[
                ]
            }
        ]
    };


    // ajax 请求访问
    $.ajax({
          type: 'POST',
          url: '/market/cate_statac/ajax_cate_static',
          data: {before_date: before_date, after_date: after_date, order_rule: order_rule, time_flag: time_flag},
          dataType: 'json',
          success: function(msg){
              var data = eval('('+msg+')');
            if (data.data == '') {
                alert('暂无数据');
                window.history.go(-1);
                return false;
            }

            for(var i=0; i<data.data.length; i++) {
                count_option.legend.data.push(data['data'][i]['goods_name']);
                countStr = {value:data['data'][i]['count'], name:data['data'][i]['goods_name']};
                prodCountStr = {value:data['data'][i]['total_prod_count'], name:data['data'][i]['goods_name']};
                amountStr = {value:data['data'][i]['total_amount'], name:data['data'][i]['goods_name']};
                count_option.series[0].data.push(countStr);
                prod_count_option.series[0].data.push(prodCountStr);
                amount_option.series[0].data.push(amountStr);
            };
            // 使用刚指定的配置项和数据显示图表。
            count_chart.setOption(count_option);
            prod_count_chart.setOption(prod_count_option);
            amount_chart.setOption(amount_option);
          },
          error: function(){
            alert('请刷新页面~');
            window.location.go(-1);
          }
        });

});