import { Paper, Text, ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { Stars } from "tabler-icons-react";
import { useGetRepositories } from "../../pages/api/data-access/useGetRepositories";
import buildChart from "./BuildChart";
import { CHART_SIZE, ICON_SIZE, useChartsTheme } from "./chartsTheme";
import { generateRandomColor } from "../Utils";

export function StarPerLanguageChart({ login }) {
  const { classes, theme } = useChartsTheme();
  const { data: repositories, isLoading } = useGetRepositories(login);

  const [starChartData, setStarChartData] = useState(null);

  const initStarredChart = () => {
    const ctx = document.getElementById("thirdChart");
    const filteredRepos = repositories.filter(
      (repo) => !repo.fork && repo.stargazers_count > 0
    );
    const uniqueLangs = new Set(filteredRepos.map((repo) => repo.language));
    const labels = Array.from(uniqueLangs.values()).filter((l) => l);
    const data = labels.map((lang) => {
      const repos = filteredRepos.filter((repo) => repo.language === lang);
      const starsArr = repos.map((r) => r.stargazers_count);
      const starSum = starsArr.reduce((a, b) => a + b, 0);
      return starSum;
    });

    setStarChartData(data);

    if (data && data.length > 0) {
      const chartType = "pie";
      const axes = false;
      const legend = true;

      const borderColor = labels.map(generateRandomColor);
      const backgroundColor = borderColor.map((color) => `${color}B3`);
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
  };

  useEffect(() => {
    initStarredChart();
  }, [login]);

  const starChartError = !(starChartData && starChartData.length > 0);

  return (
    <Paper radius="md" withBorder className={classes.card} mt={ICON_SIZE}>
      <ThemeIcon className={classes.icon} size={ICON_SIZE} radius={ICON_SIZE}>
        <Stars size="2rem" />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        Stars per lanugae
      </Text>
      {starChartError && <p>Nothing to see here!</p>}
      <canvas id="thirdChart" width={CHART_SIZE} height={CHART_SIZE} />
    </Paper>
  );
}
