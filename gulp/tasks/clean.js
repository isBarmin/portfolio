'use strict';

module.exports = function() {
  $.gulp.task('clean', function() {
    return $.del($.config.root, {read: false});
  });
};
