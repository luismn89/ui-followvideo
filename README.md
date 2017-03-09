# ui-followvideo
Javascript class that allows a one video on the web that is in playback is displayed as thumbnail to a side of the screen only when is make scroolling to the page and the video lose the focus with respect to their original position, in order to allow its visualization while observing the other contents of the page. Through, the user can move the video window to any place inside of the website body and close the window for that the video leave of follow to the user.

For start to use the class is required one HTML structure in specific.

```HTML
<div style="height: 360px; width: 640px; display: inline-block"> //Container where is defined the size of the video
    <div class="sticky sticky-inactive"> //Container that will be used for enabled or disabled the animation (starting with the sticky-inactive class by default).
        <div class="sticky-inner"> //Container useful for displacement of the video in thumbnail mode.
            <div></div> //Container of the video
        </div>
    </div>
</div>
```
For start the performance of the class is need put the next script with JQuery Library

```Javascript
<script>
    $(document).ready(function () {
        var followVideo = new FollowVideo({
            el: $('.sticky') //Container where the class will act.
        })
    });
</script>