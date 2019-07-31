const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let fail = 0;

function round() {
  $(".game-field").removeClass('target');// FIXME: надо бы убрать "target" прежде чем искать новый

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером

    if (hits == 1) {
    firstHitTime = getTimestamp();
  }// FIXME: тут надо определять при первом клике firstHitTime


  $(".target").text(`${hits+1}`);

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $(".grid-wrapper").hide();// FIXME: спрятать игровое поле сначала

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);


  $("#win-message").removeClass("d-none");
  $("#fail-red").text(fail);
}

function handleClick(event) {
  $(".target").text("");// FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
    $(".game-field").removeClass('miss');
    }
  else {
    $(event.target).addClass('miss');
    fail = fail + 1;
  }
  round();

  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
