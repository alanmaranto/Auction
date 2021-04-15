export const isEmpty = (obj) => {
  return Object.values(obj).some((x) => x === null || x === "");
};
