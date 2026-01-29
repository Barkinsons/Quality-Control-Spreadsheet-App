class Data {

  /* Creates a data object using data from given sheets.
   */
  constructor(sheets) {
    this.data = sheets.flatMap((sheet) => Sheets.getData(sheet));
  }
}
