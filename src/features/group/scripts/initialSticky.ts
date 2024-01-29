export const initialSticky = (group: HTMLDivElement) => {
  const parent = group.closest(".group-body");
  const header = group.querySelector(".group-header") as HTMLDivElement;
  if (!parent) {
    const top = group.parentElement?.offsetTop + "px";
    header.style.top = top;
    return;
  }
  const headerParent = parent.parentElement!.querySelector(
    ".group-header"
  ) as HTMLDivElement;
  if (headerParent && header) {
    const headerParentTop = headerParent.style.top.replace(/[^+\d]/g, "");
    header.style.top = `${
      Number(headerParentTop) + Number(headerParent.clientHeight)
    }px`;
  }
};
