// start slingin' some d3 here.
(function() {

  var x;
  var y;
  var gameOptions = {
    width : '800',
    height: '600',
    noEnemies: 10,
    collisions: 0,
    high: 0
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

  var negate = function(num) {
    if(num < 0) {
      return num * -1;
    } else {
      return num;
    }

  };

  setInterval(function(){ update();}, 2000);


  setInterval(function () {
    d3.select('.current span').text(gameScore.currentScore++);

  //collision detection
  // Player x, y on drag positions available in the x, y variables defined above
  var enemyArray = d3.selectAll('.enemy')[0];
  for(var enemy = 0; enemy < enemyArray.length; enemy++) {
    var enemyX = enemyArray[enemy].x.animVal.value;
    var enemyY = enemyArray[enemy].y.animVal.value;

    var diffX = enemyX - x;
    var diffY = enemyY - y;

    if ((negate(diffX)<20) && (negate(diffY)<20)) {
      if (gameOptions.high < gameScore.currentScore) {
        gameOptions.high = gameScore.currentScore;
        d3.select('.high span').text(gameOptions.high);
        gameScore.currentScore = 0;
      }
      d3.select('.collisions span').text(gameOptions.collisions++);
    }
  }

  }, 50);

}).call(this);
