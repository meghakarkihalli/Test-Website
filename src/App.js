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
        mouseAction: [],
        mouseAction1: []
      };
    }

    mouseIn = (index) => {
      let temp = this.state.mouseAction;
      temp[index] = true;
      this.setState({mouseAction:temp})
      console.log(this.state.mouseAction)
    }
    mouseOut = (index) =>  {
      let temp = this.state.mouseAction;
      temp[index] = false;
      this.setState({mouseAction:temp})
      console.log(this.state.mouseAction)
    }
    mouseIn1 = (index) => {
      let temp = this.state.mouseAction1;
      temp[index] = true;
      this.setState({mouseAction1:temp})
      console.log(this.state.mouseAction1)
    }
    mouseOut1 = (index) => {
      let temp = this.state.mouseAction1;
      temp[index] = false;
      this.setState({mouseAction1:temp})
      console.log(this.state.mouseAction1)
    }
    handleAdd = (index, event) => {
      const temp1 = Object.assign({}, this.state.MyListItem[0]);
      let flag1 = true;
      this.state.MyListItem.map((item)=> {
        if(item.id === this.state.Recommendation[index].id)
            flag1 = false;
      })
      if(flag1 )
      {
        temp1.id = this.state.Recommendation[index].id;
        temp1.title = this.state.Recommendation[index].title;
        temp1.img = this.state.Recommendation[index].img;
        this.state.MyListItem.push(temp1);
        this.state.mouseAction.push(false)
      }     
      const temp = Object.assign([], this.state.Recommendation);
      temp.splice(index,1);
      const mtemp = Object.assign([], this.state.mouseAction1);
      mtemp.splice(index,1)
      this.setState({Recommendation:temp,
        mouseAction1:mtemp
      })
      this.forceUpdate();
    }

    handleRemove = (index,event) => {
      let flag2 = true;
      const temp = Object.assign([], this.state.MyListItem);
      temp.splice(index,1);
      const mtemp = Object.assign([], this.state.mouseAction);
      mtemp.splice(index,1)
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
        this.state.mouseAction1.push(false)
      }
      this.setState({MyListItem:temp,
        mouseAction:mtemp
      })  
    }

    componentWillMount()
    {  
      var count = 0;
      fetch("/list.json")
      .then(response => response.json())
      .then(json => {
        this.setState({MyListItem:json.mylist})
        this.setState({Recommendation:json.recommendations})
        json.mylist.map(()=>{
          this.state.mouseAction.push(false)

        })
        json.recommendations.map(()=>{
          this.state.mouseAction1.push(false)
          
        })
      })
    }	
  render() {
    return (
		<div className="App">
			<div  className="my-list1">
				<h2>My List</h2> 
      	<div >
				{
					this.state.MyListItem.map((item,index) => {
					return(
            <div className = "my-list"  
            onMouseLeave={this.mouseOut.bind(this,index)}>
            <Tiles
						  title = {item.title}
						  key = {item.id}
              img={item.img}
              onMouseEnter={this.mouseIn.bind(this,index)}
             />
             <div className="btn" 
              onClick={this.handleRemove.bind(this, index)}>{this.state.mouseAction[index] ?<button>Remove</button> : null}</div>
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
            <div className="my-list"
            onMouseLeave={this.mouseOut1.bind(this,index)}>
            <Tiles
						  title = {item.title}
						  key = {item.id}
						  img={item.img}
              onMouseEnter={this.mouseIn1.bind(this, index)}
              />
            <div className="btn" 
              onClick={this.handleAdd.bind(this, index)}>{this.state.mouseAction1[index] ?<button>Add</button> : null}</div>
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
