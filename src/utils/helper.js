export const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export const formatDateForInput = (date) => {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0];
};

export const convertToBoolean = (value) => {
  if (value === "false") return false;
  else if (value === "true") return true;
  else return value;
};
