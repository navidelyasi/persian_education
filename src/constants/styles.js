export const show1style = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  config: { duration: 1000 },
};

export const show2style = {
  from: { marginTop: 100 },
  to: { marginTop: 0 },
  config: { duration: 500 },
};

var id = null;

function myMove() {
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  clearInterval(id);
  id = setInterval(() => {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }, 10);
}
