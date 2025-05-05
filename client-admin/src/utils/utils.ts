import axios from "axios";
import config from "../config.ts";

export function capitalizeFirstLetter(string) {
  if (!string) return ""; // Handle empty string case
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

export const fetchDatos = async (ruta: string, nombreArchivo: string) => {
  try {
    const response = await axios.get(`${config.apiUrl}/descargas/${ruta}`, {
      responseType: "blob", // Ensure the response is handled as a blob
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    // Create a URL for the blob
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "text/csv" }),
    );
    const link = document.createElement("a");
    link.href = url;

    // Extract filename from Content-Disposition header if present, or use a default name
    const contentDisposition = response.headers["content-disposition"];
    let fileName = `${nombreArchivo}.csv`;
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      if (fileNameMatch && fileNameMatch.length === 2) {
        fileName = fileNameMatch[1];
      }
    }
    link.setAttribute("download", fileName);

    // Append the link to the body
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  } catch (e) {
    console.error(e);
  }
};