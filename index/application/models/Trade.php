<?php
/**
 * 交易
 * User: bear
 * Date: 2019/01/05
 * Time: 下午15:47
 * name:maxuecheng
 */

class TradeModel extends BaseModel{
    /**
     * data 分页
     * @param array $search
     * @param $marketId
     * @param $typeId
     * @param int $page
     * @param int $perpage
     * @return mixed
     */
    public function getTradeList($search, $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no, $page = 1, $perpage = 10)
    {
        $whereData = $this->where($search, $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no);

        $where = $whereData['where'];//条件

        $bind = $whereData['bind'];//参数

        
        return $this->db->fetchAll('select * from log_trade ' . $where . $this->limit($page, $perpage), $bind);
    }

    // where条件拼接
    protected function where($search, $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no){

        $where = "where market_id=?";

        $bind = [$marketId];



        // 多条件查询
        if(!empty($entity_name)){

             $where .= " and entity_name=?";
             $bind[] = "$entity_name";
        }

        if (!empty($bill_dt2) && !empty($bill_dt3)) {
            $where .= " and (bill_dt between ? and ?)";
            $bind[] = "$bill_dt2";
            $bind[] = "$bill_dt3";


        } else {

            $where .= "  and (bill_dt between ?and ?)";
            $bind[] = "$time_now 00:00:00";
            $bind[] = "$time_now 23:59:59";
        }

        if($stall_no2){
             $where .= " and stall_no=?";
             $bind[] = "$stall_no2";
        }
        if($goods_name){
             $where .= " and goods_name like ?";
             $bind[] = "$goods_name";
        }

        if (!empty($obj_bank_no)) {
            switch ($obj_bank_no) {
                case 1:
                    $where .= " and obj_bank_no =?";
                    $bind[] = "支付宝支付";
                    break;
                case 2:
                    $where .= " and obj_bank_no =?";
                    $bind[] = "微信支付";
                    break;
                case 3:
                    $where .= " and obj_bank_no =?";
                    $bind[] = "银联支付";
                    break;
                case 4:
                    $where .= " and obj_bank_no =?";
                    $bind[] = "现金支付";
                    break;
                case 5:
                    $where .= " and obj_bank_no =?";
                    $bind[] = "会员卡支付";
                    break;
                default:
                    $where .= " and obj_bank_no =?";
                    $bind[] = "未知";
                    break;
            }
        }     


        if (isset($search['key']) && $search['key']) {

            $where .= " and (stall_no like ? OR trade_no like ? OR entity_name like ? OR goods_name like ?)";

            $bind[] = "%{$search['key']}%";
            $bind[] = "%{$search['key']}%";
            $bind[] = "%{$search['key']}%";
            $bind[] = "%{$search['key']}%";
        }
      
        return [

            'where' => $where,

            'bind' => $bind
        ];
    }



    /**
     * 总数
     * @param $search
     * @param $marketId
     */
    public function getTotal($search, $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no){

        $whereData = $this->where($search, $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no);

        $where = $whereData['where'];

        $bind = $whereData['bind'];

        return $this->db->fetchOne('select count(id) from log_trade ' . $where , $bind);
    }

    /**
     * 单个查询汇总
     * @param $search
     * @param $marketId
     */
    public function getSummaryList($search, $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no){

        $whereData = $this->where($search, $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no);

        $where = $whereData['where'];//条件

        $bind = $whereData['bind'];//参数

        
        return $this->db->fetchAll('select count(id) as total_num,sum(prod_count) as weight_num,sum(amount) as amount_num from log_trade ' . $where , $bind);       
    }
    /**
     * 商户交易导出接口
     * @param $marketId
     * @param $time_now
     */
    public function getTradeLists($marketId,$time_now)    {

        $where = "where market_id=? and (bill_dt between ?and ?)";

        $bind = [$marketId];

        $bind[] = "$time_now 00:00:00";

        $bind[] = "$time_now 23:59:59";

            
        return $this->db->fetchAll('select trade_no,bill_dt,entity_name,stall_no,goods_name,prod_count,unit,price,amount ,obj_bank_no from log_trade ' . $where , $bind);
    }
}
