<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2018/12/27
 * Time: 下午4:06
 */


use \Box\Spout\Writer\WriterFactory;
use \Box\Spout\Common\Type;
class MarketController extends Yaf_Controller_Abstract{

    use \Traits\CommonMarketIdac;
    use \Traits\Home;
    use \Traits\Guidelineac;

    public function indexAction()
    {
        $marketId = $this->getUserMarketId();
        $this->getView()->assign("marketId", $marketId);
        return TRUE;
    }

    /**
     * 称具状况
     */
    public function statusacAction()
    {
        $marketId = $this->getUserMarketId();  //市场id
        $typeParentId = $this->getRequest()->getQuery("typeParentId", 9);//字段父类型 9
        $fieldTypeId = $this->getRequest()->getQuery("fieldTypeId", 2);  //当前字段 2
        $perpage = 10;  //每页条数

        $fieldType = new \FieldTypeModel();
        $childMenus = $fieldType->getTypeNameByParentId($typeParentId);

        $this->getView()->assign("childMenus", $childMenus);
        $this->getView()->assign("marketId", $marketId);
        $this->getView()->assign("typeParentId", $typeParentId);
        $this->getView()->assign("fieldTypeId", $fieldTypeId);
    }

    /**
     * 绩效管理
     * @return bool
     */
    public function jxpositionacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 摊位管理
     * @return bool
     */
    public function stall_typeacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 安全追溯
     * @return bool
     */
    public function sx_goods_inacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 信用管理
     * @return bool
     */
    public function complaintsacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 统计分析----马雪城
     */
    public function tradeacAction()
    {

        $marketId = $this->getUserMarketId();  //市场id

        $typeParentId = $this->getRequest()->getQuery("typeParentId", 17);//字段父类型 17

        $fieldTypeId = $this->getRequest()->getQuery("fieldTypeId", 109);  //当前字段 109

        // 基本参数
        $key = $this->getRequest()->getQuery("key", "");//查询条件

        $page = $this->getRequest()->getQuery("page", 1);//页码

        $perpage = $this->getRequest()->getQuery("perpage", 10);//条数

        $time_now = $this->getRequest()->getQuery("date", date("Y-m-d"));//开始时间

        // ------------------遮罩-->多条件查询
        $entity_name = $this->getRequest()->getQuery("entity_name", '');//商户姓名：
        $bill_dt2 = $this->getRequest()->getQuery("bill_dt2", '');//交易开始时间：
        $bill_dt3 = $this->getRequest()->getQuery("bill_dt3", '');//交易结束时间：
        $stall_no2 = $this->getRequest()->getQuery("stall_no", '');//摊位号
        $goods_name = $this->getRequest()->getQuery("goods_name", '');//商品名称：
        $obj_bank_no = $this->getRequest()->getQuery("obj_bank_no", '');//支付方式
       
        // 实例化对象
        $fieldType = new \FieldTypeModel();

        $field = new \FieldModel();

        $Trade = new \TradeModel();

        $GoodTrade = new \GoodsTradeModel();

        $childMenus = $fieldType->getTypeNameByParentId($typeParentId);//获取二类标题-栏目

        $fieldDatas = $field->getFieldByTypeId($fieldTypeId);//获取字段名称
 
        $trade_info = $Trade->getTradeList(['key' => $key], $marketId, $time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no,$page, $perpage);//获取详细信息
       
        $total = $Trade->getTotal(['key' => $key], $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no);//总条数

        if(empty($key)&&empty($entity_name)&&empty($stall_no2)&&empty($goods_name)&&empty($obj_bank_no)){
            //获取交易汇总
            $goods_trade = $GoodTrade->getSummaryList($marketId, $time_now,$bill_dt2,$bill_dt3);

        }else{
            //获取单个交易汇总
            $goods_trade = $Trade->getSummaryList(['key' => $key], $marketId,$time_now,$entity_name,$bill_dt2,$bill_dt3,$stall_no2,$goods_name,$obj_bank_no);
        }

        $this->getView()->assign('total', $total);//总条数
        $this->getView()->assign("fieldDatas", $fieldDatas);//获取字段名称
        $this->getView()->assign("childMenus", $childMenus);//获取二类标题-栏目
        $this->getView()->assign("trade_info", $trade_info);//获取详细信息
        $this->getView()->assign("goods_trade", $goods_trade);//获取详细信息
        $this->getView()->assign("query", [
            'page' => $page,
            'key' => $key,
            'marketId' => $marketId,
            'typeParentId' => $typeParentId,
            'fieldTypeId' => $fieldTypeId
        ]);//适用于分页
      
        $this->getView()->assign("date", $time_now);//搜索
        $this->getView()->assign("key", $key);//搜索
        $this->getView()->assign("page", $page);//当前页
        $this->getView()->assign("perpage", $perpage);//多少条一页
        $this->getView()->assign("marketId", $marketId);//市场id
        $this->getView()->assign("typeParentId", $typeParentId);//一级栏目id
        $this->getView()->assign("fieldTypeId", $fieldTypeId);//二级栏目id
      

        return true;
    }
    /**
     * 交易数据导出
     * @return bool
     */
    
