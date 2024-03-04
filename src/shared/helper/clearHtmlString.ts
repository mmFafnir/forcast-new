import DOMPurify from "dompurify";

export const clearHtmlString = (text: string) => {
  const cleanHtmlString = DOMPurify.sanitize(text, {
    USE_PROFILES: { html: true },
  });
  return cleanHtmlString;
};
