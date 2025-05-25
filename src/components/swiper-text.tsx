import 'swiper/css'
import 'swiper/css/navigation'
import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { DataContentEvents } from '../constant/data'

interface SwiperTextProps {
	dateEvents: DataContentEvents[]
}

export const SwiperText = ({ dateEvents }: SwiperTextProps) => {
	const [slidesPerView, setSlidesPerView] = useState(3)
	const [isBeginning, setIsBeginning] = useState(true)
	const [isEnd, setIsEnd] = useState(false)
	const [activeIndex, setActiveIndex] = useState(0)

	const updateSlidesPerView = () => {
		const width = window.innerWidth
		if (width < 1080) {
			setSlidesPerView(2)
		} else if (width >= 1080 && width < 1440) {
			setSlidesPerView(3)
		} else {
			setSlidesPerView(3)
		}
	}

	useEffect(() => {
		updateSlidesPerView()
		window.addEventListener('resize', updateSlidesPerView)
		return () => window.removeEventListener('resize', updateSlidesPerView)
	}, [dateEvents])

	return (
		<>
			<div className='swiper-content'>
				<Swiper
					spaceBetween={30}
					slidesPerView={slidesPerView}
					modules={[Navigation]}
					className='swiper-content-car'
					navigation={{
						nextEl: '.swipe-next',
						prevEl: '.swipe-prev',
					}}
					onSlideChange={swiper => {
						setIsBeginning(swiper.isBeginning)
						setIsEnd(swiper.isEnd)
						setActiveIndex(swiper.activeIndex)
					}}
					onSwiper={swiper => {
						setIsBeginning(swiper.isBeginning)
						setIsEnd(swiper.isEnd)
						setActiveIndex(swiper.activeIndex)
					}}
				>
					{dateEvents.map((item, index) => {
						const isLastVisible = index === activeIndex + slidesPerView - 1
						return (
							<SwiperSlide
								key={item.history}
								className={isLastVisible ? 'dimmed-slide' : ''}
							>
								<div className='swiper-content-card'>
									<h1>{item.date}</h1>
									<p>{item.history}</p>
								</div>
							</SwiperSlide>
						)
					})}
				</Swiper>

				<div className='overlay' />

				<button className='swipe-prev' disabled={isBeginning}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='8'
						height='12'
						viewBox='0 0 8 12'
						fill='none'
					>
						<path d='M1 1L6 6L1 11' stroke='#3877EE' strokeWidth='2' />
					</svg>
				</button>

				<button className='swipe-next' disabled={isEnd}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='8'
						height='12'
						viewBox='0 0 8 12'
						fill='none'
					>
						<path d='M1 1L6 6L1 11' stroke='#3877EE' strokeWidth='2' />
					</svg>
				</button>
			</div>
		</>
	)
}
