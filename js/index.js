"use strict"
let course = document.getElementById('course');
const instructor = document.getElementById('instructors');
const rating = document.getElementById('rating');
const formBtn = document.getElementById('submitBtn');
const hiddenMessage = document.getElementById('hiddenMessage');





formBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (course.value === '') {
        console.log('error')
        return course = null;
    }
    let URL =`https://learningnode.onrender.com/`;



    (async () => {
        // const rawResponse = await fetch('http://localhost:3001', {
        const rawResponse = await fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            body: JSON.stringify({course: course.value, rating: rating.value, instructor: instructor.value })
        });
        const content = await rawResponse.json();
        showSuccess();
    })();


    instructor.value = 1;
    course.value = '';
    rating.value = 1;
})
function showSuccess(){
    if (hiddenMessage.classList.contains('hidden')){
        hiddenMessage.classList.remove('hidden');
    }
    setTimeout(()=>{
        window.location.replace("http://localhost:3000/courses.html");
    },500)

}
