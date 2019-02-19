<?php
/**
 * 基类
 * User: bear
 * Date: 2018/12/27
 * Time: 下午5:25
 */

class BaseModel implements \SplSubject
{
    /**
     * @var \Zend_Db_Adapter_Abstract
     */
    protected $db = null;

    /**
     *
     * @var array
     */
    protected $data = [];

    /**
     * @var \SplObjectStorage
     */
    private $observers;

    public function __construct()
    {
        $db = Yaf_Registry::get('db');
        if ($db && $db['admin'] instanceof \Zend_Db_Adapter_Abstract) {
            $this->db = $db['admin'];
        }
        $this->observers = new \SplObjectStorage();
    }

    /**
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    public function attach(\SplObserver $observer)
    {
        $this->observers->attach($observer);
    }

    public function detach(\SplObserver $observer)
    {
        $this->observers->detach($observer);
    }

    public function notify()
    {
        /** @var \SplObserver $observer */
        foreach ($this->observers as $observer) {
            $observer->update($this);
        }
    }

    /**
     * 触发事件
     * @param $name
     */
    public function event($name)
    {
        \Events\Event::fire($name,$this)->notify();
    }

    /**
     * 分页
     * @param $page
     * @param $perpage
     * @return string
     */
    protected function limit($page, $perpage)
    {
        $page = intval($page);
        $perpage = intval($perpage);
        if ($page < 1) $page = 1;
        $page = abs($page - 1);
        $perpage = abs($perpage);
        $page = abs($page * $perpage);
        return " limit $page,$perpage";
    }

}