<?php

namespace App\Services;

use App\Entity\Orders;
use App\Entity\OrderDetails;
use App\Entity\DeliveryInfos;
use App\Repository\ProductsRepository;
use Doctrine\ORM\EntityManagerInterface;

class OrderService {

    private $productsRepo;
    private $manager;

    public function __construct(ProductsRepository $productsRepo) {
        $this->productsRepo = $productsRepo;
    }

    public function createBuyer($buyerInfos) {
        $buyer = new DeliveryInfos;
        $buyer->setLastname($buyerInfos['lastname'])
              ->setFirstname($buyerInfos['firstname'])
              ->setEmail($buyerInfos['email'])
              ->setPhone($buyerInfos['phone'])
              ->setAdress($buyerInfos['address'])
              ->setZip($buyerInfos['zip'])
              ->setCity($buyerInfos['city']);

        return $buyer;
    }

    public function createOrder(int $total, $infos, $buyer) {
        $order = new Orders;
        $order->setTotal($total)
              ->setStatus('EN COURS')
              ->setConditionsAccept(true)
              ->setInfos($infos)
              ->setDeliveryInfos($buyer);
    
        return $order;
    }

    public function createDetail($item, $order) {
        $product = $this->productsRepo->find($item['product']['id']);
        $totalItem = $product->getPrice() * $item['quantity'];

        $detail = new OrderDetails;
        $detail->setProduct($product)
                ->setQuantity($item['quantity'])
                ->setTotal($totalItem)
                ->setOrders($order);
                
        return $detail;
    }

    public function getTotal ($cart) {
        $total = 0;
        foreach ($cart as $item) {
            $product = $this->productsRepo->find($item['product']['id']);
            $totalItem = $product->getPrice() * $item['quantity'];
            $total += $totalItem;
        }
        
        return $total;
    }
}