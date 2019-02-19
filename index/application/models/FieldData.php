<?php
/**
 * 字段数据
 * User: bear
 * Date: 2018/12/27
 * Time: 下午7:14
 */

class FieldDataModel extends BaseModel
{

    /**
     * data 分页
     * @param array $search
     * @param $marketId
     * @param $typeId
     * @param int $page
     * @param int $perpage
     * @return mixed
     */
    public function getDataId($search, $marketId, $typeId, $page = 1, $perpage = 10)
    {
        $whereData = $this->where($search, $marketId, $typeId);
        $where = $whereData['where'];
        $bind = $whereData['bind'];

        return $this->db->fetchCol('select distinct data_id from p_field_data ' . $where . $this->limit($page, $perpage), $bind);
    }

    protected function where($search, $marketId, $typeId)
    {
        $where = 'where market_id=? and type_id=?';
        $bind = [$marketId, $typeId];
        if (isset($search['key']) && $search['key']) {
            $where .= ' and field_value like ?';
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
     * @param $typeId
     * @return mixed
     */
    public function getTotal($search, $marketId, $typeId)
    {
        $whereData = $this->where($search, $marketId, $typeId);
        $where = $whereData['where'];
        $bind = $whereData['bind'];

        return $this->db->fetchOne('select count(distinct data_id) from p_field_data ' . $where , $bind);
    }

    /**
     * 某条字段数据
     * @param $dataId
     * @return mixed
     */
    public function getDataById($dataId)
    {
        return $this->db->fetchAll('select id,field_value,field_id,market_id,type_id,article_id from p_field_data where data_id=?', [$dataId]);
    }

    /**
     * 字段值
     * @param $dataId
     * @param $fieldId
     * @return mixed
     */
    public function getFieldValue($dataId,$fieldId)
    {
        return $this->db->fetchRow('select * from p_field_data where field_id=? and data_id=?',[$fieldId,$dataId]);
    }

    /**
     * uuid
     * @return mixed
     */
    public function getUUID()
    {
        return $this->db->fetchOne('select uuid()');
    }

    /**
     * 新增
     * @param $fieldValue
     * @param $dataId
     * @param $marketId
     * @param $fieldId
     * @param $typeId
     * @param int $articleId
     * @return mixed
     */
    public function add($fieldValue, $dataId, $marketId, $fieldId, $typeId, $articleId = 0)
    {
        $this->data = [
            'field_value' => $fieldValue,
            'field_id' => $fieldId,
            'market_id' => $marketId,
            'type_id' => $typeId,
            'data_id' => $dataId,
            'article_id' => $articleId
        ];

        $result = $this->db->insert('p_field_data', $this->data);
        $this->data['lastInsertId'] = $this->db->lastInsertId('p_field_data');
        return $result;
    }

    /**
     * 编辑
     * @param $id
     * @param $value
     * @param $marketId
     * @return mixed
     */
    public function edit($id,$value,$marketId)
    {
        return $this->db->update('p_field_data',['field_value' => $value],['id=?'=>$id,'market_id=?'=>$marketId]);
    }

    /**
     * 删除
     * @param $dataId
     * @param $marketId
     * @return mixed
     */
    public function remove($dataId,$marketId)
    {
        $this->data['data_id'] = $dataId;
        $this->data['market_id'] = $marketId;
        return $this->db->delete('p_field_data',['data_id=?'=>$dataId,'market_id=?'=>$marketId]);
    }

    /**
     * 系统配置数据
     * @param $marketId
     * @return array
     */
    public function getSysDataByMarket($marketId)
    {
        $default = $this->getDefaultSysData();
        $marketData = $this->getDefaultSysData($marketId);
        if($marketData){
            foreach ($marketData as $k=>$v){
                $default[$k] = $v;
            }
        }
        return $default;
    }

    /**
     * 默认系统配置数据
     * @param int $marketId
     * @param int $typeid
     * @return array
     */
    protected function getDefaultSysData($marketId=1,$typeid=106)
    {
        $result = [];
        $types = $this->db->fetchAll('select id,type_name from p_field_type where parent_id=?',[$typeid]);
        if($types){
            foreach ($types as $row){
                $typeName = $row['type_name'];
                $data = $this->db->fetchAll('select id,field_value from p_field_data where market_id=? and  type_id=?',[$marketId,$row['id']]);
                if($data){
                    foreach ($data as $v){
                        $result[$typeName][$v['id']] = $v['field_value'];
                    }
                }

            }
        }
        return $result;
    }

}