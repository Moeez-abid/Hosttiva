<?php
/**
 * Hosttiva client-area branding: shared settings for the hooks in this folder.
 * Edit these values, then upload the whole includes/hooks/ folder to your WHMCS root.
 */
if (!defined('WHMCS')) {
    die('This file cannot be accessed directly');
}

if (!function_exists('hosttiva_config')) {
    function hosttiva_config(): array
    {
        return [
            // Public website (change to https://hosttiva.com once the domain is live).
            'site_url'    => 'https://hosttiva.pages.dev',
            // Public status page (leave empty until infra/status-page is deployed).
            'status_url'  => '',
            // Parent company link shown in the footer strip.
            'inventomo_url' => 'https://inventomo.com',
            // Bump when hosttiva.css changes, to bust browser caches.
            'css_version' => '1',
            // Load Inter from Google Fonts for non-Apple devices (Apple devices use SF Pro).
            'load_inter'  => true,
            // Add website links to the client-area navigation.
            'nav_links'   => true,
        ];
    }
}
