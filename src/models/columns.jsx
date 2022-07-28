const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

const modelColumns = (gCols) => {
    let _cols = gCols;
    let returnColumns = []

    if (!_cols) {
        returnColumns = columns;
        return returnColumns;
    } 

    for (const header of _cols.entries()) {
        let id = header[1].split(" ").join("").toLowerCase();
        let entry = {
            id: id,
            label: header[1],
            minWidth: 170,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        }
        returnColumns.push(entry)
    }

    return returnColumns;
}

export { modelColumns };