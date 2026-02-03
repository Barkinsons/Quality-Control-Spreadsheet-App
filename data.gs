class Data {

  /* Creates a data object using data from given sheets.
   */
  constructor(sheets) {
    this.data = sheets.flatMap((sheet) => Sheets.getData(sheet));
  }

  /* Converts data into an object that represents the error counts
   * for each resource on their given days.
   * @return {[number min, number max, {string resource: {int date: int count}}]} Error count data.
   */
  get counts() {
    let _counts = {};
    let min = Infinity;
    let max = -Infinity;

    this.data.forEach((row) => {
      const resource = row[4];
      const date = row[0];

      if (resource !== "") {
        if (!(resource in _counts)) {
          _counts[resource] = {};
        }
        if (!(date in _counts[resource])) {
          _counts[resource][date] = 0;
        }

        _counts[resource][date] += 1;

        if (date < min) {
          min = date;
        }
        if (date > max) {
          max = date;
        }
      }
    });

    return [min, max, _counts];
  }
}
