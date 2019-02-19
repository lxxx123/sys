<?php
/**
 * 安全过滤
 * User: bear
 * Date: 2018/12/26
 * Time: 上午11:02
 */

namespace Linkun\Safety;


class Clear
{
    /**
     *
     * Unicode 字符值    转义序列    含义    类别
     * \u0008    \b    Backspace
     * \u0009    \t    Tab    空白
     * \u000A    \n    换行符（换行）    行结束符
     * \u000B    \v    垂直制表符    空白
     * \u000C    \f    换页    空白
     * \u000D    \r    回车    行结束符
     * \u0022    \"	双引号 (")
     * \u0027    \'    单引号 (')
     * \u005C    \\    反斜杠 (\)
     * \u00A0        不间断空格    空白
     * \u2028        行分隔符    行结束符
     * \u2029        段落分隔符    行结束符
     * \uFEFF        字节顺序标记    空白
     *
     * @param $str
     * @return string
     */
    public static function escapeJson($str)
    {
        $str = preg_replace('/\x{0008}|\x{0009}|\x{000A}|\x{000B}|\x{000C}|\x{000D}|\x{00A0}|\x{2028}|\x{2029}|\x{FEFF}/u', '', (string)$str);
        return addslashes($str);
    }

    /**
     * XSS 字符串过滤
     *
     * @param $str
     * @return string
     */
    public static function escapeString($str)
    {
        $str = str_replace('\\', '', $str);
        return htmlentities(urldecode($str), ENT_QUOTES, 'UTF-8', true);
    }

}