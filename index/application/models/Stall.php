<?php
/**
 * 摊位
 * User: bear
 * Date: 2019/1/4
 * Time: 下午4:42
 */

class StallModel extends BaseModel
{
    /**
     * 新增摊位
     * @param $stall_code
     * @param $market_id
     * @param $data_id
     * @param int $type_id
     * @return bool|int
     * @throws Zend_Db_Adapter_Exception
     */
    public function add($stall_code, $market_id, $data_id)
    {
        $result = false;
        if (!$this->db->fetchOne('select id from p_stall where stall_code=? and market_id=?', [$stall_code, $market_id])) {
            $result = $this->db->insert('p_stall', ['stall_code' => $stall_code, 'market_id' => $market_id, 'data_id' => $data_id]);
        }
        return $result;
    }

    /**
     * 修改
     * @param $stall_code
     * @param $market_id
     * @param $data_id
     * @return bool|int
     * @throws Zend_Db_Adapter_Exception
     */
    public function editCode($stall_code, $market_id, $data_id)
    {
        $result = false;
        if (!$this->db->fetchOne('select id from p_stall where stall_code=? and market_id=?', [$stall_code, $market_id])) {
            $result = $this->db->update('p_stall', [
                'stall_code' => $stall_code
            ], ['market_id=?' => $market_id, 'data_id=?' => $data_id]);
        }
        return $result;
    }

    /**
     * 删除
     * @param $market_id
     * @param $data_id
     * @return int
     */
    public function remove($market_id, $data_id)
    {
        return $this->db->delete('p_stall',['market_id=?' => $market_id, 'data_id=?' => $data_id]);
    }
}