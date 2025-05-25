import { formatNumber } from '../../libs/format-number'

interface ContentNavigationButtonsProps {
	arrayLength: number
	currentIndex: number
	prevContent: () => void
	nextContent: () => void
}

export const ContentNavigationButtons = ({
	arrayLength,
	currentIndex,
	prevContent,
	nextContent,
}: ContentNavigationButtonsProps) => {
	const formattedIndex = formatNumber(currentIndex)
	const formattedLength = formatNumber(arrayLength)
	return (
		<div className='content-navigation'>
			<div className='content-navigation-length'>
				<p>
					{formattedIndex} / {formattedLength}
				</p>
			</div>

			<div className='content-navigation-arrows'>
				<button
					className='content-navigation-arrows-button'
					disabled={Number(formattedIndex) === 1}
					onClick={prevContent}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='50'
						height='50'
						viewBox='0 0 50 50'
						fill='none'
					>
						<circle
							cx='25'
							cy='25'
							r='24.5'
							transform='matrix(-1 0 0 1 50 0)'
							stroke='#42567A'
						/>
						<path
							d='M27.4999 18.75L21.2499 25L27.4999 31.25'
							stroke='#42567A'
							stroke-width='2'
						/>
					</svg>
				</button>

				<button
					className='content-navigation-arrows-button'
					disabled={Number(formattedIndex) === Number(formattedLength)}
				>
					<svg
						onClick={nextContent}
						xmlns='http://www.w3.org/2000/svg'
						width='50'
						height='50'
						viewBox='0 0 50 50'
						fill='none'
					>
						<g>
							<circle cx='25' cy='25' r='24.5' stroke='#42567A' />
							<path
								d='M22.5001 18.75L28.7501 25L22.5001 31.25'
								stroke='#42567A'
								stroke-width='2'
							/>
						</g>
					</svg>
				</button>
			</div>
		</div>
	)
}
