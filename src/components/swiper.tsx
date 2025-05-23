import { ContentNavigationButtons } from './ui/swiper-buttons'

interface SwiperDateProps {
	currentIndex: number
	prevContent: () => void
	nextContent: () => void
}

export const SwiperDate: React.FC<SwiperDateProps> = ({
	currentIndex,
	prevContent,
	nextContent,
}) => {
	return (
		<div className='swiper-date-block'>
			<ContentNavigationButtons
				arrayLength={6}
				currentIndex={currentIndex}
				prevContent={prevContent}
				nextContent={nextContent}
			/>

			{/* Нижняя часть */}
			<div className='swiper-content'>
				<div className='swiper-content-card'>
					<h1>2015 </h1>
					<p>
						13 сентября — частное солнечное затмение, видимое в Южной Африке и
						части Антарктиды
					</p>
				</div>
				<div className='swiper-content-card'>
					<h1>2015 </h1>
					<p>
						13 сентября — частное солнечное затмение, видимое в Южной Африке и
						части Антарктиды
					</p>
				</div>
				<div className='swiper-content-card'>
					<h1>2015 </h1>
					<p>
						13 сентября — частное солнечное затмение, видимое в Южной Африке и
						части Антарктиды
					</p>
				</div>
			</div>
		</div>
	)
}
