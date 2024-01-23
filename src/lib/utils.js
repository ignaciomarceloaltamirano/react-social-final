import { format, formatDistanceToNow, toDate } from 'date-fns';

export const formatDateDistance = (date) => {
  if (date) {
    const [year, month, day, hour, minutes, seconds] = date;
    const timestamp = new Date(
      year,
      month - 1,
      day,
      hour - 3,
      minutes,
      seconds
    );

    return formatDistanceToNow(timestamp, {
      addSuffix: true,
    });
  }
};

export const formatDate = (dateArray) => {
  if (dateArray) {
    const [year, month, day, hour, minute, second] = dateArray;
    const date = toDate(new Date(year, month - 1, day, hour, minute, second));

    return format(date, 'MMMM, dd, yyyy');
  }
};
