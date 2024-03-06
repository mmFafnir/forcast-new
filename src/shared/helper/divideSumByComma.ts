export function divideSumByComma(sumStr: string): string {
  if (/^\d+$/.test(sumStr)) {
    const lastThreeChars = sumStr.slice(-3);
    const result = sumStr.slice(0, -3) + "," + lastThreeChars;
    return result;
  } else {
    return "Некорректная строка суммы. Пожалуйста, введите только цифры.";
  }
}
