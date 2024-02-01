export const parseQueryParams = (query: string): Record<string, string> => {
  const params = query.split("&");
  const result: Record<string, string> = {};
  for (const param of params) {
    const [key, value] = param.split("=");
    if (key && value) {
      result[key.replace("?", "")] = value;
    }
  }
  return result;
};
