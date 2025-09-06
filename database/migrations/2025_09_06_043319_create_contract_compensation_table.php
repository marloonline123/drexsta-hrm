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
        Schema::create('contract_compensation', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('contract_id')->constrained()->cascadeOnDelete();
            $table->decimal('base_salary', 12, 2)->nullable();
            $table->string('payment_schedule'); // monthly, weekly, etc.
            $table->decimal('commission_rate', 8, 2)->nullable();
            $table->decimal('bonus_amount', 12, 2)->nullable();
            $table->text('bonus_policy')->nullable();
            $table->text('commission_policy')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_compensation');
    }
};
