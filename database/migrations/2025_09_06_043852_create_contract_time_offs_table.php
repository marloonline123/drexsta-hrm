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
        Schema::create('contract_time_offs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('contract_id')->constrained()->cascadeOnDelete();

            // PTO
            $table->integer('pto_days')->default(0);
            $table->text('pto_policy')->nullable();
            $table->boolean('unused_pto_carryover')->default(false);

            // Leave
            $table->integer('leave_days')->default(0);
            $table->text('leave_policy')->nullable();
            $table->boolean('unused_leave_carryover')->default(false);

            // Federal Holidays
            $table->text('federal_holidays')->nullable(); // JSON list
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contract_time_offs');
    }
};
