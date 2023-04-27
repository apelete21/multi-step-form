export const dateGen = (date) => {
  const dateString = date;
  const newDate = new Date();

  // Set the hours and minutes of the newDate object
  newDate.setHours(parseInt(dateString.substring(0, 2)));
  newDate.setMinutes(parseInt(dateString.substring(3)));

  return newDate; // Output: Sun Apr 24 2023 13:00:00 GMT-0700 (Pacific Daylight Time)
};
