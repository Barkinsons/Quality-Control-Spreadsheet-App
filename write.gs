class Write {
  /* Writes and formats productivity data.
   * @param counts {Object} Productivity data from 'Data' class.
   */ 
  static productivity(counts) {
    const start = counts[0];
    const end = counts[1];
    const count = counts[2];

    const resources = Object.keys(count);

    const grids = [["", "resources", ...resources]];
    for (let i = getMonday(start); i < end; i += 604800000) {
      const dataValues = resources.map(r => {
        let total = 0;
        const resourceCounts =  Array.from({length: 7}).map((_, j) => {
          const date = i + j * 86400000;

          const c = count[r][date]
          if (c != null) {
            total += c;
          }

          return c ?? "";
        });

        return [...resourceCounts, total];
      });

      const weekStart = new Date(i).toLocaleDateString();
      const weekEnd = new Date(i + 518400000).toLocaleDateString();
      const headers1 = [`Week of ${weekStart} - ${weekEnd}`, "", "", "", "", "", "", ""];
      const headers2 = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "TOTAL"];
      grids.push([headers1, headers2, ...dataValues]);
    }

    const values = grids[0].map((_, i) => {
      return grids.flatMap(g => g[i]);
    });

    Sheets.getSheet("Productivity").clear().getRange(1, 1, values.length, values[0].length).setValues(values);
    Format.productivity(grids.length-1, resources.length);
  }
}