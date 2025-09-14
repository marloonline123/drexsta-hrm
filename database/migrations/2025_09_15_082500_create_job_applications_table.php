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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('company_id')->constrained()->cascadeOnDelete();
            $table->foreignId('job_posting_id')->constrained()->cascadeOnDelete();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone')->nullable();
            $table->text('cover_letter')->nullable();
            $table->string('resume_path')->nullable();
            $table->enum('status', ['applied', 'under_review', 'interview', 'rejected', 'hired'])->default('applied');
            $table->string('application_token')->unique();
            $table->timestamp('token_expires_at')->nullable();
            $table->json('custom_fields')->nullable();
            $table->timestamps();
            
            // Ensure no duplicate applications from the same email for the same job
            $table->unique(['job_posting_id', 'email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};