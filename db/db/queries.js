import { query } from './connection';

const getDepartments = async () => {
  const { rows } = await query('SELECT * FROM department');
  console.table(rows);
};

export default { getDepartments };
