<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contact>
 */
class ContactFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'company_id' => Company::find(rand(1, 10))->id,
            'department_id' => Department::find(rand(1, 3))->id,
            'revenue' => fake()->numberBetween(100, 1000000),
            'city' => fake()->city()
        ];
    }
}
