import { DateAttr } from "./interfaces/Date";

export const GetFormattedDate = (date: Date, region: string = 'pt-BR'): string => {
    return new Intl.DateTimeFormat(region, {
        timeZone: "UTC", // Garante que o fuso horário não altere a data
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(date);
}

export const getDateMinusDays = (date: Date, days: number) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}