export const generateKey = (string) => {
  return string.slice(0, 10)
}

export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}
