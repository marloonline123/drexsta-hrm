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
            if (! Schema::hasColumn($table->getTable(), 'company_id')) {
                $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
                // Drop the existing unique constraint and create a new one with company_id
                $table->dropUnique(['name', 'guard_name']);
                $table->unique(['name', 'guard_name', 'company_id']);
            }
        });

        // Add company_id to roles table
        Schema::table($tableNames['roles'], function (Blueprint $table) {
            if (! Schema::hasColumn($table->getTable(), 'company_id')) {
                $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
                // Drop the existing unique constraint and create a new one with company_id
                $table->dropUnique(['name', 'guard_name']);
                $table->unique(['name', 'guard_name', 'company_id']);
            }
        });

        // Add company_id to model_has_permissions table
        Schema::table($tableNames['model_has_permissions'], function (Blueprint $table) use ($tableNames) {
            if (! Schema::hasColumn($table->getTable(), 'company_id')) {
                $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
                $table->primary(['permission_id', 'model_type', 'model_id', 'company_id'], 'model_has_permissions_primary');
            }
        });

        // Add company_id to model_has_roles table
        Schema::table($tableNames['model_has_roles'], function (Blueprint $table) use ($tableNames) {
            if (! Schema::hasColumn($table->getTable(), 'company_id')) {
                $table->foreignId('company_id')->nullable()->constrained()->cascadeOnDelete();
                $table->primary(['role_id', 'model_type', 'model_id', 'company_id'], 'model_has_roles_primary');
            }
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
            $table->dropPrimary('model_has_roles_primary');
            $table->dropForeign(['company_id']);
            $table->dropColumn('company_id');
        });

        // Remove company_id from model_has_permissions table
        Schema::table($tableNames['model_has_permissions'], function (Blueprint $table) {
            $table->dropPrimary('model_has_permissions_primary');
            $table->dropForeign(['company_id']);
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