import './QuestionCard.css'

const LABELS = ['①', '②', '③', '④', '⑤']

export default function QuestionCard({ question, qIndex, selected, onSelect }) {
  return (
    <div className="question-card">
      <p className="question-text">
        <span className="q-num">Q{qIndex + 1}.</span> {question.question}
      </p>
      <ul className="choices">
        {question.choices.map((choice, i) => (
          <li
            key={i}
            className={`choice ${selected === i ? 'selected' : ''}`}
            onClick={() => onSelect(i)}
          >
            <span className="choice-label">{LABELS[i]}</span>
            {choice}
          </li>
        ))}
      </ul>
    </div>
  )
}
