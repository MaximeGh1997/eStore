<?php

namespace App\DataFixtures;

use DateTime;
use Faker\Factory;
use App\Entity\Users;
use App\Entity\Orders;
use App\Entity\Products;
use App\Entity\OrderDetails;
use App\Entity\DeliveryInfos;
use App\Repository\ProductsRepository;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class AppFixtures extends Fixture
{
    private $passwordEncoder;
    private $productsRepo;

    public function __construct(UserPasswordEncoderInterface $passwordEncoder, ProductsRepository $productsRepo) {
        $this->passwordEncoder = $passwordEncoder;
        $this->productsRepo = $productsRepo;
    }

    public function load(ObjectManager $manager)
    {
        // AJOUT D'UN ADMIN
        
        $admin = new Users;
        
        $admin->setUsername('admin')
              ->setRoles(['ROLE_ADMIN'])
              ->setPassword($this->passwordEncoder->encodePassword($admin,'epse'))
              ->setLastname('Ghislain')
              ->setFirstname('Maxime')
              ->setEmail('contact@maxime-gh.com');
        
        $manager->persist($admin);

        // AJOUT DE 10 PRODUITS

        $faker = Factory::create('FR-fr');
        $date = new \DateTime('Europe/Brussels');
        $products = [];

        for ($i = 0; $i < 10; $i++) {
            $product = new Products;

            $product->setName($faker->word())
                    ->setDescription($faker->paragraph(2))
                    ->setPrice($faker->randomFloat(2, 3, 15))
                    ->setPicture("http://www.placehold.it/300x300")
                    ->setCreatedAt($date);

            $products[] = $product;
            $manager->persist($product);
          }

        // AJOUT D'UNE COMMANDE

        $buyer = new DeliveryInfos;

        $buyer->setLastname($faker->lastName())
              ->setFirstname($faker->firstName())
              ->setEmail($faker->email())
              ->setPhone($faker->phoneNumber())
              ->setAdress($faker->streetAddress())
              ->setZip($faker->postcode())
              ->setCity($faker->city());

        $manager->persist($buyer);

        $order = new Orders;
        $product1 = $products[3];
        $total1 = $product1->getPrice() * 3;
        $product2 = $products[6];
        $total2 = $product2->getPrice() * 2;

        $total = $total1 + $total2;

        $order->setTotal($total)
              ->setStatus('EN COURS')
              ->setConditionsAccept(true)
              ->setInfos('Frapper à la porte car il y aura du bruit svp')
              ->setCreatedAt($date)
              ->setDeliveryInfos($buyer);

        $manager->persist($order);

        $orderDetails1 = new OrderDetails;

        $orderDetails1->setProduct($product1)
                     ->setQuantity(3)
                     ->setTotal($total1)
                     ->setOrders($order);

        $orderDetails2 = new OrderDetails;

        $orderDetails2->setProduct($product2)
                     ->setQuantity(2)
                     ->setTotal($total2)
                     ->setOrders($order);

        $manager->persist($orderDetails1);
        $manager->persist($orderDetails2);

        $manager->flush();
    }
}
