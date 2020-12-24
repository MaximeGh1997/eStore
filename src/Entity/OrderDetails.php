<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrderDetailsRepository;
use ApiPlatform\Core\Annotation\ApiResource;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=OrderDetailsRepository::class)
 * @ApiResource(
 *      collectionOperations={"GET"},
 *      itemOperations={"GET"},
 *      denormalizationContext={
 *          "disable_type_enforcement"=true
 *      }
 * )
 */
class OrderDetails
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"orders_read"})
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity=Products::class, inversedBy="orderDetails")
     * @ORM\JoinColumn(nullable=true)
     * @Groups({"orders_read"})
     */
    private $product;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"orders_read"})
     * @Assert\Type(type="integer", message="La quantité de produit choisie doit être une valeur numérique")
     */
    private $quantity;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"orders_read"})
     */
    private $total;

    /**
     * @ORM\ManyToOne(targetEntity=Orders::class, inversedBy="OrderDetails")
     * @ORM\JoinColumn(nullable=false)
     */
    private $orders;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProduct(): ?Products
    {
        return $this->product;
    }

    public function setProduct(?Products $product): self
    {
        $this->product = $product;

        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity($quantity): self
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getTotal(): ?int
    {
        return $this->total;
    }

    public function setTotal(int $total): self
    {
        $this->total = $total;

        return $this;
    }

    public function getOrders(): ?Orders
    {
        return $this->orders;
    }

    public function setOrders(?Orders $orders): self
    {
        $this->orders = $orders;

        return $this;
    }
}
