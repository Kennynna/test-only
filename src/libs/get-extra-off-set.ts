export const getExtraOffset = (arrayLength: number): number => {
	switch (arrayLength) {
		case 2:
			return 110
		case 3:
			return 55
		case 4:
			return 20
		case 5:
			return 25
		default:
			return 0
	}
}
