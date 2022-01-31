import { Todo } from './model';

// export the create method. This is like an endpoint that we'll be able to call from our web app.
export function create(task: string): Todo {
  // use the Todo class to persist the todo data
  return Todo.insert(task);
}

export function getById(id: u32): Todo {
  return Todo.findById(id);
}

export function get(offset: u32, limit: u32 = 10): Todo[] {
  return Todo.find(offset, limit);
}
