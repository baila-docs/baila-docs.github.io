const kwds = new RegExp(`\\b(type\\s+range|type|inherit|data\\s+class|class|` +
	`enum|interface|module|func|function|property|constructor|destructor|` +
	`public|private|protected|static|sealed|abstract|override|use|this|get|` +
	`set|super|local|global|var|const|if|else|while|do|for|foreach|switch|` +
	`case|default|try|catch|finally|with|new|delete|break|continue|return|` +
	`typeof|throw|in|is|yield|import|export)\\b`, 'g');
const type_kwds = new RegExp(`\\b(Number|String|Boolean|List|Dictionary|Set|Tuple|Function|Regex|Object)\\b`, 'g');
const literals = new RegExp(`\\b(true|false|null|undefined|NaN|Infinity)\\b`, 'g');
const codeBlocks = document.getElementsByTagName("code");
const preBlocks = document.getElementsByTagName("pre");
const blocks = [...codeBlocks, ...preBlocks];
for (var block of blocks) {
	/*if (block.tagName === 'PRE') {
		// like numbers
		var div_wrapper = document.createElement('div');
		div_wrapper.style.display = 'block';
		div_wrapper.style.float = 'left';
		document.body.insertBefore(div_wrapper, block);
		
		var lns = document.createElement('span');
		for (var i = 1; i <= block.innerHTML.split('\n').length; i++) {
			lns.innerHTML += i + "<br>";
		}
		lns.style.fontName = 'monospace';
		lns.style.fontSize = '10pt';
		lns.style.display = 'inline-block';
		lns.style.marginTop = '22px';
		lns.style.float = 'inherit';

		block.style.fontName = 'monospace';
		block.style.fontSize = '10pt';
		block.style.display = 'inline-block';
		block.style.float = 'inherit';

		div_wrapper.appendChild(lns);
		div_wrapper.appendChild(block);
	}*/

	block.innerHTML = block.innerHTML.
		/*replace(/\b(type\s+range)(\s+)([a-zA-Z0-9_$]+\.\.[a-zA-Z0-9_$]+)\b/g, function(_, _1, _2, _3) {
			return `<h_kwd>${_1}</h_kwd>${_2}<h_type_kwd>${_3.replace(/<(.+?)>/g, "")}</h_type_kwd>`;
		}).*/
		replace(/\b(type)(\s+)([a-zA-Z_$][a-zA-Z0-9_$]*\|[a-zA-Z_$][a-zA-Z0-9_$]*)\b/g, "<h_kwd>$1</h_kwd>$2<h_type_kwd>$3</h_type_kwd>").
		replace(literals, "<h_literal>$1</h_literal>").
		replace(type_kwds, "<h_type_kwd>$1</h_type_kwd>").
		replace(/function(\s+)\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b(\s+)\{/g, "<h_kwd>function</h_kwd>$1<h_fcall>$2</h_fcall>$3{").
		replace(kwds, "<h_kwd>$1</h_kwd>").
		replace(/^\s*(\/.*?\/[a-z]*\b)/g, "<h_str>$1</h_str>").
		replace(/[\=\+\-\*\/\%\^\?\:]\s*(\/.*?\/[a-z]*\b)/g, "<h_str>$1</h_str>").
		replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\b\s*\(/g, "<h_fcall>$1</h_fcall>(").
		replace(/(\$?'.*?')/g, "<h_str>$1</h_str>").
		replace(/(\$?".*?")/g, "<h_dblstr>$1</h_dblstr>").
		replace(/(\$?`.*?`)/g, "<h_litstr>$1</h_litstr>").
		replace(/(\b(?:-)?(?:0b|0o|0)?[0-9][0-9._]*\b)/g, "<h_literal>$1</h_literal>").
		replace(/(\b(?:-)?0x[0-9A-Fa-f][0-9A-Fa-f_]*\b)/g, "<h_literal>$1</h_literal>").
		replace(/(\#.*(?:\n|$))/g, "<h_comment>$1</h_comment>").
		replace(/(\/\*[^]*?\*\/)/g, "<h_comment>$1</h_comment>");
	block.innerHTML = block.innerHTML.replace(/<h_str>([\s\S]+?)<\/h_str>/g, a => {
		a = "<h_str>" +
	 			a.replace(/<(.+?)>/g, "").replace(/<h_str>(.+?)<\/h_str>/, "$1")
	 			+ "</h_str>";
		return a
	})
	block.innerHTML = block.innerHTML.replace(/<h_comment>([\s\S]+?)<\/h_comment>/g, a => {
		a = "<h_comment>" +
	 			a.replace(/<(.+?)>/g, "").replace(/<h_comment>(.+)<\/h_comment>/, "$1")
	 			+ "</h_comment>";
		return a
	})
}