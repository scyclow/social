// @flow

export default (...classes: Array<?string | false>): string => classes.filter(c => !!c).join(' ')
