import { prompt } from 'inquirer';
import { getDepartments, getRoles, getEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole } from './db/queries';

const mainMenu = async () => {
  console.log('\n=== Employee Tracker ===\n');

  const { choice } = await prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'What would you like to do?',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    },
  ]);

  switch (choice) {
    case 'View all departments':
      await getDepartments();
      break;
    case 'View all roles':
      await getRoles();
      break;
    case 'View all employees':
      await getEmployees();
      break;
    case 'Add a department':
      await handleAddDepartment();
      break;
    case 'Add a role':
      await handleAddRole();
      break;
    case 'Add an employee':
      await handleAddEmployee();
      break;
    case 'Update an employee role':
      await handleUpdateEmployeeRole();
      break;
    case 'Exit':
      console.log('Goodbye!');
      process.exit();
      break;
    default:
      console.log('Invalid choice.');
  }

  mainMenu(); // Loop back to the main menu after each action
};

const handleAddDepartment = async () => {
  const { name } = await prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
    },
  ]);

  await addDepartment(name);
};

const handleAddRole = async () => {
  const { title, salary, department_id } = await prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the new role:',
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for this role:',
      validate: (input) => !isNaN(input) || 'Please enter a valid number.',
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for this role:',
      validate: (input) => !isNaN(input) || 'Please enter a valid number.',
    },
  ]);

  await addRole(title, salary, department_id);
};

const handleAddEmployee = async () => {
  const { first_name, last_name, role_id, manager_id } = await prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:',
    },
    {
      type: 'input',
      name: 'role_id',
      message: 'Enter the role ID for the employee:',
      validate: (input) => !isNaN(input) || 'Please enter a valid number.',
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee (or leave blank for none):',
      validate: (input) => input === '' || !isNaN(input) || 'Please enter a valid number.',
    },
  ]);

  await addEmployee(first_name, last_name, role_id, manager_id || null);
};

const handleUpdateEmployeeRole = async () => {
  const { employee_id, new_role_id } = await prompt([
    {
      type: 'input',
      name: 'employee_id',
      message: 'Enter the ID of the employee to update:',
      validate: (input) => !isNaN(input) || 'Please enter a valid number.',
    },
    {
      type: 'input',
      name: 'new_role_id',
      message: 'Enter the new role ID for the employee:',
      validate: (input) => !isNaN(input) || 'Please enter a valid number.',
    },
  ]);

  await updateEmployeeRole(employee_id, new_role_id);
};

// Start the application
mainMenu();
