<?php

/**
 * @name SamplePlugin
 * @desc Yaf定义了如下的6个Hook,插件之间的执行顺序是先进先Call
 * @see http://www.php.net/manual/en/class.yaf-plugin-abstract.php
 * @author bear
 */
class SamplePlugin extends Yaf_Plugin_Abstract
{

    public function routerStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response)
    {

    }

    public function routerShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response)
    {

    }


    public function dispatchLoopStartup(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response)
    {

        $controllerName = $request->getControllerName();
        //除登录和错误先验证session
        if ($controllerName !== 'Login' && $controllerName !== 'Error') {
            $auth = \Zend_Auth::getInstance();
            $storage = new \Zend_Auth_Storage_Session('admin');
            $auth->setStorage($storage);
            if (!$auth->hasIdentity()) {
                throw new \Exception("登录有效期已过，需重新登录！","10000");
            }
        }

    }

    public function preDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response)
    {

    }

    public function postDispatch(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response)
    {
    }

    public function dispatchLoopShutdown(Yaf_Request_Abstract $request, Yaf_Response_Abstract $response)
    {
    }
}
