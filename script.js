const studentForm = document.querySelector('#studentform')
const studentGroup = document.querySelector('.student-group')

studentForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    // get form details
    const studentDetail = {
        firstname : studentForm.fname.value,
        lastname : studentForm.lname.value,
        section : studentForm.section.value,
        class : studentForm.class.value,
        age : studentForm.age.value,
    }
    // add to database
    db.collection('students').add(studentDetail)
    .then(()=>{})
    .catch((err)=>{console.log(err);});

    studentForm.reset();
});


const addStudent = (student, id) =>{
    let html = 
    `
    <div class="studentcard-item" data-id="${id}">
        <div class="studentimage">
            <img src="https://via.placeholder.com/150">
        </div>
        <div class="student-info">
            <h3>${student.firstname} ${student.lastname}</h3>
            <p>${student.class}</p>
            <p>${student.section} class</p>
            <p>${student.age}</p>
        </div>
    </div>
    `;

    studentGroup.innerHTML += html;
}

//  get or remove student details from database
db.collection('students').onSnapshot((snapshot)=>{
    snapshot.docChanges().forEach((docChange)=>{
        const doc = docChange.doc;

        if(docChange.type === 'added'){
            addStudent(doc.data(), doc.id);

        }else if(docChange.type === 'removed'){
            deleteStudent(doc.id);
        }

    })
});