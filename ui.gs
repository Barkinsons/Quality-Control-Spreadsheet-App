const ui = SpreadsheetApp.getUi();

function onOpen() {
  ui.createMenu("QC Tools")
    .addItem("Create New Sheet", "Sheets.newSheet")
    .addSeparator()
    .addSubMenu(
      ui.createMenu("More...")
        .addItem("Hide sheets", "Sheets.hide")
        .addItem("Delete old sheets", "Sheets.clean")
      )
    .addToUi();
}