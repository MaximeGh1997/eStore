<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Entity\OrderDetails;
use App\Entity\DeliveryInfos;
use App\Services\OrderService;
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
    public function create(Request $request, EntityManagerInterface $manager, OrderService $orderService, ValidatorInterface $validator): Response
    {
        $cart = json_decode($request->get('cart'), true);
        $buyerInfos = json_decode($request->get('buyer'), true);
        $infos = $buyerInfos['infos'];
        $checked = json_decode($request->get('checked'));

        if (count($cart) > 0) {
            if ($checked == true) {
                $buyer = $orderService->createBuyer($buyerInfos);
                $errors = $validator->validate($buyer);
                if(count($errors) > 0) {
                    foreach ($errors as $error) {
                        $formErrors[] = [
                            'propertyPath' => $error->getPropertyPath(),
                            'message' => $error->getMessage()
                        ];
                    }
                    $data = [
                        'type' => 'buyer_violations',
                        'title' =>'Remplissez correctement le formulaire...',
                        'errors' => $formErrors
                    ];
                    return new JsonResponse($data, 400);
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
    
                $data = [
                    'type' => 'order_send',
                    'title' =>'Merci pour votre commande ! Elle est désormais enregistrée et en cours de traitement...'
                ];
                return new JsonResponse($data, 200);
            } else {
                $data = [
                    'type' => 'checked_violations',
                    'title' =>'Veuillez accepter les conditions d\'utilisation !',
                ];
                return new JsonResponse($data, 401);
            }
        } else {
            $data = [
                'type' => 'cart_violations',
                'title' =>'Votre panier est vide !',
            ];
            return new JsonResponse($data, 400);
        }
    }
}
