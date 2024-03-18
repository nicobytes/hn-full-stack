import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export function formatDay(date: Date) {
  return dayjs(date).fromNow();
}
