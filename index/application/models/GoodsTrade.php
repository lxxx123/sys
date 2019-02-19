<?php
/**
 * 交易
 * User: bear
 * Date: 2019/01/05
 * Time: 下午15:47
 * name:maxuecheng
 */

class GoodsTradeModel extends BaseModel{
    /**
     * 商品交易明模块底部细汇总
     * @param $bill_dt2 默认时间
     * @param $bill_dt2 开始时间
     * @param $bill_dt3 结束时间
     * @param $marketId

     */
    public function getSummaryList($marketId,$time_now,$bill_dt2,$bill_dt3)
    {
        $whereData = $this->where($marketId,$time_now,$bill_dt2,$bill_dt3);

        $where = $whereData['where'];//条件

        $bind = $whereData['bind'];//参数

        
        return $this->db->fetchAll('select sum(total_num) as total_num,sum(weight_num) as weight_num,sum(amount_num) as amount_num from stat_goods_trade ' . $where, $bind);
    }

    // where条件拼接
    protected function where($marketId,$time_now,$bill_dt2,$bill_dt3){

        $where = "where market_id=?";

        $bind = [$marketId];

        // 多条件查询
        if (!empty($bill_dt2) && !empty($bill_dt3)) {
            $where .= " and (trade_date between ? and ?)";
            $bind[] = "$bill_dt2";
            $bind[] = "$bill_dt3";


        } else {

            $where .= "  and (trade_date between ?and ?)";
            $bind[] = "$time_now 00:00:00";
            $bind[] = "$time_now 23:59:59";
        }
        return [

            'where' => $where,

            'bind' => $bind
        ];
    }

    /**
     * 首页交易柱状图
     * @param $bill_dt2 默认时间
     * @param $marketId

     */
    public function getTradeStatistical($marketId){

        $trade_date_ago=date("Y-m-d",time()-3600*24*29);
        $trade_date_now=date("Y-m-d",time());  

        $where = "where market_id=? and (trade_date between ? and ?)";
        $bind = [$marketId];
        $bind[] = "$trade_date_ago";
        $bind[] = "$trade_date_now";  


        return $this->db->fetchAll("select DATE_FORMAT(trade_date,'%d') as date,total_num,weight_num, amount_num from stat_goods_trade " . $where, $bind);    
    }



}
