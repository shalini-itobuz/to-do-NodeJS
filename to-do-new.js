const fs = require('fs');
if (!fs.existsSync('db.json')) {
  fs.writeFileSync('db.json', '[]');
}
const tasks = [];

function readTasks() {
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.log('Error reading file:', err);
      return;
    }
    tasks.length = 0;
    if(data) {
      // tasks.push(JSON.parse());
    }
  });
}
function writeTasks() {
  fs.writeFile('db.json', JSON.stringify(tasks), (err) => {
    if (err) {
      console.log('Error writing file:', err);
      return;
    }
  });
}
function addTask() {
  process.stdout.write('Enter the task: ');
  process.stdin.once('data', (task) => {
    const currentDate = new Date().toLocaleDateString();
    tasks.push({ task: task.toString().trim(), date: currentDate });
    console.log('Task added successfully.');
    writeTasks();
    menu();
  });
}
function displayTasks() {
  console.log('Tasks:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task} - ${task.date}`);
   

  } );
  menu();
}
function deleteTask() {
  process.stdout.write('Enter the index of the task to delete: ');
  process.stdin.once('data', (index) => {
    if (index > 0 && index <= tasks.length) {
      tasks.splice(index - 1, 1);
      console.log('Task deleted successfully.');
    } else {
      console.log('Invalid index.');
    }
    writeTasks();
    menu();

  });
}
function menu() {
  console.log('\nMenu:');
  console.log('1. Add a new task');
  console.log('2. Display tasks');
  console.log('3. Delete a task');
  console.log('4. Exit');
  process.stdout.write('Enter your choice (1-4): ');
  process.stdin.once('data', (choice) => {
    switch (choice.toString().trim()) {
      case '1':
        addTask();
        break;
      case '2':
        displayTasks();
        break;
      case '3':
        deleteTask();
        break;
      case '4':
        process.exit();
        break;
      default:
        console.log('Invalid choice');
        menu();
        break;
    }
  });
}
readTasks();
menu();