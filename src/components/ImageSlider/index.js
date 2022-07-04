import './ImageSlider.scss';
import { useState, useEffect } from 'react';

const ImageSlider = ({ slides }) => {
	const [currSlide, setSlide] = useState(1);

	/**
	 * Method used to set the current slide
	 * @param {*} slide 
	 */
	const currentSlide = (slide) => {
		setSlide(slide);
	};

	/**
	 * Method is used to handle next slide
	 */
	const nextSlide = () => {
		let cnt = 0;
		currSlide === slides.length ? (cnt += 1) : (cnt += currSlide + 1);
		currentSlide(cnt);
	};

	/**
	 * This useEffect is used to change the slide in certain interval
	 */
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 3000);
		return () => clearInterval(interval);
	})

	return (
		<div className="slider">
			{
				slides.map((slide, index) => {
					return (
						<div className={['slider__image',
							currSlide === index + 1 ? 'active' : 'hide'
						].join(" ")} key={index}>
							<img src={slide} alt="img" />
						</div>
					);
				})
			}

			{
				slides.length > 1 ?
					<div className="indicators">
						{
							slides.map((slide, index) => {
								return (
									<div className={['indicators__dots',
										currSlide === index + 1 ? 'indicators__dots--active' : ' '
									].join(" ")} key={index}></div>
								);
							})
						}
					</div>
					: ''
			}

		</div>
	)
}

export default ImageSlider;