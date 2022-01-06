export default function Problem({
	question,
	choices,
	userChoice,
	isSubmitted,
	correctChoice,
	handleClick,
}) {
	const getClassName = index => {
		let name = "problem--choices-item";

		if (index === userChoice) 
			name += " selected";
		if (isSubmitted) {
			if (index === correctChoice) name += " correct";
			else name += " incorrect";
		}

		return name;
	};

	return (
		<section className="problem">
			<h2 className="problem--question">{question}</h2>
			<ul className="problem--choices">
				{choices.map((choice, index) => (
					<li
						className={
							getClassName(index)
						}
						key={index}
						onClick={!isSubmitted && (() => handleClick(index))}
					>
						{choice}
					</li>
				))}
			</ul>
		</section>
	);
}
