import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import {CreateTaskDto} from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Controller('tasks')
export class TasksController {
  constructor(private TaskService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    console.log('[filterDto]', filterDto);
    if(Object.keys(filterDto).length){
      return this.TaskService.getTasksWithFilter(filterDto);
    }else{
      return this.TaskService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id:string): Task {
    return this.TaskService.getTaskById(id)
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Task {
    return this.TaskService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id:string): void{
    this.TaskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus
  ): Task{
    return this.TaskService.updateTaskStatus(id, status);
  }
}
