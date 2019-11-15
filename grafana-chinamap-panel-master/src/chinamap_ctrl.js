import { MetricsPanelCtrl } from 'app/plugins/sdk';
import echarts from './lib/echarts.min';
import rendering from './rendering';

import darkJson from './lib/map/dark';
import chinaJson from './lib/map/china';
import chinaLocs from './lib/map/china-city-loc';

import anhuiData from './lib/map/province/anhui';
echarts.registerMap('安徽', anhuiData);
import aomenData from './lib/map/province/aomen';
echarts.registerMap('澳门', aomenData);
import beijingData from './lib/map/province/beijing';
echarts.registerMap('北京', beijingData);
import chongqingData from './lib/map/province/chongqing';
echarts.registerMap('重庆', chongqingData);
import fujianData from './lib/map/province/fujian';
echarts.registerMap('福建', fujianData);
import gansuData from './lib/map/province/gansu';
echarts.registerMap('甘肃', gansuData);
import guangdongData from './lib/map/province/guangdong';
echarts.registerMap('广东', guangdongData);
import guangxiData from './lib/map/province/guangxi';
echarts.registerMap('广西', guangxiData);
import guizhouData from './lib/map/province/guizhou';
echarts.registerMap('贵州', guizhouData);
import hainanData from './lib/map/province/hainan';
echarts.registerMap('海南', hainanData);
import hebeiData from './lib/map/province/hebei';
echarts.registerMap('河北', hebeiData);
import heilongjiangData from './lib/map/province/heilongjiang';
echarts.registerMap('黑龙江', heilongjiangData);
import henanData from './lib/map/province/henan';
echarts.registerMap('河南', henanData);
import hubeiData from './lib/map/province/hubei';
echarts.registerMap('湖北', hubeiData);
import hunanData from './lib/map/province/hunan';
echarts.registerMap('湖南', hunanData);
import jiangsuData from './lib/map/province/jiangsu';
echarts.registerMap('江苏', jiangsuData);
import jiangxiData from './lib/map/province/jiangxi';
echarts.registerMap('江西', jiangxiData);
import jilinData from './lib/map/province/jilin';
echarts.registerMap('吉林', jilinData);
import liaoningData from './lib/map/province/liaoning';
echarts.registerMap('辽宁', liaoningData);
import neimengguData from './lib/map/province/neimenggu';
echarts.registerMap('内蒙古', neimengguData);
import ningxiaData from './lib/map/province/ningxia';
echarts.registerMap('宁夏', ningxiaData);
import qinghaiData from './lib/map/province/qinghai';
echarts.registerMap('青海', qinghaiData);
import shandongData from './lib/map/province/shandong';
echarts.registerMap('山东', shandongData);
import shanghaiData from './lib/map/province/shanghai';
echarts.registerMap('上海', shanghaiData);
import shanxiData from './lib/map/province/shanxi';
echarts.registerMap('山西', shanxiData);
import shanxi1Data from './lib/map/province/shanxi1';
echarts.registerMap('陕西', shanxi1Data);
import sichuanData from './lib/map/province/sichuan';
echarts.registerMap('四川', sichuanData);
import taiwanData from './lib/map/province/taiwan';
echarts.registerMap('台湾', taiwanData);
import tianjinData from './lib/map/province/tianjin';
echarts.registerMap('天津', tianjinData);
import xianggangData from './lib/map/province/xianggang';
echarts.registerMap('香港', xianggangData);
import xinjiangData from './lib/map/province/xinjiang';
echarts.registerMap('新疆', xinjiangData);
import xizangData from './lib/map/province/xizang';
echarts.registerMap('西藏', xizangData);
import yunnanData from './lib/map/province/yunnan';
echarts.registerMap('云南', yunnanData);
import zhejiangData from './lib/map/province/zhejiang';
echarts.registerMap('浙江', zhejiangData);

echarts.registerTheme('dark', darkJson);
echarts.registerMap('china', chinaJson);

