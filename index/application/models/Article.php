<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2018/12/28
 * Time: 下午2:01
 */

class ArticleModel extends BaseModel
{
    /**
     * 新增
     * @param $content
     * @return int
     */
    public function add($content)
    {
        $result = 0;
        if($this->db->insert('p_article',['content'=>$content])){
            $result = $this->db->lastInsertId('p_article');
        }
        return $result;
    }

    /**
     * 修改
     * @param $id
     * @param $content
     * @return mixed
     */
    public function edit($id,$content)
    {
        return $this->db->update('p_article',['content'=>$content]);
    }

    public function getArticle($dataId)
    {
        return $this->db->fetchOne('select content from p_article where id=?',[$dataId]);
    }

}