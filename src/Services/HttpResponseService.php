<?php

namespace App\Services;

use Symfony\Component\HttpFoundation\Response;


class HttpResponseService {
    
    public function create(string $content, int $code) {
        $response = new Response();
        $response->setContent($content);
        $response->setStatusCode($code);
        
        return $response;
    }
}