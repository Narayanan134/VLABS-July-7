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
        question: "Choose the function of carrier recovery block in QPSK receiver is",
        answers: {
          A: "to produce a non-synchronous signal",
          B:	"to produce low frequency signal",
          C:	"to produce original, transmit carrier oscillator signal",
          D: "to produce high frequency out of phase signal"
        },
        correctAnswer: "C"
      },
  
      {
        question: "Bit splitter in QPSK transmitter acts as",
        answers: {
          A: "multiplexer",
          B:"serial to parallel converter",
          C:    "encoder",
          D:	"parallel to serial converter"
        },
        correctAnswer: "B"
      },
  
      {
        question: "The number of outputs across Q-channel in 8-PSK transmitter is",
        answers: {
            A : "2",
            B: "8",
            C: "4",
            D: "6"
        },
        correctAnswer: "C"
      },
      {
        question: "Pick the number of dots in the constellation diagram of QPSK modulation.",
        answers: {
            A: "4",
            B:	"8",
            C:	"16",
            D:	"12"
        },
        correctAnswer: "A"
      },
      {
        question: "The bandwidth efficiency is also called as",
        answers: {
            A :  "information density",
            B:    "transmission efficiency",
            C:     "spectral density",
            D:      "minimum bandwidth"
        },
        correctAnswer: "A"
      }

    ];
  
  // ---------------------------- End -------------------------------
  
    // display quiz right away
    QuizContent();
  
    // on submit, show results
    Submit.addEventListener("click", resultWindow);
  })();