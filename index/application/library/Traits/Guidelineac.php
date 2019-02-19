<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2018/12/28
 * Time: 下午5:34
 */

namespace Traits;

use Box\Spout\Writer\WriterFactory;
use Box\Spout\Common\Type;

trait Guidelineac
{

    /**
     * 市场管理-市场制度
     * @return bool
     */
    public function guidelineacAction()
    {
        $marketId = $this->getUserMarketId();  //市场id
        $typeParentId = $this->getRequest()->getQuery("typeParentId", 9);//字段父类型 9
        $fieldTypeId = $this->getRequest()->getQuery("fieldTypeId", 2);  //当前字段 2
        $perpage = 10;  //每页条数

        $key = $this->getRequest()->getQuery("key", "");
        $page = $this->getRequest()->getQuery("page", 1);//页码

        $fieldType = new \FieldTypeModel();
        $field = new \FieldModel();
        $fieldData = new \FieldDataModel();

        $childMenus = $fieldType->getTypeNameByParentId($typeParentId);

        $fieldDatas = $field->getFieldByTypeId($fieldTypeId);
        $dataId = $fieldData->getDataId(['key' => $key], $marketId, $fieldTypeId, $page, $perpage);
      
        $total = $fieldData->getTotal(['key' => $key], $marketId, $fieldTypeId);
   
        $data = [];
        if ($dataId) {
            foreach ($dataId as $uid) {

                $data[$uid] = $fieldData->getDataById($uid);
            }
        }

        $fieldIds = [];
        $tempData = $field->getFieldIdByTypeId($fieldTypeId);
        if($tempData){
            $fieldIds = array_merge($fieldIds,$tempData);
        }

        $this->getView()->assign('total', $total);
        $this->getView()->assign("fieldDatas", $fieldDatas);
        $this->getView()->assign("childMenus", $childMenus);
        $this->getView()->assign("data", $data);
        $this->getView()->assign("dataId", $dataId);
        $this->getView()->assign("key", $key);
        $this->getView()->assign("page", $page);
        $this->getView()->assign("perpage", $perpage);
        $this->getView()->assign("query", [
            'page' => $page,
            'key' => $key,
            'marketId' => $marketId,
            'typeParentId' => $typeParentId,
            'fieldTypeId' => $fieldTypeId
        ]);

        $this->getView()->assign("marketId", $marketId);
        $this->getView()->assign("typeParentId", $typeParentId);
        $this->getView()->assign("fieldTypeId", $fieldTypeId);

        $this->getView()->assign("fieldIds", $fieldIds); //字段列表

        return true;
    }

    /**
     * 修改
     */
    public function guidelineac_editAction()
    {
        $marketId = $this->getUserMarketId();
        $typeParentId = $this->getRequest()->getQuery("typeParentId", "");
        $fieldTypeId = $this->getRequest()->getQuery("fieldTypeId", "");
        $uid = $this->getRequest()->getQuery("id", "");
        $fieldIds = $this->getRequest()->getQuery("fieldIds", "");

        $fieldData = new \FieldDataModel();
        $article = new \ArticleModel();
        $temp_data = $fieldData->getDataById($uid);
        $data = [];
        foreach ($temp_data as $row) {
            if ($row['article_id']) {
                $row['field_value'] = $article->getArticle($row['article_id']);
                $data[$row['field_id']] = $row;
            } else {
                $data[$row['field_id']] = $row;
            }
        }

        $this->getView()->assign("data", $data);
        $this->getView()->assign("marketId", $marketId);
        $this->getView()->assign("typeParentId", $typeParentId);
        $this->getView()->assign("fieldTypeId", $fieldTypeId);
        $this->getView()->assign("uid", $uid);
        $this->getView()->assign("fieldIds", $fieldIds?json_decode($fieldIds,true):[]);
    }

    /**
     * 编辑
     */
    public function guidelineac_edit_postAction()
    {
        $fieldData = new \FieldDataModel();
        $article = new \ArticleModel();
        $field = new \FieldModel();
        $redirect = isset($_POST['redirect']) ? $_POST['redirect'] : '';

        if ($this->getRequest()->isPost()) {
            $marketId = $this->getUserMarketId();
            $fieldTypeId = $_POST['fieldTypeId'];
            $field_id = $_POST['field_id'];

            $fieldInfo = $field->getFieldByTypeId($fieldTypeId);

            foreach ($fieldInfo as $frow) {
                $temp_id = $frow['id'];
                if (isset($field_id[$temp_id])) {
                    if (is_array($field_id[$temp_id])) {
                        foreach ($field_id[$temp_id] as $key => $value) {
                            if ($frow['is_article']) {
                                $article->edit($key, $value);
                            } else {
                                $fieldData->edit($key, $value, $marketId);
                            }
                        }
                    }
                }
            }
        }
        $this->redirect($redirect);

        return false;
    }

