const getFormattedDay = (dateStr: string) => {
  // Check availability logic here
  const startDate = new Date(dateStr);
  // Opciones de formateo
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  // Formatear la fecha
  const formattedDate = new Intl.DateTimeFormat("es-ES", options).format(
    startDate,
  );
  // Regresar fecha (dia) con formato, capitalizar la primera letra
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

export default getFormattedDay;
