export const classNameGenerator = (...classes: (string | undefined)[]) =>
  `${classes.filter((el) => el).join(" ")}`;
