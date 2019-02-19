<?php
/**
 * 字段类型
 * User: bear
 * Date: 2018/12/27
 * Time: 下午5:24
 */

class FieldTypeModel extends BaseModel
{

    /**
     * 获取字段类型名
     * @param $parentId
     * @return mixed
     */
    public function getTypeNameByParentId($parentId)
    {
        return $this->db->fetchAll('select id,type_name,url from p_field_type where parent_id=?',[$parentId]);
    }
}