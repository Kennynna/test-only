import { useState } from 'react'
import { CenterDates } from '../components/center-dates'
import { MainText } from '../components/main-text'
import { SwiperDate } from '../components/swiper'

function App() {
	const [hoveredIndex, setHoveredIndex] = useState<null | number>(null)
	const [activeIndex, setActiveIndex] = useState <number>(1)
	function nextContent() {
		setActiveIndex(prevIndex => prevIndex + 1)
	}
	function prevContent() {
		setActiveIndex(prevIndex => prevIndex - 1)
	}

	const n = 6
	const radius = 265

	const labels = [
		'Математика',
		'Физика',
		'Химия',
		'История',
		'География',
		'Наука',
	]

	// угол поворота всего круга
	const containerRotation = -activeIndex * (360 / n) + 290

	return (
		<section
			className='date-section'
			style={{ position: 'relative', width: '100%' }}
		>
			<div className='lines vertical-line' />
			<div className='lines horizontal-line' />
			<div className='circle' />
			<MainText />
			<CenterDates />
			<SwiperDate  currentIndex={activeIndex} prevContent={prevContent} nextContent={nextContent} />
			{/* Контейнер точек */}
			<div
				style={{
					position: 'absolute',
					left: '50%',
					top: '50%',
					transform: `translate(-50%, -50%) rotate(${containerRotation}deg)`,
					transition: 'transform 0.5s ease',
					width: 0,
					height: 0,
					border: '1px solid red',
				}}
			>
				{Array.from({ length: n }).map((_, k) => {
					const theta = (2 * Math.PI * k) / n
					const offsetX = radius * Math.cos(theta)
					const offsetY = radius * Math.sin(theta)

					const isActive = k === activeIndex
					const isHovered = hoveredIndex === k
					// размер “бокса”
					const boxSize = isActive || isHovered ? 56 : 6

					return (
						<div
							key={k}
							onMouseEnter={() => setHoveredIndex(k)}
							onMouseLeave={() => setHoveredIndex(null)}
							onClick={() => setActiveIndex(k)}
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

							{/* Метка */}
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
									<div
										style={{
											position: 'absolute',
											left: '40px', // Смещаем вправо от центра на 20px, что в экранных координатах будет влево
											top: '0',
											transform: 'translateY(-50%)',
											color: '#42567A',
											fontSize: '20px',
											fontWeight: 600,
											lineHeight: '30px',
											whiteSpace: 'nowrap',
											textAlign: 'right', // Выравниваем текст по правому краю
										}}
									>
										{labels[k]}
									</div>
								</div>
							)}
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default App
