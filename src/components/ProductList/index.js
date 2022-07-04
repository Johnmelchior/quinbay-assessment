import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ImageSlider from "../ImageSlider";
import ProductQuickView from "../ProductQuickView";
import './ProductList.scss';

const ProductList = ({ products, loadMoreRef }) => {
	const [show, setShow] = useState(false);
	const [productDetails, setProductDetails] = useState([]);
	// const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const handleShow = ((product) => {
		setProductDetails(product);
		setShow(true);
	})

	return (
		<div className="product-list">
			<Container>
				<Row>
					{
						products && products.map((product, index) => {
							return (
								<Col key={index} sm={4} className="mb-3">
									<div className="product d-flex flex-column">
										<div className="product__image">
											<ImageSlider slides={product.images} />
										</div>
										<div className="product__content flex-fill p-3">
											<div className="product__content--title">{product.name}</div>
											<div className="product__content--price">{product.price.priceDisplay}</div>
											{
												product.price.strikeThroughPriceDisplay ?
													<div className="product__content--special-price">
														<div className="product__content--price strike">
															{product.price.strikeThroughPriceDisplay}
														</div>
														<span className="product__content--discount">{product.price.discount}%</span>
													</div>
													: ''
											}

											{
												product.location ?
													<div className="product__location">
														{
															product.badge.merchantBadge !== "None" ?
																<div className="product__location--badge"><img src={product.badge.merchantBadgeUrl} alt={product.badge.merchantBadge} /></div>
																: ''
														}
														<div className="product__location--locationDetail">{product.location}</div>
													</div>
													: ''
											}

											{
												product.review.rating ?
													<div className="product__rating">
														<div className="product__rating--star">
															<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
																<path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
															</svg>
															<span>{product.review.rating}</span>
														</div>
														<div className="product__rating--count">{`(${product.review.count})`}</div>
													</div>
													: ''
											}
										</div>
										<Button variant="primary" className="m-3 mt-0" onClick={() => {handleShow(product)}}>Add to cart</Button>
									</div>
								</Col>
							)
						})
					}
				</Row>
				<ProductQuickView show={show} onClose={handleClose} productDetails={productDetails} />
				<div ref={loadMoreRef}></div>
			</Container>
		</div>
	)
}

export default ProductList;