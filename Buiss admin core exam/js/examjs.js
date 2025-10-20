async function loadQuestions() {
    window.localStorage.setItem("answers", JSON.stringify([]))
    const response = await fetch('https://data.hypelinestudios.com/decaplus/examapi.php', {
        method: 'POST',
        body: JSON.stringify({action: 'getexam', exam: testtype, count: document.getElementById('selectedCount').value})
    }).then((response) => {
        return response.json()
    });
    var qcount = 0
    window.localStorage.setItem('questions', JSON.stringify(response))
    response.forEach(function(question){
        qcount++
        var qelem = document.createElement("div")
        qelem.setAttribute("data-qid", question.ID)
        qelem.setAttribute("data-question", question.question)
        qelem.setAttribute("data-answer1", question.answer1)
        qelem.setAttribute("data-answer2", question.answer2)
        qelem.setAttribute("data-answer3", question.answer3)
        qelem.setAttribute("data-answer4", question.answer4)        
        document.getElementById("examlist").append(qelem)
    })
    document.getElementById("examlist").setAttribute("data-qcount", qcount)
    document.getElementById("examlist").setAttribute("data-qcurrent", 0)
    startexam()
}

function startexam(){
    //getquestion
    var current = (document.getElementById("examlist").getAttribute("data-qcurrent"))*1 + 1
    console.log(current) 
    var qelem = document.getElementById("examlist").childNodes[current-1]
    //create question html
    var qelement = document.createElement("div")
    qelement.setAttribute("id", "examquestion")
    qelement.setAttribute("data-currentquestion", qelem.getAttribute("data-qid"))
    var header = document.createElement("div")
    header.classList.add("exam-question")
    header.innerHTML = qelem.getAttribute("data-question")
    qelement.append(header)
    var errormessage = document.createElement("div")
    errormessage.setAttribute("id", "errormessage")
    errormessage.classList.add("questionerror")
    qelement.append(errormessage)
    var answer1 = document.createElement("input")
    answer1.classList.add("radio-button")
    answer1.setAttribute("type", "radio")
    answer1.setAttribute("name", "answers")
    answer1.setAttribute("value", "A")
    answer1.setAttribute("id", "answer1")
    var label1 = document.createElement("label")
    label1.classList.add("exam-answer-option")
    label1.setAttribute("for", "answer1")
    label1.innerHTML = qelem.getAttribute("data-answer1")
    qelement.append(answer1)
    qelement.append(label1)
    qelement.append(document.createElement("br"))
    var answer2 = document.createElement("input")
    answer2.classList.add("radio-button")
    answer2.setAttribute("type", "radio")
    answer2.setAttribute("name", "answers")
    answer2.setAttribute("value", "B")
    answer2.setAttribute("id", "answer2")
    var label2 = document.createElement("label")
    label2.classList.add("exam-answer-option")
    label2.setAttribute("for", "answer2")
    label2.innerHTML = qelem.getAttribute("data-answer2")
    qelement.append(answer2)
    qelement.append(label2)
    qelement.append(document.createElement("br"))
    var answer3 = document.createElement("input")
    answer3.classList.add("radio-button")
    answer3.setAttribute("type", "radio")
    answer3.setAttribute("name", "answers")
    answer3.setAttribute("value", "C")
    answer3.setAttribute("id", "answer3")
    var label3 = document.createElement("label")
    label3.classList.add("exam-answer-option")
    label3.setAttribute("for", "answer3")
    label3.innerHTML = qelem.getAttribute("data-answer3")
    qelement.append(answer3)
    qelement.append(label3)
    qelement.append(document.createElement("br"))
    var answer4 = document.createElement("input")
    answer4.classList.add("radio-button")
    answer4.setAttribute("type", "radio")
    answer4.setAttribute("name", "answers")
    answer4.setAttribute("value", "D")
    answer4.setAttribute("id", "answer4")
    var label4 = document.createElement("label")
    label4.classList.add("exam-answer-option")
    label4.setAttribute("for", "answer4")
    label4.innerHTML = qelem.getAttribute("data-answer4")
    qelement.append(answer4)
    qelement.append(label4)
    qelement.append(document.createElement("br"))
    var nextbtn = document.createElement("button")
    nextbtn.classList.add("next")
    nextbtn.setAttribute("onClick", "continueexam()")
    nextbtn.innerHTML = "Next"
    var holder = document.createElement("div")
    holder.style.width = "100%"
    holder.style.textAlign = "center"
    holder.append(nextbtn)
    var counter = document.createElement("div")
    var counterstring = current+" / "+document.getElementById("examlist").getAttribute("data-qcount")
    counter.innerHTML = counterstring
    counter.classList.add("qcounter")
    holder.append(counter)
    qelement.append(holder)
    document.getElementById("questionbox").append(qelement)
    document.getElementById("examlist").setAttribute("data-qcurrent", current)
}


