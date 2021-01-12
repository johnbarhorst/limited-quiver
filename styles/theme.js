const colors = {
  darkGrey: '#5C5F58',
  orange: '#FF9F1C',
  darkBlue: '#004E7C',
  red: '#BF1A2F',
  apricot: '#FFBF69',
  persianGreen: '#339989',
  white: '#ffffff',
  black: '#121212'
};

const bg = {
  primary: colors.darkBlue,
  secondary: colors.persianGreen
};

const fonts = {
  primaryColor: colors.black,
  activeColor: colors.red,
  navIcon: colors.apricot
}

const shadows = {
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
}

const sizes = {
  navHeightMobile: '70px',
}

const theme = {
  bg,
  colors,
  fonts,
  shadows,
  sizes
};

export default theme;