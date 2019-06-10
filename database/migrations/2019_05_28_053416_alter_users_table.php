<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn('logout_at');

            $table->string('first_name')->after('id');
            $table->string('last_name')->after('first_name');
            $table->string('email')->after('last_name');
            $table->integer('contact')->after('email');
            $table->string('provider_name')->after('password');
            $table->string('provider_id')->after('provider_name')->nullable();
            $table->string('access_token')->after('provider_id')->nullable();
            $table->timestamp('deleted_at');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
