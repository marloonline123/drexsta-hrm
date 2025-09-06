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
        Schema::create('loan_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('employee_id')->constrained("users")->cascadeOnDelete();
            $table->foreignId('loan_id')->constrained("users")->cascadeOnDelete();
            $table->decimal('amount', 12, 2);   // Amount paid this time
            $table->date('payment_date');       // When payment happened
            $table->unsignedBigInteger('payslip_id')->nullable(); // Link to payroll if auto-deducted
            $table->enum('source', ['payroll', 'manual'])->default('payroll'); // Deducted from payroll or manual payment
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('loan_payments');
    }
};
