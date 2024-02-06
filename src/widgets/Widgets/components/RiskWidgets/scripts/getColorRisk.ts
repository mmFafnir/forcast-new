export const getColorRisk = (risk: string) => {
  switch (risk) {
    case "Low":
      return "rgb(162, 208, 125)";

    case "Medium":
      return "rgb(227, 215, 104)";

    case "High":
      return "rgb(208, 125, 125)";

    default:
      return "rgba(217, 217, 217, 1)";
  }
};
