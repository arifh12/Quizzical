import Start from "./components/Start";
import Problem from "./components/Problem";
import { useState } from "react";
import { decode } from "html-entities";
import "./App.css";

function App() {
	const [problems, setProblems] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [numberCorrect, setNumberCorrect] = useState(0);

	const loadQuestions = () => {
		fetch("https://opentdb.com/api.php?amount=5&category=9")
			.then(res => res.json())
			.then(data => {
				const newArr = data.results.map(item => {
					const question = decode(item.question);
					const answerChoices = item.incorrect_answers;
					const correctIndex = Math.floor(Math.random() * (answerChoices.length + 1));
					answerChoices.splice(correctIndex, 0, item.correct_answer);

					return {
						question: question,
						choices: answerChoices.map(answer => decode(answer)),
						correctChoice: correctIndex,
						userChoice: null,
					};
				});

				setProblems(newArr);
			});
		setIsSubmitted(false);
	};

	const handleUserChoice = (problemIndex, choiceIndex) => {
		setProblems(prev => {
			const newArr = [...prev];
			newArr[problemIndex].userChoice = choiceIndex;

			return newArr;
		});
	};

	const checkAnswers = () => {
		setIsSubmitted(true);

		setNumberCorrect(
			problems.reduce(
				(prev, curr) => prev + (curr.correctChoice === curr.userChoice),
				0
			)
		);
	};

	const problemElements = problems.map((problem, index) => (
		<Problem
			key={index}
			question={problem.question}
			choices={problem.choices}
			userChoice={problem.userChoice}
			isSubmitted={isSubmitted}
			correctChoice={problem.correctChoice}
			handleClick={choiceIndex => handleUserChoice(index, choiceIndex)}
		/>
	));

	return (
		<div className="App">
			{problems.length ? (
				<main className="quiz">
					{problemElements}
					<div className="quiz--submit">
						{isSubmitted && 
								<h3 className="quiz--score">
									{`You scored ${numberCorrect}/${problems.length} correct answers`}
								</h3>
						}
						<button
							className="btn-purple"
							onClick={isSubmitted ? loadQuestions : checkAnswers}
						>
							{isSubmitted ? "Play again" : "Check answers"}
						</button>
					</div>
				</main>
			) : (
				<Start loadQuestions={loadQuestions} />
			)}
		</div>
	);
}

export default App;
