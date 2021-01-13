export const setDroppable = (items) => {
  items.forEach( (item, i) => {
      if(!item.innerText) {
          item.setAttribute("ondrop", "drop_handler(event);");
          item.setAttribute("ondragover", "dragover_handler(event);");
          item.setAttribute("class", "empty");
      }
      return;
  })
}

export const setDraggable = (items) => {
    items.forEach(item => {
            item.setAttribute("draggable", "true");
            item.setAttribute("ondragstart", "dragstart_handler(event)");
            item.setAttribute("ondragend", "dragend_handler(event)");
    })
};

// this functions sets an unique id for each list time, in the form from li0 to li8
export const setID = (items) => {
  for (let i = 0; i < items.length; i++) {
    items[i].setAttribute("id", `li${i}`)
  }
};

export const fillGrid = (items, letters) => {
  let shuffled = shuffle(letters);
  // shuffle the letters array until there is a combination that is solvable
  while(!isSolvable(shuffled)) {
      shuffled = shuffle(letters);
  }

  items.forEach((item, i) => {
      item.innerText = shuffled[i];
  })
};

const shuffle = arr => {
  const copy = [...arr];

  // loop over the array
  for (let i = 0; i < copy.length; i++) {
    let j = parseInt(Math.random()*copy.length);
    // swap elment at i & j
    let temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
};

const isSolvable = (arr) => {
  let number_of_inv = 0;
  // get the number of inversions
  for(let i =0; i<arr.length; i++){
      // i picks the first element
      for(let j = i+1; j < arr.length; j++) {
          // check that an element exist at index i and j, then check that element at i > at j
          if((arr[i] && arr[j]) && arr[i] > arr[j]) number_of_inv++;
      }
  }
  // if the number of inversions is even
  // the puzzle is solvable
  return (number_of_inv % 2 == 0);
};