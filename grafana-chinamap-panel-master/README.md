# 亮点：grafana将中国地图与MySQL数据源结合
* grafana版本 v6.2.5
* 20191118修复加载问题
* 如能帮助到您，欢迎给与支持，谢谢
* 对https://github.com/sunnut/grafana-chinamap-panel进行二次开发

# 1. 安装
直接将插件复制到grafan目录下，默认目录为/var/lib/grafana/plugins/

# 2. 重启grafana
service grafana restart

# 3. 选择MySQL数据源，填写SQL
* SELECT
*   UNIX_TIMESTAMP(date_format(create_time,'%Y-%m-%d')) as time_sec,
*   ifnull(count(*),0) as value,
*   back_city_code,
*   "长租"  as metric
* FROM order1
* WHERE $__timeFilter(create_time)
* group by back_city_code
* 注意：back_city_code 必须为城市编码，还有format as方框内选择Table，必须必须必须


# 4. demo图片
![Image text](https://raw.githubusercontent.com/ocpeng/grafana-chinamap-panel-master/master/grafana-chinamap-panel-master/demo/chinamap01.png)
* 点击可以下钻到城市
![Image text](https://raw.githubusercontent.com/ocpeng/grafana-chinamap-panel-master/master/grafana-chinamap-panel-master/demo/chinamap02.png)
* 如能帮助到您，欢迎给与支持，谢谢
![Image text](https://raw.githubusercontent.com/ocpeng/grafana-chinamap-panel-master/master/grafana-chinamap-panel-master/demo/chinamap03.png)
