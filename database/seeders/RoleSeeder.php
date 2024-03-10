<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superAdmin = Role::create(['name' => 'super-admin']);
        $editor = Role::create(['name' => 'editor']);
        $permissions = [
            'posts.create',
            'posts.update',
            'posts.delete'
        ];
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
        $superAdmin->syncPermissions(Permission::pluck('id'));
        $editor->syncPermissions(Permission::whereNot('name', 'posts.delete')->pluck('id'));
    }
}
