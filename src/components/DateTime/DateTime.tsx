import { format } from 'date-fns';
// import { zhCN } from 'date-fns/locale';
import { enUS } from 'date-fns/locale';
// import { bn } from 'date-fns/esm/locale';
export interface DateTimeProps {
  date: Date
}

export default function DateTime({
  date
}: DateTimeProps) {
  const dateString = format(date, 'PPP', {
    locale: enUS

  })
  return (
    <>{dateString}</>
  );
}
