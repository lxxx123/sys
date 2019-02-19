<?php
/**
 * Created by PhpStorm.
 * User: bear
 * Date: 2018/12/26
 * Time: 下午3:14
 */

namespace Linkun;

use \Zend_Session_Exception;

class Session extends \Zend_Session
{


    /**
     * Check whether or not the session was started
     *
     * @var bool
     */
    private static $_sessionStarted = false;

    /**
     * Whether or not the session id has been regenerated this request.
     *
     * Id regeneration state
     * <0 - regenerate requested when session is started
     * 0  - do nothing
     * >0 - already called session_regenerate_id()
     *
     * @var int
     */
    private static $_regenerateIdState = 0;

    /**
     * Private list of php's ini values for ext/session
     * null values will default to the php.ini value, otherwise
     * the value below will overwrite the default ini value, unless
     * the user has set an option explicity with setOptions()
     *
     * @var array
     */
    private static $_defaultOptions = array(
        'save_path' => null,
        'name' => null, /* this should be set to a unique value for each application */
        'save_handler' => null,
        //'auto_start'                => null, /* intentionally excluded (see manual) */
        'gc_probability' => null,
        'gc_divisor' => null,
        'gc_maxlifetime' => null,
        'serialize_handler' => null,
        'cookie_lifetime' => null,
        'cookie_path' => null,
        'cookie_domain' => null,
        'cookie_secure' => null,
        'cookie_httponly' => null,
        'use_cookies' => null,
        'use_only_cookies' => 'on',
        'referer_check' => null,
        'entropy_file' => null,
        'entropy_length' => null,
        'cache_limiter' => null,
        'cache_expire' => null,
        'use_trans_sid' => null,
        'bug_compat_42' => null,
        'bug_compat_warn' => null,
        'hash_function' => null,
        'hash_bits_per_character' => null
    );

    /**
     * List of options pertaining to Zend_Session that can be set by developers
     * using Zend_Session::setOptions(). This list intentionally duplicates
     * the individual declaration of static "class" variables by the same names.
     *
     * @var array
     */
    private static $_localOptions = array(
        'strict' => '_strict',
        'remember_me_seconds' => '_rememberMeSeconds',
        'throw_startup_exceptions' => '_throwStartupExceptions'
    );

    /**
     * Whether or not write close has been performed.
     *
     * @var bool
     */
    private static $_writeClosed = false;

    /**
     * Whether or not session id cookie has been deleted
     *
     * @var bool
     */
    private static $_sessionCookieDeleted = false;

    /**
     * Whether or not session has been destroyed via session_destroy()
     *
     * @var bool
     */
    private static $_destroyed = false;

    /**
     * Whether or not session must be initiated before usage
     *
     * @var bool
     */
    private static $_strict = false;

    /**
     * Default number of seconds the session will be remembered for when asked to be remembered
     *
     * @var int
     */
    private static $_rememberMeSeconds = 1209600; // 2 weeks

    /**
     * Whether the default options listed in Zend_Session::$_localOptions have been set
     *
     * @var bool
     */
    private static $_defaultOptionsSet = false;

    /**
     * A reference to the set session save handler
     *
     * @var Zend_Session_SaveHandler_Interface
     */
    private static $_saveHandler = null;

    public static function start($options = false)
    {
        // Check to see if we've been passed an invalid session ID
        if (self::getId() && !self::_checkId(self::getId())) {
            // Generate a valid, temporary replacement
            self::setId(md5(self::getId()));
            // Force a regenerate after session is started
            self::$_regenerateIdState = -1;
        }

        if (self::$_sessionStarted && self::$_destroyed) {
            // require_once 'Zend/Session/Exception.php';
            throw new Zend_Session_Exception('The session was explicitly destroyed during this request, attempting to re-start is not allowed.');
        }

        if (self::$_sessionStarted) {
            return; // already started
        }

        // make sure our default options (at the least) have been set
        if (!self::$_defaultOptionsSet) {
            self::setOptions(is_array($options) ? $options : array());
        }

        // In strict mode, do not allow auto-starting Zend_Session, such as via "new Zend_Session_Namespace()"
        if (self::$_strict && $options === true) {
            /** @see Zend_Session_Exception */
            // require_once 'Zend/Session/Exception.php';
            throw new Zend_Session_Exception('You must explicitly start the session with Zend_Session::start() when session options are set to strict.');
        }

        $filename = $linenum = null;
        if (!self::$_unitTestEnabled && headers_sent($filename, $linenum)) {
            /** @see Zend_Session_Exception */
            // require_once 'Zend/Session/Exception.php';
            throw new Zend_Session_Exception("Session must be started before any output has been sent to the browser;"
                . " output started in {$filename}/{$linenum}");
        }

        // See http://www.php.net/manual/en/ref.session.php for explanation
        if (!self::$_unitTestEnabled && defined('SID')) {
            /** @see Zend_Session_Exception */
            // require_once 'Zend/Session/Exception.php';
            throw new Zend_Session_Exception('session has already been started by session.auto-start or session_start()');
        }

        /**
         * Hack to throw exceptions on start instead of php errors
         * @see http://framework.zend.com/issues/browse/ZF-1325
         */

        $errorLevel = (is_int(self::$_throwStartupExceptions)) ? self::$_throwStartupExceptions : E_ALL;

        /** @see Zend_Session_Exception */
        if (!self::$_unitTestEnabled) {

            if (self::$_throwStartupExceptions) {
                // require_once 'Zend/Session/Exception.php';
                set_error_handler(array('Zend_Session_Exception', 'handleSessionStartError'), $errorLevel);
            }

            $startedCleanly = session_start(['read_and_close' => false]);

            if (self::$_throwStartupExceptions) {
                restore_error_handler();
            }

            if (!$startedCleanly || Zend_Session_Exception::$sessionStartError != null) {
                if (self::$_throwStartupExceptions) {
                    set_error_handler(array('Zend_Session_Exception', 'handleSilentWriteClose'), $errorLevel);
                }
                session_write_close();
                if (self::$_throwStartupExceptions) {
                    restore_error_handler();
                    throw new Zend_Session_Exception(__CLASS__ . '::' . __FUNCTION__ . '() - ' . Zend_Session_Exception::$sessionStartError);
                }
            }
        }

        parent::$_readable = true;
        parent::$_writable = true;
        self::$_sessionStarted = true;
        if (self::$_regenerateIdState === -1) {
            self::regenerateId();
        }

        // run validators if they exist
        if (isset($_SESSION['__ZF']['VALID'])) {
            self::_processValidators();
        }

        self::_processStartupMetadataGlobal();
    }

