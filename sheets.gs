const ss = SpreadsheetApp.getActiveSpreadsheet();

/* Duplicates the master sheet and names it today's date.
 */
function createNewSheet() {
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
