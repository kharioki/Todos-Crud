import { PersistentUnorderedMap, math } from "near-sdk-as";

// think of this PersistentUnorderedMap like a database table
// We'll use this to persist and retrieve data
export const todos = new PersistentUnorderedMap<u32, Todo>("todos");

// Think of this like a model class in something like mongoose
// or
// sequelize. It defines the shape or schema for our data. It will
// also contain static methods to read and write data from and to the todos PersistentUnorderedMap.

@nearBindgen
export class PartialTodo {
    task: string;
    done: bool;
}

@nearBindgen
export class Todo {
    id: u32;
    task: string;
    done: bool;

    constructor(task: string) {
        this.id = math.hash32<string>(task);
        this.task = task;
        this.done = false;
    }

    static insert(task: string): Todo {
        // create a new Todo
        const todo = new Todo(task);

        // add the todo to the PersistentUnorderedMap
        // where the key is the todo's id and the value is the todo itself.
        // Think of it like an INSERT statement in SQL
        todos.set(todo.id, todo);

        return todo;
    }

    static findById(id: u32): Todo {
        // get the todo from the PersistentUnorderedMap
        // where the key is the todo's id and the value is the todo itself.
        // Think of it like a SELECT statement in SQL
        return todos.getSome(id);
    }

    static find(offset: u32, limit: u32): Todo[] {
        // the PersistentUnorderedMap values method will take two parameters: start and end.
        // we'll start at the offset(skipping all todos before the offset) and collect all todos 
        // until we reach the offset + limit todo.
        // For example, if offset is 10 and limit is 3 then this would return the 10th, 11th, and 12th todo.
        return todos.values(offset, offset + limit);
    }

    static findByIdAndUpdate(id: u32, partial: PartialTodo): Todo {
        // find a todo by its id
        const todo = this.findById(id);

        // update the todo-in-memory
        todo.task = partial.task;
        todo.done = partial.done;

        // persist the updated todo
        todos.set(id, todo);

        return todo;
    }
}
