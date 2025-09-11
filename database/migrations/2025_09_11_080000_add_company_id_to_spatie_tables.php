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
        $tableNames = config('permission.table_names');

        // Add company_id to permissions table
        Schema::table($tableNames['permissions'], function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            // Drop the existing unique constraint and create a new one with company_id
            $table->dropUnique(['name', 'guard_name']);
            $table->unique(['name', 'guard_name', 'company_id']);
        });

        // Add company_id to roles table
        Schema::table($tableNames['roles'], function (Blueprint $table) {
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            // Drop the existing unique constraint and create a new one with company_id
            $table->dropUnique(['name', 'guard_name']);
            $table->unique(['name', 'guard_name', 'company_id']);
        });

        // Add company_id to model_has_permissions table
        Schema::table($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames) {
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            // Add index for better performance
            $table->index(['company_id'], 'model_has_permissions_company_id_index');
        });

        // Add company_id to model_has_roles table
        Schema::table($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames) {
            $table->unsignedBigInteger('company_id')->nullable();
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');
            // Add index for better performance
            $table->index(['company_id'], 'model_has_roles_company_id_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tableNames = config('permission.table_names');

        // Remove company_id from model_has_roles table
        Schema::table($tableNames['model_has_roles'], function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropIndex(['model_has_roles_company_id_index']);
            $table->dropColumn('company_id');
        });

        // Remove company_id from model_has_permissions table
        Schema::table($tableNames['model_has_permissions'], function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropIndex(['model_has_permissions_company_id_index']);
            $table->dropColumn('company_id');
        });

        // Remove company_id from roles table and restore original unique constraint
        Schema::table($tableNames['roles'], function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropUnique(['name', 'guard_name', 'company_id']);
            $table->unique(['name', 'guard_name']);
            $table->dropColumn('company_id');
        });

        // Remove company_id from permissions table and restore original unique constraint
        Schema::table($tableNames['permissions'], function (Blueprint $table) {
            $table->dropForeign(['company_id']);
            $table->dropUnique(['name', 'guard_name', 'company_id']);
            $table->unique(['name', 'guard_name']);
            $table->dropColumn('company_id');
        });
    }
};