function continueexam(){
    try{
        if(document.querySelector('input[name="answers"]:checked').value != null){
        continueexamactual()
    }
    else{
        document.getElementById("errormessage").innerHTML = "Please select an answer<br>"
    }
    }
    catch(e){
        document.getElementById("errormessage").innerHTML = "Please select an answer<br>"
    }
}

function continueexamactual(){

    //record answer
    var answer = document.querySelector('input[name="answers"]:checked').value
    var question = document.getElementById("examquestion").getAttribute("data-currentquestion")
    var currentanswers = JSON.parse(window.localStorage.getItem("answers"))
    currentanswers.push([question, answer])
    window.localStorage.setItem("answers", JSON.stringify(currentanswers))
    //getquestion
    document.getElementById("examquestion").remove()
    var current = (document.getElementById("examlist").getAttribute("data-qcurrent"))*1 + 1
    var qelem = document.getElementById("examlist").childNodes[current-1]
    //create question html
    var qelement = document.createElement("div")
    qelement.setAttribute("id", "examquestion")
    qelement.setAttribute("data-currentquestion", qelem.getAttribute("data-qid"))
    var header = document.createElement("div")
    header.classList.add("exam-question")
    header.innerHTML = qelem.getAttribute("data-question")
    qelement.append(header)
    var errormessage = document.createElement("div")
    errormessage.setAttribute("id", "errormessage")
    errormessage.classList.add("questionerror")
    qelement.append(errormessage)
    var answer1 = document.createElement("input")
    answer1.classList.add("radio-button")
    answer1.setAttribute("type", "radio")
    answer1.setAttribute("name", "answers")
    answer1.setAttribute("value", "A")
    answer1.setAttribute("id", "answer1")
    var label1 = document.createElement("label")
    label1.classList.add("exam-answer-option")
    label1.setAttribute("for", "answer1")
    label1.innerHTML = qelem.getAttribute("data-answer1")
    qelement.append(answer1)
    qelement.append(label1)
    qelement.append(document.createElement("br"))
    var answer2 = document.createElement("input")
    answer2.classList.add("radio-button")
    answer2.setAttribute("type", "radio")
    answer2.setAttribute("name", "answers")
    answer2.setAttribute("value", "B")
    answer2.setAttribute("id", "answer2")
    var label2 = document.createElement("label")
    label2.classList.add("exam-answer-option")
    label2.setAttribute("for", "answer2")
    label2.innerHTML = qelem.getAttribute("data-answer2")
    qelement.append(answer2)
    qelement.append(label2)
    qelement.append(document.createElement("br"))
    var answer3 = document.createElement("input")
    answer3.classList.add("radio-button")
    answer3.setAttribute("type", "radio")
    answer3.setAttribute("name", "answers")
    answer3.setAttribute("value", "C")
    answer3.setAttribute("id", "answer3")
    var label3 = document.createElement("label")
    label3.classList.add("exam-answer-option")
    label3.setAttribute("for", "answer3")
    label3.innerHTML = qelem.getAttribute("data-answer3")
    qelement.append(answer3)
    qelement.append(label3)
    qelement.append(document.createElement("br"))
    var answer4 = document.createElement("input")
    answer4.classList.add("radio-button")
    answer4.setAttribute("type", "radio")
    answer4.setAttribute("name", "answers")
    answer4.setAttribute("value", "D")
    answer4.setAttribute("id", "answer4")
    var label4 = document.createElement("label")
    label4.classList.add("exam-answer-option")
    label4.setAttribute("for", "answer4")
    label4.innerHTML = qelem.getAttribute("data-answer4")
    qelement.append(answer4)
    qelement.append(label4)
    qelement.append(document.createElement("br"))
    var nextbtn = document.createElement("button")
    nextbtn.classList.add("next")
    if(current*1 == document.getElementById("examlist").getAttribute("data-qcount")*1){
        nextbtn.setAttribute("onClick", "submitexam()")
        nextbtn.innerHTML = "View Results"
    }
    else{
        nextbtn.setAttribute("onClick", "continueexam()")
        nextbtn.innerHTML = "Next"   
    }
    var holder = document.createElement("div")
    holder.style.width = "100%"
    holder.style.textAlign = "center"
    holder.append(nextbtn)
    var counter = document.createElement("div")
    var counterstring = current+" / "+document.getElementById("examlist").getAttribute("data-qcount")
    counter.innerHTML = counterstring
    counter.classList.add("qcounter")
    holder.append(counter)
    qelement.append(holder)
    document.getElementById("questionbox").append(qelement)
    document.getElementById("examlist").setAttribute("data-qcurrent", current)
}

