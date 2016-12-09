Manual de instalación
===================
###Módulo AudioVisual de AIO
---
El módulo audiovisual de AIO controla todos los recursos de visuales y auditivos del robot. Está desarrollado en JavaScript, y los recursos visuales se controlan a través de CSS y HTML. El código fuente del proyecto se encuentra publicado en [GitHub]([https://github.com/AIO-Javeriana/AudioVisual-Module).

##**Dependencias**
#####**Software**
  - [NodeJS](https://nodejs.org/es/)
  - [Chromium browser](https://www.chromium.org/)[^chrome] 
#####**Hardware**
  - Parlante
  - Micrófono

###**Librerías**
A pesar que las dependencias externas ya vienen incluidas en el repositorio de código, a continuación se listan las librerías o proyectos utilizados.

####AudioOutput Module
  - Reproducir Sonidos: [Web Audio API](https://developer.mozilla.org/es/docs/Web_Audio_API)
  - Text to speech: [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html)

##### AudioInput Module
  - speech to text. [Web Speech API](https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html)

##### Video Module
  - Reproducir videos: [YouTube Player API](https://developers.google.com/youtube/js_api_reference?hl=es-419)

#### Visual Module
  - Renderizar SVG: [SVG Morpheus](https://github.com/alexk111/SVG-Morpheus)
  - Cuadros de diálogo: [Bootstrap alerts](http://www.w3schools.com/bootstrap/bootstrap_alerts.asp)

#### Otros
  - Mensajes en pantalla: [Bootstrap alerts](http://www.w3schools.com/bootstrap/bootstrap_alerts.asp)
  - Botones del menú: [material-floating-button](https://github.com/nobitagit/material-floating-button)
  - Manejo del DOM: [JQuery](https://jquery.com/)
  - Ionicons: [Ionicons](http://ionicons.com/)
  - Comandos de voz: [Annyang](https://www.talater.com/annyang/)

##**Correr el proyecto**
Para correr el proyecto se debe ejecutar el siguiente comando:
```
	$ node server.js
```
Y luego abrir el chromium en la siguiente dirección web:
```
	http://localhost:8080/
```
Cabe aclarar que el módulo AudioVisual funciona únicamente cuando está conectado al actor, quien le dice que acción debe realizar y debe estar activo antes de cargar la página en el navegador.

##**Servicios Ofrecidos**
El módulo ofrece los siguientes servicios:

###DECIR
Emite un texto como sonido.

#####**Opciones**
- TEXTO: Texto que se va a emitir como sonido.
- TONO: Tono de la voz.
#####**Ejemplo**
```yaml
	DECIR: 
		TEXTO: oh no! voy tarde al colegio
		TONO: HABLAR
```
###REPRODUCIR-SONIDO
Reproduce un sonido. Estos sonidos están almacenados en la carpeta 
```js
/public/assets/sounds/
```
 y se declaran en el archivo **utils.js ** dentro en la ruta 
```js
/public/static/js/api/utils.js
```
 de la siguiente forma:
```js
var availableSounds = {
    path: './assets/sounds/',
    availableSoundFiles: [
        {
            name: 'name', //Id of the sound file
            file: 'file.mp3' //Name of the file
        }
    ]
};
```
Este servicio, usa el *Web Audio API*, para mayor información acerca de archivos de audio soportados por favor vea la [documentación de la Web Audio API](https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats#Browser_compatibility)

#####**Opciones**
-	SONIDO: Nombre del sonido que se va a reproducir.
#####**Ejemplo**
```yaml
	REPRODUCIR-SONIDO: 
	    SONIDO: colegio
```
###REPRODUCIR-VIDEO
Reproduce un video de youtube. Los videos que estarán disponibles en la escena deben ser declarados en el archivo 
```js
/public/static/js/api/utils.js
```
de la siguiente manera:

```js
var availableVideos =[{
            name:'dinosaurios', //Name of the video
            url: 'https://www.youtube.com/watch?v=1oe5Mxs-S3I' //YouTube Video URL
        }
    ];
```

#####**Opciones**
- VIDEO: Nombre del video a reproducir.
#####**Ejemplo**
```yaml
	REPRODUCIR-VIDEO: 
		VIDEO: dinosaurios   
```

###RESPONDER
Activa el micrófono para que el usuario pueda realizar una pregunta al usuario.
#####**Opciones**
Este servicio no tiene opciones de configuración.
#####**Ejemplo**
```yaml
	RESPONDER:  
```

 [^chrome]: [Google Chrome](https://www.google.com/chrome/) Aunque el proyecto está diseñado y probado para ser utilizado en Chromium browser (navegador soportado por dispositivos con procesador ARM), todas sus opciones son compatibles con el navegador Google Chrome.


