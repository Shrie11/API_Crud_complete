const cardform = document.getElementById('cardform')
const cardtitleCtrl = document.getElementById('cardtitle')
const cardbodyCtrl = document.getElementById('cardbody')
const useridCtrl = document.getElementById('userid')
const updatebtnCtrl = document.getElementById('updatebtn')
const addbtnCtrl = document.getElementById('addbtn')



let xhr = new XMLHttpRequest()
let BASE_URL = 'https://jsonplaceholder.typicode.com'
let API_URL = `${BASE_URL}/posts`
xhr.open("GET", API_URL, true)


const onEdit = (ele) => {
    let edit_id = ele.closest('.card').id
    localStorage.setItem('edit_id', edit_id)
    let xhr = new XMLHttpRequest()
    let BASE_URL = 'https://jsonplaceholder.typicode.com'
    let API_URL = `${BASE_URL}/posts/${edit_id}`
    console.log(edit_id)
    xhr.open("PATCH", API_URL, true)
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.status <= 299) {
            let data = JSON.parse(xhr.response);
            console.log(data);
            cardtitleCtrl.value = data.title
            cardbodyCtrl.value = data.body
            useridCtrl.value = data.userId
        }
        else {
            console.error("Error:", xhr.status)
        }
    }
    xhr.send()
    addbtnCtrl.classList.add('d-none')
    updatebtnCtrl.classList.remove('d-none')
}

const onupdateHnadler = () => {
    let updateId = localStorage.getItem('edit_id')
    let updatedObj = {
        title: cardtitleCtrl.value,
        body: cardbodyCtrl.value,
        userId: useridCtrl.value,
        id: updateId
    }
    let xhr = new XMLHttpRequest()
    let BASE_URL = 'https://jsonplaceholder.typicode.com'
    let API_URL = `${BASE_URL}/posts/${updateId}`
    xhr.open("PUT", API_URL, true);
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.status <= 299) {
            console.log("Data Updated successfully");
        }
        else {
            console.error("Error:", xhr.status)
        }
    };
    xhr.send(JSON.stringify(updatedObj));
    let Upcard = document.getElementById(updateId)
    Upcard.querySelector('.card-header h3').innerHTML = updatedObj.title
    Upcard.querySelector('.card-header h5').innerHTML = updatedObj.userId
    Upcard.querySelector('.card-body p').innerHTML = updatedObj.body
    addbtnCtrl.classList.remove('d-none')
    updatebtnCtrl.classList.add('d-none')
}

const onRemove = (ele) => {
    let removeId = ele.closest('.card').id
    let xhr = new XMLHttpRequest()
    let BASE_URL = 'https://jsonplaceholder.typicode.com'
    let API_URL = `${BASE_URL}/posts/${removeId}`

    xhr.open("DELETE", API_URL, true);
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.status <= 299) {
            console.log("Deleted successfully:");
        } else {
            console.error("Delete failed:", xhr.status);
        }
    };

    xhr.send();
     ele.closest('.col-md-4').remove()

}

const templating = (arr) => {
    let result = ''
    arr.forEach(co => {
        result += `<div class="col-md-4 mb-3">
                <div class="card border-dark h-100" id=${co.id}>
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <h3>${co.title}</h3>
                        <h5>${co.userId}</h5>
                    </div>
                    <div class="card-body">
                        <p>${co.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-primary" onclick= onEdit(this) >Edit</button>
                        <button class="btn btn-danger" onclick= onRemove(this)>Remove</button>
                    </div>
                </div>
            </div>`
        document.getElementById('apitemp').innerHTML = result
    })
}


const onsubmitHandler = (eve) => {
    eve.preventDefault()
    xhr.open("POST", API_URL, true)
    xhr.onload = function () {
        if (xhr.status === 200 && xhr.status <= 299) {
            console.log("Data posted successfully");
        }
        else {
            console.error("Error:", xhr.status)
        }
    };
    let cardObj = {
        title: cardtitleCtrl.value,
        body: cardbodyCtrl.value,
        userId: useridCtrl.value,
        id: '101'
    }

    xhr.send(JSON.stringify(cardObj));

    const newDiv = document.createElement('div')
    newDiv.className = 'col-md-4 mb-3'
    newDiv.innerHTML = ` <div class="card border-dark h-100" id=${cardObj.id}>
                    <div class="card-header d-flex align-items-center justify-content-between">
                        <h3>${cardObj.title}</h3>
                        <h5>${cardObj.userid}</h5>
                    </div>
                    <div class="card-body">
                        <p>${cardObj.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button class="btn btn-primary" onclick= onEdit(this) >Edit</button>
                        <button class="btn btn-danger" onclick= onRemove(this)>Remove</button>
                    </div>
                </div>`

    document.getElementById('apitemp').prepend(newDiv)
}
xhr.onload = function () {
    if (xhr.status === 200 && xhr.status <= 299) {
        let data = JSON.parse(xhr.response);
        console.log(data);
        templating(data)
    }
    else {
        console.error("Error:", xhr.status)
    }
}
xhr.send()


cardform.addEventListener('submit', onsubmitHandler)
updatebtnCtrl.addEventListener('click', onupdateHnadler)