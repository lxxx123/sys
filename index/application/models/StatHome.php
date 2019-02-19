<?php
/**
 * 首页统计表
 * User: bear
 * Date: 2019/1/2
 * Time: 上午10:09
 */

class StatHomeModel extends BaseModel
{
    public function getDatas($marketId)
    {
        return $this->db->fetchRow('select * from stat_home where market_id=?', [$marketId]);
    }
}