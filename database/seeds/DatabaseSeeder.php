<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        $statusList = [
            'EN PROCESO',
            'CERRADA',
        ];
        foreach ($statusList as $status) {
            \App\Models\ServiceStatus::query()->create([
                'description' => $status
            ]);
        }

    }
}
