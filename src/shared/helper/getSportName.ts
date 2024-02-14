const sports: { [key: number]: string } = {
  1: "soccer",
};

export const getSportName = (sportId: number) => {
  return sports[sportId];
};
