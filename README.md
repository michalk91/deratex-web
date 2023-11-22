<p>&nbsp;</p>
<p align='center'>
  <img src="https://deratex-web.vercel.app/images/logo.svg" width="280" />   
</p>
  <p align='center'><strong>DERATEX DDD Company Website</strong></p>
<p>&nbsp;</p>

<p align='center'>

## Description
This is a website for a pest control company.

## Features
- Fully responsive design.
- Animations on scroll.
- All images on the website have the "right-click" menu disabled.
- Main Page Slider contains:
  - autoplay (stops on hover),
  - keyboard handling occurs only when it is in viewport (⬅️- previous slide, ➡️ - next slide),
  - touchscreen handling.
- Carousels contain:
  - you can insert any HTML tag (text, image, iFrame),
  - virtualized feature (created on my own),
  - keyboard handling only when it is in viewport (⬅️- previous slide, ➡️ - next slide),
  - touchscreen handling (draggable),
  - the carousels within the viewport are counted; when there's more than one on the viewport, only the one being hovered or previously hovered have keyboard handling,
  - autoplay (stops on hover).
- Lightbox contains:
  - you can use it with carousel, then the carousel and lightbox are synchronized and share their state,
  - you can set images or texts that will open lightbox,
  - you can put in images and texts for caption,
  - virtualized feature (created on my own),
  - opening animation using the FLIP Animation technique (I created my own hook for this technique). The animation starts only when the image is fully loaded,
  - keyboard handling ("ESC" - close/initial zoom, ⬅️- previous slide, ➡️ - next slide, ➕ - increase zoom, ➖ - decrease zoom),
  - touchscreen handling (drabbable, zoomable - my own implementation of pinch zoom, double tap zoom),
  - when lightbox is zoomed you can use mouse-wheel to scroll,
  - thumbnails move and center when they do not fit on the screen.
- Used APIs:
  - Facebook SDK for JavaScript (for Facebook reviews at the bottom of the main page and the Facebook page on the contact page),
  - Google reCaptcha v3 for email sending protection.
- For email sending: Nodemailer (emails are sent from a special Gmail account).

  
    
## NPM Packages used: 
- React,
- NextJS,
- Nodemailer,
- CSS Modules
- use-debounce,
- react-in-viewport,
- classnames,
- react-hooks-global-state,
- react-icons,
- react-device-detect
 
  
  <p>&nbsp;</p>
