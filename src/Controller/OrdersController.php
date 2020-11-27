<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Entity\OrderDetails;
use App\Entity\DeliveryInfos;
use App\Services\OrderService;
use App\Services\HttpResponseService;
use App\Repository\ProductsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrdersController extends AbstractController
{
    /**
     * @Route("/orders/create", name="orders_create")
     */
    public function create(Request $request, OrderService $orderService, HttpResponseService $responseService): Response
    {
        $panier = $request->get('panier');
        $deliveryInfos = $request->get('delivery');
        $infos = $request->get('infos');
        $accept = $request->get('accept');

        if ($accept == 'true') {
            $buyer = $orderService->createBuyer($deliveryInfos);
            $total = $orderService->getTotal($panier);
            $order = $orderService->createOrder($total, $infos, $buyer);
            foreach ($panier as $item) {
                $orderService->createOrderDetail($item, $order);
            }

            $response = $responseService->create('Votre commande à bien été enregistrée', 200);
            return $response;
        } else {
            $response = $responseService->create('Veuillez accepter les conditions d\'utilisation pour valider la commande', 401);
            return $response;
        }
        
    }
}
