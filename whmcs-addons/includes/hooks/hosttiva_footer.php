<?php
/**
 * Adds the "Powered by Inventomo" strip with links back to the website (SRS: footer must say
 * "Powered by Inventomo"). Uses the documented ClientAreaFooterOutput hook.
 */
if (!defined('WHMCS')) {
    die('This file cannot be accessed directly');
}

require_once __DIR__ . '/hosttiva_config.php';

add_hook('ClientAreaFooterOutput', 1, function (array $vars) {
    $cfg  = hosttiva_config();
    $site = htmlspecialchars(rtrim($cfg['site_url'], '/'), ENT_QUOTES);
    $inv  = htmlspecialchars($cfg['inventomo_url'], ENT_QUOTES);

    $links = [
        ['Knowledge Base', $site . '/knowledgebase'],
        ['Policies', $site . '/legal'],
        ['Trust Center', $site . '/trust'],
    ];
    if (!empty($cfg['status_url'])) {
        $links[] = ['Status', htmlspecialchars($cfg['status_url'], ENT_QUOTES)];
    }

    $nav = '';
    foreach ($links as [$label, $href]) {
        $nav .= '<a href="' . $href . '">' . htmlspecialchars($label, ENT_QUOTES) . '</a>';
    }

    return '<div class="hosttiva-powered" role="contentinfo">'
        . 'Hosttiva by Inventomo · Powered by <a href="' . $inv . '" rel="noopener">Inventomo</a>'
        . '<nav aria-label="Hosttiva website">' . $nav . '</nav>'
        . '</div>';
});
