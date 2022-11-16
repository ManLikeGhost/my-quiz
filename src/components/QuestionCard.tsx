import React from 'react';
// Types
import { AnswerObject } from '../App';

// Styles
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
	question: string;
	answers: string[];
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
	userAnswer: AnswerObject | undefined;
	questionNum: number;
	totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNum,
	totalQuestions,
}) => {
	return (
		<Wrapper>
			<p className='number'>
				Question: {questionNum} / {totalQuestions}
			</p>

			<p dangerouslySetInnerHTML={{ __html: question }} />

			<div className=''>
				{answers.map((answer, index) => (
					<ButtonWrapper
						key={index}
						correct={userAnswer?.correctAnswer === answer}
						userClicked={userAnswer?.answer === answer}
					>
						<button disabled={!!userAnswer} value={answer} onClick={callback}>
							<span dangerouslySetInnerHTML={{ __html: answer }} />
						</button>
					</ButtonWrapper>
				))}
			</div>
		</Wrapper>
	);
};

export default QuestionCard;
