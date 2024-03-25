export function divideSumByComma(sumStr: string): string {
  const [rublesStr, kopeksStr] = sumStr.split(".");

  if (rublesStr.trim().length <= 3) return sumStr;
  if (/^\d+$/.test(rublesStr)) {
    const lastThreeChars = rublesStr.slice(-3);
    const result = rublesStr.slice(0, -3) + "," + lastThreeChars;
    return result + (kopeksStr ? `.${kopeksStr}` : "");
  } else {
    return sumStr;
  }
}
