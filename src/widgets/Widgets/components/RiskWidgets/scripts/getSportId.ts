export const getSportId = (pathname: string) => {
  if (pathname.includes("soccer")) return 1;
  return "";
};
