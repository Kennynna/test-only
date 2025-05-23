export const formatNumber = (number: number): string => {
	return number < 10 ? number.toString().padStart(2, '0') : number.toString()
}
