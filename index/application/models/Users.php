<?php
/**
 * 用户
 * User: wang
 * Date: 2018-12-27
 * Time: 10:29
 */

class UsersModel extends BaseModel
{

    /**
     *查询账号密码
     * @param string $name
     * @param string $password
     * @return array
     */
    public function query(string $name, string $password)
    {
        $db = $this->db;
        $sql = $db->quoteInto(
            'select * from pu_users where name = ?',
            $name
        );
        $result = $db->query($sql);
        $rows = $result->fetchAll();
        //该用户名存在
        if (sizeof($rows)) {
            if (md5('###' . md5($password)) == $rows[0]['password']) {
                //用户名、密码正确返回记录id
                return ['status' => 1, 'id' => $rows[0]['id']];
            } else {
                //密码错误
                return ['status' => 0, 'msg' => '密码错误！'];
            }
        } else {
            //用户名不存在
            return ['status' => 0, 'msg' => '用户名不存在！'];
        }
    }

    /**
     * 修改
     * @param int $id
     * @param string $ip
     * @param string $time
     * @return array
     * @throws Zend_Db_Adapter_Exception
     */
    public function updateInfo(int $id, string $ip, string $time)
    {

        $db = $this->db;

        $table = 'pu_users';
        $where = $db->quoteInto('id = ?', $id);
        $set = ['last_login_ip' => $ip, 'last_login_time' => $time];
        $rows_affected = $db->update($table, $set, $where);

        if ($rows_affected) {
            //信息更新成功
            return ['status' => 1];
        } else {
            //信息更新失败
            return ['status' => 0, 'msg' => '信息更新失败！'];
        }
    }
}