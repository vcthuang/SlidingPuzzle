import React, { Component } from 'react'

export default class SlidingPuzzle extends Component {
  render() {
    return (
      <div id= "puzzle">
          <div id = "container">
            <ul id = "puzzleUL">
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li class="empty"></li>
            </ul>
          </div>
      </div>
    )
  }
}
