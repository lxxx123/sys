<?php
/**
 * 新增摊位
 * User: bear
 * Date: 2019/1/4
 * Time: 下午2:33
 */

namespace Observer;

use \RelationModel;
use \StallModel;
use \FieldDataModel;

use \Exceptions\Error;

class StallAdd extends Server
{
    const FIELD_STALL_CODE = 77; //摊位字段编号

    public function update(\SplSubject $subject)
    {
        $data = $subject->getData();
        if ($data && isset($data['market_id']) && isset($data['data_id'])) {
            $field = new FieldDataModel();
            $fieldValue = $field->getFieldValue($data['data_id'], self::FIELD_STALL_CODE);
            if ($fieldValue) {
                $stallCode = $fieldValue['field_value'];
                $stall = new StallModel();
                if($stall->add($stallCode, $data['market_id'], $data['data_id'])){
                    $relation = new RelationModel();
                    $relation->addMarketTall($data['market_id'], $data['data_id']);
                }else{
                    $field->remove($data['data_id'],$data['market_id']);
                    throw new Error("摊位号重复", 10001);
                }
            }
        }
    }
}