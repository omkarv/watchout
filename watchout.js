// start slingin' some d3 here.
(function() {
  var gameOptions = {
    width : '600',
    height: '600',
    noEnemies: 10

  };

  var gameBoard = d3.select('.gameboard')
                    .append('svg')
                    .attr('width', gameOptions.width)
                    .attr('height', gameOptions.height)
                    .style('border', '5px solid black');

  var player = gameBoard.selectAll('.player').data([1])
                 .enter().append('circle')
                  .attr('class', 'player')
                  .attr('cx', 100)
                  .attr('cy', 100)
                  .attr('r', 50)
                  .style('fill', 'steelblue')
                .transition()
                  .duration(2000)
                  .style('fill', 'orange');

  var enemyArr = function (arr) {
    var result = [];
    for (var i = 0 ; i < arr; i++) {
      result.push(i);
    }
    return result;
  };

  var enemies = gameBoard.selectAll('enemy')
                .data(enemyArr(gameOptions.noEnemies));
  enemies.enter().append('circle')
    .attr('class', 'enemy')
    .attr('cx', function(d) { return d;})
    .attr('cy', function(d) { return d;})
    .attr('r', 20)
    .style('fill', 'red');


  // set max cx & cy based on gameBoard width & height
  var setXY = function (xy) {
    return Math.random()*xy;
  };


  var update = function() {
    enemies.transition()
      .duration(1000)
      .attr('cx', function(d) { return setXY(gameOptions.width);})
      .attr('cy', function(d) { return setXY(gameOptions.height);});
  };

  setInterval(function(){ update();}, 2000);


}).call(this);
