const ui = SpreadsheetApp.getUi();

function onOpen() {
  ui.createMenu("QC Tools")
    .addItem("Create New Sheet", "createNewSheet")
    .addToUi();
}