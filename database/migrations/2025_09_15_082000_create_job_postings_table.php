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
        Schema::create('job_postings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('job_requisition_id')->constrained()->cascadeOnDelete();
            $table->foreignId('employment_type_id')->constrained('employment_types')->cascadeOnDelete();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->text('requirements')->nullable();
            $table->string('location')->nullable();
            $table->decimal('min_salary', 10, 2)->nullable();
            $table->decimal('max_salary', 10, 2)->nullable();
            $table->date('target_start_date')->nullable();
            $table->date('closing_date')->nullable();
            $table->enum('status', ['draft', 'pending_approval', 'approved', 'rejected', 'listed', 'closed'])->default('draft');
            $table->text('benefits')->nullable();
            $table->text('responsibilities')->nullable();
            $table->integer('experience_years')->nullable();
            $table->string('education_level')->nullable();
            $table->boolean('is_remote')->default(false);
            $table->json('custom_fields')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_postings');
    }
};