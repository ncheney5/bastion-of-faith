// Spot the difference: tap targets in the changed picture
(function () {
  var box = document.getElementById('spot');
  if (!box) return;
  var target = box.querySelector('.spot-target svg');
  var original = box.querySelector('.spot-pair figure svg');
  var diffs = [[186, 42], [120, 121], [155, 143], [248, 115], [86, 40]];
  var found = [];
  var count = document.getElementById('spot-count');
  var lesson = document.getElementById('spot-lesson');
  var NS = 'http://www.w3.org/2000/svg';

  function ring(svg, d) {
    var c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', d[0]); c.setAttribute('cy', d[1]); c.setAttribute('r', 15);
    c.setAttribute('class', 'found-ring spot-mark');
    svg.appendChild(c);
  }
  function mark(i) {
    if (found.indexOf(i) !== -1) return;
    found.push(i);
    ring(target, diffs[i]); ring(original, diffs[i]);
    count.textContent = 'Found ' + found.length + ' of 5';
    if (found.length === 5) lesson.hidden = false;
  }
  target.addEventListener('click', function (e) {
    var pt = target.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    var p = pt.matrixTransform(target.getScreenCTM().inverse());
    for (var i = 0; i < diffs.length; i++) {
      var dx = p.x - diffs[i][0], dy = p.y - diffs[i][1];
      if (dx * dx + dy * dy < 20 * 20) { mark(i); return; }
    }
  });
  document.getElementById('spot-reveal').addEventListener('click', function () {
    for (var i = 0; i < diffs.length; i++) mark(i);
  });
  document.getElementById('spot-reset').addEventListener('click', function () {
    found = [];
    box.querySelectorAll('.spot-mark').forEach(function (m) { m.remove(); });
    count.textContent = 'Found 0 of 5';
    lesson.hidden = true;
  });
})();
