const getFormatedTime = (date_str: string) => {
  const endDate = new Date(date_str);
  const endHours = endDate.getHours().toString().padStart(2, "0");
  const endMinutes = endDate.getMinutes().toString().padStart(2, "0");
  return `${endHours}:${endMinutes}`;
};

export default getFormatedTime;
