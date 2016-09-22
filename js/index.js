$(function () {
  var type = 'svg';
  var two = new Two({
    type: Two.Types[type],
    fullscreen: true,
    autostart: true
  }).appendTo(document.body);

  var dimensions = 500;
  var scale = two.width > two.height ? two.height / dimensions : two.width / dimensions;
  var shapes = [];
  var index = 0;
  var length = 0;
  var easing = 0.125;

  constructor();

  length = shapes.length;

  var shape1 = getShapeById('opened-eye');
  var shape2 = getShapeById('closed-sleeping-eye');
  var mostVerticesLength = getMostVertices(shape1, shape2, 0, 0);
  var leastVerticesLength = getLeastVertices(shape1, shape2, 0, 0);

  shape1.visible = true;
  var x_1 = shape1.children[0].vertices[0].x;
  var y_1 = shape1.children[0].vertices[0].y;
  vector1 = new Two.Vector(x_1, y_1);

  var x_2 = shape2.children[0].vertices[0].x;
  var y_2 = shape2.children[0].vertices[0].y;
  vector2 = new Two.Vector(x_2, y_2);
  
  console.log(vector1);
  console.log(vector2);
  
  two.bind('update', function () {

    
  });

  function constructor() {
    $('svg').each(function (i, el) {
      var shape = two.interpret(el).center();
      shape.fill = 'black';
      shape.visible = false;
      shape.noStroke();
      shape.translation.set(two.width / 2, two.height / 2);
      shapes.push(shape);
      _.each(shape.children, function (child) {
        _.each(child.vertices, function (v) {
          v.ox = v.x;
          v.oy = v.y;
        });
      });
    });
  }

  function getShapeById(id){
    var theChosenOne = null;
    _.each(shapes, function(shape){
      if(shape.id == id){
        theChosenOne = shape;
      }
    });
    return theChosenOne;
  }

  function getMostVertices(shape1, shape2, child1, child2){
    var length1 = shape1.children[child1].vertices.length;
    var length2 = shape2.children[child2].vertices.length;
    if( length1 > length2 )
      return length1;
    return length2;
  }

  function getLeastVertices(shape1, shape2, child1, child2){
    var length1 = shape1.children[child1].vertices.length;
    var length2 = shape2.children[child2].vertices.length;
    if( length1 < length2 )
      return length1;
    return length2;
  }

});