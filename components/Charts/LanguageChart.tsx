import { Paper, Text, ThemeIcon } from "@mantine/core";
import GhPolyglot from "gh-polyglot";
import { useEffect, useState } from "react";
import { Language } from "tabler-icons-react";
import buildChart from "./BuildChart";
import { CHART_SIZE, ICON_SIZE, useChartsTheme } from "./chartsTheme";
import { generateRandomColor } from "../Utils";

export function LanguageChart({ userData }) {
  const { classes } = useChartsTheme();

  const [error, setError] = useState(null);
  const [langChartData, setLangChartData] = useState(null);

  const initLangChart = () => {
    console.log(userData.login);

    const me = new GhPolyglot(`${userData.login}`);
    me.userStats((err, langData) => {
      if (err) {
        console.error("Error:", err);
        setError({ active: true, type: 400 });
      }

      const ctx = document.getElementById("langChart");
      const labels = langData.map((lang) => lang.label);
      const data = langData.map((lang) => lang.value);

      setLangChartData(data);

      if (data.length > 0) {
        const borderColor = labels.map(generateRandomColor);
        const backgroundColor = borderColor.map((color) => `${color}B3`);
        const chartType = "doughnut";
        const axes = false;
        const legend = true;
        const config = {
          ctx,
          chartType,
          labels,
          data,
          backgroundColor,
          borderColor,
          axes,
          legend,
        };
        buildChart(config);
      }
    });
  };

  useEffect(() => {
    console.log(userData);

    initLangChart();
  }, [userData]);

  const langChartError = !(langChartData && langChartData.length > 0);

  return (
    <Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE}>
      <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        <Language size="2rem" />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        Top Languages
      </Text>

      {langChartError && <Text>Nothing to see here!</Text>}
      <canvas id="langChart" width={CHART_SIZE} height={CHART_SIZE} />
    </Paper>
  );
}
