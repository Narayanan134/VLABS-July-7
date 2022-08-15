import { BID, NRZ, DEMUX,PM1,PM2,AD, ROUTPUT,I1,I2,PM3,PM4,DD1,DD2,MUX,phi1,phi2,phi3,phi4 } from './Block.js'
import { Wire, connectionNodes, WireManager, OUTPUT, RSIG,MOD,DEMOD,E1,E2,CORR1,CORR2 } from './Block.js';
import { drawSourceWave } from './bidWaveGraph.js';
import { drawAdderWave } from './addergraph.js';
import { drawSampledWave } from './sampledWaveGraph.js';
import { drawEncodedWave} from './modWaveGraph.js';
import { Line } from './Line.js';
import { drawDecoderWave } from './receivedWaveGraph.js';
import { drawReconWave } from "./demodWaveGraph.js";
import { drawQuantizedWave } from "./nrzWaveGraph.js";
import { drawProd1Wave } from "./prodmod1.js";
import { drawProd2Wave } from "./prodmod2.js";

let myblocks = new Map();
let currentModal = null;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    myblocks.forEach((block) => {
        block.update_pos();
    });
}
const validConnections = [
    'sgo+sai',
    'sai+sgo',

    'sao+qai',
    'qai+sao',

    'qao+eni',
    'eni+qao',

    'qao+pm1i',
    'pm1i+qao',

    'pm1o+adi',
    'adi+pm1o',

    'qao+pm2i',
    'pm2i+qao',

    'pm2o+adi',
    'adi+pm2o',

    'ado+o1i',
    'o1i+ado',

    'ro+pm3i',
    'pm3i+ro',

    'ro+pm4i',
    'pm4i+ro',

    'pm3o+i1i',
    'i1i+pm3o',

    'pm4o+i2i',
    'i2i+pm4o',

    'i1o+dd1i',
    'dd1i+i1o',

    'i2o+dd2i',
    'dd2i+i2o',

    'dd1o+muxi',
    'muxi+dd1o',

    'dd2o+muxi',
    'muxi+dd2o',

    'muxo+demodi',
    'demodi+muxo',

    'eno+dei',
    'dei+eno',

    'deo+pfi',
    'pfi+deo',

    'pfo+lpfi',
    'lpfi+pfo',

    'lpfo+evi',
    'evi+lpfo',

    'sao+a11',
    'a11+sao',

    'a12+qai',
    'qai+a12',

    'a13+pfi',
    'pfi+a13',

    'a21+a13',
    'a13+a21',

    'qao+a22',
    'a22+qao',
    
    'a22+eni',
    'eni+a22',

    'a23+pfo',
    'pfo+a23',
];
function setup_modulation() {
    myblocks.set('modulation', new MOD(40, 32.5, 150, 50));
    myblocks.set('generator', new BID(240-79, 132.5, 200, 100));
    myblocks.set('sampler', new NRZ(546.6-79, 132.5, 200, 100));
    myblocks.set('quantizer', new DEMUX(853.32-79, 132.5, 220, 100));
    myblocks.set('prodmod1', new PM1(1140.32-79, 52.5, 220, 100));
    myblocks.set('prodmod2', new PM2(1140.32-79, 192.5, 220, 100));
    myblocks.set('phi1', new phi1(1140.32-79, 12.5, 90, 35));
    myblocks.set('phi2', new phi2(1140.32-79, 298.5, 90, 35));
    myblocks.set('adder', new AD(1430.32-79, 132.5, 220, 100));
    myblocks.set('encoder', new OUTPUT(1700-79, 132.5, 220, 100));
   
    
}

