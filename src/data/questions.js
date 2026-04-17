const questions = [
  {
    question: "learning rate가 너무 크면?",
    choices: ["gradient 0", "수렴 느림", "local minimum", "발산"],
    answer: 3,
  },
  {
    question: "Regularization의 목적은?",
    choices: ["overfitting 방지", "데이터 증가", "weight 증가", "training accuracy 증가"],
    answer: 0,
  },
  {
    question: "Linear classifier의 score function은?",
    choices: ["Wx + b", "e^x", "x² + b", "log x"],
    answer: 0,
  },
  {
    question: "Sigmoid 단점은?",
    choices: ["계산 불가", "비선형 없음", "음수 출력", "vanishing gradient"],
    answer: 3,
  },
  {
    question: "CNN이 이미지에 적합한 이유는?",
    choices: ["spatial locality 활용", "deeper", "input 제한 없음", "activation 다름"],
    answer: 0,
  },
  {
    question: "Backprop 핵심 아이디어는?",
    choices: ["forward만", "loss 전파", "random update", "chain rule"],
    answer: 3,
  },
  {
    question: "ReLU 정의는?",
    choices: ["sigmoid", "max(0, x)", "x²", "tanh"],
    answer: 1,
  },
  {
    question: "Pooling layer 역할은?",
    choices: ["크기 증가", "spatial downsampling", "weight 업데이트", "flatten"],
    answer: 1,
  },
  {
    question: "Convolution output size 구하기 (3×32×32 input, 10 filters, kernel 5, stride 1, padding 2)",
    choices: ["10 × 28 × 28", "10 × 32 × 32", "3 × 32 × 32", "10 × 30 × 30"],
    answer: 1,
  },
  {
    question: "Activation function 없으면?",
    choices: ["학습 불가", "더 강력한 모델", "gradient 없음", "linear classifier로 귀결"],
    answer: 3,
  },
  {
    question: "L1 regularization 특징은?",
    choices: ["convex 아님", "gradient 없음", "weight 균등 감소", "sparse solution"],
    answer: 3,
  },
  {
    question: "Convolution layer 역할은?",
    choices: ["normalization", "spatial 구조 유지 + feature 추출", "loss 계산", "FC 연산"],
    answer: 1,
  },
  {
    question: "SGD 특징은?",
    choices: ["noisy but fast", "deterministic", "full dataset 사용", "gradient 없음"],
    answer: 0,
  },
  {
    question: "Linear classifier decision boundary는?",
    choices: ["랜덤", "원형", "초평면 (hyperplane)", "곡선"],
    answer: 2,
  },
  {
    question: "CNN parameter sharing 장점은?",
    choices: ["복잡도 증가", "파라미터 감소", "overfitting 증가", "계산 증가"],
    answer: 1,
  },
  {
    question: "Batch Normalization의 효과는?",
    choices: ["overfitting 증가", "gradient exploding", "학습 안정화 및 속도 향상", "파라미터 감소"],
    answer: 2,
  },
  {
    question: "Dropout의 동작 방식은?",
    choices: ["weight 제거", "일부 뉴런을 랜덤으로 끔", "데이터 제거", "gradient 차단"],
    answer: 1,
  },
  {
    question: "Softmax의 역할은?",
    choices: ["선형 변환", "확률 분포로 변환", "gradient 증가", "normalization 제거"],
    answer: 1,
  },
  {
    question: "Cross-entropy loss 특징은?",
    choices: ["regression용", "확률 기반 분류에 적합", "weight 감소", "gradient 없음"],
    answer: 1,
  },
  {
    question: "Overfitting 발생 원인은?",
    choices: ["데이터 많음", "모델 단순", "데이터 적고 모델 복잡", "learning rate 작음"],
    answer: 2,
  },
  {
    question: "Underfitting 특징은?",
    choices: ["train acc 높고 test 낮음", "train/test 모두 낮음", "test만 높음", "항상 overfitting 발생"],
    answer: 1,
  },
  {
    question: "Momentum의 목적은?",
    choices: ["gradient 제거", "진동 감소 및 수렴 가속", "weight 증가", "overfitting 증가"],
    answer: 1,
  },
  {
    question: "Adam optimizer 특징은?",
    choices: ["learning rate 고정", "momentum + RMSProp 결합", "gradient 없음", "batch 필요 없음"],
    answer: 1,
  },
  {
    question: "ReLU의 문제점은?",
    choices: ["vanishing gradient", "exploding gradient", "dying ReLU", "계산 느림"],
    answer: 2,
  },
  {
    question: "Padding의 역할은?",
    choices: ["연산 속도 감소", "출력 크기 증가/유지", "gradient 제거", "채널 감소"],
    answer: 1,
  },
  {
    question: "Stride가 커지면?",
    choices: ["출력 크기 증가", "연산 증가", "출력 크기 감소", "weight 증가"],
    answer: 2,
  },
  {
    question: "Fully Connected layer 특징은?",
    choices: ["지역 정보만 사용", "모든 뉴런 연결", "parameter sharing", "convolution 수행"],
    answer: 1,
  },
  {
    question: "Gradient Descent 목적은?",
    choices: ["loss 최대화", "loss 최소화", "weight 제거", "데이터 증가"],
    answer: 1,
  },
  {
    question: "Learning rate decay 이유는?",
    choices: ["초기 학습 방해", "수렴 안정화", "gradient 증가", "weight 감소"],
    answer: 1,
  },
  {
    question: "Xavier initialization 목적은?",
    choices: ["weight 0 초기화", "gradient 폭발", "gradient 유지 (분산 안정화)", "overfitting 증가"],
    answer: 2,
  },
  {
    question: "Multiclass SVM loss에서 margin이 의미하는 것은?",
    choices: ["정답 score 최소값", "오답 score와의 최소 차이", "weight 크기", "gradient 크기"],
    answer: 1,
  },
  {
    question: "SVM loss에서 loss가 0이 되는 조건은?",
    choices: ["모든 score 동일", "margin 조건 만족", "weight = 0", "gradient = 0"],
    answer: 1,
  },
  {
    question: "Softmax에서 score가 커질수록 확률은?",
    choices: ["감소", "동일", "증가", "랜덤"],
    answer: 2,
  },
  {
    question: "Numerical stability를 위해 softmax에서 하는 것은?",
    choices: ["x를 제곱", "max(x) 빼기", "log 제거", "normalize 제거"],
    answer: 1,
  },
  {
    question: "Regularization term을 추가하는 이유는?",
    choices: ["loss 증가", "weight 크게", "모델 복잡도 감소", "gradient 제거"],
    answer: 2,
  },
  {
    question: "L2 regularization gradient는?",
    choices: ["상수", "W", "sign(W)", "0"],
    answer: 1,
  },
  {
    question: "Gradient checking 목적은?",
    choices: ["속도 향상", "모델 개선", "구현 검증", "overfitting 감소"],
    answer: 2,
  },
  {
    question: "Finite difference에서 사용하는 식은?",
    choices: ["f(x)", "f(x+h)", "(f(x+h)-f(x))/h", "f(x)^2"],
    answer: 2,
  },
  {
    question: "Vectorization의 장점은?",
    choices: ["코드 길어짐", "느려짐", "계산 효율 증가", "메모리 감소"],
    answer: 2,
  },
  {
    question: "Backprop에서 upstream gradient 의미는?",
    choices: ["이전 weight", "loss 값", "이전 단계에서 전달된 gradient", "입력 데이터"],
    answer: 2,
  },
  {
    question: "Chain rule의 핵심은?",
    choices: ["덧셈", "미분 연결", "확률 계산", "평균 계산"],
    answer: 1,
  },
  {
    question: "Affine layer는 무엇인가?",
    choices: ["convolution", "Wx + b 연산", "activation", "pooling"],
    answer: 1,
  },
  {
    question: "2-layer neural network 구조는?",
    choices: ["linear only", "linear → linear", "linear → nonlinearity → linear", "conv → pool"],
    answer: 2,
  },
  {
    question: "Activation function의 역할은?",
    choices: ["gradient 제거", "선형성 유지", "비선형성 추가", "weight 감소"],
    answer: 2,
  },
  {
    question: "Convolution 연산의 본질은?",
    choices: ["덧셈", "내적 (dot product)", "평균", "정렬"],
    answer: 1,
  },
]

export default questions
