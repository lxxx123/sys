<?php
/**
 * 类型转换
 * User: bear
 * Date: 2018/12/26
 * Time: 上午11:09
 */

namespace Linkun\Safety;


class Convert
{
    /**
     * 转换为整数
     * @param $s
     * @return int
     */
    public static function intval($s)
    {
        if(is_array($s)){
            return array_map('intval',$s);
        }
        return intval($s);
    }

    /**
     * 去除 html 标签
     * @param $s
     * @return string
     */
    public static function strip_tags($s)
    {
        return strip_tags($s);
    }

    /**
     * 转换为 html 实体
     * @param $s
     * @return string
     */
    public static function htmlentities($s)
    {
        return htmlentities($s);
    }

    /**
     * url encode
     * @param $s
     * @return string
     */
    public static function urlencode($s)
    {
        return urlencode($s);
    }

    /**
     * 转换为日期
     * @param $s
     * @return false|string
     */
    public static function get_date($s)
    {
        return date('Y-m-d', strtotime($s));
    }

}