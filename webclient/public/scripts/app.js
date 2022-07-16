app = {};
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
