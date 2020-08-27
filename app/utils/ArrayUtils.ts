export function groupBy(array: Object[], key: string) {
    if (Array.isArray(array) && array.length > 0) {
        return array.reduce((accumulator, item) => {
            accumulator[item[key]] = [ ...accumulator[key], item ];
            return accumulator;
        }, {});
    }

    return {};
}

export function groupDistinctBy(array: Object[], key: string) {
    if (Array.isArray(array) && array.length > 0) {
        return array.reduce((accumulator, item) => {
            if (!accumulator[item[key]]) {
                accumulator[item[key]] = item;
            }
            return accumulator;
        }, {});
    }

    return {};
}
export function groupDistinctValueBy(array: Object[], key: string, valueKey: string) {
    if (Array.isArray(array) && array.length > 0) {
        return array.reduce((accumulator, item) => {
            if (!accumulator[item[key]]) {
                accumulator[item[key]] = item[valueKey || key];
            }
            return accumulator;
        }, {});
    }

    return {};
}

export function sumBy(array: any[], key: string) {
    if (Array.isArray(array) && array.length > 0) {
        return array.reduce((accumulator, item) => accumulator + parseFloat(item[key]), 0);
    }

    return 0;
}

export function arrayToObject(array) {
    if (Array.isArray(array) && array.length > 0) {
        return array.reduce((accu, curr, index) => accu[index] = curr, {});
    }

    return {};
}

export function ordinalObjectToArray(obj) {
    return Object.keys(obj).map(key => obj[key]);
}
