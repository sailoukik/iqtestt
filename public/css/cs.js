import React, {
    useRef,
    useState,
    useEffect } from
    "https://cdn.skypack.dev/react";
    import { render } from "https://cdn.skypack.dev/react-dom";
    
    import gsap from "https://cdn.skypack.dev/gsap";
    
    const questions = [
    {
      id: 0,
      text: " What is the purpose of a firewall in a network?",
      answers: [
      "To detect and remove viruses",
      "To monitor network traffic",
      "To prevent unauthorized access",
      "Both B and C"],
    
      correct: 2,
      selection: null },
    
    {
      id: 1,
      text:
      "What is a key characteristic of a Trojan horse?",
      answers: [" Replicates itself to spread", "Hides within or masquerades as legitimate software", " Spreads through infected email attachments", "Encrypts files and demands a ransom"],
      correct: 1,
      selection: null },
    
    {
      id: 2,
      text: "Which cryptographic technique is used for ensuring the confidentiality of data in transit?",
      answers: ["Hashing", "Symmetric encryption", "Asymmetric encryption", " Digital signatures"],
      correct: 1,
      selection: null },
    
    {
      id: 3,
      text: "What is a common method to implement two-factor authentication?",
      answers: ["Username and password", "Fingerprint and retina scan", "Security questions", " SMS code or token"],
      correct: 3,
      selection: null },
    
    {
      id: 4,
      text: "What is the primary goal of an incident response plan?",
      answers: ["Prevent all cyber attacks", "Minimize the impact of a security incident", "Identify all attackers", "Restore all compromised systems immediately"],
      correct: 1,
      selection: null },
    
    {
      id: 5,
      text: "What is the principle of least privilege in access control?",      
      answers: ["Users should have the maximum level of access they need", "Users should have only the access necessary to perform their duties", "Users should have no access rights", "All users should have equal access rights"],
      correct: 1,
      selection: null },
    
    {
      id: 6,
      text:
      "What is a common characteristic of a phishing attack?",
      answers: ["Exploiting software vulnerabilities", "Use of social engineering to trick individuals", " Launching denial-of-service attacks", "Manipulating network protocols"],
      correct: 1,
      selection: null },
    
    {
      id: 7,
      text: "What is the purpose of a security policy in an organization?",
      answers: ["To prevent all security incidents", "To communicate the organization's security expectations", "To provide unlimited access to all employees", "To replace the need for security training"],
      correct: 1,
      selection: null },
    
    {
      id: 8,
      text:
      "What is a key vulnerability in WEP (Wired Equivalent Privacy) wireless encryption?",
      answers: ["Lack of encryption", "Use of a weak encryption algorithm", " Inability to authenticate users", "Vulnerability to physical attacks"],
      correct: 1,
      selection: null },
    
    {
      id: 9,
      text: "Why is user awareness training important in cybersecurity?",
      answers: [
      "To blame users for security incidents",
      "To ensure users are aware of the latest hacking techniques",
      "To empower users to recognize and avoid security threats",
      "To eliminate the need for security controls"],
    
      correct: 2,
      selection: null }];
    
    
    
    function useCounter(initialState) {
      const [value, setValue] = useState(initialState);
      const reset = () => setValue(0);
    
      const add = () => setValue(value => value += 1);
    
      return { value, add, reset };
    }
    
    function Question({
      data,
      buttonText,
      hasButton = true,
      onQuestionButtonClick,
      showAnswer = false,
      markSelection = null })
    {
      const [answer, setAnswer] = useState(null);
      const parseValue = value => value ? parseInt(value.split("-")[1]) : null;
      const questionRef = useRef(null);
    
      useEffect(() => {
        gsap.fromTo(
        questionRef.current.querySelector(".question-text"),
        {
          x: 40,
          opacity: 0 },
    
        {
          x: 0,
          opacity: 1,
          duration: 0.4 });
    
    
        gsap.fromTo(
        questionRef.current.querySelectorAll("li"),
        {
          opacity: 0,
          x: 40 },
    
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1 });
    
    
      }, [data]);
    
      return /*#__PURE__*/(
        React.createElement("div", { className: "question", ref: questionRef }, /*#__PURE__*/
        React.createElement("div", { className: "question-inner" }, /*#__PURE__*/
        React.createElement("h2", { className: "question-text" }, data.text), /*#__PURE__*/
        React.createElement("ul", { className: "question-answers" },
        data.answers.map((text, index) => {
          const value = `q${data.id}-${index}`;
          return /*#__PURE__*/(
            React.createElement("li", {
              className:
              index === data.correct && showAnswer ? "is-true" : "",
    
              "data-selected": markSelection === index ? true : null }, /*#__PURE__*/
    
            React.createElement("input", {
              type: "radio",
              name: `q_${data.id}`,
              value: value,
              id: value,
              onChange: e => setAnswer(e.target.value),
              checked:
              !showAnswer ? answer === value : markSelection === index }), /*#__PURE__*/
    
    
            React.createElement("label", { className: "question-answer", htmlFor: value },
            text)));
    
    
    
        }))),
    
    
        hasButton && /*#__PURE__*/
        React.createElement("button", {
          className: "question-button",
          onClick: () => onQuestionButtonClick(parseValue(answer), data) },
    
        buttonText)));
    
    
    
    
    }
    
    function Results({ wrong, correct, empty }) {
      return /*#__PURE__*/(
        React.createElement("div", { className: "result" }, /*#__PURE__*/
        React.createElement("div", { className: "result-item is-correct" }, /*#__PURE__*/
        React.createElement("span", { className: "result-count" }, correct), /*#__PURE__*/
        React.createElement("span", { className: "result-text" }, /*#__PURE__*/
        React.createElement("svg", {
          width: "16",
          height: "16",
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          className: "css-i6dzq1",
          viewBox: "0 0 24 24" }, /*#__PURE__*/
    
        React.createElement("path", { d: "M22 11.08V12a10 10 0 11-5.93-9.14" }), /*#__PURE__*/
        React.createElement("path", { d: "M22 4L12 14.01 9 11.01" })), "CORRECT")), /*#__PURE__*/
    
    
    
    
        React.createElement("div", { className: "result-item is-wrong" }, /*#__PURE__*/
        React.createElement("span", { className: "result-count" }, wrong), /*#__PURE__*/
        React.createElement("span", { className: "result-text" }, /*#__PURE__*/
        React.createElement("svg", {
          width: "16",
          height: "16",
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          className: "css-i6dzq1",
          viewBox: "0 0 24 24" }, /*#__PURE__*/
    
        React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /*#__PURE__*/
        React.createElement("path", { d: "M15 9L9 15" }), /*#__PURE__*/
        React.createElement("path", { d: "M9 9L15 15" })), "WRONG")), /*#__PURE__*/
    
    
    
    
        React.createElement("div", { className: "result-item is-empty" }, /*#__PURE__*/
        React.createElement("span", { className: "result-count" }, empty), /*#__PURE__*/
        React.createElement("span", { className: "result-text" }, /*#__PURE__*/
        React.createElement("svg", {
          width: "16",
          height: "16",
          fill: "none",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: "2",
          className: "css-i6dzq1",
          viewBox: "0 0 24 24" }, /*#__PURE__*/
    
        React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /*#__PURE__*/
        React.createElement("path", { d: "M8 12L16 12" })), "EMPTY"))));
    
    
    
    
    
    
    }
    
    function QuestionCorrection({ wrong, correct, empty }) {
      return /*#__PURE__*/(
        React.createElement("div", { className: "correction" },
        questions.map(question => {
          return /*#__PURE__*/(
            React.createElement(Question, {
              hasButton: false,
              markSelection: question.selection,
              showAnswer: true,
              data: question }));
    
    
        })));
    
    
    }
    
    function App() {
      const [gameStarted, setGameStarted] = useState(false);
      const [gameFinished, setGameFinished] = useState(false);
      const [gameSize, setGameSize] = useState({});
      const totalQuestion = questions.length - 1;
      const gameRef = useRef(null);
      const gameOverlayRef = useRef(null);
    
      const question = useCounter(0);
      const correct = useCounter(0);
      const wrong = useCounter(0);
      const empty = useCounter(0);
    
      const handleNewQuestionClick = (selectedValue, currQuestion) => {
        if (totalQuestion >= question.value) {
          if (selectedValue === currQuestion.correct) {
            correct.add();
          } else if (
          selectedValue !== null &&
          selectedValue !== currQuestion.correct)
          {
            wrong.add();
          } else {
            empty.add();
          }
          questions[currQuestion.id].selection = selectedValue;
          question.add();
        }
      };
    
      const resetSelection = () => {
        questions.forEach(q => q.selection = null);
      };
    
      const handleRestartClick = () => {
        setGameFinished(false);
        setGameStarted(false);
        resetSelection();
        question.reset();
        correct.reset();
        wrong.reset();
        empty.reset();
      };
    
      const indicatorBg = index => {
        if (question.value > index) {
          return "#fff";
        } else if (question.value === index) {
          return "#29b5d5";
        } else {
          return "rgba(255,255,255,.2)";
        }
      };
    
      useEffect(() => {
        if (gameStarted) {
          document.body.classList.add("game-started");
        } else {
          document.body.classList.remove("game-started");
        }
      }, [gameStarted]);
    
      useEffect(() => {
        if (question.value > totalQuestion) {
          gameRef.current.scrollTop = 0;
        }
      }, [question.value]);
    
      return /*#__PURE__*/(
        React.createElement("div", {
          className: "game",
          ref: gameRef,
          "data-game-started": gameStarted ? true : null,
          "data-game-finished": question.value > totalQuestion ? true : null }, /*#__PURE__*/
    
        React.createElement("div", { className: "intro" }, /*#__PURE__*/
        React.createElement("div", { className: "intro-inner" }, /*#__PURE__*/
        React.createElement("h1", { className: "intro-title" }, "Cyber Security IQ Quiz"),
        !gameStarted && /*#__PURE__*/
        React.createElement(React.Fragment, null, /*#__PURE__*/
        React.createElement("p", { className: "intro-desc" },
        `The test contains ${questions.length} questions and there is no time limit.`), /*#__PURE__*/
    
    
        React.createElement("button", {
          className: "intro-button",
          onClick: () => setGameStarted(true) }, "Start Quiz")),
    
    
    
    
    
        gameStarted && /*#__PURE__*/
        React.createElement("div", { className: "indicator" },
        questions.map((q, index) => {
          return /*#__PURE__*/(
            React.createElement("span", {
              className: "indicator-item",
              style: {
                backgroundColor: indicatorBg(index) } }));
    
    
    
        })), /*#__PURE__*/
    
    
        React.createElement(Results, {
          wrong: wrong.value,
          correct: correct.value,
          empty: empty.value }), /*#__PURE__*/
    
        React.createElement("button", {
          className: "restart-button",
          onClick: () => handleRestartClick() }, "Restart Quiz"))), /*#__PURE__*/
    
    
    
    
    
        React.createElement("div", { className: "game-area" },
        questions[question.value] && /*#__PURE__*/
        React.createElement(Question, {
          data: questions[question.value],
          buttonText:
          question.value !== totalQuestion ? "Next Question" : "Finish Quiz",
    
          onQuestionButtonClick: handleNewQuestionClick }),
    
    
    
        !questions[question.value] && /*#__PURE__*/
        React.createElement(React.Fragment, null, /*#__PURE__*/
        React.createElement(QuestionCorrection, { data: questions })))));
    
      
    }
    
    render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#app"));
   
    
    // Call this function when the user completes the quiz and you have the quiz results
    