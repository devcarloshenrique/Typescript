export default function stringToDate(texto: string): Date {
    
    const [data, tempo] = texto.split(" ");
    const [dia, mes, ano] = data.split("/").map(Number)
    const [hora, min] = tempo.split(":").map(Number)

    return new Date(ano, mes - 1, dia, hora, min);
        
}