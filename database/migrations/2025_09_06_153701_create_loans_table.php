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
        Schema::create('loans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('employee_id')->constrained("users")->cascadeOnDelete();
            $table->foreignId('created_by')->constrained("users")->cascadeOnDelete();
            $table->foreignId('action_by')->constrained("users")->cascadeOnDelete();
            $table->decimal('total_amount', 12, 2);     // Total loan granted
            $table->decimal('installment_amount', 12, 2); // Regular deduction per cycle
            $table->integer('total_installments');     // Total installments planned
            $table->integer('remaining_installments'); // Updated after each deduction
            $table->enum('status', ['pending', 'approved', 'active', 'paid', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loans');
    }
};
