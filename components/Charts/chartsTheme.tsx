import { createStyles, rem } from "@mantine/core";

export const ICON_SIZE = rem(90);
export const CHART_SIZE = 300;
export const MONACO_FONT =  'Monaco, Courier, monospace';


export const useChartsTheme = createStyles((theme) => ({
    card: {
      position: 'relative',
      overflow: 'visible',
      padding: theme.spacing.xl,
      paddingTop: `calc(${theme.spacing.xl} * 1.5 + ${ICON_SIZE} / 3)`,
    },
  
    icon: {
      position: 'absolute',
      top: `calc(-${ICON_SIZE} / 2)`,
      left: `calc(50% - ${ICON_SIZE} / 2)`,
    },
  
    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      lineHeight: 1,
    },

  }));
  