<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2019-01-04
 * Time: 13:40
 */

class UserMarketModel extends BaseModel
{
    public function getMarketId(int $userId)
    {
        $db = $this->db;
        $sql = $db->quoteInto(
            'select market_id from pu_user_market where user_id = ?',
            $userId
        );
        $result = $db->query($sql);
        $rows = $result->fetchAll();

        if (sizeof($rows)) {
            return $rows[0]['market_id'];
        } else {
            return 0;
        }
    }
}