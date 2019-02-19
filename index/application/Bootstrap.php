<?php

/**
 * @name Bootstrap
 * @author bear
 * @desc 所有在Bootstrap类中, 以_init开头的方法, 都会被Yaf调用,
 * @see http://www.php.net/manual/en/class.yaf-bootstrap-abstract.php
 * 这些方法, 都接受一个参数:Yaf_Dispatcher $dispatcher
 * 调用的次序, 和申明的次序相同
 */
class Bootstrap extends Yaf_Bootstrap_Abstract
{

    public function _initConfig()
    {
        //把配置保存起来
        $arrConfig = Yaf_Application::app()->getConfig();
        Yaf_Registry::set('config', $arrConfig);
    }

    public function _initPlugin(Yaf_Dispatcher $dispatcher)
    {
        //注册一个插件
        $objSamplePlugin = new SamplePlugin();
        $dispatcher->registerPlugin($objSamplePlugin);
    }

    public function _initRoute(Yaf_Dispatcher $dispatcher)
    {
        //在这里注册自己的路由协议,默认使用简单路由
    }

    public function _initView(Yaf_Dispatcher $dispatcher)
    {
        //在这里注册自己的view控制器，例如smarty,firekylin
    }

    public function _initDb()
    {
        $config = Yaf_Registry::get('config');
        if ($config) {
            $pool = [];
            foreach ($config->mysql as $poolName => $configInfo) {
                $pool[$poolName] = new \Linkun\Data\Mysql([
                    'host' => $configInfo['host'],
                    'username' => $configInfo['username'],
                    'password' => $configInfo['passwd'],
                    'dbname' => $configInfo['dbname'],
                    'port' => $configInfo['port'],
                    'charset' => $configInfo['charset']
                ]);
            }
            Yaf_Registry::set('db', $pool);
        }
    }

    /**
     * 初始化 session
     *
     * CREATE TABLE `p_session` (
     * `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
     * `session_key` char(32) COLLATE utf8mb4_unicode_ci NOT NULL,
     * `lifetime` int(10) unsigned DEFAULT '0',
     * `data` text COLLATE utf8mb4_unicode_ci,
     * `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
     * `updated_at` int(10) unsigned NOT NULL,
     * PRIMARY KEY (`id`),
     * UNIQUE KEY `unq_session_key` (`session_key`)
     * ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='session';
     *
     * @throws Zend_Session_Exception
     * @throws Zend_Session_SaveHandler_Exception
     */
    public function _initSession()
    {
        $db = Yaf_Registry::get('db');
        if ($db && $db['admin'] instanceof \Zend_Db_Adapter_Abstract) {
            \Linkun\Data\Session::setDefaultAdapter($db['admin']);
            $handler = new \Linkun\Data\Session(array(
                'name' => 'p_session',
                'primary' => 'session_key',
                'modifiedColumn' => 'updated_at',
                'lifetimeColumn' => 'lifetime',
                'dataColumn' => 'data',
                'lifetime' => 10800
            ));
            \Linkun\Session::setSaveHandler($handler);
            //
//            $auth = \Zend_Auth::getInstance();
//            $storage = new \Zend_Auth_Storage_Session('admin');
//            $auth->setStorage($storage);
//            $storage->write(123);  写
//            echo $auth->getIdentity(); 读
        }

    }
}
