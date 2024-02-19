export const getColorRisk = (risk: number) => {
  switch (risk) {
    case 1:
      return "rgb(162, 208, 125)";

    case 3:
      return "rgb(227, 215, 104)";

    case 4:
      return "rgb(208, 125, 125)";

    default:
      return "rgba(217, 217, 217, 1)";
  }
};
