<?php
/**
 * Injects the Hosttiva stylesheet (assets/css/hosttiva.css) and theme-colour metadata into every
 * client-area page. Uses the documented ClientAreaHeadOutput hook, so it works with Lagom and the
 * default WHMCS themes without editing theme files.
 */
if (!defined('WHMCS')) {
    die('This file cannot be accessed directly');
}

require_once __DIR__ . '/hosttiva_config.php';

add_hook('ClientAreaHeadOutput', 1, function (array $vars) {
    $cfg  = hosttiva_config();
    $root = isset($vars['WEB_ROOT']) ? rtrim($vars['WEB_ROOT'], '/') : '';
    $ver  = rawurlencode($cfg['css_version']);

    $out  = '<meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff">' . "\n";
    $out .= '<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a">' . "\n";
    if (!empty($cfg['load_inter'])) {
        $out .= '<link rel="preconnect" href="https://fonts.googleapis.com">' . "\n";
        $out .= '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' . "\n";
        $out .= '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap">' . "\n";
    }
    $out .= '<link rel="stylesheet" href="' . htmlspecialchars($root, ENT_QUOTES) . '/assets/css/hosttiva.css?v=' . $ver . '">' . "\n";

    return $out;
});
