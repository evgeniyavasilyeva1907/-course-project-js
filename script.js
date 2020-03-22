let dataTask =[]; 
let removeTask = []; 
let doneTask=[]; 
let editObj;
 


    if(localStorage.getItem("dataTask") !== null){
        dataTask = JSON.parse(localStorage.getItem("dataTask"))
        getTable();
    }
    else {localStorage.setItem("dataTask",JSON.stringify(dataTask))
    getTable();
    }
        
    if(localStorage.getItem("doneTask") !== null){
        doneTask = JSON.parse(localStorage.getItem("doneTask")) 
        doneTable();
    }
    else {localStorage.setItem("doneTask",JSON.stringify(doneTask))
    doneTable();
}
        
    if(localStorage.getItem("removeTask") !== null){
        removeTask = JSON.parse(localStorage.getItem("removeTask"))
        removeTable()
    }
    else {localStorage.setItem("removeTask",JSON.stringify(removeTask))
    removeTable()
}
        



/*открытие модального окна*/ 
document.querySelector('.add-user').addEventListener('click', function(){ 
    document.querySelector('.form').style.display = 'block' 
    close(); 
}) 

/*редактровать в текущих задачах*/ 
document.addEventListener('click',function(e){ 
    var id; 
    if(e.target.className === 'edit-btn'){ 
        id = +(e.target.closest('tr').dataset.id); 
        var input = document.querySelectorAll('.field'); 
        editObj = id+""; 
        console.log(id) 
        for(var i = 0; i < input.length; i++){ 
            input[i].value = dataTask[id][input[i].getAttribute('name')] 
    } 
    
    document.querySelector('.form').style.display = 'block'} 
    
    getTable(); 
}) 
/*добавление новой задачи*/ 
document.querySelector('.add').addEventListener('click', function(e){ 
        e.preventDefault(); 
        let data = {}; 
        let input = document.querySelectorAll('.field'); 
         
        if (document.querySelector('#taskName').value.replace(/\s/g, '').length == 0) { 
            document.querySelector('#taskName').style.border = "1px solid red" 
            document.querySelector('#labelTaskName').style.color = 'red' 
            alert("Введите название задачи") 
        } 
        else { 
            for( let i = 0; i<input.length;i++){ 
                data[input[i].getAttribute('name')] = input[i].value;} 
                     if(editObj) { 
                        dataTask.splice(editObj,1, data); 
                        editObj = null 
                         } 
                     else {dataTask.push(data);

                        } 
          localStorage.setItem('dataTask', JSON.stringify(dataTask));
          getTable(); 
          clearForm(); 
          document.querySelector('.form').style.display = "none" 
        } 
   })

/*закрытие модального окна*/
function close(){
    let close = document.querySelectorAll('.closed');
    for (var i = 0; i< close.length; i++) {
        close[i].addEventListener('click', function(e){
        let modal = document.querySelector('.form')
        modal.style.display = "none"})
    }
 document.querySelector('.form').addEventListener('click', function(e){
    if (e.target.className == "form")
        {
        document.querySelector('.form').style.display = "none"
    }
 })
    clearForm()
}


/*удалить в текущих задачах*/
document.addEventListener('click',function(e){
    var id;
    if(e.target.className === "remove-btn")
    {id = +(e.target.closest('tr').dataset.id);
    var remove = dataTask.splice(id, 1);
    removeTask = [...removeTask, ...remove];}
    localStorage.setItem('removeTask', JSON.stringify(removeTask))
    getTable();
    removeTable();
    
})



/*выполнено в текущих задачах*/
document.addEventListener('click',function(e){
    var id;
    if(e.target.className === "done-btn")
    {id = +(e.target.closest('tr').dataset.id);
    var done = dataTask.splice(id, 1);
    doneTask = [...doneTask, ...done];}
    localStorage.setItem('doneTask', JSON.stringify(doneTask))
    getTable();
    doneTable();
    
    })


/*удалить в выполненных задачах*/
document.addEventListener('click',function(e){
    var id_done;
    if(e.target.className === "done-remove-btn")
    {id_done = +(e.target.closest('tr').dataset.id);
    var remove_done = doneTask.splice(id_done, 1);
    removeTask = [...removeTask, ...remove_done];}
    localStorage.setItem('removeTask', JSON.stringify(removeTask))
    removeTable();
    doneTable();
    
})

/*восстановить в удаленных задачах задачах*/
document.addEventListener('click',function(e){
    var id_done;
    if(e.target.className === "return")
    {id_done = +(e.target.closest('tr').dataset.id);
    var ret = removeTask.splice(id_done, 1);
    dataTask = [...dataTask, ...ret];}
    localStorage.setItem('dataTask', JSON.stringify(dataTask))
    getTable();
    removeTable();
    
})

function getTable(){
    let str ='';
  
    for (let i =0; i< dataTask.length; i++) {
        str +='<tr data-id="' + i + '">' +
        '<td></td>'+    
        '<td>' + dataTask[i].taskName +'</td>' +
        '<td>' + dataTask[i].description +'</td>' +
        '<td>' + dataTask[i].priority+ '</td>' +
        '<td><button class="edit-btn">Редактировать</button></td>'+
        '<td><button class="done-btn">Выполнено</button></td>'+
        '<td><button class="remove-btn">Удалить</button></td></tr>'
    }
    document.querySelector('.table_add').innerHTML = str;

   
}
function removeTable(){
    let str ='';
    for (let i =0; i< removeTask.length; i++) {
        str +='<tr data-id="' + i + '">' +
        '<td></td>'+    
        '<td>' + removeTask[i].taskName +'</td>' +
        '<td>' + removeTask[i].description +'</td>' +
        '<td>' + removeTask[i].priority+ '</td>' +
        '<td><button class="return">Восстановить</button></td></tr>'
    }
    document.querySelector('.table_return').innerHTML = str;
    
}
function doneTable(){
    let str ='';
    for (let i =0; i< doneTask.length; i++) {
        str +='<tr data-id="' + i + '">' +
        '<td></td>'+    
        '<td>' + doneTask[i].taskName +'</td>' +
        '<td>' + doneTask[i].description +'</td>' +
        '<td>' + doneTask[i].priority+ '</td>' +
        '<td><button class="done-remove-btn">Удалить</button></td></tr>'
    }
    document.querySelector('.table_done').innerHTML = str;
    
}
 function clearForm(){
    var input = document.querySelectorAll('.field');
    for(var i = 0; i < input.length-1; i++){
      input[i].value = '';
        }
       
      document.querySelector('#taskName').style.border = "1px solid rgb(169, 169, 169)"
      document.querySelector('#labelTaskName').style.color = 'black'

     }




