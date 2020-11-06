export function addQueryValue(values: any[], value: any): string {
    values.push(value);
    return "$" + values.length;
}