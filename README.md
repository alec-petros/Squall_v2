Squall is a music sharing platform for independent artists. Built on Rails and React, it is designed to support a community of artists interacting and sharing creations with each other, rather than the current trend of platforms like Soundcloud catering to premium users, labels, and agencies.

STATE OF THE APP

Base sharing, uploading, and interacting features are currently deployed, in addition to early forms of the two visualization components, the transport bar and the WebGL visualizer. Transport needs a couple core features to be called complete, on top of visual styling: an automatic queueing feature, to set up a continuous playlist based on page context when the user clicked play, and a volume slider cohesive with the current visual style.

The WebGL visualizer is a bigger project, and the goal is to adapt the current static visualizer into a customizable, modular visualizer that an artist can customize for each upload to match the visualizer to the track's style.

LOCAL USAGE

- Install SOX with MP3 handling locally.
- rails s to launch the backend.
- npm install && npm start to launch the frontend.
