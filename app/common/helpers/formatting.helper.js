export const titleCase = (value, lower) => {
  if (value) {
    return value.split('_').join(' ')
      .replace(/\w\S*/g, txt => {
        if (lower) {
          return txt.toLowerCase();
        } else {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      });
  } else {
    return '';
  }
};
