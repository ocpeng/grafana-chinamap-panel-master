亮点：将中国地图与MySQL数据源结合

1. 安装
直接将插件复制到grafan目录下，默认目录为/var/lib/grafana/plugins/

2. 重启grafana
# service grafana restart

3. 选择MySQL数据源，填写SQL
SELECT
  UNIX_TIMESTAMP(date_format(create_time,'%Y-%m-%d')) as time_sec,
  ifnull(count(*),0) as value,
  back_city_code,
  "长租"  as metric
FROM order1
WHERE $__timeFilter(create_time)
group by back_city_code
注意：back_city_code 必须为城市编码


## Examples
![Screenshot](https://github.com/ocpeng/grafana-plugins/grafana-chinamap-panel-master/demo/chinamap01.png?raw=true "China")
![Screenshot](https://github.com/ocpeng/grafana-plugins/grafana-chinamap-panel-master/demo/chinamap02.png?raw=true "Province")
