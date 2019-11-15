'use strict';

System.register(['app/plugins/sdk', './lib/echarts.min', './rendering', './lib/map/dark', './lib/map/china', './lib/map/china-city-loc', './lib/map/province/anhui', './lib/map/province/aomen', './lib/map/province/beijing', './lib/map/province/chongqing', './lib/map/province/fujian', './lib/map/province/gansu', './lib/map/province/guangdong', './lib/map/province/guangxi', './lib/map/province/guizhou', './lib/map/province/hainan', './lib/map/province/hebei', './lib/map/province/heilongjiang', './lib/map/province/henan', './lib/map/province/hubei', './lib/map/province/hunan', './lib/map/province/jiangsu', './lib/map/province/jiangxi', './lib/map/province/jilin', './lib/map/province/liaoning', './lib/map/province/neimenggu', './lib/map/province/ningxia', './lib/map/province/qinghai', './lib/map/province/shandong', './lib/map/province/shanghai', './lib/map/province/shanxi', './lib/map/province/shanxi1', './lib/map/province/sichuan', './lib/map/province/taiwan', './lib/map/province/tianjin', './lib/map/province/xianggang', './lib/map/province/xinjiang', './lib/map/province/xizang', './lib/map/province/yunnan', './lib/map/province/zhejiang'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, echarts, rendering, darkJson, chinaJson, chinaLocs, anhuiData, aomenData, beijingData, chongqingData, fujianData, gansuData, guangdongData, guangxiData, guizhouData, hainanData, hebeiData, heilongjiangData, henanData, hubeiData, hunanData, jiangsuData, jiangxiData, jilinData, liaoningData, neimengguData, ningxiaData, qinghaiData, shandongData, shanghaiData, shanxiData, shanxi1Data, sichuanData, taiwanData, tianjinData, xianggangData, xinjiangData, xizangData, yunnanData, zhejiangData, _createClass, ChinaMapCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_libEchartsMin) {
            echarts = _libEchartsMin.default;
        }, function (_rendering) {
            rendering = _rendering.default;
        }, function (_libMapDark) {
            darkJson = _libMapDark.default;
        }, function (_libMapChina) {
            chinaJson = _libMapChina.default;
        }, function (_libMapChinaCityLoc) {
            chinaLocs = _libMapChinaCityLoc.default;
        }, function (_libMapProvinceAnhui) {
            anhuiData = _libMapProvinceAnhui.default;
        }, function (_libMapProvinceAomen) {
            aomenData = _libMapProvinceAomen.default;
        }, function (_libMapProvinceBeijing) {
            beijingData = _libMapProvinceBeijing.default;
        }, function (_libMapProvinceChongqing) {
            chongqingData = _libMapProvinceChongqing.default;
        }, function (_libMapProvinceFujian) {
            fujianData = _libMapProvinceFujian.default;
        }, function (_libMapProvinceGansu) {
            gansuData = _libMapProvinceGansu.default;
        }, function (_libMapProvinceGuangdong) {
            guangdongData = _libMapProvinceGuangdong.default;
        }, function (_libMapProvinceGuangxi) {
            guangxiData = _libMapProvinceGuangxi.default;
        }, function (_libMapProvinceGuizhou) {
            guizhouData = _libMapProvinceGuizhou.default;
        }, function (_libMapProvinceHainan) {
            hainanData = _libMapProvinceHainan.default;
        }, function (_libMapProvinceHebei) {
            hebeiData = _libMapProvinceHebei.default;
        }, function (_libMapProvinceHeilongjiang) {
            heilongjiangData = _libMapProvinceHeilongjiang.default;
        }, function (_libMapProvinceHenan) {
            henanData = _libMapProvinceHenan.default;
        }, function (_libMapProvinceHubei) {
            hubeiData = _libMapProvinceHubei.default;
        }, function (_libMapProvinceHunan) {
            hunanData = _libMapProvinceHunan.default;
        }, function (_libMapProvinceJiangsu) {
            jiangsuData = _libMapProvinceJiangsu.default;
        }, function (_libMapProvinceJiangxi) {
            jiangxiData = _libMapProvinceJiangxi.default;
        }, function (_libMapProvinceJilin) {
            jilinData = _libMapProvinceJilin.default;
        }, function (_libMapProvinceLiaoning) {
            liaoningData = _libMapProvinceLiaoning.default;
        }, function (_libMapProvinceNeimenggu) {
            neimengguData = _libMapProvinceNeimenggu.default;
        }, function (_libMapProvinceNingxia) {
            ningxiaData = _libMapProvinceNingxia.default;
        }, function (_libMapProvinceQinghai) {
            qinghaiData = _libMapProvinceQinghai.default;
        }, function (_libMapProvinceShandong) {
            shandongData = _libMapProvinceShandong.default;
        }, function (_libMapProvinceShanghai) {
            shanghaiData = _libMapProvinceShanghai.default;
        }, function (_libMapProvinceShanxi) {
            shanxiData = _libMapProvinceShanxi.default;
        }, function (_libMapProvinceShanxi2) {
            shanxi1Data = _libMapProvinceShanxi2.default;
        }, function (_libMapProvinceSichuan) {
            sichuanData = _libMapProvinceSichuan.default;
        }, function (_libMapProvinceTaiwan) {
            taiwanData = _libMapProvinceTaiwan.default;
        }, function (_libMapProvinceTianjin) {
            tianjinData = _libMapProvinceTianjin.default;
        }, function (_libMapProvinceXianggang) {
            xianggangData = _libMapProvinceXianggang.default;
        }, function (_libMapProvinceXinjiang) {
            xinjiangData = _libMapProvinceXinjiang.default;
        }, function (_libMapProvinceXizang) {
            xizangData = _libMapProvinceXizang.default;
        }, function (_libMapProvinceYunnan) {
            yunnanData = _libMapProvinceYunnan.default;
        }, function (_libMapProvinceZhejiang) {
            zhejiangData = _libMapProvinceZhejiang.default;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            echarts.registerMap('安徽', anhuiData);

            echarts.registerMap('澳门', aomenData);

            echarts.registerMap('北京', beijingData);

            echarts.registerMap('重庆', chongqingData);

            echarts.registerMap('福建', fujianData);

            echarts.registerMap('甘肃', gansuData);

            echarts.registerMap('广东', guangdongData);

            echarts.registerMap('广西', guangxiData);

            echarts.registerMap('贵州', guizhouData);

            echarts.registerMap('海南', hainanData);

            echarts.registerMap('河北', hebeiData);

            echarts.registerMap('黑龙江', heilongjiangData);

            echarts.registerMap('河南', henanData);

            echarts.registerMap('湖北', hubeiData);

            echarts.registerMap('湖南', hunanData);

            echarts.registerMap('江苏', jiangsuData);

            echarts.registerMap('江西', jiangxiData);

            echarts.registerMap('吉林', jilinData);

            echarts.registerMap('辽宁', liaoningData);

            echarts.registerMap('内蒙古', neimengguData);

            echarts.registerMap('宁夏', ningxiaData);

            echarts.registerMap('青海', qinghaiData);

            echarts.registerMap('山东', shandongData);

            echarts.registerMap('上海', shanghaiData);

            echarts.registerMap('山西', shanxiData);

            echarts.registerMap('陕西', shanxi1Data);

            echarts.registerMap('四川', sichuanData);

            echarts.registerMap('台湾', taiwanData);

            echarts.registerMap('天津', tianjinData);

            echarts.registerMap('香港', xianggangData);

            echarts.registerMap('新疆', xinjiangData);

            echarts.registerMap('西藏', xizangData);

            echarts.registerMap('云南', yunnanData);

            echarts.registerMap('浙江', zhejiangData);

            echarts.registerTheme('dark', darkJson);
            echarts.registerMap('china', chinaJson);

            _export('ChinaMapCtrl', ChinaMapCtrl = function (_MetricsPanelCtrl) {
                _inherits(ChinaMapCtrl, _MetricsPanelCtrl);

                function ChinaMapCtrl($scope, $injector, $rootScope, backendSrv) {
                    _classCallCheck(this, ChinaMapCtrl);

                    var _this = _possibleConstructorReturn(this, (ChinaMapCtrl.__proto__ || Object.getPrototypeOf(ChinaMapCtrl)).call(this, $scope, $injector));

                    //backendSrv.get(`/api/org/preferences`).then(prefs => {
                    //    if (prefs && prefs.area) {
                    //         this.currentProvince = prefs.area;
                    //    }

                    if (!_this.currentProvince) {
                        _this.currentProvince = 'china';
                    }

                    _this.rootScope = $rootScope;
                    _this.templateSrv = $injector.get('templateSrv');
                    _this.variableSrvT = $injector.get('variableSrv');
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    // });
                    return _this;
                }

                _createClass(ChinaMapCtrl, [{
                    key: 'setData',
                    value: function setData(popData, type) {
                        var that = this;
                        var demoData = [{ 'key': '北京', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '上海', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '天津', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '重庆', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '河北', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '山西', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '辽宁', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '吉林', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '黑龙江', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '浙江', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '福建', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '山东', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '河南', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '湖北', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '湖南', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '广东', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '海南', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '四川', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '贵州', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '云南', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '江西', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '陕西', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '青海', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '甘肃', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '广西', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '新疆', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '内蒙古', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '西藏', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '宁夏', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '台湾', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '香港', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '澳门', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '安徽', 'log': 0, 'lat': 0, 'children': [] }, { 'key': '江苏', 'log': 0, 'lat': 0, 'children': [] }];

                        demoData.forEach(function (item) {
                            item[type] = 0;
                        });

                        popData.forEach(function (pop) {
                            var provinceId = pop.key.substr(0, 2) + '0000';
                            var dstProvince = chinaLocs.find(function (x) {
                                return x.id === provinceId;
                            });

                            if (dstProvince) {
                                if (dstProvince.children instanceof Array) {
                                    var dstCity = dstProvince.children.find(function (x) {
                                        return x.id === pop.key;
                                    });

                                    if (dstCity) {
                                        var currLog = 0;
                                        var currLat = 0;

                                        if (pop.log) {
                                            currLog = pop.log;
                                            currLat = pop.lat;
                                        } else {
                                            currLog = parseFloat(dstCity.log);
                                            currLat = parseFloat(dstCity.lat);
                                        }

                                        that.popData[type].push({
                                            id: pop.id,
                                            name: pop.name || dstCity.name,
                                            city: dstCity.name,
                                            parent: dstProvince.name,
                                            value: [currLog, currLat, pop[type]]
                                        });
                                    }
                                } else {
                                    // 直辖市
                                    var _currLog = 0;
                                    var _currLat = 0;

                                    if (pop.log) {
                                        _currLog = pop.log;
                                        _currLat = pop.lat;
                                    } else {
                                        _currLog = parseFloat(dstProvince.log);
                                        _currLat = parseFloat(dstProvince.lat);
                                    }

                                    that.popData[type].push({
                                        id: pop.id,
                                        name: pop.name || dstProvince.name,
                                        city: dstProvince.name,
                                        parent: dstProvince.name,
                                        value: [_currLog, _currLat, pop[type]]
                                    });
                                }

                                var destProvince = demoData.find(function (x) {
                                    return x.key === dstProvince.name;
                                });

                                if (destProvince) {
                                    destProvince.log = dstProvince.log;
                                    destProvince.lat = dstProvince.lat;
                                    destProvince[type] += pop[type];
                                    destProvince.children.push(pop);
                                }
                            }
                        });

                        demoData.forEach(function (province) {
                            if (province.children.length > 0) {
                                var provinceVal = Math.round(100 * province[type]) / 100;

                                that.provinceData[type].push({
                                    name: province.key,
                                    value: [parseFloat(province.log), parseFloat(province.lat), provinceVal]
                                });
                            }
                        });

                        var popTypeList = popData.map(function (x) {
                            return x[type];
                        });
                        this.minPopData[type] = Math.min.apply(null, popTypeList);
                        this.maxPopData[type] = Math.max.apply(null, popTypeList);

                        var provincePopTypeList = this.provinceData[type].map(function (x) {
                            return x.value[2];
                        });
                        this.minProvinceData[type] = Math.min.apply(null, provincePopTypeList);
                        this.maxProvinceData[type] = Math.max.apply(null, provincePopTypeList);
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {

                        console.log("onDataReceived:" + dataList);
                        var srcData = {};
                        for (var i = 0; i < dataList.length; i++) {
                            var rows = dataList[i].rows;
                            var index = 0;
                            for (var j = 0; j < rows.length; j++) {
                                var cells = rows[j];
                                if (cells.length > 3) {
                                    var cell = { "key": cells[2] + "", "id": index };
                                    cell[cells[3]] = cells[1];
                                    if (!srcData.hasOwnProperty(cells[3])) {
                                        srcData[cells[3]] = [];
                                    }
                                    srcData[cells[3]].push(cell);
                                }
                                index = index + 1;
                            }
                        }
                        /**
                                let srcData2 = {
                                    "中国移动": [
                                        {key: '441400', "中国移动": 20},
                                        {key: '441200', "中国移动": 80},
                                        {key: '320800', "中国移动": 90},
                                        {key: '320600', "中国移动": 30},
                                        {key: '232700', "中国移动": 20},
                                        {key: '231000', "中国移动": 70},
                                        {name: '喀什001', key: '653100', 'log': 75.94, 'lat': 39.52, "中国移动": 20},
                                        {name: '喀什002', key: '653100', 'log': 76.50, 'lat': 39, "中国移动": 20},
                                        {key: '650200', "中国移动": 60}
                                    ],
                                    "中国石油": [
                                        {key: '441400', "中国石油": 50},
                                        {key: '441200', "中国石油": 10},
                                        {key: '320800', "中国石油": 20},
                                        {key: '320600', "中国石油": 30},
                                        {key: '232700', "中国石油": 80},
                                        {key: '231000', "中国石油": 60},
                                        {key: '653100', 'log': 75.94, 'lat': 39.52, "中国石油": 40},
                                        {key: '653100', 'log': 76.50, 'lat': 39, "中国石油": 20},
                                        {key: '650200', "中国石油": 90}
                                    ]
                                };
                        **/
                        var seriesNameObj = {};

                        this.seriesNameObj = seriesNameObj;

                        var provinceData = {};
                        var popData2 = {};
                        var minProvinceData = {};
                        var maxProvinceData = {};
                        var minPopData = {};
                        var maxPopData = {};

                        this.provinceData = provinceData;
                        this.popData = popData2;
                        this.minProvinceData = minProvinceData;
                        this.maxProvinceData = maxProvinceData;
                        this.minPopData = minPopData;
                        this.maxPopData = maxPopData;

                        for (var dataType in srcData) {

                            this.seriesNameObj[dataType] = dataType;

                            this.provinceData[dataType] = [];
                            this.popData[dataType] = [];
                            this.minProvinceData[dataType] = 0;
                            this.maxProvinceData[dataType] = 0;
                            this.minPopData[dataType] = 0;
                            this.maxPopData[dataType] = 0;

                            this.setData(srcData[dataType], dataType);
                        }

                        console.log("data recevie after, rendering!!");

                        this.render();
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        console.log("ctrl rendering!!");
                        rendering(scope, elem, attrs, ctrl);
                    }
                }]);

                return ChinaMapCtrl;
            }(MetricsPanelCtrl));

            _export('ChinaMapCtrl', ChinaMapCtrl);

            ChinaMapCtrl.templateUrl = 'module.html';
        }
    };
});
//# sourceMappingURL=chinamap_ctrl.js.map
