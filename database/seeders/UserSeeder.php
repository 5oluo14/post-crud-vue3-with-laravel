<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $super = User::factory()->create();
        $super->assignRole('super-admin');

        $editor = User::factory()->create();
        $editor->assignRole('editor');
    }
}
