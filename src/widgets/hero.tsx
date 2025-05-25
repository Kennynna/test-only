import { useEffect, useState } from 'react'
import { dataContent } from '../constant/data'
import { MainDates } from '../components/main-dates'
import { SwiperDate } from '../components/swiper'
import { CircleCanvas } from '../components/cirlce-canvas'

export const Hero = () => {
	const [activeIndex, setActiveIndex] = useState<number>(1)
	const nextContent = () => setActiveIndex(i => Math.min(i + 1, total))
	const prevContent = () => setActiveIndex(i => Math.max(i - 1, 1))
	const total = dataContent.length
	useEffect(() => {
		const setVh = () => {
			const vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}

		setVh()

		window.addEventListener('resize', setVh)
		return () => window.removeEventListener('resize', setVh)
	}, [])
	
	return (
		<section
			className='date-section'
			style={{ position: 'relative', width: '100%' }}
		>
			<div className='lines vertical-line' />
			<div className='lines horizontal-line' />
			<div className='circle' />

			<div className='main-text-block'>
				<p className='main-text'>
					<p>
						Исторические <br /> Даты
					</p>
				</p>
			</div>

			<CircleCanvas
				data={dataContent}
				total={total}
				activeIndex={activeIndex}
				setActiveIndex={setActiveIndex}
			/>
			<MainDates dates={dataContent} activeIndex={activeIndex} />
			<SwiperDate
				total={total}
				category={dataContent[activeIndex - 1].category}
				currentIndex={activeIndex}
				prevContent={prevContent}
				nextContent={nextContent}
				dateEvents={dataContent[activeIndex - 1].events}
			/>
		</section>
	)
}
