<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;

/*
usage:
    (new UniqueScoped(
        table: 'users',
        column: 'phone',
        pivotTable: 'company_user',
        pivotForeignKey: 'user_id',
        pivotOwnerKey: 'company_id',
        scopeValue: request()->user()->active_company_id
    ))->except($userId)
*/

class UniqueScoped implements ValidationRule
{
    protected string $table;
    protected string $column;
    protected ?string $scopeColumn;
    protected ?int $scopeValue;

    protected ?string $pivotTable;
    protected ?string $pivotForeignKey;
    protected ?string $pivotOwnerKey;

    protected ?int $exceptId = null;

    public function __construct(
        string $table,
        string $column,
        ?string $scopeColumn = null,
        ?int $scopeValue = null,
        ?string $pivotTable = null,
        ?string $pivotForeignKey = null,
        ?string $pivotOwnerKey = null
    ) {
        $this->table = $table;
        $this->column = $column;
        $this->scopeColumn = $scopeColumn;
        $this->scopeValue = $scopeValue;

        $this->pivotTable = $pivotTable;
        $this->pivotForeignKey = $pivotForeignKey;
        $this->pivotOwnerKey = $pivotOwnerKey;
    }

    /**
     * Exclude a specific record ID (useful for update).
     */
    public function except(int $id): static
    {
        $this->exceptId = $id;
        return $this;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $query = DB::table($this->table);

        if ($this->pivotTable) {
            // Many-to-many case
            $query->join($this->pivotTable, "{$this->table}.id", "=", "{$this->pivotTable}.{$this->pivotForeignKey}")
                ->where("{$this->pivotTable}.{$this->pivotOwnerKey}", $this->scopeValue);
        } elseif ($this->scopeColumn && $this->scopeValue !== null) {
            // BelongsTo / hasMany case
            $query->where($this->scopeColumn, $this->scopeValue);
        }

        if ($this->exceptId !== null) {
            $query->where("{$this->table}.id", '!=', $this->exceptId);
        }

        $exists = $query->where("{$this->table}.{$this->column}", $value)->exists();

        if ($exists) {
            $fail("The {$attribute} has already been taken in this context.");
        }
    }
}
