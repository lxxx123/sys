<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2019/1/4
 * Time: 下午4:04
 */

namespace Observer;

use \RelationModel;
use \FieldDataModel;
use \StallModel;

class StallDelete extends Server
{
    public function update(\SplSubject $subject)
    {
        $data = $subject->getData();
        if($data && isset($data['market_id']) && isset($data['data_id'])) {
            $relation = new RelationModel();
            $relation->delMarketTall($data['market_id'],$data['data_id']);
            $field = new FieldDataModel();
            $field->remove($data['data_id'],$data['market_id']);
            $stall = new StallModel();
            $stall->remove($data['market_id'],$data['data_id']);
        }
    }

}