export class ChinaMapCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector, $rootScope, backendSrv) {
    super($scope, $injector);
    backendSrv.get(`/api/org/preferences`).then(prefs => {
      if (prefs && prefs.area) {
        this.currentProvince = prefs.area;
      }

      if (!this.currentProvince) {
        this.currentProvince = 'china';
      }

      this.rootScope = $rootScope;
      this.templateSrv = $injector.get('templateSrv');
      this.variableSrvT = $injector.get('variableSrv');
      this.events.on('data-received', this.onDataReceived.bind(this));
    });
  }

  setData(popData, type) {
    let that = this;
    let demoData = [
      {'key': '北京', 'log': 0, 'lat': 0, 'children': []},
      {'key': '上海', 'log': 0, 'lat': 0, 'children': []},
      {'key': '天津', 'log': 0, 'lat': 0, 'children': []},
      {'key': '重庆', 'log': 0, 'lat': 0, 'children': []},
      {'key': '河北', 'log': 0, 'lat': 0, 'children': []},
      {'key': '山西', 'log': 0, 'lat': 0, 'children': []},
      {'key': '辽宁', 'log': 0, 'lat': 0, 'children': []},
      {'key': '吉林', 'log': 0, 'lat': 0, 'children': []},
      {'key': '黑龙江', 'log': 0, 'lat': 0, 'children': []},
      {'key': '浙江', 'log': 0, 'lat': 0, 'children': []},
      {'key': '福建', 'log': 0, 'lat': 0, 'children': []},
      {'key': '山东', 'log': 0, 'lat': 0, 'children': []},
      {'key': '河南', 'log': 0, 'lat': 0, 'children': []},
      {'key': '湖北', 'log': 0, 'lat': 0, 'children': []},
      {'key': '湖南', 'log': 0, 'lat': 0, 'children': []},
      {'key': '广东', 'log': 0, 'lat': 0, 'children': []},
      {'key': '海南', 'log': 0, 'lat': 0, 'children': []},
      {'key': '四川', 'log': 0, 'lat': 0, 'children': []},
      {'key': '贵州', 'log': 0, 'lat': 0, 'children': []},
      {'key': '云南', 'log': 0, 'lat': 0, 'children': []},
      {'key': '江西', 'log': 0, 'lat': 0, 'children': []},
      {'key': '陕西', 'log': 0, 'lat': 0, 'children': []},
      {'key': '青海', 'log': 0, 'lat': 0, 'children': []},
      {'key': '甘肃', 'log': 0, 'lat': 0, 'children': []},
      {'key': '广西', 'log': 0, 'lat': 0, 'children': []},
      {'key': '新疆', 'log': 0, 'lat': 0, 'children': []},
      {'key': '内蒙古', 'log': 0, 'lat': 0, 'children': []},
      {'key': '西藏', 'log': 0, 'lat': 0, 'children': []},
      {'key': '宁夏', 'log': 0, 'lat': 0, 'children': []},
      {'key': '台湾', 'log': 0, 'lat': 0, 'children': []},
      {'key': '香港', 'log': 0, 'lat': 0, 'children': []},
      {'key': '澳门', 'log': 0, 'lat': 0, 'children': []},
      {'key': '安徽', 'log': 0, 'lat': 0, 'children': []},
      {'key': '江苏', 'log': 0, 'lat': 0, 'children': []}
    ];

    demoData.forEach(function (item) {
      item[type] = 0;
    });

    popData.forEach(function (pop) {
      let provinceId = pop.key.substr(0, 2) + '0000';
      let dstProvince = chinaLocs.find(x => x.id === provinceId);

      if (dstProvince) {
        if (dstProvince.children instanceof Array) {
          let dstCity = dstProvince.children.find(x => x.id === pop.key);

          if (dstCity) {
            let currLog = 0;
            let currLat = 0;

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
          let currLog = 0;
          let currLat = 0;

          if (pop.log) {
            currLog = pop.log;
            currLat = pop.lat;
          } else {
            currLog = parseFloat(dstProvince.log);
            currLat = parseFloat(dstProvince.lat);
          }

          that.popData[type].push({
            id: pop.id,
            name: pop.name || dstProvince.name,
            city: dstProvince.name,
            parent: dstProvince.name,
            value: [currLog, currLat, pop[type]]
          });
        }

        let destProvince = demoData.find(x => x.key === dstProvince.name);

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
        let provinceVal = Math.round(100 * province[type]) / 100;

        that.provinceData[type].push({
          name: province.key,
          value: [parseFloat(province.log), parseFloat(province.lat), provinceVal]
        });
      }
    });

    let popTypeList = popData.map(x => x[type]);
    this.minPopData[type] = Math.min.apply(null, popTypeList);
    this.maxPopData[type] = Math.max.apply(null, popTypeList);

    let provincePopTypeList = this.provinceData[type].map(x => x.value[2]);
    this.minProvinceData[type] = Math.min.apply(null, provincePopTypeList);
    this.maxProvinceData[type] = Math.max.apply(null, provincePopTypeList);
  }

  onDataReceived(dataList) {
    console.log(dataList);
    this.provinceData = {iphone7: [], iphone8: [], iphonex: []};
    this.popData = {iphone7: [], iphone8: [], iphonex: []};
    this.minProvinceData = {iphone7: 0, iphone8: 0, iphonex: 0};
    this.maxProvinceData = {iphone7: 0, iphone8: 0, iphonex: 0};
    this.minPopData = {iphone7: 0, iphone8: 0, iphonex: 0};
    this.maxPopData = {iphone7: 0, iphone8: 0, iphonex: 0};

    let srcData = {
      iphone7: [
        {id: 0, key: '441400', iphone7: 20},
        {id: 1, key: '441200', iphone7: 80},
        {id: 2, key: '320800', iphone7: 90},
        {id: 3, key: '320600', iphone7: 30},
        {id: 4, key: '232700', iphone7: 20},
        {id: 5, key: '231000', iphone7: 70},
        {id: 6, name: '喀什001', key: '653100', 'log': 75.94, 'lat': 39.52, iphone7: 20},
        {id: 7, name: '喀什002', key: '653100', 'log': 76.50, 'lat': 39, iphone7: 20},
        {id: 8, key: '650200', iphone7: 60}
      ],
      iphone8: [
        {id: 0, key: '441400', iphone8: 30},
        {id: 1, key: '441200', iphone8: 10},
        {id: 2, key: '320800', iphone8: 20},
        {id: 3, key: '320600', iphone8: 80},
        {id: 4, key: '232700', iphone8: 40},
        {id: 5, key: '231000', iphone8: 20},
        {id: 6, name: '喀什001', key: '653100', 'log': 75.94, 'lat': 39.52, iphone8: 80},
        {id: 7, name: '喀什002', key: '653100', 'log': 76.50, 'lat': 39, iphone8: 70},
        {id: 8, key: '650200', iphone8: 70}
      ],
      iphonex: [
        {id: 0, key: '441400', iphonex: 50},
        {id: 1, key: '441200', iphonex: 10},
        {id: 2, key: '320800', iphonex: 20},
        {id: 3, key: '320600', iphonex: 30},
        {id: 4, key: '232700', iphonex: 80},
        {id: 5, key: '231000', iphonex: 60},
        {id: 6, name: '喀什001', key: '653100', 'log': 75.94, 'lat': 39.52, iphonex: 40},
        {id: 7, name: '喀什002', key: '653100', 'log': 76.50, 'lat': 39, iphonex: 20},
        {id: 8, key: '650200', iphonex: 90}
      ]
    };

    for (let dataType in srcData) {
      this.setData(srcData[dataType], dataType);
    }

    this.render();
  }

  link(scope, elem, attrs, ctrl) {
    rendering(scope, elem, attrs, ctrl);
  }
}

ChinaMapCtrl.templateUrl = 'module.html';
