<?php
/**
 * Adds website links to the client-area primary navigation (Plans, Knowledge Base, Status), so
 * customers can move between client.hosttiva.com and the website. Uses the documented
 * ClientAreaPrimaryNavbar hook and WHMCS menu API.
 */
if (!defined('WHMCS')) {
    die('This file cannot be accessed directly');
}

require_once __DIR__ . '/hosttiva_config.php';

use WHMCS\View\Menu\Item as MenuItem;

add_hook('ClientAreaPrimaryNavbar', 1, function (MenuItem $primaryNavbar) {
    $cfg = hosttiva_config();
    if (empty($cfg['nav_links'])) {
        return;
    }
    $site = rtrim($cfg['site_url'], '/');

    $resources = $primaryNavbar->addChild('hosttiva-resources', [
        'label' => 'Resources',
        'order' => 90,
    ]);
    $resources->addChild('hosttiva-plans', ['label' => 'Plans & pricing', 'uri' => $site . '/pricing', 'order' => 10]);
    $resources->addChild('hosttiva-kb', ['label' => 'Knowledge Base', 'uri' => $site . '/knowledgebase', 'order' => 20]);
    $resources->addChild('hosttiva-tutorials', ['label' => 'Tutorials', 'uri' => $site . '/tutorials', 'order' => 30]);
    if (!empty($cfg['status_url'])) {
        $resources->addChild('hosttiva-status', ['label' => 'Service status', 'uri' => $cfg['status_url'], 'order' => 40]);
    }
});
