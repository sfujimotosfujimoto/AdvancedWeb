$(document).ready(function() {
  $.getJSON("/api/todos").then(addTodos);

  $("#todoInput").keypress(event => {
    if (event.which === 13) {
      createTodo();
    }
  });

  $(".list").on("click", "li", function() {
    // console.log($(this));
    updateTodo($(this));
  });

  $(".list").on("click", "span", function(e) {
    e.stopPropagation(); // stops event bubbling to the li element
    removeTodo($(this).parent());
  });
});

function addTodos(todos) {
  // add todos to page here
  todos.forEach(todo => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  const newTodo = $('<li class="task">' + todo.name + " <span>X</span></li>");
  newTodo.data("id", todo._id); // jquery can store data
  newTodo.data("completed", todo.completed);
  if (todo.completed) {
    newTodo.addClass("done");
  }
  $(".list").append(newTodo);
}

function createTodo() {
  // send request to todo
  const usrInput = $("#todoInput").val();
  // console.log(usrInput);
  $.post("/api/todos", { name: usrInput })
    .then(newTodo => {
      $("#todoInput").val("");
      addTodo(newTodo);
    })
    .catch(err => {
      console.log(err);
    });
}

function removeTodo(todo) {
  const clickedId = todo.data("id"); // .data is the data jquery stored
  const deleteUrl = "/api/todos/" + clickedId;
  $.ajax({
    method: "DELETE",
    url: deleteUrl
  }).then(data => {
    todo.remove();
  });
}

function updateTodo(todo) {
  const updateUrl = "/api/todos/" + todo.data("id");
  const isDone = !todo.data("completed");
  const updateData = { completed: !isDone };
  // console.log(updateData);
  $.ajax({
    method: "PUT",
    url: updateUrl,
    data: updateData
  }).then(updatedTodo => {
    todo.toggleClass("done");
    todo.data("completed", isDone);
  });
}
