import moment from "moment";

export function formatDate(date?, format?): string {
    const _date = date || new Date();
    const _format = format || "YYYY-MM-DD HH:mm:ss.SSS ZZ [GMT]Z";

    return moment(_date).format(_format);
}

export function formatDate2(date?, format?): string {
    const _date = date || new Date();
    const _format = format || "YYYY-MM-DDTHH:mm:ss.SSS[+00:00]";

    return moment.utc(_date).format(_format);
}
