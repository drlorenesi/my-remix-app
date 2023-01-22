import { query, execute } from '../config/db.server.js';

export async function getPosts() {
  const { rows } = await query('SELECT * FROM posts');
  return rows;
}

export async function getPost(id) {
  const { rows } = await execute('SELECT * FROM posts WHERE id = ?', [id]);
  return rows[0];
}

export async function addPost(title, body) {
  const data = await execute('INSERT INTO posts (title, body) VALUES (?, ?)', [
    title,
    body,
  ]);
  return data;
}

export async function deletePost(id) {
  const data = await execute('DELETE FROM posts WHERE id = ?', [id]);
  return data;
}
