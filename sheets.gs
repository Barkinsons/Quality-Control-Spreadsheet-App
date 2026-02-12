const ss = SpreadsheetApp.getActiveSpreadsheet();

class Sheets {
  /* Duplicates the master sheet and names it today's date.
   */
  static newSheet() {
    const master = ss.getSheetById(0);
    const todayStr = new Date().toLocaleDateString();

    let sheet = ss.getSheetByName(todayStr);
    if (sheet === null) {
      sheet = master.copyTo(ss);
    } else {
      ui.alert(`Sheet '${todayStr}' already exists!`);
    }

    sheet.showSheet();
    ss.setActiveSheet(sheet);
    ss.renameActiveSheet(todayStr);
    ss.moveActiveSheet(1);
  }

  /* Gets 'QC' sheets based on provided filter function.
   * @param f {(Sheet sheet, number date) => bool} Filter function.
   * @return {Sheet[]} Filtered sheets.
   */
  static getSheets(f)
  {
    return ss.getSheets().filter((sheet) => {
      const date = Date.parse(sheet.getName());

      return !isNaN(date) && f(sheet, date);
    });
  }

  /* Gets 'QC' data from sheet.
   * @param sheet {Sheet} 'QC' sheet to pull data from.
   * @return {string[][]} 2D array of values from sheet.
   */ 
  static getData(sheet) {
    return sheet
      .getRange("A2:G300")
      .getValues()
      .filter(row => Sheets._isValidRow(row))
      .map(row => [Date.parse(sheet.getName()), ...row]);
  }

  /* Hides QC sheets based on setting 'numWeeksToShow'.
   */
  static hide() {
    const cutoff = getMondayCutoff((numWeeksToShow - 1) * 7);

    const sheetsToHide = Sheets.getSheets((sheet, date) => !sheet.isSheetHidden() && date < cutoff);
    sheetsToHide.forEach(sheet => sheet.hideSheet());
  }

  /* Deletes old QC sheets based on setting 'numDaysToKeep'.
   */
  static clean() {
    const cutoff = getCutoff(numDaysToKeep);
    
    const sheetsToDelete = Sheets.getSheets((_, date) => date < cutoff);
    sheetsToDelete.forEach(sheet => ss.deleteSheet(sheet));
  }

  /* Validates a 'QC' row entry.
   * @param row {string[]} Row entry.
   * @return {bool} Whether the row is a valid 'QC' entry.
   */
  static _isValidRow(row) {
    return row.some(cell => cell !== "");
  }

  /* Gets a sheet by name, creates it if it doesn't exists.
   * @param name {string} Sheet name.
   * @return {Sheet} Sheet with name.
   */
  static getSheet(name) {
    let s = ss.getSheetByName(name);

    if (s === null) {
      s = ss.insertSheet(name);
    }

    return s;
  }

  /* Gets sheets for the last number of weeks.
   * @param numWeeks {number} Number of weeks to get.
   * @return {Sheet[]} Sheets from last number of weeks.
   */
  static fromWeeks(numWeeks) {
    const cutoff = getMondayCutoff(7 * (numWeeks - 1));

    return Sheets.getSheets((_, date) => date >= cutoff);
  }
}