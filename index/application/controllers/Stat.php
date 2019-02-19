<?php
/**
 * 后台统计分析数据接口
 * User: bear
 * Date: 2019/1/2
 * Time: 上午9:49
 */

class StatController extends Yaf_Controller_Abstract{

use \Traits\CommonMarketIdac;

    public function chartAction(){

        \Linkun\Tools::json_header(30);
	
		$marketId=$this->getUserMarketId();
		// $marketId=1;
		$time_now=date("Y-m-d",time());

		$goods_trade=new \GoodsTradeModel();
		$goods_trade_info=$goods_trade->getTradeStatistical($marketId);//统计和

		$trade=new \TradeModel();
		$trade_info=$trade->getSummaryList('', $marketId,$time_now,'','','','','','');//单个统计和


		if($trade_info){

			$trade_info[0]['date']=date("d",time());;
		}else{
			$trade_info=[];
		}

		if(!$goods_trade_info){
			$goods_trade_info=[];
		}		
		
		$ret_daily_turnover = array_merge($goods_trade_info, $trade_info);

        $date_arr = [];
        $amount_arr = [];
        $number_arr = [];
        for ($i = 0; $i < 30; $i++) {
            $date_arr[$i] = date('d', time() - 3600 * 24 * (29 - $i)) . '日';
            $amount_arr[$i] = 0;
            $number_arr[$i] = 0;
            for ($j = 0; $j < sizeof($ret_daily_turnover); $j++) {
                if ($ret_daily_turnover[$j]['date'] == date('d', time() - 3600 * 24 * (29 - $i))) {
                    $amount_arr[$i] = (float)$ret_daily_turnover[$j]['amount_num'];
                    $number_arr[$i] = (float)$ret_daily_turnover[$j]['total_num'];
                }
            }
        }
 
        $data['date_arr'] = $date_arr;
        $data['amount_arr'] = $amount_arr;
        $data['number_arr'] = $number_arr;
		$data=json_encode($data);
        $this->getResponse()->setBody($data);
        return false;
    }

}