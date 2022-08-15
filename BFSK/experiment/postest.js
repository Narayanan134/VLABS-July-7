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
        question: "The BFSK spectrum is sum of",
        answers: {
          A: "2 ASK spectra",
          B:	"2 PSK spectra",
          C:	"2 FSK spectra",
          D: "None of the above"
        },
        correctAnswer: "A"
      },
  
      {
        question: "Which among the following consumes more bandwidth?",
        answers: {
          A: "Amplitude Shift Keying",
          B:"Binary Phase Shift Keying",
          C: "Frequency Shift Keying",
          D:	"None"
        },
        correctAnswer: "C"
      },
  
      {
        question: "Frequency shift keying is widely used in ",
        answers: {
            A : "Radio",
            B: "Telegraphy",
            C: "Telephony",
            D: "Television"
        },
        correctAnswer: "B"
      },
      {
        question: "Which type of FSK offers output with no discontinuity in phase?",
        answers: {
            A: "Continuous FSK",
            B:	"Discrete FSK",
            C:	"Uniform FSK",
            D:	"None of the mentioned"
        },
        correctAnswer: "A"
      },
      {
        question: "In Coherent demodulation technique, FSK signal will be affected using which block?",
        answers: {
            A:  "Correlation receiver",
            B:    "Bandpass filters and envelope detector",
            C:     "Matched filteR",
            D:      "Discriminator detection"
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