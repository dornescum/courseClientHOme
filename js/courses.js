"use strict"

const table = document.getElementById('table');
let content;
let courses = [];
let newCourse = [];
let selectedCourse =  document.getElementById('selectedCourse');
let URL =`https://learningnode.onrender.com/`;

function showElement (id){
    newCourse =  courses.filter(el=> el.id === id);
    let instructorName = newCourse[0].name.toUpperCase();
    let selectedInstructor = document.getElementById('selectedInstructor');
    selectedInstructor.innerHTML = `<p class="m-1 p-1 bg-gray-100"> ${instructorName} has this courses : </p>  `;
    selectedCourse.innerHTML = newCourse.map((el, index)=>{
            return ` <li id="${index+ 1}"  class="flex justify-center items-center capitalize">${index+1} - ${el.course}</li>`}).join('');
}
async function removeItem(id){
    console.log(id)
    courses.filter(el=>el.id !==id);
    // let url = `https://localhost:3001/courses/${id}`;
    let url = `${URL}courses/${id}`;
    let options = {method: 'DELETE',   headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        }}
    await fetch(url, options).then((response)=> {
     alert('error for the moment');
        return location.reload();
    }).catch(err=> err.message)
}

(async () => {

    // const rawResponse = await fetch('http://localhost:3001');
    const rawResponse = await fetch(`${URL}courses`);
    content = await rawResponse.json();
    console.log(content)
    content.data.map(el => courses.push(el));
    table.innerHTML = courses.map((el) => {
        console.log(el)
        return `
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class=" py-3 px-2 md:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white cursor-not-allowed capitalize" >
                     ${el.course}
                </th>
                <td class=" py-3 px-2 md:px-6 hover:bg-gray-200 cursor-pointer capitalize" onclick="showElement(${el.id})">
                 ${el.name}
                </td>
                <td class=" py-3 px-2 md:px-6 cursor-not-allowed">
                    ${el.rating}
                </td>
                <td class="py-3 px-2 md:px-6 hover:bg-red-300 cursor-not-allowed" onclick="removeItem(${el.id})">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                </td>
                
            </tr>
        </tbody>
`
    }).join('');
})();








