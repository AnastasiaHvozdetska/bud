var tag = document.createElement('script');

tag.src = "./libs/iframe_api.js";
console.log(tag)
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Get video ID.
let videoId = document.querySelector('.video-bg').getAttribute('data-video');

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    videoId: videoId,
    playerVars: {
      'autoplay': 1,
      'autohide': 1,
      'controls': 0,
      'showinfo': 0,
      'rel': 0,
      'enablejsapi': 1,
      'wmode': 'transparent'
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  vidRescale();
  player.mute();
  event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.playVideo();
  } else if (event.data === 1) {
    document.querySelector('.video-bg').classList.add('active');
    document.querySelector('.header-page').classList.add('active');
  }

}


function vidRescale() {

  let w = window.innerWidth + 200,
    h = window.innerHeight + 200,
    widthVideo = document.querySelector('.video-bg').offsetWidth;

  let ww = -(widthVideo - w) / 2;

  if (w / h > 16 / 9) {
    player.setSize(w, w / 16 * 9);
    document.querySelector('.video-wrapper').style.left = '0px';

  } else {
    player.setSize(h / 9 * 16, h);
    document.querySelector('.video-bg').style.left = ww + 'px';
  }

}

    window.addEventListener('resize', vidRescale);
    window.addEventListener('load', vidRescale);