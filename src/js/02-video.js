import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const currentTime = 'videoplayer-current-time';

const restoreCurrentTime = () => {
  const сurrentTime = localStorage.getItem(currentTime);
  player.setCurrentTime(сurrentTime);
};

player.on(
  'timeupdate',
  throttle(event => {
    localStorage.setItem(currentTime, event.seconds);
  }, 1000)
);

restoreCurrentTime();
