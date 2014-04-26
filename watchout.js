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

  //initialise the game space / canvas
  var gameBoard = d3.select('.gameboard')
                    .append('svg')
                    .attr('width', gameOptions.width)
                    .attr('height', gameOptions.height)
                    .style('border', '0px solid black');
  //initialise dragging functionality
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

  // initialise a counter for the high score
  var scoreboard = d3.select('.scoreboard').append('svg')
                    .attr('width', '100')
                    .attr('height', '120');

  var currentScore = d3.svg.arc()
                      .innerRadius(40)
                      .outerRadius(50)
                      .startAngle(1)
                      .endAngle(Math.PI * 2);

  scoreboard.append('path') // defines the initial moving transition
      .attr('d', currentScore)
      .attr('class', '.currentScore')
      .attr('transform', 'translate(50,60)')
      .style({
        fill: '#00FFFF',
        opacity: '0.85'
      });

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

  var update = function(selector) {
      enemies.transition()  // enemies.
      .duration(2000)
      .attr('x', function(d) { return setXY(gameOptions.width);})
      .attr('y', function(d) { return setXY(gameOptions.height);})
      .each('end', function(){update();});
  };


  var collisionDetection = function () {
    d3.select('.current span').text(gameScore.currentScore++); // increment score on each call of game loop
    currentScore.endAngle(Math.PI*Math.random());
  //collision detection
  // Player x, y on drag positions available in the x, y variables defined above
    var enemyArray = d3.selectAll('.enemy')[0];
    for(var enemy = 0; enemy < enemyArray.length; enemy++) {
      var enemyX = enemyArray[enemy].x.animVal.value;
      var enemyY = enemyArray[enemy].y.animVal.value;

      var diffX = enemyX - x;
      var diffY = enemyY - y;
      var r = Math.sqrt(diffX*diffX + diffY*diffY);

      if (r<20) {
        player.transition().attr('transform', function (d) { return 'translate(' + 200 + ')'; });
        if (gameOptions.high < gameScore.currentScore) {
          gameOptions.high = gameScore.currentScore;
          d3.select('.high span').text(gameOptions.high);
            //.transition.duration(2000);
          gameScore.currentScore = 0;
        }
        throttledCollisionCounterCheck();
      }
    }
    };

//this ensures we don't have repeated collisions detected when a collision is detected in several frames
//// since we iterate through the objects array often
  var throttledCollisionCounterCheck = _.throttle(function (){
      d3.select('.collisions span').text(gameOptions.collisions++);
  }, 1300);
// update the enemy positions every 2000ms
 // setInterval(function(){ update();}, 2000);

// This is the GAME LOOP.  check for a collision and incrememnt the score with time
  d3.timer(collisionDetection); // using d3 timer to sync with the transitions defined
  update(enemies);

}).call(this);