    public function trade_exportAction()
    {
        $marketId = $this->getUserMarketId();
        $time_now = $this->getRequest()->getQuery("time_now", date('Y-m-d',time()));  //当前字段 109
        $head = [];
        $fileTitle = '';

        $head = ['交易单号' => 1, 
                 '交易时间' => 2, 
                 '商户名称' => 3,
                 '摊位号' => 4,
                 '商品名称' => 5, 
                 '交易数量' => 6, 
                 '商品单位' => 7,
                 '交易单价' => 8,
                 '交易总价' => 9,
                 '支付方式' => 10
                 ];

        $fileTitle = '商户交易明细';
        $Trade = new \TradeModel();
        $multipleRow=[];
        $multipleRows = $Trade->getTradeLists($marketId,$time_now);

        foreach ($multipleRows as $k=>$v) {

            $multipleRow[$k][]=$v['trade_no'];
            $multipleRow[$k][]=$v['bill_dt'];
            $multipleRow[$k][]=$v['entity_name'];
            $multipleRow[$k][]=$v['stall_no'];
            $multipleRow[$k][]=$v['goods_name'];
            $multipleRow[$k][]=$v['prod_count'];
            $multipleRow[$k][]=$v['unit'];
            $multipleRow[$k][]=$v['price'];
            $multipleRow[$k][]=$v['amount'];
            $multipleRow[$k][]=$v['obj_bank_no'];
        }
        // var_dump($multipleRow);die;
        $writer = WriterFactory::create(Type::XLSX);
        $writer->openToBrowser($fileTitle . date('Y-m-d') . '.' . Type::XLSX);
        $writer->addRow(array_keys($head));
        $writer->addRows($multipleRow);
        $writer->close();

        return false;
    }
    /**
     * 物业管理
     * @return bool
     */
    public function rent_manageacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 媒体管理
     * @return bool
     */
    public function screen_menuacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 监控管理
     */
    public function monitoracAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 消防管理
     * @return bool
     */
    public function fire_fightingacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 办公管理
     * @return bool
     */
    public function hracAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 广告机管理
     * @return bool
     */
    public function yjy_adv_typeacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 小程序管理
     * @return bool
     */
    public function sx_columnacAction()
    {
        $this->getView();
        return true;
    }

    /**
     * 快捷录入
     * @return bool
     */
    public function quick_merchant_priceacAction()
    {
        $this->getView();
        return true;
    }

    public function getView()
    {
        $view = parent::getView();
        $host = Yaf_Registry::get('config')->assets->host;
        $marketId = $this->getUserMarketId();
        $fieldData = new \FieldDataModel();
        $sysData = $fieldData->getSysDataByMarket($marketId);
        $sysDataList = [];
        foreach ($sysData as $row){
            foreach ($row as $k=>$v){
                $sysDataList[$k] = $v;
            }
        }

        $view->assign('sysData', $sysData);
        $view->assign('sysDataList', $sysDataList);
        $view->assign('host', $host);
        return $view;
    }
}