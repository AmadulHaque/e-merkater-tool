<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStaffRequest;
use App\Http\Requests\UpdateStaffRequest;
use App\Http\Resources\StaffResource;
use App\Models\Staff;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StaffController extends Controller
{
    public function index()
    {
        // Simple authorization check
        if (!auth()->user()->hasPermission('manage_users')) {
            abort(403);
        }

        $staff = Staff::with('roles')->paginate(10);

        return Inertia::render('Admin/Staff/Index', [
            'staff' => StaffResource::collection($staff),
        ]);
    }

    public function store(StoreStaffRequest $request)
    {
        if (!auth()->user()->hasPermission('manage_users')) {
            abort(403);
        }

        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);

        $staff = Staff::create($data);

        if (isset($data['roles'])) {
            $staff->roles()->sync($data['roles']);
        }

        return redirect()->back()->with('success', 'Staff member created successfully.');
    }

    public function update(UpdateStaffRequest $request, Staff $staff)
    {
        if (!auth()->user()->hasPermission('manage_users')) {
            abort(403);
        }

        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $staff->update($data);

        if (isset($data['roles'])) {
            $staff->roles()->sync($data['roles']);
        }

        return redirect()->back()->with('success', 'Staff member updated successfully.');
    }

    public function destroy(Staff $staff)
    {
        if (!auth()->user()->hasPermission('manage_users')) {
            abort(403);
        }

        if ($staff->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete yourself.');
        }

        $staff->delete();

        return redirect()->back()->with('success', 'Staff member deleted successfully.');
    }
}
