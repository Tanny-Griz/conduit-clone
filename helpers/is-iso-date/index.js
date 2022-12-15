export const isIsoDate = (date) => {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) { return false }

  const d = new Date(date) || 0
  return d instanceof Date && !isNaN(d) && d.toISOString() === date
}
