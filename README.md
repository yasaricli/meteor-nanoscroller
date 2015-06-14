# nanoScroller.js meteor package.
is a jQuery plugin that offers a simple way of implementing Mac OS X Lion-styled scrollbars for your website.
It uses minimal HTML markup being `.nano > .nano-content`. The other scrollbar div elements `.pane > .nano-slider` are added during run time to prevent clutter in templating. The latest version utilizes native scrolling and works with the iPad, iPhone, and some Android Tablets.

Demo and deocumentation available here: [jQuery nanoScroller docs](http://jamesflorentino.github.com/nanoScrollerJS/)

## Usage

Installation

~~~js
meteor add yasaricli:nanoscroller
~~~

To start using, you need three basic things:

### 1. Markup

The following type of markup structure is needed to make the plugin work:

```html
<div id="about" class="nano">
    <div class="nano-content"> ... content here ...  </div>
</div>
```

Copy the HTML markup. Change `.nano` into something related to your content. Though you can also remove that attribute as long as you have a parent div with an ID reference. e.g. `#parent > .nano`. `nano` and `nano-content` classnames can be customized via plugin options (_in that case you must rename them inside the plugin's CSS file as well_).

### 2. CSS

You should specify a width and a height to your container, and apply some custom styling for your scrollbar. Here's an example:

```css
.nano { background: #bba; width: 500px; height: 500px; }
.nano > .nano-content { padding: 10px; }
.nano > .nano-pane   { background: #888; }
.nano > .nano-pane > .nano-slider { background: #111; }
```

### 3. JavaScript

Running this script will apply the nanoScroller plugin to all DOM elements with a `.nano` className.

```js
$(".nano").nanoScroller();
```

### Advanced methods

### scroll

To scroll at the top:

```js
$(".nano").nanoScroller({ scroll: 'top' });
```

To scroll at the bottom:

```js
$(".nano").nanoScroller({ scroll: 'bottom' });
```

To scroll at the top with an offset value:

```js
$(".nano").nanoScroller({ scrollTop: value });
```

To scroll at the bottom with an offset value:

```js
$(".nano").nanoScroller({ scrollBottom: value });
```

To scroll to an element:

```js
$(".nano").nanoScroller({ scrollTo: $('#a_node') });
```

#### stop:

To stop the operation. This option will tell the plugin to disable all event bindings and hide the gadget scrollbar from the UI.

```js
$(".nano").nanoScroller({ stop: true });
```

#### destroy:

Destroys nanoScroller and restores browser's native scrollbar.

```js
$(".nano").nanoScroller({ destroy: true });
```

#### flash:

To flash the scrollbar gadget for an amount of time defined in plugin settings (_defaults to 1,5s_). Useful if you want to show the user (e.g. on pageload) that there is more content waiting for him.

```js
$(".nano").nanoScroller({ flash: true });
```

#### nanoScroller();

Refresh the scrollbar. This simply re-calculates the position and height of the scrollbar gadget.

```js
$(".nano").nanoScroller();
```

### Custom events

#### 'scrollend'

A custom `'scrollend'` event is triggered on the element every time the user has scrolled to the end of the content element (does *not* get triggered more than once when user tries to scroll down and has already reached the end of scrollable content).

```js
$(".nano").bind("scrollend", function(e){
    console.log("current HTMLDivElement", e.currentTarget);
});
```

Some browsers trigger this event more than once each time, so to listen to the custom event, instead of using jQuery's normal `.bind` or `.on`, you most likely want to use [this tiny jQuery debounce plugin](https://github.com/diaspora/jquery-debounce) to prevent browsers from firing your function more than once every 100ms.

```js
$(".nano").debounce("scrollend", function() {
    alert("The end");
}, 100);
```

#### 'scrolltop'

Same as the `'scrollend'` event, but it is triggered every time the user has scrolled to the top of the content element.

#### 'update'

Same as the `'scrolltop'` and `'scrollend'` events, but it's triggered every time the user scrolls. It also carries a JavaScript object with the current position, the maximum height and the direction (`up` or `down`).

```js
$(".nano").on("update", function(event, values){
    console.debug( values );
});
```

### Plugin Options

There are a few options that you can change when running nanoScroller, e.g. `$(".nano").nanoScroller({ paneClass: 'myclass' });`

#### iOSNativeScrolling

Set to true if you want to use native scrolling in iOS 5+. This will disable your custom nanoScroller scrollbar in iOS 5+ and use the native one instead. While the native iOS scrollbar usually works much better, [there could possibly be bugs](http://github.com/scottjehl/Device-Bugs/issues) in certain situations.

Notice that `.pane` and `.slider` elements are *not generated/added* for devices that support iOS native scrolling when `iOSNativeScrolling` option is enabled.

__Default:__ false

```js
$(".nano").nanoScroller({ iOSNativeScrolling: true });
```

#### sliderMinHeight

Sets the minimum height of the slider element.

__Default:__ 20

```js
$(".nano").nanoScroller({ sliderMinHeight: 40 });
```

#### sliderMaxHeight

Sets the maximum height of the slider element.

__Default:__ null

```js
$(".nano").nanoScroller({ sliderMaxHeight: 200 });
```

#### preventPageScrolling

Set to true to prevent page scrolling when top or bottom inside the content div is reached.

__Default:__ false

```js
$(".nano").nanoScroller({ preventPageScrolling: true });
```

#### disableResize

Set to true to disable the resize from nanoscroller. Useful if you want total control of the resize event. If you set this option to true remember to call the reset method so that the scroll don't have strange behavior.

__Default:__ false

```js
$(".nano").nanoScroller({ disableResize: true });
```

#### alwaysVisible

Set to true to stop the scrollbar from auto-hiding itself.

__Default:__ false

```js
$(".nano").nanoScroller({ alwaysVisible: true });
```

#### flashDelay:

Use this setting to specify the scrollbar hide delay in milliseconds if you have enabled the `flash` option.

```js
$(".nano").nanoScroller({ flashDelay: 1000 });
```

__Default:__ 1500

#### paneClass

A classname for scrollbar track element. If you change this setting, you also have to change it in the plugin's CSS file.

__Default:__ 'nano-pane'

```js
$(".nano").nanoScroller({ paneClass: 'scrollPane' });
```

#### sliderClass

A classname for scrollbar thumb element. If you change this setting, you also have to change it in the plugin's CSS file.

__Default:__ 'nano-slider'

```js
$(".nano").nanoScroller({ sliderClass: 'scrollSlider' });
```

#### contentClass

A classname for your content div. If you change this setting, you also have to change it in the plugin's CSS file.

__Default:__ 'nano-content'

```js
$(".nano").nanoScroller({ contentClass: 'sliderContent' });
```

#### enabledClass

A classname for scrollbar enabled mode. If you change this setting, you also have to change it in the plugin's CSS file.

__Default:__ 'has-scrollbar'

```js
$(".nano").nanoScroller({ enabledClass: '__enabled' });
```

#### flashedClass

A classname for scrollbar flashed mode. If you change this setting, you also have to change it in the plugin's CSS file.

__Default:__ 'flashed'

```js
$(".nano").nanoScroller({ flashedClass: '__flashed' });
```

#### activeClass

A classname for scrollbar active mode. If you change this setting, you also have to change it in the plugin's CSS file.

__Default:__ 'active'

```js
$(".nano").nanoScroller({ activeClass: '__active' });
```

#### tabIndex

Set the tab order of the scrollable content. Set to -1 to skip over the scrollable content when tabbing.

__Default:__ 0

```js
$(".nano").nanoScroller({ tabIndex: 0 });
```

Copyright (c) 2012 James Florentino

Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
