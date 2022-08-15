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
        question: "BFSK has a ______ bandwidth than BPSK.",
        answers: {
          A: "Lower",
          B: "Higher",
          C: "Same"
        },
        correctAnswer: "B"
      },
  
      {
        question: "FSK reception is deployed using",
        answers: {
          A: "Correlation receiver & Phase Locked Loop",
          B: "Phase Locked Loop",
          C: "Correlation receiver",
          D: "None"
        },
        correctAnswer: "A"
      },
  
      {
        question: "Mark and space are represented in BFSK using",
        answers: {
            A : "0",
            B : "1 and 0",
            C : "1"
        },
        correctAnswer: "B"
      },
      {
        question: "The data pattern used for generation of FSK will be",
        answers: {
            A: "NRZ",
            B : "RZ",
            C : "Split phase"
        },
        correctAnswer: "A"
      },
      {
        question: "The range of frequency used in BFSK is",
        answers: {
            A : "200 to 500Hz",
            B: "50 to 1000Hz",
            C: "500 to 10KHz",
            D: "100 to 2000Hz"
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