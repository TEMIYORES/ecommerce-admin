const DateFormat = ({ dateStr }: { dateStr: string }) => {
  const date: Date = new Date(dateStr); // Create a Date object from the date string

  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour12: true,
    timeZone: "UTC", // Set timeZone to 'UTC' to match the input date string's timezone
  };

  const formattedDate: string = new Intl.DateTimeFormat(
    "en-US",
    options
  ).format(date);

  return <>{formattedDate}</>;
};

export default DateFormat;
