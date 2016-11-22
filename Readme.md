AudioVisual Module
===================
**ES:** El módulo audioVisual de AIO es un módulo basado en la filosofia modular de AIO. El módulo se conecta con el cerebro de AIO y le ofrece servicios de audio, video o imagenes. Está desarrollado en su mayoría en JavasScript pero corre con el framework web Spring.

**EN:** AIO's AudioVisual Module is a module based in AIO's modular philosophy. The module connects with AIO's brain,  and it offers services of audio, video and images. It is developed mostly in javascript but it runs under Spring framework webServer.

# Services
Here is a list of the services provided by the AudioVisual Module and APIs or projects that they were made of.

## AudioOutput Module
  - Play sounds: [Web Audio API](https://developer.mozilla.org/es/docs/Web_Audio_API)
  - Text to speech: [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html)

## AudioInput Module
  - speech to text. [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html)

## Video Module
  - play video: [YouTube Player API](https://developers.google.com/youtube/js_api_reference?hl=es-419)

## Visual Module
  - SVG render: [SVG Morpheus](https://github.com/alexk111/SVG-Morpheus)
  - Dialog Frames: [Bootstrap alerts](http://www.w3schools.com/bootstrap/bootstrap_alerts.asp)
  - Show Pictures: Native HTML5 and CSS

# Other functions
  - Communication Channel: [Bootstrap alerts](http://www.w3schools.com/bootstrap/bootstrap_alerts.asp)
  - Menu buttons: [material-floating-button](https://github.com/nobitagit/material-floating-button)
  - DOM Handling: [JQuery](https://jquery.com/)
  - Ionicons: [Ionicons](http://ionicons.com/)

# Usage

Using the AIO's AudiovisualModule requires gradle. Once you have installed and configured gradle you just have to run a single command in the bash of your OS.

For windows:
> gradlew bootRun

For Ubuntu:
> sudo ./gradlew bootRun

However this applications is useless unless an AIO's actor instance is create, because it runs under the criteria of AIO's communication protocol.