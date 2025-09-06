<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();

            // Parties
            $table->foreignId('company_id')->constrained()->cascadeOnDelete(); // FK -> companies table
            $table->foreignId('employee_id')->nullable()->constrained('users')->nullOnDelete(); // FK -> employees table
            $table->string('employer_name');
            $table->string('employer_address');
            $table->string('employee_name');
            $table->string('employee_address');

            // Position & Employment
            $table->string('position_title');
            $table->text('duties_responsibilities')->nullable();
            $table->string('employment_type'); // full-time, part-time, contract
            $table->date('start_date');
            $table->date('end_date')->nullable(); // null = indefinite

            // Administrative
            $table->date('effective_date')->nullable();
            $table->text('additional_terms')->nullable();

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
