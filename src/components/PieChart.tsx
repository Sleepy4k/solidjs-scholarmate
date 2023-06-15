import { onMount, Component } from "solid-js";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const PieChart: Component<{ name: string, tag: string, data: any[], value: string, category: string }> = (props) => {
  const tag = props.tag;
  const chart_data = props.data;
  const pie_value = props.value;
  const pie_category = props.category;
  const pie_title = props.name;

  onMount(() => {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create(tag, am4charts.PieChart);
    let title = chart.titles.create();

    chart.data = chart_data;
    title.text = pie_title;
    title.fontSize = 25;
    title.marginBottom = 15;
    title.marginTop = 15;

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = pie_value;
    pieSeries.dataFields.category = pie_category;
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    var rgm = new am4core.LinearGradientModifier();
    rgm.brightnesses.push(0, -0.4);
    pieSeries.slices.template.fillModifier = rgm;

    var rgm2 = new am4core.LinearGradientModifier();
    rgm2.brightnesses.push(0, -0.4);

    pieSeries.slices.template.strokeModifier = rgm2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.strokeWidth = 1;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    pieSeries.labels.template.text = "{category}: {value.value}";
    pieSeries.slices.template.tooltipText = "{category}: {value.value}";
    chart.legend.valueLabels.template.text = "{value.value}";
  });

  return <div id={tag} style={{ height: "500px", width: "100%" }}></div>;
};

export default PieChart;
