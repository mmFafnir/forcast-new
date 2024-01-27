// export const required = {
//   required: true,
//   message: NotifyEnum.EMPTY,
// };

export const validEmail = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Неверное значение полей e-mail!",
};

export const validNumber = {
  required: true,
  type: "number",
  message: "В поле должно быть число!",
};