function submitexam(){
    try{
        if(document.querySelector('input[name="answers"]:checked').value != null){
            var answer = document.querySelector('input[name="answers"]:checked').value
            var question = document.getElementById("examquestion").getAttribute("data-currentquestion")
            var currentanswers = JSON.parse(window.localStorage.getItem("answers"))
            currentanswers.push([question, answer])
            window.localStorage.setItem("answers", JSON.stringify(currentanswers))
            submitexamactual()
    }
    else{
        document.getElementById("errormessage").innerHTML = "Please select an answer<br>"
    }
    }
    catch(e){
        document.getElementById("errormessage").innerHTML = "Please select an answer<br>"
    }
}

async function submitexamactual(){
    const response = await fetch('https://data.hypelinestudios.com/decaplus/examapi.php', {
        method: 'POST',
        body: JSON.stringify({action: 'submitexam', exam: testtype, questions: window.localStorage.getItem('questions'), answers: window.localStorage.getItem("answers")})
    }).then((response) => {
        return response.json()
    });
    var examsummarydiv = document.createElement("div")
    examsummarydiv.classList.add("exam-summary-div")
    var resultsheadingtext = document.createElement("h2")
    resultsheadingtext.classList.add("results-heading-text")
    resultsheadingtext.innerHTML = "Practice Exam Results"
    examsummarydiv.append(resultsheadingtext)
    var resultsheaderdiv1 = document.createElement("div")
    resultsheaderdiv1.classList.add("results-header-div")
    resultsheaderdiv1.innerHTML = "Overall Score"
    examsummarydiv.append(resultsheaderdiv1)
    var overallresultsdiv = document.createElement("div")
    overallresultsdiv.classList.add("overall-results-data-div")
    var answericon = document.createElement("div")
    answericon.classList.add("answer-icon")
    answericon.classList.add("correct")
    var clear = document.createElement("div")
    clear.innerHTML = "check"
    answericon.append(clear)
    overallresultsdiv.append(answericon)
    var thescore = document.createElement("div")
    thescore.classList.add("score-results")
    thescore.innerHTML = response.correct+" / "+response.count;
    overallresultsdiv.append(thescore)
    examsummarydiv.append(overallresultsdiv)
    var resultsheaderdiv2 = document.createElement("div")
    resultsheaderdiv2.classList.add("results-header-div")
    resultsheaderdiv2.innerHTML = "Score By Instructional Area"
    examsummarydiv.append(resultsheaderdiv2)
    var insareas = document.createElement("div")
    insareas.classList.add("instructional-areas-div")
    var layout = document.createElement("div")
    layout.classList.add("w-layout-grid")
    layout.classList.add("grid-7")
    var rawinsareas = response.insareas
    Object.entries(rawinsareas).forEach(entry => {
        const [key, value] = entry
        var areanew = document.createElement("div")
        areanew.classList.add("instructional-area-result-div")
        var areatext = document.createElement("div")
        areatext.classList.add("instructional-area-name-text")
        areatext.innerHTML = key
        var count = value.count
        var correct = value.correct
        areanew.append(areatext)
        var areascore = document.createElement("div")
        areascore.classList.add("ia-number")
        areascore.innerHTML = correct+" / "+count
        areanew.append(areascore)
        layout.append(areanew)
    })
    insareas.append(layout)
    examsummarydiv.append(insareas)
    var resultsheaderdiv3 = document.createElement("div")
    resultsheaderdiv3.classList.add("results-header-div")
    resultsheaderdiv3.innerHTML = "Results By Question"
    var allresults = document.createElement("div")
    allresults.classList.add("all-result-answers-div")
    var eresults = response.results
    eresults.forEach(function(qa){
        var newqa = document.createElement("div")
        newqa.classList.add("exam-answer-section-div")
        var qtext = document.createElement("div")
        qtext.classList.add("results-question")
        qtext.innerHTML = qa.questiontext
        newqa.append(qtext)
        if(qa.score == 1){
            var abox = document.createElement("div")
            abox.classList.add("exam-debrief-div")
            var ahead = document.createElement("div")
            ahead.classList.add("answered-header")
            ahead.innerHTML = "You Answered..."
            abox.append(ahead)
            var aans = document.createElement("div")
            aans.classList.add("exam-answer-div")
            var icon = document.createElement("div")
            icon.classList.add("answer-icon")
            icon.classList.add("correct")
            var clear = document.createElement("div")
            clear.innerHTML = "check"
            icon.append(clear)
            aans.append(icon)
            var atext = document.createElement("p")
            atext.classList.add("answered-selection")
            atext.innerHTML = qa.correctanswertext
            aans.append(atext)
            abox.append(aans)
            newqa.append(abox)
            allresults.append(newqa)
        }
        else{
            var abox = document.createElement("div")
            abox.classList.add("exam-debrief-div")
            var ahead = document.createElement("div")
            ahead.classList.add("answered-header")
            ahead.innerHTML = "You Answered..."
            abox.append(ahead)
            var aans = document.createElement("div")
            aans.classList.add("exam-answer-div")
            var icon = document.createElement("div")
            icon.classList.add("answer-icon")
            var clear = document.createElement("div")
            clear.innerHTML = "clear"
            icon.append(clear)
            aans.append(icon)
            var atext = document.createElement("p")
            atext.classList.add("answered-selection")
            atext.innerHTML = qa.answergiven
            aans.append(atext)
            abox.append(aans)
            newqa.append(abox)

            var abox = document.createElement("div")
            abox.classList.add("exam-debrief-div")
            var ahead = document.createElement("div")
            ahead.classList.add("answered-header")
            ahead.innerHTML = "The Correct Answer Is..."
            abox.append(ahead)
            var aans = document.createElement("div")
            aans.classList.add("exam-answer-div")
            var icon = document.createElement("div")
            icon.classList.add("answer-icon")
            icon.classList.add("correct")
            var clear = document.createElement("div")
            clear.innerHTML = "check"
            icon.append(clear)
            aans.append(icon)
            var atext = document.createElement("p")
            atext.classList.add("answered-selection")
            atext.innerHTML = qa.correctanswertext
            aans.append(atext)
            abox.append(aans)
            newqa.append(abox)

            allresults.append(newqa)            
        }
    })
    document.getElementById("questionbox").innerHTML = ""
    document.getElementById("questionbox").style.width = "100%"
    document.getElementById("questionbox").append(examsummarydiv)
    document.getElementById("questionbox").append(resultsheaderdiv3)
    document.getElementById("questionbox").append(allresults)
}
window.addEventListener('DOMContentLoaded', function(){
    var contain = document.createElement('div')
    contain.classList.add('w-layout-grid')
    contain.classList.add('question-quantity-grid')

    var containCount = document.createElement('input')
    containCount.setAttribute('type', 'hidden')
    containCount.id = "selectedCount"
    contain.appendChild(containCount)

    var btn10 = document.createElement('div')
    btn10.innerHTML = "10"
    btn10.setAttribute('onClick', 'setCount(10)')
    btn10.classList.add('question-quantity-button')
    contain.appendChild(btn10)

    var btn25 = document.createElement('div')
    btn25.innerHTML = "25"
    btn25.setAttribute('onClick', 'setCount(25)')
    btn25.classList.add('question-quantity-button')
    contain.appendChild(btn25)

    var btn50 = document.createElement('div')
    btn50.innerHTML = "50"
    btn50.setAttribute('onClick', 'setCount(50)')
    btn50.classList.add('question-quantity-button')
    contain.appendChild(btn50)

    var btn100 = document.createElement('div')
    btn100.innerHTML = "100"
    btn100.setAttribute('onClick', 'setCount(100)')
    btn100.classList.add('question-quantity-button')
    contain.appendChild(btn100)

    document.getElementById('countContainer').appendChild(contain)

})

function setCount(x){
	document.getElementById("selectedCount").value = x
    document.getElementById('masterCount').style.display = 'none'
    loadQuestions()
}
