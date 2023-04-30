<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $todos = Todo::where('user_id', $request->user()->id)
        ->orderBy('completed', 'asc')
        ->orderBy('id', 'desc')
        ->get();
        return response()->json([
            'todos' => $todos
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3|max:200'
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 422);
        }

        $todo = new Todo();
        $todo->title = $request->title;
        $todo->user_id = $request->user()->id;
        $todo->save();

        return response()->json([
            'todo' => $todo,
            'message' => 'Todo Created'
        ], 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $todo = Todo::where('user_id', $request->user()->id)
        ->where('id', $request->id)
        ->first();

        if(!$todo){
            return response()->json([
                'error' => 'Todo not found',
            ], 404);
        }

        return response()->json([
            'todo' => $todo
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|min:3|max:200',
            'completed' => 'between:0,1'
        ]);

        if($validator->fails()){
            return response()->json(['error'=>$validator->errors()], 422);
        }

        $todo = Todo::where('user_id', $request->user()->id)
        ->where('id', $request->id)
        ->first();

        if(!$todo){
            return response()->json([
                'error' => 'Todo not found',
            ], 404);
        }

        $todo->title = $request->title;
        $todo->save();

        return response()->json([
            'todo' => $todo,
            'message' => 'Todo Updated'
        ], 200);
    }

    public function changeCompletedStatus(Request $request){
        $todo = Todo::where('user_id', $request->user()->id)
        ->where('id', $request->id)
        ->first();

        if(!$todo){
            return response()->json([
                'error' => 'Todo not found',
            ], 404);
        }

        $todo->completed = $request->completed;
        $todo->save();

        $message = $request->completed ? 'Todo marked as complete' : 'Todo marked as incomplete';

        return response()->json([
            'todo' => $todo,
            'message' => $message
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $todo = Todo::where('user_id', $request->user()->id)
        ->where('id', $request->id)
        ->first();

        if(!$todo){
            return response()->json([
                'error' => 'Todo not found',
            ], 404);
        }

        $todo->delete();

        return response()->json([
            'todo' => $todo,
            'message' => 'Todo Deleted'
        ], 200);
    }
}
