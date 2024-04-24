import { Task } from "src/tasks/entities/task.entity";
import { TasksService } from "src/tasks/tasks.service";

export async function getTasksForRelation(func: TasksService, ids: number[], userId: number): Promise<Task[]> {
    let tasks: Task[] = [];
  try {
    if (ids) { 
        const tasksPromises = ids.map(async (id) => {
          return await func.findById(id, userId);
        });
        const tasksResults = await Promise.all(tasksPromises);
        tasks = tasksResults.filter(task => task !== null).flat();
      }
    return tasks;
  } catch (error) {
    throw new Error(error.message)
  }
}