<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2018/12/26
 * Time: 上午11:34
 */


use Linkun\Safety\Clear;
use PHPUnit\Framework\TestCase;

class clearTest extends TestCase
{

    public function testEscapeString()
    {
        $str='<d>dd\\';
        $this->assertEquals(
            "&lt;d&gt;dd", Clear::escapeString($str)
        );
    }

}