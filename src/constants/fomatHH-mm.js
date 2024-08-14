export const calculateEndTime = (departure_time, total_time) => {
  const start = departure_time.split(':');
  const total = total_time.split(':');
  let hours = parseInt(start[0]) + parseInt(total[0]);
  let minutes = parseInt(start[1]) + parseInt(total[1]);
  if (minutes >= 60) {
    minutes -= 60;
    hours += 1;
  }

  if (hours >= 24) {
    hours -= 24;
  }

  let hourFormat = hours < 10 ? `0${hours}` : hours;
  let minuteFormat = minutes < 10 ? `0${minutes}` : minutes;

  return `${hourFormat}:${minuteFormat}`;
};
