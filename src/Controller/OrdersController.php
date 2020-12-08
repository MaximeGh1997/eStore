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
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class OrdersController extends AbstractController
{
    /**
     * @Route("/orders/create", name="orders_create")
     */
    public function create(Request $request, EntityManagerInterface $manager, OrderService $orderService, HttpResponseService $responseService, ValidatorInterface $validator): Response
    {
        $cart = json_decode($request->get('cart'), TRUE);
        $buyerInfos = json_decode($request->get('buyer'), TRUE);
        $infos = $buyerInfos['infos'];
        $checked = $request->get('checked');

        if ($checked == true) {
            $buyer = $orderService->createBuyer($buyerInfos);
            $errors = $validator->validate($buyer);
            if(count($errors) > 0) {
               /* $data = [
                    'type' => 'validation_error',
                    'title' =>'There was a validation error',
                    'errors' => json_encode($errors)
                ];
                return new JsonResponse($data, 400);*/
            } else {
                $manager->persist($buyer);
            }

            $total = $orderService->getTotal($cart);
            $order = $orderService->createOrder($total, $infos, $buyer);
            $manager->persist($order);
            foreach ($cart as $item) {
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
