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