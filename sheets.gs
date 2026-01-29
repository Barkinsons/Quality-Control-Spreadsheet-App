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
    return sheet.getRange("A1:G300").getValues().filter(row => {
      return Sheets._isValidRow(row);
    });
  }

  /* Validates a 'QC' row entry.
   * @param row {string[]} Row entry.
   * @return {bool} Whether the row is a valid 'QC' entry.
   */
  static _isValidRow(row) {
    return row.some(cell => cell !== "");
  }
}