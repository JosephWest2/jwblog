function ProcessInline(lines: string[]) {
	const output = [] as JSX.Element[];
	output.forEach(o => {
		o?.valueOf
	})
	lines.forEach(line => {
		for (let i = 0; i < line.length; i++) {
			if (line[i] === "*") {
				if (i+1 < line.length && line[i+1] == "*") {
					let j = line.slice(i+1).indexOf("**");
					if (j !== -1) {
						output.push(<></>)
					}
				} else {

				}
			}
		}
	})
}

export default function Markdown({file_utf8}: {file_utf8: string}) {
	
	const lines = file_utf8.split("\n");

	const elements = [] as JSX.Element[];
	let i = 0;
	while (i < lines.length) {
		const line = lines[i];

		if (line.length === 0 || line.trim().length === 0) {
			return;
		}

		if (line.length > 1 && line[0] === "#" && line[1] !== "#") {
			elements.push(<h1>{line.slice(1).trim()}</h1>);
		} else if (line.length > 2 && line.slice(0,2) === "##" && line[2] !== "#") {
			elements.push(<h2>{line.slice(2).trim()}</h2>)
		} else if (line.length > 3 && line.slice(0,3) == "###") {
			elements.push(<h3>{line.slice(3).trim()}</h3>)
		} else if (line.length > 2 && /^[0-9]+\./.test(line)) {
			const inner = [] as JSX.Element[];
			while (i < lines.length && /^[0-9]+\./.test(lines[i])) {
				inner.push(<li>{lines[i]}</li>);
				i++
			}
			elements.push(<ol>{inner}</ol>);
		} else if (line.length > 2 && line[0] === "-") {
			const inner = [] as JSX.Element[];
			while (i < lines.length && lines[i] === "-") {
				inner.push(<li>{lines[i]}</li>);
				i++
			}
			elements.push(<ul>{inner}</ul>);
		} else if (line.length > 1 && line[0] === ">") {
			elements.push(<blockquote>{line.slice(1).trim()}</blockquote>);
		} else if (line.length > 2 && line.slice(0,3) === "---") {
			elements.push(<div className="underline"></div>);
		} else {
			elements.push(<p>{line}</p>)
		}

		i++;
	}


	return <p>hi</p>
}
