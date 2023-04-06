import { Paper, Text, ThemeIcon } from "@mantine/core";
import { useEffect, useState } from "react";
import { Language, Star } from "tabler-icons-react";
import buildChart from "./BuildChart";
import { CHART_SIZE, ICON_SIZE, useChartsTheme } from "./chartsTheme";
import { useGetRepositories } from "../../pages/api/data-access/useGetRepositories";

export function MostStarredChart({ login }) {
  const { classes, theme } = useChartsTheme();
  const { data: repositories, isLoading } = useGetRepositories(login);

  const [starChartData, setStarChartData] = useState(null);

  const initStarredChart = () => {
    const ctx = document.getElementById("starChart");
    const LIMIT = 5;
    const sortProperty = "stargazers_count";
    const mostStarredRepos = repositories
      .filter((repo) => !repo.fork)
      .sort((a, b) => b[sortProperty] - a[sortProperty])
      .slice(0, LIMIT);
    const labels = mostStarredRepos.map((repo) => repo.name);
    const data = mostStarredRepos.map((repo) => repo[sortProperty]);
    const backgroundColor =
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7];
    const borderColor =
      theme.colorScheme === "dark"
        ? theme.colors.gray[0]
        : theme.colors.dark[7];

    setStarChartData(data);

    if (data.length > 0) {
      const chartType = "bar";
      const axes = true;
      const legend = false;
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
        <Star size="2rem" />
      </ThemeIcon>

      <Text ta="center" fw={700} className={classes.title}>
        Most starred
      </Text>
      {starChartError && <p>Nothing to see here!</p>}
      <canvas id="starChart" width={CHART_SIZE} height={CHART_SIZE} />
    </Paper>
  );
}
