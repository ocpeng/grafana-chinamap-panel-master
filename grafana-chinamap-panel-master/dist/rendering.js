'use strict';

System.register(['./lib/echarts.min'], function (_export, _context) {
    "use strict";

    var echarts;
    function link(scope, elem, attrs, ctrl) {
        var mapContainer = elem.find('.chinamap-panel');
        // 简单的饼图自动绘图工具
        var MapChart = function () {
            //text, subtext, legends, values, message
            var newInstance = function newInstance(element) {
                // 计算地图上的圆圈大小
                var calRoundSize = function calRoundSize(val, type) {
                    var Min_Size = 10;
                    var minSize = 0;
                    var maxSize = 0;
                    var value = val[2];

                    if (ctrl.province) {
                        minSize = ctrl['minPopData'][type];
                        maxSize = ctrl['maxPopData'][type];
                    } else {
                        minSize = ctrl['minProvinceData'][type];
                        maxSize = ctrl['maxProvinceData'][type];
                    }

                    if (minSize === maxSize) {
                        return 12;
                    } else {
                        return Min_Size + Math.round((value - minSize) / (maxSize - minSize) * 5);
                    }
                };
                var chart = {};
                var mapType = ['china',
                // 23个省
                '广东', '青海', '四川', '海南', '陕西', '甘肃', '云南', '湖南', '湖北', '黑龙江', '贵州', '山东', '江西', '河南', '河北', '山西', '安徽', '福建', '浙江', '江苏', '吉林', '辽宁',
                //'台湾',
                // 5个自治区
                '新疆', '广西', '宁夏', '内蒙古', '西藏',
                // 4个直辖市
                '北京', '天津', '上海', '重庆',
                // 2个特别行政区
                '香港', '澳门'];

                chart.container = echarts.init(element[0], 'dark');
                chart.option = {
                    title: {
                        text: '全国地图',
                        left: 'center',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        padding: 10,
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        formatter: function formatter(params) {
                            var tipVal = 0;
                            var tipHTML = [];

                            if (params) {
                                if (params.data && params.data.value instanceof Array && params.data.value.length > 2) {
                                    tipVal = params.data.value[2];
                                }

                                tipHTML.push('<div style="font-size: 16px;color: ', params.color, ';">', params.name, '</div>');
                                tipHTML.push(params.seriesName, '：', tipVal);
                            }

                            return tipHTML.join('');
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: [],
                        selectedMode: 'single',
                        selected: {}
                    },
                    toolbox: {
                        show: true,
                        itemSize: 30,
                        feature: {
                            myTool1: {
                                show: ctrl.currentProvince === 'china',
                                title: '返回',
                                icon: 'path://M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 ' + '64z m158.4 674.4L625.6 784l-272-272 272-272 45.6 45.6L444 512l226.4 226.4z',
                                onclick: function onclick() {
                                    ctrl.pointName = '';
                                    ctrl.province = undefined;
                                    ctrl.city = undefined;
                                    ctrl.areaId = undefined;
                                    chart.update();

                                    // 变量置为All
                                    for (var i = 0, len = ctrl.templateSrv.variables.length; i < len; i++) {
                                        var variable = ctrl.templateSrv.variables[i];

                                        if (variable.name === 'popId' || variable.name === 'popName') {
                                            variable.setValue({
                                                text: 'All',
                                                value: ['$__all']
                                            });
                                            ctrl.variableSrvT.variableUpdated(variable, true);
                                        } else if (variable.name === 'areaName') {
                                            variable.setValue({
                                                text: '全国',
                                                value: '全国'
                                            });
                                            ctrl.variableSrvT.variableUpdated(variable, true);
                                        }
                                    }
                                }
                            },
                            myTool2: {
                                show: ctrl.currentProvince !== 'china',
                                title: '主页',
                                icon: 'path://M953.001481 565.581336 557.839513 128.84653c-12.284791-13.568017-28.827559-21.042245-46.639227-21.042245l0 0c-17.768689 0-34.328853 7.474228-46.635133 21.042245L69.394998 565.581336c-8.283664 9.182127-7.560186 23.294542 1.575892 31.600719 4.282536 3.891633 9.657964 5.771447 14.990413 5.771447 6.076392 0 12.173251-2.447748 16.610306-7.390317l95.282087-105.310487 0 358.867344c0 37.017078 30.116925 67.13298 67.137073 67.13298l492.333078 0c37.019125 0 67.13605-30.116925 67.13605-67.13298L824.459896 490.25372l95.281063 105.310487c8.266267 9.179057 22.423709 9.925047 31.606859 1.577938 9.17087-8.351202 9.870812-22.423709 1.570775-31.601742L953.001481 565.581336zM600.715019 871.498724 421.686577 871.498724 421.686577 670.089551c0-12.329816 10.031471-22.379707 22.378683-22.379707l134.2721 0c12.325723 0 22.378683 10.04989 22.378683 22.379707L600.716043 871.498724zM779.744485 849.120041c0 12.322653-10.053983 22.37766-22.38073 22.37766L645.471362 871.497701 645.471362 670.089551c0-37.024242-30.114878-67.13605-67.135026-67.13605L444.064236 602.953502c-37.019125 0-67.134003 30.112832-67.134003 67.13605l0 201.408149L265.035794 871.497701c-12.346189 0-22.37766-10.055007-22.37766-22.37766L242.658134 440.796308l255.123538-281.963837c3.672646-4.086062 8.460696-6.315846 13.417591-6.315846 4.960988 0 9.745968 2.229784 13.418614 6.315846l255.125585 281.963837L779.743462 849.120041z',
                                onclick: function onclick() {
                                    ctrl.province = ctrl.currentProvince;
                                    ctrl.pointName = ctrl.currentProvince;
                                    chart.updateMap();
                                    chart.update();
                                }
                            }
                        },
                        iconStyle: {
                            color: 'rgb(255, 255, 255)'
                        },
                        emphasis: {
                            iconStyle: {
                                color: 'rgb(255, 255, 0)'
                            }
                        },
                        left: '1%'
                    },
                    visualMap: {
                        show: true,
                        min: 0,
                        max: 2000,
                        left: '10%',
                        top: 'bottom',
                        calculable: true,
                        seriesIndex: [1],
                        inRange: {
                            color: ['#04387b', '#467bc0'] // 蓝绿
                        }
                    },
                    geo: {
                        map: 'china',
                        selectedMode: 'single',
                        label: {
                            show: true,
                            color: '#fff'
                        },
                        itemStyle: {
                            normal: {
                                borderColor: 'rgba(147, 235, 248, 1)',
                                borderWidth: 1,
                                areaColor: {
                                    type: 'radial',
                                    x: 0.5,
                                    y: 0.5,
                                    r: 0.8,
                                    colorStops: [{
                                        offset: 0,
                                        color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                shadowColor: 'rgba(128, 217, 248, 1)',
                                // shadowColor: 'rgba(255, 255, 255, 1)',
                                shadowOffsetX: -2,
                                shadowOffsetY: 2,
                                shadowBlur: 10
                            },
                            emphasis: {
                                areaColor: '#389BB7',
                                borderWidth: 0
                            }
                        },
                        // roam: true,
                        aspectScale: 0.95
                    },
                    series: []
                };

                chart.container.on('legendselectchanged', function (obj) {
                    currSeriesName = obj.name;
                });

                var seriesNameObj = {};
                var currSeriesName = '';

                chart.container.on('click', function (params) {
                    //获取省市名称

                    seriesNameObj = ctrl.seriesNameObj || {};

                    if (currSeriesName === '') {

                        for (var dataType in seriesNameObj) {
                            currSeriesName = dataType;
                            break;
                        }
                    }

                    if (mapType.indexOf(params.name) !== -1) {
                        var destProvinceData = ctrl.provinceData[seriesNameObj[currSeriesName]].find(function (x) {
                            return x.name === params.name;
                        });

                        if (!!!destProvinceData) {
                            //如果该省份没有数据，直接返回
                            return;
                        }

                        ctrl.province = params.name;
                        ctrl.city = undefined;
                    } else {
                        var dstSeries = chart.option.series.find(function (x) {
                            return x.name === currSeriesName;
                        });
                        if (!!!dstSeries) {
                            return;
                        }
                        var citiesData = dstSeries.data;

                        if (citiesData instanceof Array && params.name) {
                            var destCityData1 = citiesData.find(function (x) {
                                return x.name === params.name;
                            });
                            var destCityData2 = citiesData.find(function (x) {
                                return x.city === params.name;
                            });

                            if (!!!destCityData1 && !!!destCityData2) {
                                return;
                            }
                        }

                        ctrl.city = params.name;
                    }

                    ctrl.isDirectCity = ['北京', '天津', '上海', '重庆', '香港', '澳门'].includes(params.name);
                    ctrl.pointName = params.name;
                    chart.update();
                    chart.updateMap();
                });

                chart.updateMap = function () {
                    if (!ctrl.pointName) {
                        return;
                    }
                    var popList = [];
                    seriesNameObj = ctrl.seriesNameObj || {};

                    if (currSeriesName === '') {

                        for (var dataType in seriesNameObj) {
                            currSeriesName = dataType;
                            break;
                        }
                    }
                    var currPopData = ctrl.popData[seriesNameObj[currSeriesName]];

                    if (typeof ctrl.city !== 'undefined' && !ctrl.isDirectCity) {
                        popList = currPopData.filter(function (x) {
                            return x.city === ctrl.city;
                        });

                        if (!popList || popList.length === 0) {
                            popList = currPopData.filter(function (x) {
                                return x.name === ctrl.city;
                            });
                        }
                    } else {
                        popList = currPopData.filter(function (x) {
                            return x.parent === ctrl.province;
                        });
                    }

                    for (var i = 0, len = ctrl.templateSrv.variables.length; i < len; i++) {
                        var variable = ctrl.templateSrv.variables[i];

                        if (variable.name === 'popId') {
                            var popIdList = popList.map(function (x) {
                                return '' + x.id;
                            });
                            variable.setValue({
                                text: popIdList.join(' + '),
                                value: popIdList
                            });
                            ctrl.variableSrvT.variableUpdated(variable, true);
                        } else if (variable.name === 'popName') {
                            var popNameList = popList.map(function (x) {
                                return '' + x.name;
                            });
                            variable.setValue({
                                text: popNameList.join(' + '),
                                value: popNameList
                            });
                            ctrl.variableSrvT.variableUpdated(variable, true);
                        } else if (variable.name === 'areaName') {
                            variable.setValue({
                                text: ctrl.pointName,
                                value: ctrl.pointName
                            });
                            ctrl.variableSrvT.variableUpdated(variable, true);
                        }
                    }
                };

                //==================================================================================
                // 刷新地图
                //==================================================================================
                chart.update = function () {
                    var selectedInfo = {};
                    for (var selKey in ctrl.seriesNameObj) {
                        selectedInfo[selKey] = selKey === currSeriesName;
                    }

                    if (typeof ctrl.city !== 'undefined' && ctrl.province !== 'china') {
                        return;
                        // chart.option.geo.map = ctrl.province;
                        // chart.option.title.text = ctrl.city;
                    } else if (typeof ctrl.province !== 'undefined' && ctrl.province !== 'china') {
                        chart.option.geo.map = ctrl.province;
                        chart.option.title.text = ctrl.province;
                        var index = 0;
                        chart.option.series = [];
                        chart.option.legend.data = [];

                        var _loop = function _loop(dataType) {

                            var seriesNode = {
                                name: dataType,
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: ctrl.popData[dataType].filter(function (x) {
                                    return x.parent === ctrl.province;
                                }),
                                symbolSize: function symbolSize(val) {
                                    return calRoundSize(val, dataType);
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    period: 15,
                                    scale: 4,
                                    brushType: 'fill'
                                },
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: function formatter(params) {
                                            return '[' + params.name + '：' + params.value[2] + ']';
                                        },
                                        color: 'red',
                                        position: 'top',
                                        show: true
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#f4e925',
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                }
                            };
                            chart.option.series.push(seriesNode);

                            var lengenNode = { name: dataType, icon: 'roundRect', textStyle: { color: '#f4e925' } };

                            chart.option.legend.data.push(lengenNode);
                            index = index + 1;
                        };

                        for (var dataType in ctrl.popData) {
                            _loop(dataType);
                        }
                        chart.option.legend.selected = selectedInfo;
                    } else {
                        chart.option.geo.map = 'china';
                        chart.option.title.text = '全国';
                        var _index = 0;

                        chart.option.series = [];
                        chart.option.legend.data = [];

                        var _loop2 = function _loop2(dataType) {

                            var seriesNode = {
                                name: dataType,
                                type: 'effectScatter',
                                coordinateSystem: 'geo',
                                data: ctrl.provinceData[dataType],
                                symbolSize: function symbolSize(val) {
                                    return calRoundSize(val, dataType);
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    period: 15,
                                    scale: 4,
                                    brushType: 'fill'
                                },
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: function formatter(params) {
                                            return '[' + params.name + '：' + params.value[2] + ']';
                                        },
                                        color: 'red',
                                        position: 'top',
                                        show: true
                                    },
                                    emphasis: {
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: '#f4e925',
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                }
                            };
                            chart.option.series.push(seriesNode);

                            var lengenNode = { name: dataType, icon: 'roundRect', textStyle: { color: '#f4e925' } };

                            chart.option.legend.data.push(lengenNode);

                            _index = _index + 1;
                        };

                        for (var dataType in ctrl.provinceData) {
                            _loop2(dataType);
                        }
                        chart.option.legend.selected = selectedInfo;
                    }

                    chart.container.setOption(chart.option, false);
                    chart.container.resize();
                };

                chart.resize = function () {
                    chart.container.resize();
                };

                chart.dispose = function () {
                    chart.container.dispose();
                };

                if (ctrl.currentProvince !== 'china') {
                    ctrl.province = ctrl.currentProvince;
                    ctrl.pointName = ctrl.currentProvince;
                    chart.updateMap();
                }
                chart.update();
                return chart;
            };
            var show = function show() {
                console.log("render -init --6 " + ctrl.seriesNameObj);
            };

            return {
                newInstance: newInstance,
                show: show
            };
        }();

        ctrl.events.on('render', function () {
            console.log("ctrl events on render!!");
            render();
            ctrl.renderingCompleted();
        });

        function render() {
            console.log("render!!");
            if (!ctrl.map) {
                ctrl.map = MapChart.newInstance(mapContainer, {});
                ctrl.map.update();
                window.setTimeout(function () {
                    MapChart.show();
                }, 500);
            } else {
                ctrl.map.update();
                MapChart.show();
            }

            //布局地图
        }
    }
    _export('default', link);

    return {
        setters: [function (_libEchartsMin) {
            echarts = _libEchartsMin.default;
        }],
        execute: function () {
            ;
        }
    };
});
//# sourceMappingURL=rendering.js.map
