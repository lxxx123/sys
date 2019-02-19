<?php
/**
 * 首页
 * User: bear
 * Date: 2018/12/27
 * Time: 下午6:11
 */

namespace Traits;

trait Home {

    /**
     * 首页
     * @return bool
     */
    public function homeAction()
    {
        $marketId = $this->getUserMarketId();
        $stat = new \StatHomeModel();
        $data = $stat->getData($marketId);
        $data = $stat->getDatas($marketId);
        $this->getView()->assign("marketId", $marketId);
        $this->getView()->assign("data", $data);
        return true;
    }


}