import { useState } from 'react'
import type { DataContent } from '../constant/data'
import { getExtraOffset } from '../libs/get-extra-off-set'
import { useWindowWidth } from '../hooks/useWidthWindow'

interface CircleCanvasProps {
	activeIndex: number
	setActiveIndex: (index: number) => void
	total: number
	data: DataContent[]
}
export const CircleCanvas = ({
	activeIndex,
	setActiveIndex,
	total,
	data,
}: CircleCanvasProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<null | number>(null)

	const windowWidth = useWindowWidth()
	const radius = windowWidth > 840 ? 265 : 180
	const labelsOfCircle = data.map(item => item.category)
	const n = total
	const extraOffset = getExtraOffset(n)
	const containerRotation = -activeIndex * (360 / n) + extraOffset

	return (
		<>
			<div
				className='circle-content'
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: `translate(-50%, -50%) rotate(${containerRotation}deg)`,
					transition: 'transform 0.7s ease',
					width: 0,
					height: 0,
				}}
			>
				{Array.from({ length: n }).map((_, k) => {
					const theta = (2 * Math.PI * k) / n
					const offsetX = radius * Math.cos(theta)
					const offsetY = radius * Math.sin(theta)
					const isActive = k + 1 === activeIndex
					const isHovered = hoveredIndex === k
					const boxSize = isActive || isHovered ? 56 : 6

					return (
						<div
							key={k}
							onMouseEnter={() => setHoveredIndex(k)}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => setActiveIndex(k + 1)}
							style={{
								position: 'absolute',
								left: `calc(50% + ${offsetX}px)`,
								top: `calc(50% + ${offsetY}px)`,
								width: `${boxSize}px`,
								height: `${boxSize}px`,
								transform: `translate(-50%, -50%)`,
								cursor: 'pointer',
								zIndex: isActive ? 10 : 1,
								transition: 'width 0.3s ease, height 0.3s ease',
							}}
						>
							<svg
								width={boxSize}
								height={boxSize}
								viewBox={isActive || isHovered ? '0 0 56 56' : '0 0 6 6'}
								fill='none'
								style={{ display: 'block', transition: 'all 0.3s ease' }}
							>
								{isActive || isHovered ? (
									<>
										<circle cx='28' cy='28' r='28' fill='#F4F5F9' />
										<circle
											cx='28'
											cy='28'
											r='27.5'
											stroke='#303E58'
											strokeOpacity='0.5'
										/>
										<g transform={`rotate(${-containerRotation}, 28, 28)`}>
											<text
												x='28'
												y='34'
												textAnchor='middle'
												fill='#42567A'
												fontSize='20'
												fontFamily='inherit'
												fontWeight='400'
											>
												{k + 1}
											</text>
										</g>
									</>
								) : (
									<circle cx='3' cy='3' r='3' fill='#42566A' />
								)}
							</svg>

							{isActive && (
								<div
									style={{
										position: 'absolute',
										left: '50%',
										top: '50%',
										transform: `translate(-50%, -50%) rotate(${-containerRotation}deg)`,
										width: 0,
										height: 0,
									}}
								>
									<div className='circle-label'>{labelsOfCircle[k]}</div>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</>
	)
}
