app = {};

app.loading = {
  init: function(){
    let lay = document.createElement("div");
        lay.setAttribute("class", "app-loading");
        document.body.appendChild( lay );
        
    let icon = document.createElement("i");
        icon.setAttribute("class", "app-loading--icon fa fa-spinner fa-spin fa-3x");
        lay.appendChild( icon );
    
    let txt = document.createElement("p");
        txt.setAttribute("class", "app-loading--txt");
        lay.appendChild( txt );
        
    this.layout = lay;
    this.content = txt;
  },
  
  show: function(s = "") {
    app.loading.last_screen = app.screen; //XChat only!
    app.screen = {close:function(){}}; //XChat only!
    
    let lay = this.layout;
    this.content.innerText = s;
    lay.style.filter = "opacity(0)";
    lay.style.display = "flex";
    dom.animate(function(porc){
      lay.style.filter = "opacity(" + porc + ")";
      lay.style.transform = "scale(" + (1.5 - 0.5 * porc ) + ")";
    }, 500).start();
  },
  
  hide: function(){
    let lay = this.layout;
    dom.animate(function(porc){
      lay.style.filter = "opacity(" + (1 - porc) + ")";
      lay.style.transform = "scale(" + (1.5 - 0.5 * (1 - porc) ) + ")";
    }, 200)
      .finish( function(){ 
        lay.style.display = "none";
        app.screen = app.loading.last_screen; //XChat only!
      } )
      .start();
  }
};


// enable/disable user interaction //
app.wall = {
  init: function(){
    let lay = document.createElement("div");
    lay.setAttribute("style",
      "zIndex: 9999 !important;" +
      "position: fixed;" +
      "display: none;" +
      "top: 0; left: 0;" +
      "width: 100vw;" +
      "height: 100vh;" +
      "background: rgba(0,0,0,0);"
    );
    document.body.appendChild(lay);
    this.layout = lay;
  },
  show: function(){ this.layout.style.display = "block" },
  hide: function(){ this.layout.style.display = "none" }
};


// database //
app.save_data = function(place, data) {
  localStorage.setItem(place, JSON.stringify({d: data}));
  return data;
};
app.load_data = function (place, def) {
  let data = localStorage.getItem(place);
  if(data) return JSON.parse(data).d;
  else return def;
};
app.clear_data = function () {localStorage.clear()};
app.remove_data = function (place) {localStorage.removeItem(place)};
