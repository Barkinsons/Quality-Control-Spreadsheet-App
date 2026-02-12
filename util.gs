/* Gets cutoff datetime for numDays from today.
 * @param numDays {number} Number of days from today.
 * @return {number} Datetime cutoff.
 */
function getCutoff(numDays) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  today.setDate(today.getDate() - numDays);

  return today.getTime();
}

/* Gets cutoff datetime for the monday of the week numDays from today.
 * @param numDays {number} Number of days from today.
 * @return {number} Datetime cutoff for the monday of the week.
 */
function getMondayCutoff(numDays) {
  const today = new Date();
  const day = today.getDay();
  const offset = (day + 6) % 7;

  return getCutoff(numDays + offset);
}

/* Gets the monday datetime for the week of the given date.
 * @param date {number} Date.
 * @return {number} Monday datetime.
 */
function getMonday(date) {
  const monday = new Date(date);
  const offset = (monday.getDay() + 6) % 7;
  monday.setDate(monday.getDate() - offset);

  return monday.getTime();
}
