import React from 'react';


const Tiles = (props) => {
	return(
		<div className="my-list3"  onMouseEnter = {props.onMouseEnter} >
			<img src={props.img} className="image" alt =" " /><br/>
			<span> Title: {props.title}</span><br/>
		
		
		</div>
	)
}
export default Tiles;