<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2019/1/4
 * Time: 下午2:16
 */

namespace Events;

class Event
{

    /**
     * @param $name
     * @param \SplSubject $subject
     * @return \SplSubject
     */
    public static function fire($name,\SplSubject $subject)
    {
        switch ($name){
            case 'tall.add':
                //添加摊位
                $subject->attach(new \Observer\StallAdd());
                break;
            case 'delete.fieldTypeId.38':
                //删除摊位
                $subject->attach(new \Observer\StallDelete());
                break;
        }

        return $subject;
    }
}