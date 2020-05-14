<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    public function addUser(Request $request) {
        if($request->ajax()) {
            return response()->json(json_encode(['message' => 'działa!', 'errors' => '', 'success' => true]), 200);
        }
        return response()->json(json_encode(['message' => 'Unauthorized!', 'errors' => '']), 401);
    }
}
