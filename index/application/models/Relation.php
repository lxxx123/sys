<?php
/**
 * 商户-供应商-市场-摊位-关系
 * User: bear
 * Date: 2019/1/4
 * Time: 下午2:45
 */

class RelationModel extends BaseModel
{
    const ELEMENT_MARKET = 1;//市场
    const ELEMENT_TALL = 2;//摊位
    const ELEMENT_MERCHANT = 3;//商户
    const ELEMENT_GOODS = 4;//商品
    const ELEMENT_SUPPLIER = 5;//供应商

    const FIELD_1 = 'data_id1'; //字段名
    const FIELD_2 = 'data_id2'; //字段名

    const TYPE_MERCHANT_GOODS = 1; //商户(data_id1)-商品(data_id2)关系
    const TYPE_MARKET_TALL = 3; //市场(data_id1)-摊位(data_id2)关系
    const TYPE_TALL_GOODS = 2; //摊位(data_id1)-商品(data_id2)关系
    const TYPE_SUPPLIER_MERCHANT = 5; //供应商(data_id1)-商户(data_id2)关系
    const TYPE_MERCHANT_TALL = 4; //4:商户(data_id1)-摊位(data_id2)关系

    /**
     * 相关分类关联字段
     * @var array
     */
    private $type = [
        self::TYPE_MARKET_TALL => [self::ELEMENT_MARKET => self::FIELD_1, self::ELEMENT_TALL => self::FIELD_2],
        self::TYPE_MERCHANT_GOODS => [self::ELEMENT_MERCHANT => self::FIELD_1, self::ELEMENT_GOODS => self::FIELD_2],
        self::TYPE_TALL_GOODS => [self::ELEMENT_TALL => self::FIELD_1, self::ELEMENT_GOODS => self::FIELD_2],
        self::TYPE_SUPPLIER_MERCHANT => [self::ELEMENT_SUPPLIER => self::FIELD_1, self::ELEMENT_MERCHANT => self::FIELD_2],
        self::TYPE_MERCHANT_TALL => [self::ELEMENT_MERCHANT => self::FIELD_1, self::ELEMENT_TALL => self::FIELD_2]
    ];


    /**
     * 建立市场-摊位关系
     * @param $marketId
     * @param $tallId
     * @return int
     * @throws Zend_Db_Adapter_Exception
     */
    public function addMarketTall($marketId,$tallId)
    {
        $marketFeild = $this->type[self::TYPE_MARKET_TALL][self::ELEMENT_MARKET];
        $tallFeild = $this->type[self::TYPE_MARKET_TALL][self::ELEMENT_TALL];

        $data1 = $marketFeild==self::FIELD_1?$marketId:'';
        $data2 = $tallFeild==self::FIELD_2?$tallId:'';
        if($data2 && $data1){
            if(!$this->has($marketId,$tallFeild,$data1,$data2)){
                return $this->db->insert('p_relation',[
                    'market_id' => $marketId,
                    'type' => self::TYPE_MARKET_TALL,
                    $marketFeild => $marketId,
                    $tallFeild => $tallId,
                ]);
            }
        }
    }

    /**
     * 删除
     * @param $marketId
     * @param $dataId
     * @return int
     */
    public function delMarketTall($marketId,$dataId)
    {
        $marketFeild = $this->type[self::TYPE_MARKET_TALL][self::ELEMENT_MARKET];
        $tallFeild = $this->type[self::TYPE_MARKET_TALL][self::ELEMENT_TALL];

        $data1 = $marketFeild==self::FIELD_1?$marketId:'';
        $data2 = $tallFeild==self::FIELD_2?$dataId:'';

        return $this->db->delete('p_relation',[self::FIELD_2.'=?'=>$data2,self::FIELD_1.'=?'=>$data1,'market_id=?'=>$marketId]);
    }

    /**
     * 是否存在
     * @param $marketId
     * @param $type
     * @param $data1
     * @param $data2
     * @return string
     */
    public function has($marketId,$type,$data1,$data2)
    {
        return $this->db->fetchOne('select id from p_relation where market_id=? and type=? and data_id1=? and data_id2=?',[$marketId,$type,$data1,$data2]);
    }

}