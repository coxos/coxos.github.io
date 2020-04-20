const btnTodo = ((btn) => {
    btn.preventDefault();
    if (btn.target.className === 'addTodo') {
        addTodo();
    } else if (btn.target.className === 'upTodo') {
        upTodo();
    }

});


const addTodo = (() => {
    let newItem = document.querySelector('input');
    let nexLists = document.querySelectorAll('ul li');
    let nexList = nexLists.length;

    if (nexList >= 1) {
        nexList = nextElem() + 1;
    }

    let liElem = document.createElement('li');
    liElem.setAttribute('class', `li-${nexList}`);
    let childElement = document.querySelectorAll('ul li')[0];

    if (nexList === 0) {
        document.querySelector('ul').append(liElem)
    } else {
        let ParentElementUl = childElement.parentNode;
        ParentElementUl.insertBefore(liElem, childElement);
    }

    document.querySelector(`.li-${nexList}`).innerHTML = `<p>${newItem.value}</p>
        <p> 
          <i class="fas fa-trash del"></i>
          <i class="far fa-check-circle select"></i>
        </p> 
        `;
    newItem.value = '';
});

const nextElem = (() => {
    let nexLists = document.querySelectorAll('ul li');
    let bigger = 0;
    nexLists.forEach((el) => {
        let elem = Number(el.getAttribute('class').replace('li-', ''));

        if (bigger <= elem) {
            bigger = elem;
        }
        //  console.log(bigger);
    });
    return bigger;


})

const modeList = ((e) => {
    // console.log(e.target.className.indexOf('select') > -1);
    if (e.target.className.indexOf('del') > -1) {
        delTod(e.target);

    } else if (e.target.className.indexOf('select') > -1) {
        selectTodo(e.target);
    }

});

const delTod = ((element) => {

    element.closest('li').style.cssText = "animation: 1s linear 0s alternate fadeOut; "
    setTimeout(()=> {
        element.closest('li').remove();
    },900 )

})

const selectTodo = ((element) => {
    let mode_itemt = document.querySelector('input');
    let listItem = element.closest('li');
    let buttonTodo = document.querySelector('#btnTodo');

    if (listItem.children[0].style.cssText === '') {

        listItem.children[0].style.cssText = 'opacity:0.5;';

        let newStyle = element.getAttribute('class').replace('far fa-check-circle', 'fas fa-check-circle');

        element.setAttribute('class', newStyle);
        element.style.cssText = 'color: #dd69e8;';

        buttonTodo.setAttribute('class', 'upTodo');
        buttonTodo.setAttribute('data-mod-class', listItem.className);
        buttonTodo.textContent = "Update";
        mode_itemt.value = listItem.textContent.trim();
        
    }else {
        listItem.children[0].style.cssText = '';
        let newStyle = element.getAttribute('class').replace('fas fa-check-circle', 'far fa-check-circle');

        element.setAttribute('class', newStyle);
        element.style.cssText = '';

        buttonTodo.setAttribute('class', 'addTodo');
        buttonTodo.setAttribute('data-mod-class', listItem.className);
        buttonTodo.textContent = "Add";
        mode_itemt.value = '';
    }



});

const upTodo = (() => {
    let reName = document.querySelector('input');
    let buttonTodo = document.querySelector('#btnTodo');
    let listStyle = document.getElementsByClassName(buttonTodo.getAttribute('data-mod-class'));

    // console.log(listStyle[0].children[0]);

    listStyle[0].children[0].textContent = reName.value;

    buttonTodo.setAttribute('class', 'addTodo');
    buttonTodo.textContent = "Add";
    reName.value = '';

    listStyle[0].children[0].style.cssText = '';
    listStyle[0].children[1].children[1].style.cssText = '';
    listStyle[0].children[1].children[1].setAttribute('class','far fa-check-circle select');

});

document.querySelector('#btnTodo').addEventListener('click', btnTodo);
document.querySelector('#lists').addEventListener('click', modeList)