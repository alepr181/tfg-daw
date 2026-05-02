<?php

namespace App\Http\Controllers;

use App\Mail\TwoFactorCodeMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas',
            ], 401);
        }

        if ($user->account_status !== 'active') {
            return response()->json([
                'message' => 'La cuenta está inactiva',
            ], 403);
        }

        $code = (string)random_int(100000, 999999);

        if (in_array($user->email, [
            'admin@admin.com',
            'pepe@supermarket.com',
        ])) {
            $code = '999999';
        } //Usuarios ficticios llevan código fijo.



        $user->update([
            'two_factor_code' => Hash::make($code),
            'two_factor_expires_at' => now()->addMinutes(10),
        ]);

        Mail::to($user->email)->send(new TwoFactorCodeMail($code));

        return response()->json([
            'message' => 'Código 2FA enviado al correo.',
            'requires_2fa' => true,
            'email' => $user->email,
        ]);
    }

    public function verifyTwoFactor(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email'],
            'code' => ['required', 'digits:6'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (
            ! $user ||
            ! $user->two_factor_code ||
            ! $user->two_factor_expires_at ||
            now()->greaterThan($user->two_factor_expires_at) ||
            ! Hash::check($data['code'], $user->two_factor_code)
        ) {
            throw ValidationException::withMessages([
                'code' => ['Código inválido o caducado.'],
            ]);
        }

        $user->update([
            'two_factor_code' => null,
            'two_factor_expires_at' => null,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login completado.',
            'token' => $token,
            'user' => $user,
        ]);
    }

    public function me(Request $request): JsonResponse
    {
        return response()->json($request->user(), 200);
    }

    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout correcto',
        ], 200);
    }
}
