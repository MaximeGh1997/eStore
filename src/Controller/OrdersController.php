<?php

namespace App\Controller;

use App\Entity\Orders;
use App\Entity\OrderDetails;
use App\Entity\DeliveryInfos;
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
    public function create(Request $request, EntityManagerInterface $manager, ProductsRepository $productsRepo): Response
    {
        $panier = $request->get('panier');
        $deliveryInfos = $request->get('delivery');
        $infos = $request->get('infos');
        $accept = $request->get('accept');

        if ($accept == 'true') {
          $buyer = new DeliveryInfos;
            $buyer->setLastname($deliveryInfos['lastname'])
                ->setFirstname($deliveryInfos['firstname'])
                ->setEmail($deliveryInfos['email'])
                ->setPhone($deliveryInfos['phone'])
                ->setAdress($deliveryInfos['adress'])
                ->setZip($deliveryInfos['zip'])
                ->setCity($deliveryInfos['city']);

            $manager->persist($buyer);

            $order = new Orders;

            $total = 0;
            foreach ($panier as $item) {
                $product = $productsRepo->find($item['id']);
                $totalItem = $product->getPrice() * $item['quantity'];
                $total += $totalItem;
            }

            $order->setTotal($total)
                ->setStatus('EN COURS')
                ->setConditionsAccept(true)
                ->setInfos($infos)
                ->setDeliveryInfos($buyer);
            
            $manager->persist($order);

            foreach ($panier as $item) {
                $orderDetails = new OrderDetails;
                $product = $productsRepo->find($item['id']);
                $totalItem = $product->getPrice() * $item['quantity'];

                $orderDetails->setProduct($product)
                     ->setQuantity($item['quantity'])
                     ->setTotal($totalItem)
                     ->setOrders($order);
                
                $manager->persist($orderDetails);
            }

            $manager->flush();

            $response = new Response();
            $response->setContent('Votre commande à bien été enregistrée');
            $response->setStatusCode(200);
            return $response;
        } else {
            $response = new Response();
            $response->setContent('Veuillez accepter les conditions d\'utilisation pour valider la commande');
            $response->setStatusCode(401);
            return $response;
        }
        
    }
}
