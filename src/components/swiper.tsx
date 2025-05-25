import type { DataContentEvents } from '../constant/data'
import { SwiperText } from './swiper-text'
import { BottomPagination } from './ui/bottom-pagintaion'
import { ContentNavigationButtons } from './ui/content-swipe-buttons'

interface SwiperDateProps {
	currentIndex: number
	prevContent: () => void
	nextContent: () => void
	dateEvents: DataContentEvents[]
	category: string
	total: number
}

export const SwiperDate: React.FC<SwiperDateProps> = ({
	currentIndex,
	dateEvents,
	category,
	prevContent,
	nextContent,
	total,
}) => {
	return (
		<div className='swiper-date-block'>
			<ContentNavigationButtons
				arrayLength={total}
				currentIndex={currentIndex}
				prevContent={prevContent}
				nextContent={nextContent}
			/>

			{/* Нижняя часть */}
			<SwiperText dateEvents={dateEvents} />
			<div className='horizontal-line-on-swiper' key={category}>
				<p key={category}>{category}</p>
			</div>
			<BottomPagination total={total} currentIndex={currentIndex} />
		</div>
	)
}
