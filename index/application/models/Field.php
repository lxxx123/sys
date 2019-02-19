<?php
/**
 * 字段
 * User: bear
 * Date: 2018/12/27
 * Time: 下午6:19
 */

class FieldModel extends BaseModel
{
    /**
     * 字段列表
     * @param $typeId
     * @return mixed
     */
    public function getFieldByTypeId($typeId)
    {
        return $this->db->fetchAll('select id,display_value,display_name,is_article,show_list,type from p_field where type_id=? order by position asc',[$typeId]);
    }

    /**
     * 获取字段ID
     * @param $typeid
     * @return mixed
     */
    public function getFieldIdByTypeId($typeid)
    {
        return $this->db->fetchCol('select id from p_field where type_id=?',[$typeid]);
    }
}