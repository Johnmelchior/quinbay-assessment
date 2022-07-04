import Search from "../Search";

const Header = ({onHandleSearch}) => {
  return(
		<div className="header p-3">
			<Search onHandleSearch={onHandleSearch}/>
		</div>
	)
}

export default Header;