    /**
     * _processGlobalMetadata() - this method initizes the sessions GLOBAL
     * metadata, mostly global data expiration calculations.
     *
     * @return void
     */
    private static function _processStartupMetadataGlobal()
    {
        // process global metadata
        if (isset($_SESSION['__ZF'])) {

            // expire globally expired values
            foreach ($_SESSION['__ZF'] as $namespace => $namespace_metadata) {

                // Expire Namespace by Time (ENT)
                if (isset($namespace_metadata['ENT']) && ($namespace_metadata['ENT'] > 0) && (time() > $namespace_metadata['ENT'])) {
                    unset($_SESSION[$namespace]);
                    unset($_SESSION['__ZF'][$namespace]);
                }

                // Expire Namespace by Global Hop (ENGH) if it wasnt expired above
                if (isset($_SESSION['__ZF'][$namespace]) && isset($namespace_metadata['ENGH']) && $namespace_metadata['ENGH'] >= 1) {

                    $_SESSION['__ZF'][$namespace]['ENGH']--;

                    if ($_SESSION['__ZF'][$namespace]['ENGH'] === 0) {
                        if (isset($_SESSION[$namespace])) {
                            parent::$_expiringData[$namespace] = $_SESSION[$namespace];
                            unset($_SESSION[$namespace]);
                        }
                        unset($_SESSION['__ZF'][$namespace]);
                    }
                }

                // Expire Namespace Variables by Time (ENVT)
                if (isset($namespace_metadata['ENVT'])) {
                    foreach ($namespace_metadata['ENVT'] as $variable => $time) {
                        if (time() > $time) {
                            unset($_SESSION[$namespace][$variable]);
                            unset($_SESSION['__ZF'][$namespace]['ENVT'][$variable]);
                        }
                    }
                    if (empty($_SESSION['__ZF'][$namespace]['ENVT'])) {
                        unset($_SESSION['__ZF'][$namespace]['ENVT']);
                    }
                }

                // Expire Namespace Variables by Global Hop (ENVGH)
                if (isset($namespace_metadata['ENVGH'])) {
                    foreach ($namespace_metadata['ENVGH'] as $variable => $hops) {
                        $_SESSION['__ZF'][$namespace]['ENVGH'][$variable]--;

                        if ($_SESSION['__ZF'][$namespace]['ENVGH'][$variable] === 0) {
                            if (isset($_SESSION[$namespace][$variable])) {
                                parent::$_expiringData[$namespace][$variable] = $_SESSION[$namespace][$variable];
                                unset($_SESSION[$namespace][$variable]);
                            }
                            unset($_SESSION['__ZF'][$namespace]['ENVGH'][$variable]);
                        }
                    }
                    if (empty($_SESSION['__ZF'][$namespace]['ENVGH'])) {
                        unset($_SESSION['__ZF'][$namespace]['ENVGH']);
                    }
                }

                if (isset($namespace) && empty($_SESSION['__ZF'][$namespace])) {
                    unset($_SESSION['__ZF'][$namespace]);
                }
            }
        }

        if (isset($_SESSION['__ZF']) && empty($_SESSION['__ZF'])) {
            unset($_SESSION['__ZF']);
        }
    }


    /**
     * _processValidator() - internal function that is called in the existence of VALID metadata
     *
     * @throws Zend_Session_Exception
     * @return void
     */
    private static function _processValidators()
    {
        foreach ($_SESSION['__ZF']['VALID'] as $validator_name => $valid_data) {
            if (!class_exists($validator_name)) {
                // require_once 'Zend/Loader.php';
                Zend_Loader::loadClass($validator_name);
            }
            $validator = new $validator_name;
            if ($validator->validate() === false) {
                /** @see Zend_Session_Validator_Exception */
                // require_once 'Zend/Session/Validator/Exception.php';
                throw new Zend_Session_Validator_Exception("This session is not valid according to {$validator_name}.");
            }
        }
    }
}