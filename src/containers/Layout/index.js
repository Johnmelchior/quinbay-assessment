/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import ProductList from "../../components/ProductList";
import { call } from "../../utils/utils";

const Layout = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(null);
	const loadMoreElement = useRef(null);
	const [apiCall, setApiCall] = useState(false);
	const options = { threshold: 1 };
	const [isLoading, setIsLoading] = useState(false); 

	/**
	 *  Method to handle searchTerm and set state
	 * @param value 
	 */
	const onHandleSearch = (value) => {
		setPage(null);
		setSearchTerm(value);
	}

	/**
	 * This is the callback method for intersectionObserver, used to load more content when we reach the bottom of the page
	 * @param entries 
	 */
	const onLoadMore = (entries) => {
		const [entry] = entries;
		if (entry.isIntersecting && !apiCall) {
			setPage(page + 1);
			setApiCall(true);
		}
	}

	/**
	 * This effect will watch any changes in searchTerm, if searchTerm is updated it will reset the products state and page to 1
	 */
	useEffect(() => {
		setProducts([]);
		setPage(searchTerm ? 0 : null);
	}, [searchTerm]);

	/**
	 * This useEffect is used to detect the intersection and load more content
	 */
	useEffect(() => {
		const observer = new IntersectionObserver(onLoadMore, options);
		if (loadMoreElement.current) observer.observe(loadMoreElement.current);
		return () => {
			if (loadMoreElement.current) observer.unobserve(loadMoreElement.current);
		}
	}, [loadMoreElement, options]);

	/**
	 * This useEffect is used to call api and set products data. This will call when there is change in state called page
	 */
	useEffect(() => {
		if (page >= 0 && searchTerm) {
			setIsLoading(true);
			call({
				page,
				itemPerPage: 24,
				searchTerm
			}).then((res) => {
				if (res.data.data.products) {
					setProducts([...products, ...res.data.data.products]);
				}
				setApiCall(false);
				setIsLoading(false);
			}).catch(err => {
				console.log("Error", err);
			});
		}
	}, [page]);

	return (
		<Fragment>
			<Header onHandleSearch={onHandleSearch} />
			{isLoading ? <Loading /> : ''}
			{products.length > 0 ?
				<ProductList products={products} loadMoreRef={loadMoreElement}/>
				:
				<Container>
					<Row>
						<Col>
							<div className="content">No Product Available</div>
						</Col>
					</Row>
				</Container>
			}
		</Fragment>
	)
}

export default Layout;