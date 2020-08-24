import numeral from "numeral";

export function formatCurrency(number?, format?) {
    const _number = number || 0;
    const _format = format || "$0,0.00";

    return numeral(_number).format(_format);
}
