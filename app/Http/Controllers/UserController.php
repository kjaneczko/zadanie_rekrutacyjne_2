<?php

namespace App\Http\Controllers;

use App\UserAddress;
use App\UserEducation;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * @OA\Post(
     *   path="/api/auth/user/create",
     *   summary="Register new user with all needed data",
     *   @OA\Response(response=201, description="created"),
     *   @OA\Response(response=400, description="validation error"),
     *   @OA\Response(response=401, description="unauthorized"),
     *   @OA\Response(response=500, description="internal server error"),
     *		@OA\Property(
     *          property="newUserData",
     *          required=true,
     *          type="json",
     *          description=""
     *      )
     * )
     *
     */
    public function create(Request $request) {
        if($request->ajax()) {
            $validator = Validator::make($request->newUserData, [
                'email' => 'required|unique:users|max:255|email',
                'name' => 'required',
                'lastName' => 'required',
            ], [
                'email.required' => 'Pole email jest wymagane!',
                'email.unique' => 'Podany adres email już występuje w bazie!',
                'email.max' => 'Długość adresu email przekroczyła 255 znaków!',
                'email.emaio' => 'Błędny format adresu email!',
                'name.required' => 'Pole imię jest wymagane!',
                'lastName.required' => 'Pole nazwisko jest wymagane!',
            ]);

            if($validator->fails()) {
                return response()->json(['message' => $validator->errors(), 'success' => false], 400);
            }

            $newUser = new User();
            $newUser->name = $request->newUserData['name'];
            $newUser->last_name = $request->newUserData['lastName'];
            $newUser->email = $request->newUserData['email'];
            $newUser->phone = $request->newUserData['phone'];
            $newUser->password = Hash::make($request->newUserData['password']);
            $newUser->remember_token =  Str::random(10);
            $newUser->save();

            $newUser->user_position()->sync($request->newUserData['positions']);

            $newAddress = new UserAddress();
            $newAddress->user_id = $newUser->id;
            $newAddress->street = $request->newUserData['address']['street'];
            $newAddress->house_number = $request->newUserData['address']['houseNumber'];
            $newAddress->apartment_number = $request->newUserData['address']['apartmentNumber'];
            $newAddress->zip_code = $request->newUserData['address']['zipCode'];
            $newAddress->city = $request->newUserData['address']['city'];
            $newAddress->voivodeship = $request->newUserData['address']['voivodeship'];
            $newAddress->address_type_id = 1;
            $newAddress->save();

            $newUser->address()->save($newAddress);

            $newAddress = new UserAddress();
            $newAddress->user_id = $newUser->id;
            $newAddress->street = $request->newUserData['correspondenceAddress']['street'];
            $newAddress->house_number = $request->newUserData['correspondenceAddress']['houseNumber'];
            $newAddress->apartment_number = $request->newUserData['correspondenceAddress']['apartmentNumber'];
            $newAddress->zip_code = $request->newUserData['correspondenceAddress']['zipCode'];
            $newAddress->city = $request->newUserData['correspondenceAddress']['city'];
            $newAddress->voivodeship = $request->newUserData['correspondenceAddress']['voivodeship'];
            $newAddress->address_type_id = 2;
            $newAddress->save();

            $newUser->address()->save($newAddress);

            if(count($request->newUserData['education']) > 1) {
                foreach($request->newUserData['education'] as $index => $education) {
                    if(is_numeric($index)) {
                        $newEducation = new UserEducation();
                        $newEducation->user_id = $newUser->id;
                        $newEducation->university = $education['universityName'];
                        $newEducation->field_of_study = $education['fieldOfStudy'];
                        $newEducation->year_of_graduation = $education['yearOfGraduation'];
                        $newEducation->save();
                        $newUser->education()->save($newEducation);
                    }
                }
            }
            return response()->json(['message' => 'działa!', 'errors' => '', 'success' => true], 201);
        }
        return response()->json(['message' => 'Unauthorized!', 'errors' => ''], 401);
    }

    /**
     * @OA\Post(
     *   path="/api/auth/user/show",
     *   summary="Fetch users",
     *   @OA\Response(response=200, description="successful operation"),
     *   @OA\Response(response=401, description="unauthorized"),
     *   @OA\Response(response=500, description="internal server error")
     * )
     *
     */
    public function index(Request $request) {
        if($request->ajax()) {
            $users = User::with([
                'positions' => function($q) {
                    $q->with('name');
                }
            ])->paginate(10);
            return response()->json(['message' => 'działa!', 'errors' => '', 'success' => true, 'users' => $users], 200);
        }
        return response()->json(json_encode(['message' => 'Unauthorized!', 'errors' => '']), 401);
    }

    /**
     * @OA\Post(
     *   path="/api/auth/user/show/{id}",
     *   summary="Fetch user data",
     *   @OA\Response(response=200, description="successful operation"),
     *   @OA\Response(response=401, description="unauthorized"),
     *   @OA\Response(response=500, description="internal server error")
     * )
     *
     */
    public function show(Request $request, User $user) {
        if($request->ajax()) {
            $user = $user->with([
                'positions' => function($q) {
                    $q->with('name');
                },
                'address',
                'education'
            ])
                ->where('id', $user->id)
                ->first();
            return response()->json(['message' => 'działa!', 'success' => true, 'data' => $user], 200);
        }
        return response()->json(json_encode(['message' => 'Unauthorized!', 'errors' => '']), 401);
    }

    /**
     * @OA\Post(
     *   path="/api/auth/user/edit/{id}",
     *   summary="Fetch user data",
     *   @OA\Response(response=200, description="successful operation"),
     *   @OA\Response(response=401, description="unauthorized"),
     *   @OA\Response(response=500, description="internal server error")
     * )
     *
     */
    public function edit(Request $request, User $user) {
        if($request->ajax()) {
            dd($user);
            $user = User::with([
                'positions' => function($q) {
                    $q->with('name');
                },
                'address',
                'education'
            ])
            ->where('id', $request->id)
            ->first();
            return response()->json(['message' => 'działa!', 'success' => true, 'data' => $user], 200);
        }
        return response()->json(json_encode(['message' => 'Unauthorized!', 'errors' => '']), 401);
    }

    /**
     * @OA\Post(
     *   path="/api/auth/user/remove/{id}",
     *   summary="Fetch user data",
     *   @OA\Response(response=200, description="successful operation"),
     *   @OA\Response(response=401, description="unauthorized"),
     *   @OA\Response(response=500, description="internal server error")
     * )
     *
     */
    public function remove(Request $request, User $user) {
        if($request->ajax()) {
            dd($user);
            $user = User::with([
                'positions' => function($q) {
                    $q->with('name');
                },
                'address',
                'education'
            ])
            ->where('id', $request->id)
            ->first();
            return response()->json(['message' => 'działa!', 'success' => true, 'data' => $user], 200);
        }
        return response()->json(json_encode(['message' => 'Unauthorized!', 'errors' => '']), 401);
    }
}
