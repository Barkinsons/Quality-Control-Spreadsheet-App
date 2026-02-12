class Format {
  /* Formats productivity data.
   * @param numWeeks {number} Number of weeks.
   * @param numResources {number} Number of resources.
   */
  static productivity(numWeeks, numResources) {
    const s = Sheets.getSheet("Productivity");

    s.setColumnWidth(1, 110);
    s.getRange("A1").setBackground("#000");
    s.getRange("A2").setBackground("#999");

    s.getRange("B1:I1").merge();

    s.getRange("B2").setBackground("#FF0");
    s.getRange("C2").setBackground("#0FF");
    s.getRange("D2").setBackground("#F0F");
    s.getRange("E2").setBackground("#0F0");
    s.getRange("F2").setBackground("#80F");
    s.getRange("G2").setBackground("#F00");
    s.getRange("H2").setBackground("#F80");
    s.getRangeList(["I2", "B1"]).setBackground("#000").setFontColor("#FFF");

    s.getRange("A1:I2").setBorder(true, true, true, true, true, true).setHorizontalAlignment("center").setFontWeight("bold");
    s.getRange(3, 9, numResources, 1).setBorder(true, true, true, true, true, true);
    s.getRange(3, 1, numResources, 1).setBorder(true, true, true, true, true, true);

    const range = s.getRange(1, 2, numResources + 2, 8);
    for (let i = 0; i < numWeeks; i += 1) {
      const colStart = i * 8 + 2;

      if (i !== 0) {
        range.copyFormatToRange(
          s.getSheetId(), 
          colStart, colStart + 8, 
          1, numResources + 2
        );
      }

      s.setColumnWidths(colStart, 7, 40);
      s.setColumnWidth(colStart + 7, 50);
    }
  }
}
