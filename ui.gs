const ui = SpreadsheetApp.getUi();

function onOpen() {
  ui.createMenu("QC Tools")
    .addItem("Create New Sheet", "Sheets.newSheet")
    .addItem("Productivity", "handleProductivity")
    .addSeparator()
    .addSubMenu(
      ui.createMenu("More...")
        .addItem("Hide sheets", "Sheets.hide")
        .addItem("Delete old sheets", "Sheets.clean")
      )
    .addToUi();
}

function handleProductivity() {
  const d = new Data(Sheets.fromWeeks(numProdWeeks));

  Write.productivity(d.counts);
}