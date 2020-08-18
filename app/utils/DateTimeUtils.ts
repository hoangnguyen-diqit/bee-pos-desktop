import moment from "moment";

export function formatDate(date?, format?): string {
    const _date = date || new Date();
    const _format = format || "YYYY-MM-DD HH:mm:ss.SSS ZZ [GMT]Z";

    return moment(_date).format(_format);
}