function validConnection(c1, c2) {
    const connection = c1 + '+' + c2;
    console.log('connection: ', connection);
    if (validConnections.includes(connection)) {
        console.log('valid connection');
        return true;
    }
        console.log('invalid connection');
    return false;
}
let totalConnection = 0;
function isCircuitComplete() {
    return totalConnection >= 16;
}
function setup_demodulation() {
    myblocks.set('demodulation', new DEMOD(40, 432.5, 180, 50));
    myblocks.set('rsignal', new RSIG(240-79, 652.5, 200, 100));
    myblocks.set('corr1', new CORR1(656.6-79, 440.5, 155, 30));
    myblocks.set('corr2', new CORR2(656.6-79, 950.5, 155, 30));
    myblocks.set('empty1', new E1(506.6-79, 500.5, 510, 180));
    myblocks.set('empty2', new E2(506.6-79, 760.5, 510, 180));
    myblocks.set('prodmod3', new PM3(546.6-79, 532.5, 200, 100));
    myblocks.set('prodmod4', new PM4(546.6-79, 792.5, 200, 100));
    myblocks.set('phi3', new phi3(556.6-79, 639.5, 90, 35));
    myblocks.set('phi4', new phi4(556.6-79, 900.5, 90, 35));
    myblocks.set('inte1', new I1(796.6-79, 532.5, 200, 100));
    myblocks.set('inte2', new I2(796.6-79, 792.5, 200, 100));
    myblocks.set('dd1', new DD1(1096.6-79, 532.5, 200, 100));
    myblocks.set('dd2', new DD2(1096.6-79, 792.5, 200, 100));
    myblocks.set('mux', new MUX(1400-79, 652.5, 220, 100));
    myblocks.set('routput', new ROUTPUT(1700-79, 652.5, 220, 100));

}

function openModal(obj, dblClick = false) {
    // On double click first a single click event is triggered and then the double click event
    // Return if already showing a modal and a single click was performed
    if (currentModal && !dblClick) {
        return ;
    }

    if (currentModal && dblClick) {
        $(`${currentModal}`).modal('hide');
        currentModal = null;
    }

    let _modalName = dblClick ? obj.doubleClickModal() : obj.singleClickModal();
    if (!_modalName) {
        return ;
    }
    const modalName = `#${_modalName}`;
    if (!isCircuitComplete()) {
        alert('Complete all the connections');
        return ;
    }

    $(modalName).modal('show');
    $(modalName).on('shown.bs.modal', function () {
        if (modalName === '#sourceWaveGraph') {
            drawSourceWave();
        } else if (modalName === '#sampledWaveGraph') {
            drawSampledWave();
        } else if (modalName === '#decoderWaveGraph') {
            drawDecoderWave();
        }else if (modalName === '#reconWaveGraph') {
            drawReconWave();
        } else if (modalName === '#quantizerOutput') {
            //const binLength = getQuantizationLevels();
            drawQuantizedWave();
        } else if (modalName == '#encodedWaveGraph') {
            drawEncodedWave();
        }else if(modalName=='#adderOutput'){
            drawAdderWave();
        }else if(modalName=='#phi1Output'){
            drawProd1Wave();
        }else if(modalName=='#phi2Output'){
            drawProd2Wave();
        }
    });
    currentModal = modalName;

    $(`${modalName}`).on('hidden.bs.modal', function () {
        currentModal = null;
    })
}

function doubleClicked() {
    myblocks.forEach((val, key) => {
        if (val.mouseOver()) {
            openModal(val, true);
        }
    });
}

let wireManager = new WireManager();
let currentStartNode = null;
let currentSelected = null;


function keyPressed() {
    if (keyCode === DELETE) {
        if (currentSelected) {
            console.log('removing ', currentSelected);
            wireManager.remove(currentSelected);
            currentSelected = null;
            totalConnection--;
        }
        components = [];
        if (currentStartNode) currentStartNode = null;
    }
    if (keyCode === ENTER) {
        console.log(components);
        console.log(wireManager);
    }
}

let components = [];

function mouseClicked() {
    let anySelected = false;
    if (currentSelected instanceof Wire) currentSelected.selected = false;
    connectionNodes.forEach((node) => {
        if (node.didClick()) {
            if (!currentStartNode) {
                currentStartNode = node;
                console.log('current start node: ', currentStartNode);
                components.push(currentStartNode);
            }
            else {
                components.push(node);
                console.log(components);
                console.log('adding wire from: ', currentStartNode, ' to ', node);
                const n = components.length;
                if (validConnection(components[0].name, components[n - 1].name)) {
                    totalConnection ++;
                    wireManager.addWire(components);
                    if(totalConnection==16){
                        showQuizes();
                    }
                } else {
                    alert("Invalid Connection. Please check your connections");
                }
                currentStartNode = null;
                components = [];
            }
            anySelected = true;
        }
    });
    wireManager.wires.forEach((wire) => {
        if (wire.didClick()) {
            console.log('clicked on wire ', wire);
            currentSelected = wire;
            wire.selected = true;
            anySelected = true;
        }
    })
    if (!anySelected && currentStartNode) {
        const v = createVector(mouseX, mouseY)
        // line(currentStartNode.x, currentStartNode.y, v.x, v.y);
        components.push(v);
        currentStartNode = v;
    }

    if (!anySelected) { currentSelected = null; console.log('setting curretnSelcted to ', currentSelected); }
}

