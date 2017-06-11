export function turn (date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  if (day < 10) {
    day = '0' + day
  }
  if (month < 10) {
    month = '0' + month
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (min < 10) {
    min = '0' + min
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + min
}
