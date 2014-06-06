(function(root, undefined) {

  "use strict";
  
  var document = root.document;

/* lazyimage main */

// Base function.
var lazyimage = function() {
  
  this.elements = document.getElementsByClassName("img");
  this.elementsOffset = this.getElementsOffset();
  this.bindScroll();
  checkScroll.apply(this);
  return true;
  
};

lazyimage.prototype.getElementsOffset = function(){
  
  var elements = this.elements,
      offsets = [],
      e;
  
  for (e = 0;e < elements.length; e++) {
    var el = elements[e];
    var obj = el.getBoundingClientRect();
    obj.render = false;
    offsets.push(obj);
    
  }
  
  return offsets;
};

lazyimage.prototype.bindScroll = function(){
  var self = this;
  // Bind scroll
  root.addEventListener("scroll", function(){checkScroll.apply(self);});
  
};

var checkScroll = function(){
  
  var bottomOffset = (window.innerHeight || document.documentElement.clientHeight) + window.scrollY,
    elements = this.elementsOffset,
    e;
  
  for (e = 0;e < elements.length; e++) {
    
    var offsets = elements[e];
    
    if(offsets.top < bottomOffset && !offsets.render){
      offsets.render = true;
      render(this.elements[e]);
    }
    
  }
  
  
};

var render = function(el){

  var img = el.getAttribute("data-src");
  if(el.tagName === "IMG"){
    el.onload = function(){el.className += " load";};
    el.setAttribute("src", img);
  }
  else {
    el.style.backgroundImage = ["url('",img,"')"].join("");
    el.className += " load";
  }
  
  return true;

};


// Version.
lazyimage.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.lazyimage = lazyimage;



}(this));
