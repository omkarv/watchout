// start slingin' some d3 here.
(function() {
  var gameOptions = {
    width : '800',
    height: '600',
    noEnemies: 30
  };

  var gameScore = {
    currentScore: 0
  };


  var gameBoard = d3.select('.gameboard')
                    .append('svg')
                    .attr('width', gameOptions.width)
                    .attr('height', gameOptions.height)
                    .style('border', '0px solid black');

  var drag = d3.behavior.drag()
                .on('drag', function(d){
                  x = d3.event.x;
                  y = d3.event.y;
                d3.select(this)
                  .attr("transform", "translate(" + x + ',' + y + ")");
                });
  var player = gameBoard.selectAll('.player').data([[gameOptions.width/2, gameOptions.height/2]])
                    .enter().append('image')
                    .attr('class', 'player')
                    .attr('xlink:href', 'greenCool.png')
                    .attr('width', '50')
                    .attr('height', '25')
                    .attr('transform', function (d) { return 'translate(' + d + ')'; })
                    .call(drag);
                //  .enter().append('circle')
                //   .attr('class', 'player')
                //   .attr('transform', function (d) { return 'translate(' + d + ')'; })
                //   .attr('r', 20)
                //   .style('fill', 'steelblue')
                //   .call(drag)
                // .transition()
                //   .duration(2000)
                //   .style('fill', 'orange');

  var enemyArr = function (arr) {
    var result = [];
    for (var i = 0 ; i < arr; i++) {
      result.push(i);
    }
    return result;
  };

  var setXY = function (xy) {
    return Math.random()*xy;
  };

  var enemies = gameBoard.selectAll('enemy')
                .data(enemyArr(gameOptions.noEnemies));
  enemies.enter().append('image')
  .attr('class', 'enemy')
  .attr('xlink:href', 'asteroid.png')
  .attr('width', '20')
  .attr('height', '20')
  .attr('x', setXY(gameOptions.width))
  .attr('y', setXY(gameOptions.height));

  var update = function(data) {
    enemies.transition()
      .duration(2000)
      .attr('x', function(d) { return setXY(gameOptions.width);})
      .attr('y', function(d) { return setXY(gameOptions.height);});
  };

  setInterval(function(){ update();}, 2000);


  setInterval(function () {
    d3.select('.current span').text(gameScore.currentScore++);
  }, 50);

}).call(this);
