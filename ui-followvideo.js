function FollowVideo(options) {
    this.$el = $(options.el);
    this.statePlayer = null;
    this.isStatic = true;
    this.isMove = false;
    this.halfVideo = 0;

    this.refresh();
    this.init();
}

FollowVideo.prototype.init = function () {
    var that = this,
        $window = $(window);
    $window.on('scroll', function (event) {
        if (that.statePlayer) {
            if ($window.scrollTop() >= that.halfVideo || ($window.scrollTop() + $window.height()) <= that.halfVideo) {
                if (!that.isMove) {
                   that.activeFollow();
                }
            } else {
                if (!that.isStatic) {
                   that.inactiveFollow();
                }
            }
        } else {
            if (!that.isStatic) {
                that.inactiveFollow();
            }
        }
    }).on('resize', that.refresh.bind(this));
}

FollowVideo.prototype.activeFollow = function () {
    this.isMove = true;
    this.isStatic = false;
    this.$el.removeClass('sticky-inactive').addClass('sticky-active');
}

FollowVideo.prototype.inactiveFollow = function () {
    this.$el.addClass('sticky-inactive').removeClass('sticky-active');
    this.isStatic = true;
    this.isMove = false;
}

FollowVideo.prototype.refresh = function () {
    this.halfVideo = this.$el.offset().top + (this.$el.height() / 2)
}

FollowVideo.prototype.setState = function (state) {
    this.statePlayer = state;
}