    /**
     * 详情
     */
    public function guidelineac_showAction()
    {
        $marketId = $this->getUserMarketId();
        $typeParentId = $this->getRequest()->getQuery("typeParentId", "");
        $fieldTypeId = $this->getRequest()->getQuery("fieldTypeId", "");

        $article_id = $this->getRequest()->getQuery("article_id", "");
        $uid = $this->getRequest()->getQuery("uid", "");
        $field_id = $this->getRequest()->getQuery('field_id',0);

        $article = new \ArticleModel();
        $fieldData = new \FieldDataModel();
        $tempData = $fieldData->getDataById($uid);
        $data = [];
        foreach ($tempData as $row) {
            $data[$row['field_id']] = $row;
        }
        $content = $article->getArticle($article_id);

        $this->getView()->assign("marketId", $marketId);
        $this->getView()->assign("typeParentId", $typeParentId);
        $this->getView()->assign("fieldTypeId", $fieldTypeId);
        $this->getView()->assign('content', $content);
        $this->getView()->assign('dataId', $article_id);
        $this->getView()->assign('data', $data);
        $this->getView()->assign('uid', $uid);
        $this->getView()->assign('field_id', $field_id);
    }


    /**
     * 新增 view
     */
    public function guidelineac_addAction()
    {
        $marketId = $this->getUserMarketId();
        $typeParentId = $this->getRequest()->getQuery("typeParentId", "");
        $fieldTypeId = $this->getRequest()->getQuery("fieldTypeId", "");
        $fieldIds = $this->getRequest()->getQuery("fieldIds", "");


        $this->getView()->assign("marketId", $marketId);
        $this->getView()->assign("typeParentId", $typeParentId);
        $this->getView()->assign("fieldTypeId", $fieldTypeId);

        $this->getView()->assign("fieldIds", $fieldIds?json_decode($fieldIds,true):[]);
    }


    /**
     * 新增post
     * @return bool
     */
    public function guidelineac_add_postAction()
    {
        $fieldData = new \FieldDataModel();
        $article = new \ArticleModel();
        $field = new \FieldModel();
        $redirect = isset($_POST['redirect']) ? $_POST['redirect'] : '';
        $eventName = isset($_POST['eventName']) ? $_POST['eventName'] : ''; //触发的事件名

        if ($this->getRequest()->isPost()) {
            $marketId = $this->getUserMarketId();
            $typeParentId = $_POST['typeParentId'];
            $fieldTypeId = $_POST['fieldTypeId'];
            $field_id = $_POST['field_id'];
            $dataId = $fieldData->getUUID();

            $fieldInfo = $field->getFieldByTypeId($fieldTypeId);
            foreach ($fieldInfo as $frow) {
                $temp_id = $frow['id'];
                if (isset($field_id[$temp_id])) {
                    $article_id = 0;
                    if ($frow['is_article']) {
                        $article_id = $article->add($field_id[$temp_id]);
                        $fieldData->add('', $dataId, $marketId, $temp_id, $fieldTypeId, $article_id);
                    } else {
                        $fieldData->add($field_id[$temp_id], $dataId, $marketId, $temp_id, $fieldTypeId, $article_id);
                    }
                }
            }

            if($eventName){
                $fieldData->event($eventName);
            }
        }
        if ($redirect) {
            $this->redirect($redirect);
        }

        return false;
    }

    /**
     * 删除
     * @return bool
     */
    public function guidelineac_delAction()
    {
        $eventName = isset($_POST['eventDelName']) ? $_POST['eventDelName'] : ''; //触发的事件名
        $fieldData = new \FieldDataModel();
        $marketId = $this->getUserMarketId();
        $status = 0;
        if ($this->getRequest()->isPost()) {
            $ids = explode(',', $_POST['ids']);
            foreach ($ids as $dataId) {
                $fieldData->remove(trim($dataId), $marketId);
                $status = 1;
            }
            if($eventName){
                $fieldData->event($eventName);
            }
        }
        echo json_encode(['status' => $status]);
        return false;
    }

    /**
     * 导出
     * @return bool
     */
    public function guidelineac_exportAction()
    {
        $marketId = $this->getUserMarketId();
        $fieldTypeId = $this->getRequest()->getQuery("fieldTypeId", "");

        $head = [];
        $fileTitle = '';
        switch ($fieldTypeId){
            case 1:
                $head = ['职位名称' => 7];
                $fileTitle = '职位名称';
                break;
            case 2:
                $head = ['制度名称' => 1, '发布单位' => 2, '发布时间' => 3];
                $fileTitle = '市场制度';
                break;
        }


        $fieldData = new \FieldDataModel();

        $total = $fieldData->getTotal([], $marketId, $fieldTypeId);
        $dataId = $fieldData->getDataId([], $marketId, $fieldTypeId, 0, $total);
        $multipleRows = [];
        $headKey = array_values($head);

        if ($dataId) {
            foreach ($dataId as $uid) {
                $row = $fieldData->getDataById($uid);
                $oneRow = [];
                foreach ($row as $v) {
                    foreach ($headKey as $i => $hd) {
                        if ($v['field_id'] == $hd) {
                            $oneRow[$i] = $v['field_value'];
                        }
                    }
                }
                $multipleRows[] = $oneRow;
            }
        }
        // var_dump($multipleRows);die;
        $writer = WriterFactory::create(Type::XLSX);
        $writer->openToBrowser($fileTitle . date('Y-m-d') . '.' . Type::XLSX);
        $writer->addRow(array_keys($head));
        $writer->addRows($multipleRows);
        $writer->close();

        return false;
    }
}