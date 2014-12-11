var myList = [];

//runs once the document has loaded
document.addEventListener("DOMContentLoaded", function(ev){
 
  //check to see if the grocery list exists
  if(localStorage.getItem("groceryappList")){
    //turn the string into a numeric array
    myList = JSON.parse(localStorage.getItem("groceryappList"));
    
  }
  
//execute the show list function.
  showList();
  
//add itme button 
  document.querySelector("#btnAdd").addEventListener("click", function(ev){
    ev.preventDefault();
    var newItem = document.querySelector("#item").value;
    myList.push( newItem );
    localStorage.setItem("groceryappList", JSON.stringify(myList) );
    
    //reset the input box
    document.querySelector("#item").value = "";
    showList();
    return false;
  });
    
    document.querySelector("#btnClear").addEventListener("click", function(ev){
        if (confirm(" Are you sure you've completed everything on your list before you clear?")) {
            localStorage.clear();
        
        showList();
        }
        
        return false;
  });
  
  
  //document.myForm.addEventListener("submit", function(ev){});
});

function removeItem(ev){
  //this.firstChild.nodeValue
  //ev.currentTarget.firstChild - the textNode inside the paragraph
  //ev.currentTarget.firstChild.nodeValue - the text inside the textNode
    var txt = ev.currentTarget.previousSibling.firstChild.nodeValue;
    var output = document.querySelector(".output");
    var dRay = output.childNodes;
    for(var i=0;i<myList.length;i++){
  	if(myList[i] == txt){
      //found the match
      myList.splice(i, 1);
     output.removeChild(dRay[i]);
        
    }
  }
    
  localStorage.setItem("groceryappList", JSON.stringify(myList) );
}

function gotItem(ev){
    
    $(this).toggleClass("gotit");
  
}

function showList(){
    var output = document.querySelector(".output");
    
    
    output.innerHTML = "";
    for(var i=0;i<myList.length;i++){
        
        var listDiv = document.createElement("div");
        listDiv.className = "itemRow";
        
        var p = document.createElement("p");
        p.innerHTML = myList[i];
        var gone = document.createElement("div"); 
        gone.className = "delete";
        
        listDiv.appendChild(p);
        listDiv.appendChild(gone);

        output.appendChild(listDiv);
        
        p.addEventListener("click", gotItem);
        gone.addEventListener("click", removeItem);
    
    }
}
