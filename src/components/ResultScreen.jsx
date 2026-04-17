import './ResultScreen.css'

const LABELS = ['①', '②', '③', '④', '⑤']

export default function ResultScreen({ questions, answers, onReset }) {
  const score = questions.reduce((acc, q, i) => {
    return acc + (answers[i] === q.answer ? 1 : 0)
  }, 0)

  const percent = Math.round((score / questions.length) * 100)

  return (
    <div className="result-wrap">
      <div className="result-header">
        <h1>딥러닝기초 중간고사 CBT</h1>
        <div className="score-box">
          <span className="score-num">{score}</span>
          <span className="score-total"> / {questions.length}</span>
          <span className="score-percent">{percent}점</span>
        </div>
        <button className="btn-reset" onClick={onReset}>다시 풀기</button>
      </div>

      <div className="result-list">
        {questions.map((q, i) => {
          const correct = answers[i] === q.answer
          return (
            <div key={i} className={`result-item ${correct ? 'correct' : 'wrong'}`}>
              <p className="result-q">
                <span className="result-badge">{correct ? '✓' : '✗'}</span>
                <span className="q-num">Q{i + 1}.</span> {q.question}
              </p>
              <ul className="result-choices">
                {q.choices.map((c, j) => (
                  <li
                    key={j}
                    className={
                      j === q.answer
                        ? 'answer'
                        : j === answers[i]
                        ? 'my-wrong'
                        : ''
                    }
                  >
                    <span className="choice-label">{LABELS[j]}</span>{c}
                  </li>
                ))}
              </ul>
              {q.explanation && (
                <p className="explanation">💡 {q.explanation}</p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
