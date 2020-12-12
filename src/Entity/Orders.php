<?php

namespace App\Entity;

use DateTime;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\OrdersRepository;
use ApiPlatform\Core\Annotation\ApiFilter;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ORM\Entity(repositoryClass=OrdersRepository::class)
 * @ORM\HasLifecycleCallbacks
 * @ApiResource(
 *      collectionOperations={"GET"},
 *      itemOperations={"GET", "PUT", "PATCH"},
 *      normalizationContext={
 *          "groups"={"orders_read"}
 *      },
 *      attributes={
 *      "order"={"createdAt":"desc"}
 *      }
 * )
 * @ApiFilter(SearchFilter::class, properties={"status": "exact"})
 */
class Orders
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"orders_read"})
     */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity=OrderDetails::class, mappedBy="orders")
     * @Groups({"orders_read"})
     */
    private $OrderDetails;

    /**
     * @ORM\Column(type="integer")
     * @Groups({"orders_read"})
     */
    private $total;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"orders_read"})
     */
    private $status;

    /**
     * @ORM\Column(type="boolean")
     * @Assert\NotBlank(message="Veuillez accepter les conditions d'utilisation pour valider votre commande")
     */
    private $conditionsAccept;

    /**
     * @ORM\Column(type="text", nullable=true)
     * @Groups({"orders_read"})
     */
    private $infos;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"orders_read"})
     */
    private $createdAt;

    /**
     * @ORM\OneToOne(targetEntity=DeliveryInfos::class, mappedBy="Orders", cascade={"persist", "remove"})
     * @Groups({"orders_read"})
     */
    private $deliveryInfos;

    /**
     * Permet d'intialiser la date de création
     * 
     * @ORM\PrePersist
     * @ORM\PreUpdate
     */
    public function initializeCreatedAt(){
        if(empty($this->createdAt)){
            $this->createdAt = new \DateTime('Europe/Brussels');
        }
    }

    public function __construct()
    {
        $this->OrderDetails = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection|OrderDetails[]
     */
    public function getOrderDetails(): Collection
    {
        return $this->OrderDetails;
    }

    public function addOrderDetail(OrderDetails $orderDetail): self
    {
        if (!$this->OrderDetails->contains($orderDetail)) {
            $this->OrderDetails[] = $orderDetail;
            $orderDetail->setOrders($this);
        }

        return $this;
    }

    public function removeOrderDetail(OrderDetails $orderDetail): self
    {
        if ($this->OrderDetails->removeElement($orderDetail)) {
            // set the owning side to null (unless already changed)
            if ($orderDetail->getOrders() === $this) {
                $orderDetail->setOrders(null);
            }
        }

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getConditionsAccept(): ?bool
    {
        return $this->conditionsAccept;
    }

    public function setConditionsAccept(bool $conditionsAccept): self
    {
        $this->conditionsAccept = $conditionsAccept;

        return $this;
    }

    public function getInfos(): ?string
    {
        return $this->infos;
    }

    public function setInfos(?string $infos): self
    {
        $this->infos = $infos;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getDeliveryInfos(): ?DeliveryInfos
    {
        return $this->deliveryInfos;
    }

    public function setDeliveryInfos(?DeliveryInfos $deliveryInfos): self
    {
        $this->deliveryInfos = $deliveryInfos;

        // set (or unset) the owning side of the relation if necessary
        $newOrders = null === $deliveryInfos ? null : $this;
        if ($deliveryInfos->getOrders() !== $newOrders) {
            $deliveryInfos->setOrders($newOrders);
        }

        return $this;
    }
}
