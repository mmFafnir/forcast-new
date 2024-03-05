interface QueryParams {
  [key: string]: string;
}

export function getQueryParameters(url: string): QueryParams {
  const queryString = url.split("?")[1];
  if (!queryString) {
    return {}; // Если нет параметров, возвращаем пустой объект
  }

  const paramsArray = queryString.split("&");
  const paramsObject: QueryParams = {};

  paramsArray.forEach((param) => {
    const [key, value] = param.split("=");
    paramsObject[key] = decodeURIComponent(value);
  });

  return paramsObject;
}
