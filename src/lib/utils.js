import { format, formatDistanceToNow, fromUnixTime } from 'date-fns';

export const formatDate = (date) => {
  return format(fromUnixTime(date), 'dd/MM/yyyy hh:mm a');
};

export const formatDateDistance = (date) => {
  if (date) {
    const dateObject = fromUnixTime(date);
    const distanceFromNow = formatDistanceToNow(dateObject);
    return `${distanceFromNow} ago`;
  }
};
