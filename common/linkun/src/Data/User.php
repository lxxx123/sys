<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2018/12/19
 * Time: 上午11:46
 */

namespace Linkun\Data;

class User
{
    public function getMd5Name() {
        return md5('bear');
    }

}