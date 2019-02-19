<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019-01-04
 * Time: 10:35
 */

class FileController extends Yaf_Controller_Abstract
{
    public function uploadAction()
    {
        //只接收post请求
        if ($this->getRequest()->getMethod() == 'POST') {
            $file = $this->getRequest()->getFiles('file');
            //获取用户id
            $auth = \Zend_Auth::getInstance();
            $storage = new \Zend_Auth_Storage_Session('admin');
            $auth->setStorage($storage);
            $userId = $auth->getIdentity();

            //获取用户的市场id
            $userMarket = new UserMarketModel();
            $marketId = $userMarket->getMarketId($userId);

            //指定文件存放的目录
            $date = date('Ymd');
            $path = APPLICATION_PATH . '/../public/upload/' . $marketId . '/' . $date . '/';
            if (!file_exists($path)) {
                mkdir($path, 0777, true);
            }

            //获取文件信息
            $name = $file['name'];
            $tmpName = $file['tmp_name'];
            $extName = strtolower(substr(strrchr($name, '.'), 1));
            //图片新名称，路径
            $fileName = time() . mt_rand(10000, 99999) . '.' . $extName;
            $fileUrl = $path . $fileName;

            //将文件从临时目录移动至目标位置
            if (move_uploaded_file($tmpName, $fileUrl)) {
                //保存成功返回图片url
                $config = Yaf_Registry::get('config');
                $host = $config->assets->host;
                $url = $host . '/upload/' . '/' . $marketId . '/' . $date . '/' . $fileName;

                $this->getResponse()->setBody(json_encode(['status' => 1, 'url' => $url]));
            } else {
                $this->getResponse()->setBody(json_encode(['status' => 0, 'msg' => '上传失败！']));
            }
            return false;
        }
    }
}