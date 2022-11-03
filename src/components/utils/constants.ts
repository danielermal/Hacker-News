export const getTime = (seconds: number) => {
  const date = new Date(seconds * 1000);
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1);
  const day = String(date.getDate());
  const hours = String(date.getHours());
  const minutes = String(date.getMinutes());
  const time = `${hours.length > 1 ? hours : "0" + hours}:${
    minutes.length > 1 ? minutes : "0" + minutes
  }  ${day.length > 1 ? day : "0" + day}.${
    month.length > 1 ? month : "0" + month
  }.${year}`;
  return time;
};
