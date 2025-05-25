import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import type { DataContent } from '../constant/data'

interface CenterDatesProps {
	activeIndex: number 
	dates: DataContent[] 
}

export const MainDates = ({ activeIndex, dates }: CenterDatesProps) => {

	const leftRef = useRef<HTMLParagraphElement>(null)
	const rightRef = useRef<HTMLParagraphElement>(null)
	const prevIndexRef = useRef(activeIndex - 1)

	useEffect(() => {
		const fromIdx = prevIndexRef.current
		const toIdx = activeIndex - 1

		const fromStart = parseInt(dates[fromIdx].start_date, 10)
		const fromEnd = parseInt(dates[fromIdx].end_date, 10)
		const toStart = parseInt(dates[toIdx].start_date, 10)
		const toEnd = parseInt(dates[toIdx].end_date, 10)

		const objStart = { val: fromStart }
		const objEnd = { val: fromEnd }

		// Анимация левой цифры
		gsap.to(objStart, {
			duration: 0.7,
			val: toStart,
			ease: 'power2.out',
			onUpdate: () => {
				if (leftRef.current) {
					leftRef.current.innerText = Math.round(objStart.val).toString()
				}
			},
		})

		// Анимация правой цифры
		gsap.to(objEnd, {
			duration: 0.7,
			val: toEnd,
			ease: 'power2.out',
			onUpdate: () => {
				if (rightRef.current) {
					rightRef.current.innerText = Math.round(objEnd.val).toString()
				}
			},
		})

		prevIndexRef.current = toIdx
	}, [activeIndex, dates])

	const arrayIndex = activeIndex - 1

	return (
		<div className='center-dates-block'>
			<p ref={leftRef} className='center-dates-text left-numbers'>
				{dates[arrayIndex].start_date}
			</p>
			<p ref={rightRef} className='center-dates-text right-numbers'>
				{dates[arrayIndex].end_date}
			</p>
		</div>
	)
}
