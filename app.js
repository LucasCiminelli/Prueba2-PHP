$(document).ready(function () {
  let edit = false;

  console.log("jQuery is working");
  $("#task-result").hide();
  fetchTasks();

  $("#search").keyup(function () {
    if ($("#search").val()) {
      const search = $("#search").val();

      $.ajax({
        url: "task-search.php",
        type: "POST",
        data: { search },
        success: function (res) {
          const tasks = JSON.parse(res);
          let template = "";
          tasks.forEach((task) => {
            template += `
            <li>
            ${task.name}
            </li>`;
          });

          $("#container").html(template);
          $("#task-result").show();
        },
      });
    }
  });

  $("#task-form").submit(function (e) {
    e.preventDefault();

    const postData = {
      id: $("#taskId").val(),
      name: $("#name").val(),
      description: $("#description").val(),
    };
    let url = edit === false ? "task-add.php" : "task-edit.php";

    $.post(url, postData, function (response) {
      fetchTasks();
      console.log(response);
      $("#task-form").trigger("reset");
      edit = false;
    });
  });

  //Se ejecuta cuando se ejecuta la aplicación porque no está dentro de ningún evento que lo active.
  function fetchTasks() {
    $.ajax({
      url: "task-list.php",
      type: "GET",
      success: function (res) {
        const tasks = JSON.parse(res);
        let template = "";

        tasks.forEach((task) => {
          template += `
            <tr taskId="${task.id}">
                <td>${task.id}</td>
                <td>
                <a href="#" class="task-item">${task.name}</a>
                </td>
                <td>${task.description}</td>
                <td>
                    <button class="task-delete btn btn-danger">Delete</button>
                </td>
            </tr>`;
        });

        $("#tasks").html(template);
      },
    });
  }

  $(document).on("click", ".task-delete", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      let element = $(this)[0].parentElement.parentElement;
      let id = $(element).attr("taskId");

      $.post("task-delete.php", { id }, function (res) {
        fetchTasks();
        console.log("Task deleted successfully");
      });
    }
  });

  $(document).on("click", ".task-item", function () {
    let element = $(this)[0].parentElement.parentElement;
    let id = $(element).attr("taskId");
    $.post("task-single.php", { id }, function (res) {
      const task = JSON.parse(res);

      $("#name").val(task.name);
      $("#description").val(task.description);
      $("#taskId").val(task.id);
      edit = true;
      fetchTasks();
    });
  });
});
