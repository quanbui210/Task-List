
const firebaseConfig = {
    apiKey: "AIzaSyBCx4RtBe-saMwYu97C3oEe6eFHSZLrXKg",
    authDomain: "todolist-4a5c4.firebaseapp.com",
    projectId: "todolist-4a5c4",
    storageBucket: "todolist-4a5c4.appspot.com",
    messagingSenderId: "441793435889",
    appId: "1:441793435889:web:940411772d6115e6ab7150"
  };

  firebase.initializeApp({
    firebaseConfig,
    databaseURL: "https://todolist-4a5c4-default-rtdb.firebaseio.com/"
  });
  
  // Get a reference to the database
  const database = firebase.database();

  // Get a reference to the form and input field
  const form = document.querySelector('#todo-form');
  const input = document.querySelector('#todo-input');
  
  // Add a submit event listener to the form
  form.addEventListener('submit', (event) => {
    // Prevent the form from being submitted
    event.preventDefault();
    

    // Get the value of the input field
    const todo = input.value;
    if (todo === '') {
      window.alert('Task cannot be empty')
    } else {
      input.value = '';
      database.ref('todos').push({
        todo: todo
      });
    }
    // Clear the input field
  });
  console.log(database.ref('todos'))
  
  
  // Add a real-time listener to the database
  database.ref('todos').on('value', (snapshot) => {
    // Get the to-do list element
    const list = document.querySelector('#todo-list');
    
    // Clear the list
    list.innerHTML = '';
    
    // Get the to-do items from the database
    const todos = snapshot.val();
    
    // Iterate over the to-do items and add them to the list
    for (let todo in todos) {
      const li = document.createElement('li');
      li.textContent = todos[todo].todo;
      list.appendChild(li);
      const editBtn = document.createElement('button')
      editBtn.textContent = 'Edit'
      editBtn.classList.add('btn-edit');
      list.appendChild(editBtn);
      const deleteBtn = document.createElement('button')
      deleteBtn.textContent = 'Delete';
      list.appendChild(deleteBtn);
      deleteBtn.classList.add('btn-delete');
      deleteBtn.addEventListener('click', () => {
      database.ref("todos/" + todo).remove();
      })
    }
  });
