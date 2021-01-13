import React, { Component } from 'react'
import {setID, fillGrid, setDroppable, setDraggable} from './PuzzleFunctions';

export default class SlidingPuzzle extends Component {

  constructor() {
    super();

    this.state = {
      ul: document.querySelectorAll('li'),
      content: ["1", "2", "3", "4", "5", "6", "7", "8", ""]
    };

    //fillGrid(this.ul, this.content);
    setID(this.ul);

    // set up the droppable and dragabble contents
    setDroppable(this.ul);
    setDraggable(this.ul);
    console.log("The state dimension", this.content.length);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
 
  
  onDragStart (e) {
    console.log("dragStart");
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
  }
  
  onDragOver (e) {
    console.log("dragOver");
    e.preventDefault();
  }

  onDrop (e) {
    console.log("drop");
    e.preventDefault();
    // Get the id of the target and add the moved element to the target's DOM
    const data = e.dataTransfer.getData("text/plain");
    e.target.innerText = document.getElementById(data).innerText;
    document.getElementById(data).InnerText = "";
  }

  onDragEnd (e) {
    console.log("dragEnd");
    // Remove all the drag data
    e.dataTransfer.clearData();
  }

  render() {
    
    return (
      <div id= "puzzle">
          <div id = "container">
            <ul id = "puzzleUL">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
      </div>
    )
  }
}
