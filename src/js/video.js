import document from 'global/document';

import MediaLoader from './tech/loader.js';
import Html5 from './tech/html5.js';
import Flash from './tech/flash.js';
import PosterImage from './poster-image.js';
import TextTrackDisplay from './tracks/text-track-display.js';
import LoadingSpinner from './loading-spinner.js';
import BigPlayButton from './big-play-button.js';
import ControlBar from './control-bar/control-bar.js';
import ErrorDisplay from './error-display.js';

import videojs from './core';
import * as setup from './setup';
import Component from './component';
import * as Lib from './lib';
import * as Util from './util.js';
import Player from './player';
import extendsFn from './extends.js';
import plugin from './plugins.js';
import options from './options.js';

if (typeof HTMLVideoElement === 'undefined') {
  document.createElement('video');
  document.createElement('audio');
  document.createElement('track');
}

// Run Auto-load players
// You have to wait at least once in case this script is loaded after your video in the DOM (weird behavior only with minified version)
setup.autoSetupTimeout(1, videojs);

videojs.getComponent = Component.getComponent;
videojs.registerComponent = Component.registerComponent;

// APIs that will be removed with 5.0, but need them to get tests passing
// in ES6 transition
videojs.TOUCH_ENABLED = Lib.TOUCH_ENABLED;
videojs.util = Util;

// Probably want to keep this one for 5.0?
videojs.players = Player.players;

videojs.extends = extendsFn;

videojs.getGlobalOptions = () => options;
videojs.setGlobalOptions = function(newOptions) {
  Lib.util.mergeOptions(options, newOptions);
};

videojs.plugin = plugin;

// REMOVING: We probably should not include this in 5.0 thought it would make it
// more backwards compatible
// // Expose but deprecate the window[componentName] method for accessing components
// Lib.obj.each(Component.components, function(name, component){
//   // A deprecation warning as the constuctor
//   module.exports[name] = function(player, options, ready){
//     Lib.log.warn('Using videojs.'+name+' to access the '+name+' component has been deprecated. Please use videojs.getComponent("componentName")');
//
//     return new Component(player, options, ready);
//   };
//
//   // Allow the prototype and class methods to be accessible still this way
//   // Though anything that attempts to override class methods will no longer work
//   Lib.obj.merge(module.exports[name], component);
// });

export default videojs;
