(function() {
    function QuizContent() {
      // we'll need a place to store the HTML output
      const output = [];
  
      // for each question...
      QuestionQueue.forEach((currentNo, questionNo) => {
        // we'll want to store the list of answer choices
        const answers = [];
  
        // and for each available answer...
        for (letter in currentNo.answers) {
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNo}" value="${letter}">
              ${letter} :
              ${currentNo.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentNo.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
        );
      });
  
      // finally combine our output list into one string of HTML and put it on the page
      McqContent.innerHTML = output.join("");
    }
  
    function resultWindow() {
      // All answers
      const answerContainers = McqContent.querySelectorAll(".answers");
  
      // user answers
      let correctCount = 0;
  
      // for each question...
      QuestionQueue.forEach((currentNo, questionNo) => {
        // find selected answer
        const answerContainer = answerContainers[questionNo];
        const selector = `input[name=question${questionNo}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if (userAnswer === currentNo.correctAnswer) {
          // add to the number of correct answers
          correctCount++;
  

          //answerContainers[questionNo].style.color = "lightgreen";
        } else {
          // answer is wrong or blank

          answerContainers[questionNo].style.color = "red";
        }
      });
  
      // show number of correct answers out of total
      resultContent.innerHTML = `${correctCount} out of ${QuestionQueue.length}`;
    }
  
    const McqContent = document.getElementById("MCQS");
    const resultContent = document.getElementById("result");
    const Submit = document.getElementById("submit");
  
  
  // Don't touch the above code
  
  
  
  
  // Write your MCQs here --- Start --- --------------------
  
    const QuestionQueue = [
      {
        question: "1.How many number of symbols are used in QPSK?",
        answers: {
          A: "4 bits",
          B: "2 bits",
          C: "1 bit"
        },
        correctAnswer: "B"
      },
  
      {
        question: "Data rate of Quadrature Phase Shift Keying is ___________ of BPSK.",
        answers: {
          A: "Twice",
          B: "Thrice",
          C: "Same",
          D: "Four Times"
        },
        correctAnswer: "A"
      },
  
      {
        question: "A phase shift of ___________ is used in QPSK system.",
        answers: {
            A : "Pi",
            B : "Pi/2",
            C : "Pi/4"
        },
        correctAnswer: "B"
      },
      {
        question: "QPSK carrier is modulated by a digital sequences having one of the phases of 0,90,180,270 o ?",
        answers: {
            A: "True",
            B : "False"
        },
        correctAnswer: "A"
      },
      {
        question: "Pick the number of outputs from a 8-PSK transmitter.",
        answers: {
            A : "2",
            B: "8",
            C: "4",
            D: "3"
        },
        correctAnswer: "B"
      }
    ];
  
  // ---------------------------- End -------------------------------
  
    // display quiz right away
    QuizContent();
  
    // on submit, show results
    Submit.addEventListener("click", resultWindow);
  })();