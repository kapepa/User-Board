export const parseTimeLastUpdate = (time) => {
  const data = new Date(time)
  return `${data.getDate()}.${data.getMonth()}.${data.getFullYear()} ${data.getHours()}:${data.getMinutes()}`
}