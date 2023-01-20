let subjects = document.getElementById('subjects')
let msg = document.getElementById('msg')
let gpa = document.getElementById('gpa')
function addCourse (){
    let course = document.createElement('div');
    course.className="subject"
    course.innerHTML=`
    <div class="s-cont">
        <div class="field">
            <label for="sname">Course name</label>
            <input type="text" id="sname" name="sname" placeholder="e.g CSEN 301">
        </div>
        <div class="field">
            <label class="req">Grade</label>
            <select class="sgrade">
                <option value="-">Select your grade</option>
                <option value="A+">A+</option>
                <option value="A">A</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="B-">B-</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="C-">C-</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="FX">FX</option>
            </select>
        </div>
        <div class="field">
            <label class="req">Credit hours</label>
            <input type="number" class="shours" placeholder="course credits">
        </div>
        <i class="fa-solid fa-xmark close"></i>
    </div>`
    subjects.append(course)
    document.querySelectorAll('.close').forEach((e)=>{
        e.addEventListener('click' , (event)=>{
            msg.innerText=''
            gpa.style.display='none'
            if(document.querySelectorAll('.close').length===2)
                msg.innerText='the minimum is two courses'
            else{
            event.target.parentNode.parentNode.remove();

            }
        })
    })
    msg.innerText=''
    gpa.style.display='none'
}

document.querySelectorAll('.close').forEach((e)=>{
    e.addEventListener('click' , (event)=>{
        msg.innerText=''
        gpa.style.display='none'
        if(document.querySelectorAll('.close').length===2)
                msg.innerText='the minimum is two courses'
        else{
            event.target.parentNode.parentNode.remove();
        }
    })
})


function colorChooser(gpa){
    if(gpa <2)
        return 'rgba(0, 128, 0, 0.8)'
    if(gpa >= 2 && gpa < 3)
        return 'rgba(255, 166, 0, 0.8)'
    if(gpa >= 3) 
        return 'rgba(255, 0, 0, 0.8)'

}

function gradeToNumeric(grade){
    switch (grade){
        case "A+" : return 0.7  
        case "A" : return 1  
        case "A-" : return 1.3  
        case "B+" : return 1.7 
        case "B" : return 2 
        case "B-" : return 2.3  
        case "C+" : return 2.7 
        case "C" : return 3  
        case "C-" : return 3.3  
        case "D+" : return 3.7  
        case "D" : return 4  
        case "F" : return 5  
        case "FX" : return 0  
    }
}

function calculate(){
    let points = 0;
    let sumHours = 0;
    let flag1=true
    let flag2=true
    let grades = document.querySelectorAll(".sgrade")
    let hoursArr = document.querySelectorAll('.shours')
    let all = []
    for (let i=0;i<grades.length;i++){
        let obj = {grade : grades[i].value , hours : hoursArr[i].value}
        all.push(obj)
    }

    all.forEach((element)=>{
        flag1=(element.grade==='-' || element.hours==="")? false : true
        flag2=(element.hours<1)? false : true
    })

    if(!flag1){
        gpa.style.display='none'
        msg.innerText='please fill out all fields or remove unwanted courses'
    }
    else 
        if(!flag2) {
            gpa.style.display='none'
            msg.innerText='please enter valid credit hours'
        }
        else{
            all.forEach((element)=>{
                points+= gradeToNumeric(element.grade) * element.hours
                sumHours+= parseInt(element.hours)
            })
            let myGPA = (points/sumHours).toFixed(2)
            msg.innerText=''
            gpa.innerHTML=`Your GPA is
                            <span style="font-size:35px; font-weight:bold; display:block;">${myGPA}</span>`
            gpa.style.backgroundColor=colorChooser(myGPA)
            gpa.style.display='flex'


        }

}