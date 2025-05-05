export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("es-MX", options);
};

export const isPhoneValid = (phone: string) => {
  if (!phone) return;
  return phone.length === 10;
}