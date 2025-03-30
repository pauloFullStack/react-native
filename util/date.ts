import { DateAttr } from "./interfaces/Date";

export const GetFormattedDate = (date: Date, objectDate: DateAttr = { day: "2-digit", month: "2-digit", year: "numeric" }): string => {
    return new Intl.DateTimeFormat("pt-BR", { ...objectDate }).format(date);

}

export const getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}