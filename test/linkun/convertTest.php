<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2018/12/26
 * Time: 上午11:53
 */

use PHPUnit\Framework\TestCase;
use Linkun\Safety\Convert;

class convertTest extends TestCase
{
    public function testIntval()
    {
        $str='34dd';
        $this->assertEquals(
            "34", Convert::intval($str)
        );
        $this->assertEquals(
            [2,33,2,0], Convert::intval([2,'33','2.4',''])
        );

    }
}