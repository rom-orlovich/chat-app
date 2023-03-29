export const classNameGenerator = (...classes: (string | undefined)[]) => {
    return `${classes.filter((el) => el).join(' ')}`;
  };