export function convertMinutesToHourString(minutes: number) {
    const hoursAmount = Math.floor(minutes / 60)
    const minutesAmount = minutes % 60
    return `${String(hoursAmount).padStart(2, '0')}:${String(minutesAmount).padStart(2, '0')}`
}