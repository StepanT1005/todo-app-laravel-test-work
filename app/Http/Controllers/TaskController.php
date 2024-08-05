<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Task::orderBy('is_completed', 'asc')->get();
        return response()->json($tasks);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'required|date',
        ]);

        $tasksForTheDay = Task::where('due_date', $request->due_date)
                              ->where('is_completed', false)
                              ->count();

        if ($tasksForTheDay >= 2) {
            return response()->json(['message' => 'Only 2 incomplete tasks are allowed per day.'], 400);
        }

        $taskData = $request->all();
        if (!isset($taskData['is_completed'])) {
            $taskData['is_completed'] = false;
        }

        $task = Task::create($taskData);
        return response()->json($task, 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'required|date',
        ]);

        $tasksForTheDay = Task::where('due_date', $request->due_date)
        ->where('is_completed', false)
        ->where('id', '!=', $id)
        ->count();
        ;

        if ($tasksForTheDay >= 2 && !$request->is_completed) {
            return response()->json(['message' => 'Only 2 incomplete tasks are allowed per day.'], 400);
        }

        $task->update($request->all());

        return response()->json($task);
    }

    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(null, 204);
    }
}
