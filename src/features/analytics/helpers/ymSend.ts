"use client";
export const ymSend = (type: string, value: string) => {
  // @ts-ignore
  if (typeof window !== "undefined" && window.ym) {
    // @ts-ignore
    window.ym(96810020, type, value);
    console.log(window.location.href);
  }
};
