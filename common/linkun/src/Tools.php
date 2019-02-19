<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2019/1/2
 * Time: 上午9:54
 */

namespace Linkun;


class Tools
{
    public static function json_header($time = 0)
    {
        if ($time) {
            header("Cache-Control: max-age=$time");
            header("Date: " . date("r", time()));
            header("Expires: " . date("r", time() + $time));
            header("Pragma: cache");
        } else {
            header("Expires: " . date("r", time()));
            header("Cache-Control: no-cache");
            header("Pragma: no-cache");
        }
        header('Content-Type: application/json; charset=utf-8');
    }
}