/**
 * Transforms the response data into Grid Rows
 * @param {*} data - items returned in the API response
 */
export function transformDataForGridView(data) {
    return data.map(rec => {
        return {
            title: rec.title,
            episodeId: rec.episode_id,
            releaseDate: rec.release_date,
            director: rec.director
        };
    });
}

export function gridHeader() {
    return [
        { id: 'title', label: 'Title', isNumeric: false, isDate: false }, // Possible values for sortDirection: 'asc' | 'desc' | false        
        { id: 'releaseDate', label: 'Release Date', isNumeric: false, isDate: true },
        { id: 'director', label: 'Director', isNumeric: false, isDate: false },
        { id: 'episodeId', label: 'Episode ID', isNumeric: true, isDate: false }
    ];
}

export function sortGridRows(gridRows, columnKey, isColumnNumeric, isColumnDate, sortDirection) {
    return gridRows.sort((row1, row2) => {
        let comparisonValue = 0;
        const cellData1 = row1[columnKey];
        const cellData2 = row2[columnKey];
        if (isColumnNumeric) { // number comparison
            const num1 = Number(cellData1);
            const num2 = Number(cellData2);
            if (sortDirection === 'asc') {
                comparisonValue = (num1 - num2);
            } else {
                comparisonValue = (num1 - num2) * -1;
            }
        } else if (isColumnDate) { // date comparison
            const date1 = new Date(cellData1);
            const date2 = new Date(cellData2);
            if (sortDirection === 'asc') {
                comparisonValue = (date1.getTime() - date2.getTime());
            } else {
                comparisonValue = (date1.getTime() - date2.getTime()) * -1;
            }
        } else { // string comparison
            const str1 = cellData1.toUpperCase();
            const str2 = cellData2.toUpperCase();
            if (sortDirection === 'asc') {
                if (str1 < str2) comparisonValue = -1;
                if (str1 > str2) comparisonValue = 1;
            } else {
                if (str1 < str2) comparisonValue = 1;
                if (str1 > str2) comparisonValue = -1;
            }
        }
        return comparisonValue;
    });
}

export function fetchFilms() {
    return fetch('https://swapi.dev/api/films/').then(res => {
        const promise = res.json();
        return promise;
    });
}