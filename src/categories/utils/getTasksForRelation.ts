import { Task } from "src/tasks/entities/task.entity";

export async function getTasksForRelation(func, ids: number[], userId: number): Promise<Task[]> {
    let tasks: Task[] = [];
    if (ids) { 
        const tasksPromises = ids.map(async (id) => {
          return await func.findById(id, userId);
        });
        const tasksResults = await Promise.all(tasksPromises);
        tasks = tasksResults.filter(task => task !== null).flat();
      }

    return tasks;
}