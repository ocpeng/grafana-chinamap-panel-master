import echarts from './lib/echarts.min';

export default function link(scope, elem, attrs, ctrl) {
  const mapContainer = elem.find('.chinamap-panel');
  // 简单的饼图自动绘图工具
  let MapChart = (function() {
    //text, subtext, legends, values, message
    let newInstance = function(element) {
      // 计算地图上的圆圈大小
      let calRoundSize = function(val, type) {
        const Min_Size = 10;
        let minSize = 0;
        let maxSize = 0;
        let value = val[2];

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
      let chart = {};
      let mapType = [
        'china',
        // 23个省
        '广东', '青海', '四川', '海南', '陕西',
        '甘肃', '云南', '湖南', '湖北', '黑龙江',
        '贵州', '山东', '江西', '河南', '河北',
        '山西', '安徽', '福建', '浙江', '江苏',
        '吉林', '辽宁',
        //'台湾',
        // 5个自治区
        '新疆', '广西', '宁夏', '内蒙古', '西藏',
        // 4个直辖市
        '北京', '天津', '上海', '重庆',
        // 2个特别行政区
        '香港', '澳门',
      ];
      let seriesNameObj = {
        'iPhone 7': 'iphone7',
        'iPhone 8': 'iphone8',
        'iPhone X': 'iphonex',
      };
      let currSeriesName = 'iPhone 7';
      chart.container = echarts.init(element[0], 'dark');
      chart.option = {
        title: {
          text: '全国地图',
          left: 'center',
          textStyle: {
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'item',
          padding: 10,
          backgroundColor: 'rgba(20,20,20,0.8)',
          formatter: function(params) {
            let tipVal = 0;
            let tipHTML = [];

            if (params) {
              if (params.data && params.data.value instanceof Array && params.data.value.length > 2) {
                tipVal = params.data.value[2];
              }

              tipHTML.push('<div style="font-size: 16px;color: ', params.color, ';">', params.name, '</div>');
              tipHTML.push(params.seriesName, '：', tipVal);
            }

            return tipHTML.join('');
          },
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: [
            { name: 'iPhone 7', icon: 'roundRect', textStyle: { color: '#f4e925' } },
            { name: 'iPhone 8', icon: 'roundRect', textStyle: { color: '#f4e925' } },
            { name: 'iPhone X', icon: 'roundRect', textStyle: { color: '#f4e925' } },
          ],
          selectedMode: 'single',
          selected: {
            'iPhone 7': true,
            'iPhone 8': false,
            'iPhone X': false,
          },
        },
        toolbox: {
          show: true,
          itemSize: 30,
          feature: {
            myTool1: {
              show: ctrl.currentProvince === 'china',
              title: '返回',
              icon: 'path://M512 64C264.8 64 64 264.8 64 512s200.8 448 448 448 448-200.8 448-448S759.2 64 512 '
                + '64z m158.4 674.4L625.6 784l-272-272 272-272 45.6 45.6L444 512l226.4 226.4z',
              onclick: function() {
                ctrl.pointName = '';
                ctrl.province = undefined;
                ctrl.city = undefined;
                ctrl.areaId = undefined;
                chart.update();

                // 变量置为All
                for (let i = 0, len = ctrl.templateSrv.variables.length; i < len; i++) {
                  let variable = ctrl.templateSrv.variables[i];

                  if (variable.name === 'popId' || variable.name === 'popName') {
                    variable.setValue({
                      text: 'All',
                      value: ['$__all'],
                    });
                    ctrl.variableSrvT.variableUpdated(variable, true);
                  } else if (variable.name === 'areaName') {
                    variable.setValue({
                      text: '全国',
                      value: '全国',
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
              onclick: function() {
                ctrl.province = ctrl.currentProvince;
                ctrl.pointName = ctrl.currentProvince;
                chart.updateMap();
                chart.update();
              }
            }
          },
          iconStyle: {
            color: 'rgb(255, 255, 255)',
          },
          emphasis: {
            iconStyle: {
              color: 'rgb(255, 255, 0)',
            },
          },
          left: '1%',
        },
        geo: {
          map: 'china',
          selectedMode: 'single',
          label: {
            show: true,
            color: '#fff',
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
                  color: 'rgba(147, 235, 248, 0)', // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(147, 235, 248, .2)', // 100% 处的颜色
                }],
                globalCoord: false, // 缺省为 false
              },
              shadowColor: 'rgba(128, 217, 248, 1)',
              // shadowColor: 'rgba(255, 255, 255, 1)',
              shadowOffsetX: -2,
              shadowOffsetY: 2,
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: '#389BB7',
              borderWidth: 0,
            },
          },
          // roam: true,
          aspectScale: 0.95,
        },
        series: [
          {
            name: 'iPhone 7',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: function(val) {
              return calRoundSize(val, 'iphone7');
            },
            showEffectOn: 'render',
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
          },
          {
            name: 'iPhone 8',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: function(val) {
              return calRoundSize(val, 'iphone8');
            },
            showEffectOn: 'render',
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
          },
          {
            name: 'iPhone X',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: [],
            symbolSize: function(val) {
              return calRoundSize(val, 'iphonex');
            },
            showEffectOn: 'render',
            rippleEffect: {
              period: 15,
              scale: 4,
              brushType: 'fill',
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: false,
              },
              emphasis: {
                show: true,
              },
            },
            itemStyle: {
              normal: {
                color: '#f4e925',
                shadowBlur: 10,
                shadowColor: '#333',
              },
            },
          },
        ],
      };

      chart.container.on('legendselectchanged', function(obj) {
        currSeriesName = obj.name;
      });

      chart.container.on('click', function(params) {
        //获取省市名称
        if (mapType.indexOf(params.name) !== -1) {
          let destProvinceData = ctrl.provinceData[seriesNameObj[currSeriesName]].find(x => x.name === params.name);

          if (!!!destProvinceData) {
            //如果该省份没有数据，直接返回
            return;
          }

          ctrl.province = params.name;
          ctrl.city = undefined;
        } else {
          let dstSeries = chart.option.series.find(x => x.name === currSeriesName);
          let citiesData = dstSeries.data;

          if (citiesData instanceof Array && params.name) {
            let destCityData1 = citiesData.find(x => x.name === params.name);
            let destCityData2 = citiesData.find(x => x.city === params.name);

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

      chart.updateMap = function() {
        if (!ctrl.pointName) {
          return;
        }
        let popList = [];
        let currPopData = ctrl.popData[seriesNameObj[currSeriesName]];

        if (typeof(ctrl.city) !== 'undefined' && !ctrl.isDirectCity) {
          popList = currPopData.filter(x => x.city === ctrl.city);

          if (!popList || popList.length === 0) {
            popList = currPopData.filter(x => x.name === ctrl.city);
          }
        } else {
          popList = currPopData.filter(x => x.parent === ctrl.province);
        }

        for (let i = 0, len = ctrl.templateSrv.variables.length; i < len; i++) {
          let variable = ctrl.templateSrv.variables[i];

          if (variable.name === 'popId') {
            let popIdList = popList.map(x => '' + x.id);
            variable.setValue({
              text: popIdList.join(' + '),
              value: popIdList,
            });
            ctrl.variableSrvT.variableUpdated(variable, true);
          } else if (variable.name === 'popName') {
            let popNameList = popList.map(x => '' + x.name);
            variable.setValue({
              text: popNameList.join(' + '),
              value: popNameList,
            });
            ctrl.variableSrvT.variableUpdated(variable, true);
          } else if (variable.name === 'areaName') {
            variable.setValue({
              text: ctrl.pointName,
              value: ctrl.pointName,
            });
            ctrl.variableSrvT.variableUpdated(variable, true);
          }
        }
      };

      //==================================================================================
      // 刷新地图
      //==================================================================================
      chart.update = function() {
        let selectedInfo = chart.option.legend.selected;

        for (let selKey in selectedInfo) {
          if (selectedInfo.hasOwnProperty(selKey)) {
            selectedInfo[selKey] = (selKey === currSeriesName);
          }
        }

        if (typeof(ctrl.city) !== 'undefined') {
          return;
          // chart.option.geo.map = ctrl.province;
          // chart.option.title.text = ctrl.city;
        } else if (typeof(ctrl.province) !== 'undefined') {
          chart.option.geo.map = ctrl.province;
          chart.option.title.text = ctrl.province;
          chart.option.series[0].data = ctrl.popData.iphone7.filter(x => x.parent === ctrl.province);
          chart.option.series[1].data = ctrl.popData.iphone8.filter(x => x.parent === ctrl.province);
          chart.option.series[2].data = ctrl.popData.iphonex.filter(x => x.parent === ctrl.province);
        } else {
          chart.option.geo.map = 'china';
          chart.option.title.text = '全国';
          chart.option.series[0].data = ctrl.provinceData.iphone7;
          chart.option.series[1].data = ctrl.provinceData.iphone8;
          chart.option.series[2].data = ctrl.provinceData.iphonex;
        }

        chart.container.setOption(chart.option, true);
        chart.container.resize();
      };

      chart.resize = function() {
        chart.container.resize();
      };

      chart.dispose = function() {
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

    return {
      newInstance: newInstance,
    };
  })();

  ctrl.events.on('render', () => {
    render();
    ctrl.renderingCompleted();
  });

  function render() {
    if (!ctrl.map) {
      ctrl.map = MapChart.newInstance(mapContainer, {});
    } else {
      ctrl.map.update();
    }
  }
};
