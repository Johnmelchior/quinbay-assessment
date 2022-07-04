import { Button, Modal } from "react-bootstrap"
import ImageSlider from "../ImageSlider";
import './ProductQuickView.scss';

const ProductQuickView = ({show, onClose, productDetails}) => {
	return (
		<Modal show={show} onHide={onClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>{productDetails.name}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="productImage">
					<ImageSlider slides={productDetails.images} />
				</div>
				<div className="price">
					<span>{productDetails?.price?.priceDisplay}</span>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default ProductQuickView;