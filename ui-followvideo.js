function FollowVideo(options) {
    this.$el = $(options.el);
    this.statePlayer = null;
    this.isStatic = true;
    this.isMove = false;
    this.halfVideo = 0;

    this.$inner = this.$el.find('.sticky-inner');
    this.$layer = $('<div>').addClass('sticky-layer').appendTo(this.$inner);
    
    var that = this;
    this.$close = $('<div>').addClass('sticky-icon sticky-close').appendTo(this.$inner).on('click', function () {
        that.setState(false);
        that.inactiveFollow();
    });
    this.$winout = $('<div>').addClass('sticky-icon sticky-out').appendTo(this.$inner).on('click', function () {
        that.setState(true);
    });

    this.refresh();
    this.init();
    this.move();
}

FollowVideo.prototype.init = function () {
    var that = this,
        $window = $(window);
    $window.on('scroll touchmove', function (event) {
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
    this.$inner.removeAttr('style');
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

FollowVideo.prototype.move = function (){
    var $body = $('body');
    var that = this;
    that.$inner.on('mousedown touchstart', function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var posX = evt.clientX,
            posY = evt.clientY,
            $this = $(this),
            posInit = $this.css(['top', 'left']),
            isVisLayer = false;
        vOffset = posY - posInit["top"].replace(/[^-\d\.]/g, '');
        hOffset = posX - posInit["left"].replace(/[^-\d\.]/g, '');
        that.$el.addClass('sticky-hold');

        $body.on("mousemove.partmove touchmove.partmove", function(evt){
            evt.preventDefault();
            if (!isVisLayer) {
                that.$layer.show();
                isVisLayer = true;
            }            
            var moveX = evt.clientX,
                moveY = evt.clientY;
            $this.css({"left": moveX - hOffset, "top": moveY - vOffset});
        });

        $body.one("mouseup mouseleave touchcancel.partmove", function(e){
            $body.off(".partmove");
            that.$layer.hide();
            isVisLayer = false;
            that.$el.removeClass('sticky-hold');
        });
    });
}