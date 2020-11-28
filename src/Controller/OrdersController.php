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
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrdersController extends AbstractController
{
    /**
     * @Route("/orders/create", name="orders_create")
     */
    public function create(Request $request, EntityManagerInterface $manager, OrderService $orderService, HttpResponseService $responseService, ValidatorInterface $validator): Response
    {
        $panier = $request->get('panier');
        $deliveryInfos = $request->get('delivery');
        $infos = $request->get('infos');
        $accept = $request->get('accept');

        if ($accept == 'true') {
            $buyer = $orderService->createBuyer($deliveryInfos);
            $errors = $validator->validate($buyer);
            if(count($errors) > 0) {
                return new Response($errors);
            } else {
                $manager->persist($buyer);
            }

            $total = $orderService->getTotal($panier);
            $order = $orderService->createOrder($total, $infos, $buyer);
            $manager->persist($order);
            foreach ($panier as $item) {
                $detail = $orderService->createDetail($item, $order);
                $manager->persist($detail);
            }

            $manager->flush();

            return $responseService->create('Votre commande à bien été enregistrée', 200);
        } else {
            return $responseService->create('Veuillez accepter les conditions d\'utilisation pour valider la commande', 401);
        }
        
    }
}
