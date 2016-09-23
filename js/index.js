var morfeo = new  SVGMorpheus('#face-set', {iconId: 'opened-eyes'});
morfeo.to('looking-left', {rotation: 'none', duration: 500}, function(){
	morfeo.to('looking-right', {rotation: 'none', duration: 500});
});
	