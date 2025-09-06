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
        Schema::create('contract_exits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('contract_id')->constrained()->cascadeOnDelete();

            // Resignation
            $table->text('resignation_policy')->nullable();
            $table->text('resignation_fixed_policy')->nullable();

            // Termination
            $table->text('termination_policy')->nullable();
            $table->text('termination_fixed_policy')->nullable();

            // Severance & Cause
            $table->decimal('severance_amount', 12, 2)->nullable();
            $table->text('due_cause')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_exits');
    }
};
