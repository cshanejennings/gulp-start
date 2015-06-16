'use strict';

var notify = require("gulp-notify");

module.exports = function() {
  var args = Array.prototype.slice.call(arguments);
  var details = args.toString();

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: details
  }).apply(this, args);

  // Keep gulp from hanging on this task
  if( !global.isRelease ) {
  	this.emit('end');
  }
};