<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2019/1/4
 * Time: 下午2:03
 */

namespace Observer;

class Server implements \SplObserver
{

    /**
     */
    private $changed = [];

    /**
     * It is called by the Subject, usually by SplSubject::notify()
     *
     * @param \SplSubject $subject
     */
    public function update(\SplSubject $subject)
    {
        $this->changed[] = clone $subject;
    }

}