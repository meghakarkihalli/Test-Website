import React, { Component } from 'react';
import Tiles from './components/tiles.js';
import './App.css';

class App extends Component {
  constructor()
    {
      super();
      this.state = {
        MyListItem:[],
        Recommendation:[],
        mouseAction: false,
        mouseAction1: false
      };
    }

    mouseIn = () => this.setState({mouseAction:true})
    mouseOut = () => this.setState({mouseAction:false})
    mouseIn1 = () => this.setState({mouseAction1:true})
    mouseOut1 = () => this.setState({mouseAction1:false})

    handleAdd = (index, event) => {
      const temp1 = Object.assign({}, this.state.MyListItem[0]);
      let flag1 = true;
      this.state.MyListItem.map((item)=> {
        if(item.id === this.state.Recommendation[index].id)
            flag1 = false;
      })
      if(flag1)
      {
        temp1.id = this.state.Recommendation[index].id;
        temp1.title = this.state.Recommendation[index].title;
        temp1.img = this.state.Recommendation[index].img;
        this.state.MyListItem.push(temp1);
      }     
      const temp = Object.assign([], this.state.Recommendation);
      temp.splice(index,1);
      this.setState({Recommendation:temp})
      this.forceUpdate();
    }

    handleRemove = (index,event) => {
      let flag2 = true;
      const temp = Object.assign([], this.state.MyListItem);
      temp.splice(index,1);
      const temp2 = Object.assign({}, this.state.Recommendation[0]);
      this.state.Recommendation.map((item)=>{
          if(item.id === this.state.MyListItem[index].id)
            flag2 = false;
      })
      if(flag2)
      {
        temp2.id = this.state.MyListItem[index].id;
        temp2.title = this.state.MyListItem[index].title;
        temp2.img = this.state.MyListItem[index].img;
        this.state.Recommendation.push(temp2);
      }
      this.setState({MyListItem:temp})  
    }

    componentWillMount()
    {  
      fetch("/list.json")
      .then(response => response.json())
      .then(json => { 
        this.setState({MyListItem:json.mylist})
        this.setState({Recommendation:json.recommendations})
      })   
    }	
  render() {
    return (
		<div className="App">
			<div  className="my-list1">
				<h2>My List</h2> 
      	<div>
				{
					this.state.MyListItem.map((item,index) => {
					return(
            <div className = "my-list">
            <Tiles
						  title = {item.title}
						  key = {item.id}
              img={item.img}
              onMouseEnter={this.mouseIn} 
              onMouseLeave={this.mouseOut}/>
             <div className="btn" 
              onClick={this.handleRemove.bind(this, index)}>{this.state.mouseAction ?<button>Remove</button> : null}</div>
            </div>
           )
					})
        }
				</div>
			</div>

			<div  className="my-list1">
				<br/><br/>
				<h2>Recommendations</h2>
				<div>
				{ 
					this.state.Recommendation.map((item,index) => {
					return(
            <div className="my-list">
            <Tiles
						  title = {item.title}
						  key = {item.id}
						  img={item.img}
              onMouseEnter={this.mouseIn1} 
              onMouseLeave={this.mouseOut1}/>
            <div className="btn" 
              onClick={this.handleAdd.bind(this, index)}>{this.state.mouseAction1 ?<button>Add</button> : null}</div>
           </div>
          )
				})
				}
				</div>
			</div>

			<div className="updated-mylist">
				<br/><br/>
				<h2>My List</h2>
				{this.state.MyListItem.map((item) => <ul>{item.title}</ul>)}
			</div>
		</div>
    );
  }
}

export default App;
