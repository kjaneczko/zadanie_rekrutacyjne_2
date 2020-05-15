<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\User;

class AuthController extends Controller
{
    /**
     * @OA\Post(
     *   path="/api/auth/signup",
     *   summary="Register user",
     *   operationId="signup",
     *   @OA\Response(response=200, description="successful operation"),
     *   @OA\Response(response=406, description="not acceptable"),
     *   @OA\Response(response=500, description="internal server error"),
     *		@OA\Property(
     *          property="name",
     *          required=true,
     *          type="string",
     *          description=""
     *      ),
     *		@OA\Property(
     *          property="email",
     *          required=true,
     *          type="string",
     *          description=""
     *      ),
     *		@OA\Property(
     *          property="password",
     *          required=true,
     *          type="string",
     *          description=""
     *      ),
     * )
     *
     */
    public function signup(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $user->save();

        return response()->json([
            'success' => true,
            'id' => $user->id,
            'name' => $user->first_name,
            'email' => $user->email,
        ], 201);
    }

    /**
     * @OA\Post(
     *   path="/api/auth/login",
     *   summary="Login",
     *   operationId="login",
     *   @OA\Response(response=202, description="accepted"),
     *   @OA\Response(response=401, description="unauthorized"),
     *   @OA\Response(response=500, description="internal server error"),
     *		@OA\Property(
     *          property="email",
     *          required=true,
     *          type="string",
     *          description=""
     *      ),
     *		@OA\Property(
     *          property="password",
     *          required=true,
     *          type="string",
     *          description=""
     *      ),
     *		@OA\Property(
     *          property="remember_me",
     *          required=false,
     *          type="boolean",
     *          description=""
     *      ),
     * )
     *
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            'remember_me' => 'boolean'
        ]);
        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }
        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }
        $token->save();

        return response()->json([
            'success' => true,
            'id' => $user->id,
            'name' => $user->first_name,
            'email' => $user->email,
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()
        ], 202);
    }

    /**
     * @OA\Post(
     *   path="/api/auth/logout",
     *   summary="Logout - revoke token",
     *   operationId="logout",
     *   @OA\Response(response=200, description="successful operation"),
     *   @OA\Response(response=500, description="internal server error")
     * )
     *
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Successfully logged out'
        ], 200);
    }
}
