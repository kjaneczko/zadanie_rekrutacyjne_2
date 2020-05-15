<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserPosition extends Model
{
    protected $table = 'user_position';

    public $timestamps = false;

    public function name() {
        return $this->hasOne(Position::class, 'id', 'position_id');
    }
}
