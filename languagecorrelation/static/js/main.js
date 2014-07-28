var diameter = 700,
    format = d3.format(",d"),
    color = d3.scale.category20c();

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#chart").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

function getData(lang) {
  if(lang === undefined) {
    lang = 'ASP'
  }
  console.log(lang)
  $.getJSON('/data?lang=' + encodeURIComponent(lang), function(data) {
    console.log(data)
    root = data;
    console.log(root)
    var node = svg.selectAll(".node")
        .data(bubble.nodes(classes(root))
        .filter(function(d) { return !d.children; }))
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("title")
        .text(function(d) { return d.value + '% of ' + $("#lang-select option:selected").text() + ' programmers code in ' + d.className + ' too'; });

    node.append("circle")
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color('d.packageName' + d.value); });

    node.append("text")
        .attr("dy", ".3em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.className.substring(0, d.r / 3) + ': ' + d.value + '%'; });
  });

  function classes(root) {
    var classes = [];

    function recurse(name, node) {
      if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
      else classes.push({packageName: name, className: node.name, value: node.size});
    }

    recurse(null, root);
    return {children: classes};
  }

  d3.select(self.frameElement).style("height", diameter + "px");
}

getData();

$('#lang-select').change(function() {
  $(".bubble").empty();
  getData(String($("#lang-select option:selected").text()));
});