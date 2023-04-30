<?php

use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [UserAuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function(){
    Route::post('/logout', [UserAuthController::class, 'logout']);
    Route::get('/todos', [TodoController::class, 'index']);
    Route::get('/todos/{id}', [TodoController::class, 'show']);
    Route::post('/todos', [TodoController::class, 'store']);
    Route::put('/todos/{id}', [TodoController::class, 'update']);
    Route::put('/todos/completed/{id}', [TodoController::class, 'changeCompletedStatus']);
    Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
});