export function draw() {
    clear();

    myblocks.forEach((val, key) => {
        const highlight = val.mouseOver() && !currentModal;
        val.draw(highlight);
    });

    wireManager.draw();

    if (components)
        new Wire(components).draw();

    if (currentStartNode)
        line(currentStartNode.x, currentStartNode.y, mouseX, mouseY);
}

export function setup() {
    createCanvas(windowWidth, windowHeight);

    setup_modulation();
    setup_demodulation();
}

/** @type {Window} */
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.onclick = mouseClicked;
window.doubleClicked = doubleClicked;
window.onkeydown = keyPressed;

const questions = {
    1: {
        "question": "The function of carrier recovery in QPSK receiver is",
        "options": [
            "to produce a non-synchronous signal",
            "to produce low frequency signal",
            "to produce original, transmit carrier oscillator signal",
            "to produce high frequency out of phase signal"
        ],
        "answer": "to produce original, transmit carrier oscillator signal"
    },
    2: {
        "question": "The purpose of bit splitter in QPSK transmitter is",
        "options": [
            "multiplexer",
            "de multiplexer",
            "serial to parallel converter",
            "encoder"
        ],
        "answer": "serial to parallel converter"
    },
    3: {
        "question": "How many possible outputs are obtained across Q-channel in 8-PSK transmitter?",
        "options": [
            "2",
            "8",
            "4",
            "3"
        ],
        "answer": "4"
    },
    4: {
        "question": "How many dots will be there in the constellation diagram of QPSK modulation?",
        "options": [
            "4",
            "8",
            "16",
            "10"
        ],
        "answer": "4"
    },
};

function generateQuizQuestions() {
    let quizBody = document.getElementById("quizBody");
    for (const [qnno, qobj] of Object.entries(questions)) {
        let question_div = document.createElement("div");

        let question = document.createElement("h5");
        question.innerHTML = qnno + ') ' + qobj.question;

        question_div.appendChild(question);

        qobj.options.forEach((option) => {
            let b = document.createElement("input");

            b.type = "radio"
            b.name = 'qn'+qnno;
            b.value = option;
            b.style = "margin-left: 25px";
            let  c = document.createElement("label");
            c.for = qnno;
            c.innerText = option;
            c.style = "margin-left: 10px";
            question_div.appendChild(b);
            question_div.appendChild(c);

            question_div.appendChild(document.createElement("br"));
        });
        question_div.appendChild(document.createElement("br"));
        quizBody.append(question_div);
    }
}

function validateQuiz() {
    console.log('Validate Quiz');
    const num_questions = Object.entries(questions).length;
    const questionMap = new Map(Object.entries(questions));
    console.log(questionMap);
    for (let i = 1; i <= num_questions; i++) {
        const name = 'qn' + i;
        const elements = document.getElementsByName(name);
        let checked = false;
        elements.forEach((element) => {
            if (element.checked)
                checked = true;
        });
        if (!checked) {
            alert('Answer all questions');
            return ;
        }
    }
    const labels = document.getElementsByTagName('label');
    console.log('Labels: ', labels);

    for (let i = 1; i <= num_questions; i++) {
        const name = 'qn' + i;
        const elements = document.getElementsByName(name);

        let ans = '';
        elements.forEach((element) => {
            if (element.checked) {
                ans = element.value;
            }
        });
        const correct_ans = questionMap.get(`${i}`).answer;
        labels.forEach((label) => {
            if (label.for !== `${i}`)
                return ;
            if (label.innerText === correct_ans) {
                label.style = 'color: green; margin-left: 10px';
            } else if (label.innerText === ans && ans !== correct_ans) {
                label.style = 'color: red; margin-left: 10px';
            }
        });
    }
}

function showQuizes() {
    $('#quizModal').modal('show');
    generateQuizQuestions();
}

document.getElementById('quizbtn').onclick = showQuizes;
document.getElementById('submitbtn').onclick = validateQuiz;