// Preliminary Calls //

const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    on_finish: function(data) {
        proliferate.submit({"trials": data.values()});
        // jsPsych.data.displayData('csv');
    }
});

let timeline = [];

// IRB FORM //

const irb = {
    // Which plugin to use
    type: jsPsychHtmlButtonResponse,
    // What should be displayed on the screen
    stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
    // What should the button(s) say
    choices: ['Continue'],
    on_finish: function(data) {
        data.category = "irb"
    }
};

timeline.push(irb)

// INSTRUCTIONS //

const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "In this experiment, you will be taking on the role of an English to Spanish translator. Your job is to translate the sentences that appear on the screen, each of which come from a part of a resume or job application letter.<br><br> On the following screens, you will be presented with a series of sentences to translate. Please be as accurate as you can in your translations. If you are unsure about a translation, make your best educated guess. <br><br>When you are ready to proceed, press SPACEBAR.",
    choices: [" "],
    on_finish: function(data) {
        data.category = "instructions"
    }
};
timeline.push(instructions);

// Translation Trials //

// Example usage
let jsPsychStimuli = createStimulusArray(criticalData);
console.log(jsPsychStimuli);

const trials = {
    timeline: [ 
        {
            type: jsPsychSurveyText,
            data: jsPsych.timelineVariable('data'),
            questions: [
                {
                    prompt: jsPsych.timelineVariable('text'),
                    required: false
                }
            ], 
            on_finish: function(data) {
                jsPsych.setProgressBar((data.trial_index - 1) / (timeline.length + jsPsychStimuli.length));
            }
        }
    ],
    timeline_variables: jsPsychStimuli,
    randomize_order: true
}

timeline.push(trials)

const genderIdeology = {
    timeline: [
        {
            type: jsPsychSurveyHtmlForm,
            preamble: '<p>For each of the following statements, pleased indicate how strongly you agree or disagree.</p>',
            html: '<style>.slider{-webkit-appearance:none;appearance:none;border-radius:5px;width:50%;height:15px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;}.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;border-radius:50%;background:#4CAF50;cursor:pointer;visibility:hidden;}.thumb-visible::-webkit-slider-thumb {visibility: visible;}.slider:active::-webkit-slider-thumb{visibility:visible;}.slider:active::-moz-range-thumb{visibility:visible;}.slider:focus::-ms-thumb{visibility:visible;}.thumb-visible::-moz-range-thumb {visibility: visible;}</style><hr><label for="aggressiveNurturing">People can be both aggressive and nurturing, regardless of sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="aggressiveNurturing" name="aggressiveNurturing" /><i> strongly agree</i><br><hr><label for="treatedSame">People should be treated the same, regardless of their sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="treatedSame" name="treatedSame" /><i> strongly agree</i><br><hr><label for="childFreedom">The freedom that children are given should be determined by their age and maturity level and not by their sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="childFreedom" name="childFreedom" /><i> strongly agree</i><br><hr><label for="houseTasks">Tasks around the house should not be assigned by sex.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="houseTasks" name="houseTasks" /><i> strongly agree</i><br><hr><label for="stopGendering">We should stop thinking about whether people are male or female and focus on other characteristics.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="stopGendering" name="stopGendering" /><i> strongly agree</i><br>'
        },
        {
            type: jsPsychSurveyHtmlForm,
            preamble: '<p>For each of the following statements, pleased indicate how strongly you agree or disagree.</p>',
            html: '<style>.slider{-webkit-appearance:none;appearance:none;border-radius:5px;width:50%;height:15px;background:#d3d3d3;outline:none;opacity:0.7;-webkit-transition:.2s;transition:opacity .2s;}.slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:25px;height:25px;border-radius:50%;background:#4CAF50;cursor:pointer;visibility:hidden;}.thumb-visible::-webkit-slider-thumb {visibility: visible;}.slider:active::-webkit-slider-thumb{visibility:visible;}.slider:active::-moz-range-thumb{visibility:visible;}.slider:focus::-ms-thumb{visibility:visible;}.thumb-visible::-moz-range-thumb {visibility: visible;}</style><hr><label for="fatherFinances">A father’s major responsibility is to provide financially for his children.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="fatherFinances" name="fatherFinances" /><i> strongly agree</i><br><hr><label for="menSex">Men are more sexual than women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="menSex" name="menSex" /><i> strongly agree</i><br><hr><label for="workWomen">Some types of work are just not appropriate for women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="workWomen" name="workWomen" /><i> strongly agree</i><br><hr><label for="momDecisions">Mothers should make most decisions about how children are brought up.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="momDecisions" name="momDecisions" /><i> strongly agree</i><br><hr><label for="mothersWork">Mothers should work only if necessary.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="mothersWork" name="mothersWork" /><i> strongly agree</i><br><hr><label for="protectGirls">Girls should be protected and watched over more than boys.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="protectGirls" name="protectGirls" /><i> strongly agree</i><br><hr><label for="splitWork">Only some types of work are appropriate for both men and women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="splitWork" name="splitWork" /><i> strongly agree</i><br><hr><label for="importantMen">For many important jobs, it is better to choose men instead of women.</label><br><br /><i>strongly disagree </i><input type="range" min="0" max="100" value="50" class="slider" onclick="this.classList.add(\'thumb-visible\')" id="importantMen" name="importantMen" /><i> strongly agree</i><br>'
        },
    ]
}

timeline.push(genderIdeology)

// QUESTIONNAIRE //

const questionnaire = {
    type: jsPsychSurvey,
    title: "Please answer the following optional questions. If you would like to elaborate on any of your answers, you may do so in the comment box.",
    pages: [
        [
            // {
            //     type: 'html',
            //     prompt: "Please answer the following questions:"
            // },
            {
                type: 'multi-choice',
                prompt: 'Did you read the instructions and do you think you did the task correctly?', 
                name: 'correct', 
                options: ['Yes', 'No', 'I was confused']
            },
            {
                type: 'multi-choice',
                prompt: 'How would you describe your political beliefs?', 
                name: 'political', 
                options: ['Progressive', 'Moderate','Conservative', 'Independent']
            },
            {
                type: 'drop-down',
                prompt: 'Gender:',
                name: 'gender',
                options: ['Female', 'Male', 'Non-binary/Non-conforming', 'Other']
            },
            {
                type: 'text',
                prompt: 'Age:',
                name: 'age',
                textbox_columns: 10
            },
            {
                type: 'drop-down',
                prompt: 'Level of education:',
                name: 'education',
                options: ['Some high school', 'Graduated high school', 'Some college', 'Graduated college', 'Hold a higher degree']
            },
            {
                type: 'drop-down',
                prompt: 'Do you think the payment was fair?',
                name: 'payment',
                options: ['The payment was too low', 'The payment was fair']
            },
            {
                type: 'drop-down',
                prompt: 'Did you enjoy the experiment?',
                name: 'enjoy',
                options: ['Worse than the average experiment', 'An average experiment', 'Better than the average experiment']
            },
            {
                type: 'text',
                prompt: "Do you have any other comments about this experiment?",
                name: 'comments',
                textbox_columns: 30,
                textbox_rows: 4
            }
        ]
    ],
    on_finish: function(data) {
        data.category = "demographics"
    }
};
timeline.push(questionnaire)

// THANKS //

const thanks = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Continue'],
    stimulus: "Thank you for your time! Please click 'Continue' and then wait a moment until you're directed back to Prolific.<br><br>",
    on_finish: function(data) {
        data.category = "thanks"
    }
}
timeline.push(thanks)

// FINAL FUNCTION CALL //

jsPsych.run(timeline)