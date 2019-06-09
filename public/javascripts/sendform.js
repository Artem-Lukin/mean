let myForm = document.querySelector('.myForm');

document.querySelector('.btn').addEventListener('click',() => {
	let errors = '';
    myForm.querySelectorAll('input').forEach(e => {
        if(e.hasAttribute('required') && !e.value.trim()) errors += '\n' + e.previousElementSibling.innerText.slice(0,-2);
    });
    if(errors) alert('Заполните поля: ' + errors);
    else {
        myForm.submit();  
    }
});