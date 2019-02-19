<?php
/**
 * Created by PhpStorm.
 * User: wang
 * Date: 2019-01-03
 * Time: 17:16
 */

class LoginController extends Yaf_Controller_Abstract
{
    public function init()
    {
        $auth = \Zend_Auth::getInstance();
        $storage = new \Zend_Auth_Storage_Session('admin');
        $auth->setStorage($storage);
        if ($auth->hasIdentity()) {
            $this->redirect('/index/market/index');
        }
    }


    public function indexAction()
    {
        return true;
    }

    public function doAction()
    {
        //只接收post请求
        if ($this->getRequest()->getMethod() == 'POST') {

            //账号密码参数
            $name = $this->getRequest()->getPost('name');
            $password = $this->getRequest()->getPost('password');
            $users = new UsersModel();
            //查询
            $query = $users->query($name, $password);
            if ($query['status']) {
                //登录成功，更改用户登录信息
                //登录用户记录id
                $id = $query['id'];
                //登录ip和时间戳
                $ip = $this->getRequest()->getServer()['REMOTE_ADDR'];
                $time = date('Y-m-d H:i:s');
                $users->updateInfo($id, $ip, $time);

                //保存session信息
                $auth = \Zend_Auth::getInstance();
                $storage = new \Zend_Auth_Storage_Session('admin');
                $auth->setStorage($storage);
                $storage->write($id);
                $this->getResponse()->setBody(json_encode(['status' => 1]));
            } else {
                //登录失败
                $this->getResponse()->setBody(json_encode($query));
            }
            return false;
        }
    }
}