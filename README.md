# AudioVisual Module
**ES:** El módulo audioVisual de AIO es un módulo basado en la filosofia modular de AIO. El módulo se conecta con el cerebro de AIO quien decide cual accion realizar.

**EN:** AIO's AudioVisual Module is a module based in AIO's modular philosophy. The module connects with AIO's brain,  which decides what action must be performed.

# Services
Here is a list of the services provided by the AudioVisual Module and APIs or projects that they were made of.

## AudioOutput Module
  - Play sounds: [Web Audio API](https://developer.mozilla.org/es/docs/Web_Audio_API)
  - Text to speech: [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html)
  - Voice Commands: [Annyang](https://www.talater.com/annyang/)

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
The web page is deployed in a nodejs server. But since you can deploy it with just typing
```
	node server.js
```
The AIO's actor must be running, so the audioVisual module can know which action to perform. However ypu can see some examples in the menu demo buttons.