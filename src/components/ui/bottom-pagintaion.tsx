interface BottomPaginationProps {
	total: number
	currentIndex: number
}

export const BottomPagination = ({
	total,
	currentIndex,
}: BottomPaginationProps) => {
	const dotSpacing = 16
	const radius = 3

	return (
		<div className='bottom-pagination-block'>
			<svg
				className='bottom-pagination-list'
				width='86'
				height='6'
				viewBox='0 0 86 6'
				fill='none'
			>
				{Array.from({ length: total }).map((_, index) => (
					<circle
						key={index}
						cx={index * dotSpacing + radius}
						cy={radius}
						r={radius}
						fill='#42567A'
						opacity={index === currentIndex ? '1' : '0.4'}
					/>
				))}
			</svg>
		</div>
	)
}
